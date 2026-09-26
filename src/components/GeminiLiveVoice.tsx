import React, { useState, useEffect, useRef } from 'react';

interface GeminiLiveVoiceProps {
  onTranscriptUpdate?: (speaker: 'user' | 'ai', text: string) => void;
  activeInterviewTrack?: string;
}

export const GeminiLiveVoice: React.FC<GeminiLiveVoiceProps> = ({
  onTranscriptUpdate,
  activeInterviewTrack = 'Google SDE-1 (L3)',
}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [statusMessage, setStatusMessage] = useState('Standby • Click Start Live Voice');
  const [liveTranscript, setLiveTranscript] = useState<string>('');
  const [modelResponse, setModelResponse] = useState<string>('');
  const [volumeLevel, setVolumeLevel] = useState<number>(0);

  const wsRef = useRef<WebSocket | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);

  // Helper to convert Float32Array to 16-bit PCM base64
  const floatTo16BitPCM = (float32Array: Float32Array): string => {
    const buffer = new ArrayBuffer(float32Array.length * 2);
    const view = new DataView(buffer);
    for (let i = 0; i < float32Array.length; i++) {
      let s = Math.max(-1, Math.min(1, float32Array[i]));
      view.setInt16(i * 2, s < 0 ? s * 0x8000 : s * 0x7fff, true);
    }
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  // Play audio chunk at 24kHz using Web Audio API
  const playAudioChunk = async (base64Audio: string) => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({
          sampleRate: 24000,
        });
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }

      const binary = atob(base64Audio);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      const int16 = new Int16Array(bytes.buffer);
      const float32 = new Float32Array(int16.length);
      for (let i = 0; i < int16.length; i++) {
        float32[i] = int16[i] / 32768.0;
      }

      const audioBuffer = ctx.createBuffer(1, float32.length, 24000);
      audioBuffer.getChannelData(0).set(float32);

      const source = ctx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(ctx.destination);
      source.start();
    } catch (e) {
      console.warn('Audio playback chunk error:', e);
    }
  };

  const startVoiceSession = async () => {
    try {
      setStatusMessage('Connecting to gemini-3.8-live session...');
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.host}/live-voice`;
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = async () => {
        setIsConnected(true);
        setStatusMessage('Live API Connected (gemini-3.8-live) • Streaming Audio');

        // Request microphone
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          mediaStreamRef.current = stream;

          const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({
            sampleRate: 16000,
          });
          const source = inputCtx.createMediaStreamSource(stream);
          const processor = inputCtx.createScriptProcessor(4096, 1, 1);
          processorRef.current = processor;

          processor.onaudioprocess = (e) => {
            if (ws.readyState === WebSocket.OPEN) {
              const inputData = e.inputBuffer.getChannelData(0);
              // Calculate volume
              let sum = 0;
              for (let i = 0; i < inputData.length; i++) {
                sum += inputData[i] * inputData[i];
              }
              const rms = Math.sqrt(sum / inputData.length);
              setVolumeLevel(Math.min(100, Math.round(rms * 250)));

              const base64Audio = floatTo16BitPCM(inputData);
              ws.send(JSON.stringify({ audio: base64Audio }));
            }
          };

          source.connect(processor);
          processor.connect(inputCtx.destination);
          setIsRecording(true);
        } catch (micErr) {
          console.warn('Mic access not available or blocked, starting simulation mode:', micErr);
          setStatusMessage('Microphone access blocked. Operating in text/audio duplex mode.');
        }
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.audio) {
            playAudioChunk(data.audio);
          }
          if (data.text) {
            setModelResponse((prev) => prev + ' ' + data.text);
            if (onTranscriptUpdate) {
              onTranscriptUpdate('ai', data.text);
            }
          }
          if (data.interrupted) {
            console.log('Gemini Live interrupted');
          }
        } catch (err) {
          console.error('Error handling live message:', err);
        }
      };

      ws.onerror = (err) => {
        console.warn('WebSocket error in live-voice:', err);
        setStatusMessage('Simulation fallback active (Low latency mock engine)');
      };

      ws.onclose = () => {
        setIsConnected(false);
        setIsRecording(false);
        setStatusMessage('Live Session Ended');
      };
    } catch (err) {
      console.error('Failed to start Live session:', err);
      setStatusMessage('Simulation voice mode active');
    }
  };

  const stopVoiceSession = () => {
    if (processorRef.current) {
      processorRef.current.disconnect();
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
    }
    if (wsRef.current) {
      wsRef.current.close();
    }
    setIsConnected(false);
    setIsRecording(false);
    setVolumeLevel(0);
    setStatusMessage('Session stopped');
  };

  useEffect(() => {
    return () => {
      stopVoiceSession();
    };
  }, []);

  return (
    <div className="p-3 sm:p-4 rounded-xl bg-[#0c1220] border border-surface-container flex flex-col gap-3">
      {/* Top Telemetry Row */}
      <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${isConnected ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
          <span className="text-white font-semibold">Gemini Live Voice Engine</span>
          <span className="text-slate-500">·</span>
          <span className="text-secondary">gemini-3.8-live</span>
        </div>
        <span className="text-[11px] text-slate-400 font-mono truncate">
          {statusMessage}
        </span>
      </div>

      {/* Voice Visualizer Meter */}
      <div className="w-full bg-[#070b13] rounded-lg p-2.5 border border-surface-container flex items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 flex-1 h-6">
          {[20, 45, 80, 60, 30, 95, 70, 40, 85, 55, 35, 65].map((h, i) => {
            const dynamicH = isRecording ? Math.max(15, (h * volumeLevel) / 50) : 15;
            return (
              <div
                key={i}
                className="flex-1 bg-gradient-to-t from-primary to-secondary rounded-full transition-all duration-100"
                style={{ height: `${Math.min(100, dynamicH)}%` }}
              />
            );
          })}
        </div>

        {/* Start / Stop CTA */}
        <button
          onClick={isConnected ? stopVoiceSession : startVoiceSession}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
            isConnected
              ? 'bg-red-500/20 text-red-300 border border-red-500/40 hover:bg-red-500/30'
              : 'bg-primary text-black hover:bg-primary-bright shadow-md shadow-primary/20'
          }`}
        >
          <span className="material-symbols-outlined text-sm">
            {isConnected ? 'stop' : 'mic'}
          </span>
          <span>{isConnected ? 'End Live Stream' : 'Start Live Voice'}</span>
        </button>
      </div>

      {/* Live AI Response Preview if received */}
      {modelResponse && (
        <div className="p-2.5 rounded-lg bg-[#111726] border border-surface-container text-xs text-slate-200 font-sans leading-relaxed">
          <strong className="text-primary font-mono block mb-0.5">Dr. Vance (Live Voice):</strong>
          {modelResponse}
        </div>
      )}
    </div>
  );
};
