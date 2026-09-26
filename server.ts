import express, { Request, Response } from 'express';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { WebSocketServer, WebSocket } from 'ws';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const port = parseInt(process.env.PORT || '3000', 10);

app.use(express.json());

// Initialize GoogleGenAI SDK
// Using GEMINI_API_KEY from environment
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// 1. Google Search Grounding Endpoint with gemini-3.5-flash
app.post('/api/search-grounding', async (req: Request, res: Response) => {
  try {
    const { company, role, topic } = req.body;
    const prompt = `Search for the latest real campus placement interview rounds, hiring criteria, recent CTC packages, and actual technical questions for ${company || 'Google'} for ${role || 'SDE-1'} in 2025/2026. Topic/Focus: ${topic || 'DSA and Systems'}. Provide a concise, highly structured intelligence report for candidates with verified real interview questions asked in recent on-campus drives.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const candidate = response.candidates?.[0];
    const groundingMetadata = candidate?.groundingMetadata;

    // Extract search citations and queries
    const searchQueries = groundingMetadata?.webSearchQueries || [];
    const groundingChunks = groundingMetadata?.groundingChunks?.map((chunk: any) => ({
      title: chunk.web?.title || 'Placement Source',
      uri: chunk.web?.uri || '',
    })) || [];

    res.json({
      content: response.text || 'No intelligence data retrieved.',
      searchQueries,
      citations: groundingChunks,
      modelUsed: 'gemini-3.5-flash',
    });
  } catch (error: any) {
    console.error('Error with Google Search Grounding:', error);
    res.status(500).json({
      error: error.message || 'Failed to fetch search-grounded intelligence.',
    });
  }
});

// 2. Real-time Live API WebSocket Setup (gemini-3.8-live)
const wss = new WebSocketServer({ server, path: '/live-voice' });

wss.on('connection', async (clientWs: WebSocket) => {
  console.log('Client connected to Gemini Live voice stream');
  let session: any = null;

  try {
    session = await ai.live.connect({
      model: 'gemini-3.8-live',
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } },
        },
        systemInstruction:
          'You are Dr. Sarah Vance, a Senior Staff Bar-Raiser AI conducting a rigorous SDE-1 engineering campus placement mock interview. Speak naturally, ask probing technical follow-ups about time and space complexity, test edge cases, and challenge candidate assumptions constructively.',
      },
      callbacks: {
        onmessage: (message: LiveServerMessage) => {
          const audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
          const text = message.serverContent?.modelTurn?.parts?.[0]?.text;

          if (audio && clientWs.readyState === WebSocket.OPEN) {
            clientWs.send(JSON.stringify({ audio }));
          }
          if (text && clientWs.readyState === WebSocket.OPEN) {
            clientWs.send(JSON.stringify({ text }));
          }
          if (message.serverContent?.interrupted && clientWs.readyState === WebSocket.OPEN) {
            clientWs.send(JSON.stringify({ interrupted: true }));
          }
        },
        onclose: () => {
          console.log('Gemini Live session closed');
          if (clientWs.readyState === WebSocket.OPEN) {
            clientWs.close();
          }
        },
      },
    });

    clientWs.on('message', (data: any) => {
      try {
        const parsed = JSON.parse(data.toString());
        if (parsed.audio && session) {
          session.sendRealtimeInput({
            audio: { data: parsed.audio, mimeType: 'audio/pcm;rate=16000' },
          });
        }
        if (parsed.text && session) {
          session.sendClientContent({
            turns: [
              {
                role: 'user',
                parts: [{ text: parsed.text }],
              },
            ],
            turnComplete: true,
          });
        }
      } catch (err) {
        console.error('Error handling client message in live session:', err);
      }
    });

    clientWs.on('close', () => {
      console.log('Client disconnected from Gemini Live voice stream');
      if (session && typeof session.close === 'function') {
        session.close();
      }
    });
  } catch (err: any) {
    console.error('Failed to establish Gemini Live session:', err);
    if (clientWs.readyState === WebSocket.OPEN) {
      clientWs.send(JSON.stringify({ error: err.message }));
      clientWs.close();
    }
  }
});

// Vite middleware in dev or static files in production
async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  server.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${port}`);
  });
}

startServer();
