import React, { useState, useEffect } from 'react';
import { GeminiLiveVoice } from '../components/GeminiLiveVoice';
import { auth, saveInterviewSession } from '../lib/firebase';

interface LiveAiMockViewProps {
  onNavigate: (tab: any) => void;
}

export const LiveAiMockView: React.FC<LiveAiMockViewProps> = ({ onNavigate }) => {
  // Mobile tab state
  const [mobileTab, setMobileTab] = useState<'stage' | 'voice' | 'transcript' | 'rubric'>('stage');

  // Session stopwatch
  const [totalSeconds, setTotalSeconds] = useState(24 * 60 + 18);
  useEffect(() => {
    const t = setInterval(() => {
      setTotalSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Device toggles
  const [micActive, setMicActive] = useState(true);
  const [camActive, setCamActive] = useState(true);
  const [screenShared, setScreenShared] = useState(false);

  // Modals
  const [showScratchpad, setShowScratchpad] = useState(false);
  const [scratchpadText, setScratchpadText] = useState(
    '// ARCHITECTURAL DRAFT:\n// Client -> API Gateway -> [Redis Lua DECRBY] -> Kafka Topic -> Order Consumer Worker\n// Fallback: Quorum ack WAIT 2 1000ms'
  );
  const [showEndModal, setShowEndModal] = useState(false);
  const [hintRevealed, setHintRevealed] = useState(false);

  // Live transcript stream
  const [transcript, setTranscript] = useState([
    {
      speaker: 'ai',
      name: 'Dr. Sarah Vance (AI)',
      time: '23:45',
      text: '“Let us dive straight into high concurrency. In an e-commerce checkout like Flipkart Big Billion Days or Amazon Great Indian Festival, millions compete for 100 iPhone units. Walk me through how you prevent overselling while maintaining sub-50ms latency.”',
    },
    {
      speaker: 'user',
      name: 'Rohan Sharma (You)',
      time: '24:02',
      text: '“Right. If we rely on standard relational DB transactions with SERIALIZABLE isolation, connection pools will get exhausted instantly under flash traffic. Instead, I would decouple the reservation step using an in-memory cache layer...”',
    },
    {
      speaker: 'user',
      name: 'Rohan Sharma (You)',
      time: '24:18 (NOW)',
      text: '“...specifically Redis Lua scripts to atomically execute DECRBY only if the remaining stock is greater than zero. If the Lua script returns 1, we push an asynchronous booking order to a Kafka queue.”',
      confidence: '94.6%',
    },
  ]);

  const [simulatedSpeechInput, setSimulatedSpeechInput] = useState('');

  const sendCandidateTurn = () => {
    if (!simulatedSpeechInput.trim()) return;
    const now = formatTimer(totalSeconds);
    setTranscript((prev) => [
      ...prev,
      {
        speaker: 'user',
        name: 'Rohan Sharma (You)',
        time: now,
        text: `“${simulatedSpeechInput}”`,
        confidence: '96.2%',
      },
    ]);
    setSimulatedSpeechInput('');

    setTimeout(() => {
      setTranscript((prev) => [
        ...prev,
        {
          speaker: 'ai',
          name: 'Dr. Sarah Vance (AI)',
          time: formatTimer(totalSeconds + 4),
          text: '“Good mitigation. How do you handle dead-letter queues if downstream inventory decrements fail after payment confirmation?”',
        },
      ]);
    }, 1500);
  };

  return (
    <div className="w-full flex flex-col bg-surface min-h-[calc(100vh-4rem)]">
      {/* Live Cockpit Status HUD Header */}
      <div className="w-full bg-[#0a0e17] px-3 sm:px-gutter py-2.5 sm:py-space-sm shadow-md border-b border-surface-container">
        <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-space-md">
          {/* Session Coordinates */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-space-md">
            <div className="flex items-center gap-space-xs bg-surface-container px-2 sm:px-space-sm py-1 rounded-lg border border-surface-container-high">
              <span className="inline-block w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
              <span className="font-label-caps text-[10px] text-on-surface-variant uppercase">Track:</span>
              <span className="font-headline-sm text-xs sm:text-body-sm text-on-surface font-semibold">Google SDE-1</span>
            </div>

            <div className="hidden sm:flex items-center gap-space-xs bg-surface-container px-space-sm py-1 rounded-lg border border-surface-container-high">
              <span className="material-symbols-outlined text-[16px] text-secondary">psychology</span>
              <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Stage:</span>
              <span className="font-headline-sm text-body-sm text-on-surface font-semibold">
                Concurrency
              </span>
            </div>

            <div className="flex items-center gap-space-xs bg-surface-container px-2 sm:px-space-sm py-1 rounded-lg border border-surface-container-high">
              <span className="material-symbols-outlined text-[16px] text-primary">timer</span>
              <span className="font-telemetry-metric text-xs sm:text-body-sm text-primary">
                {formatTimer(totalSeconds)}
              </span>
              <span className="font-body-sm text-[11px] text-outline">/ 45:00</span>
            </div>

            <div className="hidden xl:flex items-center gap-space-xs px-space-sm py-1 bg-surface-container-low rounded-lg border border-tertiary/20">
              <span className="material-symbols-outlined text-[14px] text-tertiary">wifi_tethering</span>
              <span className="font-label-caps text-label-caps text-tertiary uppercase">28ms Ultra-Low Latency</span>
            </div>
          </div>

          {/* Action & Emergency Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowEndModal(true)}
              className="flex items-center gap-1.5 bg-error-container text-on-error-container px-3 sm:px-space-md py-1.5 rounded-lg font-headline-sm text-xs sm:text-body-sm hover:brightness-110 active:scale-95 transition-all shadow-[0_0_12px_rgba(255,180,171,0.2)] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px] text-error">call_end</span>
              <span>End Mock</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Mode Switcher for Phone Screens */}
      <div className="lg:hidden w-full bg-[#0d1322] border-b border-surface-container px-2 py-1.5 flex items-center justify-around gap-1 overflow-x-auto">
        {[
          { id: 'stage', label: 'Dual Stage', icon: 'videocam' },
          { id: 'voice', label: 'Live Voice (3.8)', icon: 'mic' },
          { id: 'transcript', label: 'Transcript', icon: 'forum' },
          { id: 'rubric', label: 'Rubric & Clues', icon: 'lightbulb' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setMobileTab(tab.id as any)}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-mono font-semibold transition-all whitespace-nowrap min-h-[38px] ${
              mobileTab === tab.id
                ? 'bg-primary text-black font-bold shadow-md'
                : 'text-slate-300 hover:text-white bg-surface-container/60'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Main Multi-Pane Arena */}
      <div className="w-full px-3 sm:px-gutter py-3 sm:py-space-md flex flex-col xl:flex-row gap-space-md flex-1">
        {/* Left Stage: Dual Stream Feeds & Gemini Live Engine (8 Columns) */}
        <div className={`w-full xl:w-8/12 flex flex-col gap-space-md ${mobileTab === 'stage' || mobileTab === 'voice' ? 'flex' : 'hidden lg:flex'}`}>
          
          {/* Gemini Live Voice Engine Card (gemini-3.8-live) */}
          <GeminiLiveVoice
            activeInterviewTrack="Google SDE-1 (L3)"
            onTranscriptUpdate={(speaker, text) => {
              setTranscript((prev) => [
                ...prev,
                {
                  speaker,
                  name: speaker === 'ai' ? 'Dr. Sarah Vance (AI)' : 'Rohan Sharma (You)',
                  time: formatTimer(totalSeconds),
                  text,
                  confidence: '98.4%',
                },
              ]);
            }}
          />

          {/* Video Stage Grid */}
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-space-md ${mobileTab === 'voice' ? 'hidden sm:grid' : 'grid'}`}>
            {/* Stream 1: AI Interviewer Video & Persona Visualizer */}
            <div className="relative bg-surface-container-low rounded-xl overflow-hidden min-h-[280px] sm:min-h-[340px] lg:min-h-[440px] flex flex-col justify-between p-3 sm:p-space-md group border border-surface-container">
              {/* Synthetic Avatar Visual Feed */}
              <div className="absolute inset-0 z-0">
                <img
                  alt="AI Interviewer Avatar"
                  className="w-full h-full object-cover object-center filter saturate-[0.85] contrast-[1.05]"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB87OGuv54zUiueHVtMOcjuh9kwUlx1DviiC98NCJauYc2oVbpjRgdwkX3Z1BNjdLpnGGJ4GRHHArXmzvdMi8WdkmZqsMPInjOzTpn6hrVSg8gtPEaEuoc94oYmY0Ko7_CD2m-BdvlsievgQ8wOvHHhylPN9QrUqaW_UjLlaMgLlp4KF_5f4PqEm-vosxjPUmjewIkKFVsw7FeHNkPuMrfNTn6b9v2WbSYCIF3V0kOF0qD-f02GBNF2"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e17] via-[#0a0e17]/50 to-transparent z-10 pointer-events-none"></div>

              {/* Top Persona HUD Pill */}
              <div className="relative z-20 flex items-center justify-between">
                <div className="flex items-center gap-space-sm bg-[#0a0e17]/85 backdrop-blur-md px-space-sm py-1.5 rounded-lg shadow-sm border border-surface-container-high">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary"></span>
                  </span>
                  <div className="flex flex-col">
                    <span className="font-headline-sm text-body-sm text-on-surface font-semibold">Dr. Sarah Vance</span>
                    <span className="font-label-caps text-[10px] text-secondary uppercase">
                      Ex-Staff Architect · L7 AI Persona
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 bg-[#0a0e17]/85 backdrop-blur-md px-space-sm py-1 rounded-lg text-tertiary border border-tertiary/20">
                  <span className="material-symbols-outlined text-[14px]">graphic_eq</span>
                  <span className="font-label-caps text-[10px] uppercase tracking-wider">Transmitting</span>
                </div>
              </div>

              {/* Live Multi-Frequency Audio Equalizer Bar & Active Question */}
              <div className="relative z-20 w-full flex flex-col gap-space-xs">
                <div className="flex items-end justify-center gap-1 h-10 px-space-md py-1 bg-[#0a0e17]/80 backdrop-blur-md rounded-lg border border-surface-container-high">
                  <span className="w-1 bg-secondary rounded-full animate-bounce [animation-delay:-0.4s] h-6"></span>
                  <span className="w-1 bg-primary rounded-full animate-bounce [animation-delay:-0.2s] h-9"></span>
                  <span className="w-1 bg-secondary rounded-full animate-bounce [animation-delay:-0.5s] h-4"></span>
                  <span className="w-1 bg-primary rounded-full animate-bounce [animation-delay:-0.1s] h-8"></span>
                  <span className="w-1 bg-tertiary rounded-full animate-bounce [animation-delay:-0.3s] h-10"></span>
                  <span className="w-1 bg-secondary rounded-full animate-bounce [animation-delay:-0.6s] h-5"></span>
                  <span className="w-1 bg-primary rounded-full animate-bounce [animation-delay:-0.2s] h-7"></span>
                  <span className="w-1 bg-tertiary rounded-full animate-bounce [animation-delay:-0.4s] h-9"></span>
                  <span className="w-1 bg-secondary rounded-full animate-bounce [animation-delay:-0.7s] h-3"></span>
                  <span className="w-1 bg-primary rounded-full animate-bounce [animation-delay:-0.3s] h-8"></span>
                  <span className="w-1 bg-secondary rounded-full animate-bounce [animation-delay:-0.5s] h-5"></span>
                </div>

                {/* Active Question Teleprompter Card */}
                <div className="bg-[#0a0e17]/90 backdrop-blur-xl p-space-sm rounded-lg shadow-md border border-surface-container">
                  <div className="flex items-center justify-between pb-1 mb-1 border-b border-surface-container">
                    <span className="font-label-caps text-label-caps text-secondary uppercase tracking-widest flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">psychology_alt</span>
                      Target Problem Statement
                    </span>
                    <span className="font-label-caps text-[10px] text-on-surface-variant bg-surface-container px-1.5 py-0.5 rounded">
                      Round 2 · Concurrency
                    </span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface leading-snug">
                    "Explain how you would handle race conditions in a distributed inventory booking system during high-concurrency flash sales, and walk me through your locking or versioning strategy."
                  </p>
                </div>
              </div>
            </div>

            {/* Stream 2: Student Camera Feed + AI Telemetry Overlays */}
            <div className="relative bg-surface-container-low rounded-xl overflow-hidden min-h-[380px] lg:min-h-[460px] flex flex-col justify-between p-space-md border border-surface-container">
              {/* User Camera Feed Canvas */}
              <div className="absolute inset-0 z-0">
                {camActive ? (
                  <img
                    alt="Candidate Camera"
                    className="w-full h-full object-cover object-center"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBk27tigGsGRK-lwxYAxya8GsokbiB7k9EL5Eee_eoAcw4ZVksfto6Fb_RZULroXJ-az094uXcfz_--TxhATwrZjjWKQVMpX0PmlSEECeuvKkcZfWjYlF8l0LWdErOb0r0-9AL8LfX__s2wnznxh2qQeuLkE_CE9svUeS4jSAYfJfAeEWAIGkPp1X6mPGlnumotAUHzQtwpt73epUcw-Ws0scQChFW5GySMGAVXFng5ZQzQjWmV4Ng"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-[#0a0e17] text-on-surface-variant">
                    <span className="material-symbols-outlined text-[48px]">videocam_off</span>
                    <span className="font-body-sm mt-2">Webcam Feed Paused</span>
                  </div>
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e17] via-[#0a0e17]/40 to-transparent z-10 pointer-events-none"></div>

              {/* Top Status */}
              <div className="relative z-20 flex items-center justify-between">
                <div className="flex items-center gap-space-xs bg-[#0a0e17]/85 backdrop-blur-md px-space-sm py-1.5 rounded-lg border border-surface-container-high">
                  <div className="w-2.5 h-2.5 rounded-full bg-tertiary"></div>
                  <span className="font-headline-sm text-body-sm text-on-surface font-semibold">Candidate: Rohan Sharma</span>
                </div>
                <div className="flex items-center gap-space-xs bg-[#0a0e17]/85 backdrop-blur-md px-space-sm py-1 rounded-lg border border-surface-container-high">
                  <span className="material-symbols-outlined text-[14px] text-tertiary">videocam</span>
                  <span className="font-label-caps text-[10px] text-on-surface uppercase">1080P @ 60FPS</span>
                </div>
              </div>

              {/* Live Biometric & Behavioral Telemetry Overlays */}
              <div className="relative z-20 flex flex-col gap-space-sm">
                <div className="grid grid-cols-2 gap-space-xs">
                  {/* Speech Pace */}
                  <div className="bg-[#0a0e17]/90 backdrop-blur-md p-space-xs rounded-lg flex items-center gap-space-xs shadow-sm border border-surface-container">
                    <div className="p-1 rounded bg-secondary/15 text-secondary">
                      <span className="material-symbols-outlined text-[16px]">speed</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-caps text-[10px] text-on-surface-variant uppercase">Speech Pace</span>
                      <div className="flex items-baseline gap-1">
                        <span className="font-telemetry-metric text-body-sm text-secondary">138</span>
                        <span className="font-label-caps text-[9px] text-tertiary uppercase">WPM (Optimal)</span>
                      </div>
                    </div>
                  </div>

                  {/* Eye Contact */}
                  <div className="bg-[#0a0e17]/90 backdrop-blur-md p-space-xs rounded-lg flex items-center gap-space-xs shadow-sm border border-surface-container">
                    <div className="p-1 rounded bg-tertiary/15 text-tertiary">
                      <span className="material-symbols-outlined text-[16px]">visibility</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-caps text-[10px] text-on-surface-variant uppercase">Eye Contact</span>
                      <div className="flex items-baseline gap-1">
                        <span className="font-telemetry-metric text-body-sm text-tertiary">92%</span>
                        <span className="font-label-caps text-[9px] text-on-surface-variant">High Sync</span>
                      </div>
                    </div>
                  </div>

                  {/* Filler Words */}
                  <div className="bg-[#0a0e17]/90 backdrop-blur-md p-space-xs rounded-lg flex items-center gap-space-xs shadow-sm border border-surface-container">
                    <div className="p-1 rounded bg-primary/15 text-primary">
                      <span className="material-symbols-outlined text-[16px]">record_voice_over</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-caps text-[10px] text-on-surface-variant uppercase">Filler Words</span>
                      <div className="flex items-baseline gap-1">
                        <span className="font-telemetry-metric text-body-sm text-on-surface">2</span>
                        <span className="font-label-caps text-[9px] text-outline uppercase">("um", "like")</span>
                      </div>
                    </div>
                  </div>

                  {/* Tone Quality */}
                  <div className="bg-[#0a0e17]/90 backdrop-blur-md p-space-xs rounded-lg flex items-center gap-space-xs shadow-sm border border-surface-container">
                    <div className="p-1 rounded bg-secondary/15 text-secondary">
                      <span className="material-symbols-outlined text-[16px]">insights</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-caps text-[10px] text-on-surface-variant uppercase">Tone Profile</span>
                      <span className="font-label-caps text-[10px] text-secondary uppercase font-semibold">Analytical</span>
                    </div>
                  </div>
                </div>

                {/* Device Utility Bar */}
                <div className="bg-[#0a0e17]/95 backdrop-blur-md px-space-md py-1.5 rounded-lg flex items-center justify-between shadow-md border border-surface-container">
                  <div className="flex items-center gap-space-xs">
                    <button
                      onClick={() => setMicActive(!micActive)}
                      className={`p-2 rounded-lg transition-colors cursor-pointer ${
                        micActive ? 'bg-surface-container text-on-surface hover:bg-surface-container-highest' : 'bg-error-container text-on-error-container'
                      }`}
                      title={micActive ? 'Mute Mic' : 'Unmute Mic'}
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {micActive ? 'mic' : 'mic_off'}
                      </span>
                    </button>

                    <button
                      onClick={() => setCamActive(!camActive)}
                      className={`p-2 rounded-lg transition-colors cursor-pointer ${
                        camActive ? 'bg-surface-container text-on-surface hover:bg-surface-container-highest' : 'bg-error-container text-on-error-container'
                      }`}
                      title={camActive ? 'Disable Video' : 'Enable Video'}
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {camActive ? 'videocam' : 'videocam_off'}
                      </span>
                    </button>

                    <button
                      onClick={() => setScreenShared(!screenShared)}
                      className={`p-2 rounded-lg transition-colors cursor-pointer ${
                        screenShared ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface hover:bg-surface-container-highest'
                      }`}
                      title="Share Screen"
                    >
                      <span className="material-symbols-outlined text-[18px]">screen_share</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowScratchpad(true)}
                      className="flex items-center gap-1.5 px-space-sm py-1.5 rounded-lg bg-surface-container-high hover:bg-primary-container text-on-surface hover:text-on-primary-container font-headline-sm text-body-sm transition-all cursor-pointer shadow-sm"
                    >
                      <span className="material-symbols-outlined text-[16px]">draw</span>
                      <span>Scratchpad</span>
                    </button>
                    <button
                      onClick={() => alert('Audio/Video calibration: 16kHz VAD, Latency: 28ms, Camera: 1080p WebRTC')}
                      className="p-1.5 rounded-lg bg-surface-container text-outline hover:text-on-surface transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">settings</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* STAR Rubric & Real-time Delivery Evaluation Strip */}
          <div className="bg-surface-container-low rounded-xl p-space-md flex flex-col gap-space-sm shadow-sm border border-surface-container">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-secondary text-[18px]">rule</span>
                <span className="font-label-caps text-label-caps text-on-surface uppercase tracking-wider">
                  Response Structure Rubric (STAR + System Design Pattern)
                </span>
              </div>
              <span className="font-label-caps text-[10px] text-tertiary">3 of 5 Milestones Passed</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-space-xs">
              <div className="flex items-center gap-2 bg-surface-container px-space-sm py-2 rounded-lg border border-surface-container-high">
                <span className="material-symbols-outlined text-[18px] text-tertiary">check_circle</span>
                <div className="flex flex-col">
                  <span className="font-label-caps text-[10px] text-on-surface font-semibold uppercase">1. Clarify Constraints</span>
                  <span className="font-body-sm text-[11px] text-outline">QPS &amp; Consistency verified</span>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-surface-container px-space-sm py-2 rounded-lg border border-surface-container-high">
                <span className="material-symbols-outlined text-[18px] text-tertiary">check_circle</span>
                <div className="flex flex-col">
                  <span className="font-label-caps text-[10px] text-on-surface font-semibold uppercase">2. State Approach</span>
                  <span className="font-body-sm text-[11px] text-outline">Pessimistic vs Optimistic</span>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-surface-container-high px-space-sm py-2 rounded-lg border border-secondary/40">
                <span className="material-symbols-outlined text-[18px] text-secondary animate-spin">sync</span>
                <div className="flex flex-col">
                  <span className="font-label-caps text-[10px] text-secondary font-semibold uppercase">3. Distributed Lock</span>
                  <span className="font-body-sm text-[11px] text-on-surface">Redlock / Lease Duration</span>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-[#0a0e17] px-space-sm py-2 rounded-lg opacity-60 border border-surface-container">
                <span className="material-symbols-outlined text-[18px] text-outline">radio_button_unchecked</span>
                <div className="flex flex-col">
                  <span className="font-label-caps text-[10px] text-on-surface-variant font-semibold uppercase">4. Fallback &amp; Queues</span>
                  <span className="font-body-sm text-[11px] text-outline">Deadlock &amp; TTL strategies</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Stage: Live Transcript & AI Scaffolding Drawer (4 Columns) */}
        <div className={`w-full xl:w-4/12 flex flex-col gap-space-md ${mobileTab === 'transcript' || mobileTab === 'rubric' ? 'flex' : 'hidden lg:flex'}`}>
          {/* Hint & Scaffold Engine Drawer */}
          <div className={`bg-surface-container-low rounded-xl p-3 sm:p-space-md flex flex-col gap-space-sm shadow-sm border border-surface-container ${mobileTab === 'transcript' ? 'hidden sm:flex' : 'flex'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-[18px] text-primary">lightbulb</span>
                <span className="font-headline-sm text-body-sm text-on-surface font-semibold">AI Dynamic Scaffold</span>
              </div>
              <span className="font-label-caps text-[10px] text-error bg-error-container/40 text-on-error-container px-2 py-0.5 rounded">
                Hint 1 of 3 Available
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Stuck on database-level vs memory-level locking? Triggering hints adjusts scoring slightly but keeps placement flow intact.
            </p>

            <button
              onClick={() => setHintRevealed(true)}
              disabled={hintRevealed}
              className={`w-full flex items-center justify-between px-space-sm py-2 rounded-lg transition-colors text-left cursor-pointer border ${
                hintRevealed
                  ? 'bg-surface-container opacity-60 border-surface-container'
                  : 'bg-surface-container hover:bg-surface-container-high border-surface-container-high'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-secondary">bolt</span>
                <div className="flex flex-col">
                  <span className="font-headline-sm text-body-sm text-on-surface">Request Architectural Clue</span>
                  <span className="font-label-caps text-[10px] text-error">-5% placement readiness index</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-[18px] text-outline">chevron_right</span>
            </button>

            {hintRevealed && (
              <div className="bg-[#0a0e17] p-space-sm rounded-lg flex flex-col gap-1 border border-secondary/30 animate-fadeIn">
                <div className="flex items-center justify-between text-secondary">
                  <span className="font-label-caps text-label-caps uppercase">System Architecture Hint #1:</span>
                  <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                </div>
                <p className="font-code-block text-code-block text-on-surface leading-relaxed">
                  Consider using Redis with <span className="text-tertiary">SETNX</span> and an auto-expiring TTL lease, or database-level row locks with <span className="text-secondary">SELECT FOR UPDATE</span>. Discuss the latency tradeoff for 50,000 requests/sec.
                </p>
              </div>
            )}
          </div>

          {/* Real-time Live Speech-to-Text Conversation Drawer */}
          <div className={`bg-surface-container-low rounded-xl flex flex-col flex-1 min-h-[460px] shadow-sm overflow-hidden border border-surface-container ${mobileTab === 'rubric' ? 'hidden sm:flex' : 'flex'}`}>
            {/* Header */}
            <div className="p-space-sm bg-surface-container flex items-center justify-between border-b border-surface-container-high">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-[18px] text-tertiary">record_voice_over</span>
                <span className="font-headline-sm text-body-sm text-on-surface font-semibold">Live Transcript Feed</span>
              </div>
              <div className="flex items-center gap-1.5 font-label-caps text-[10px] text-tertiary">
                <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
                <span>STREAMING SYNC</span>
              </div>
            </div>

            {/* Transcript Stream Log */}
            <div className="flex-1 p-space-sm flex flex-col gap-space-sm overflow-y-auto max-h-[360px]">
              {transcript.map((item, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col gap-1 p-space-sm rounded-lg border ${
                    item.speaker === 'ai'
                      ? 'bg-[#0a0e17]/80 border-surface-container'
                      : 'bg-surface-container-high/60 border-primary/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-label-caps text-[10px] uppercase font-bold flex items-center gap-1 ${
                        item.speaker === 'ai' ? 'text-primary' : 'text-secondary'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[14px]">
                        {item.speaker === 'ai' ? 'smart_toy' : 'person'}
                      </span>
                      {item.name}
                    </span>
                    <span className="font-telemetry-metric text-[10px] text-outline">{item.time}</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface leading-relaxed">
                    {item.text}
                  </p>
                  {item.confidence && (
                    <div className="flex items-center gap-1 mt-1 text-tertiary">
                      <span className="material-symbols-outlined text-[12px]">analytics</span>
                      <span className="font-label-caps text-[9px] uppercase">
                        AI Confidence Score: {item.confidence}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Voice Input Text Fallback Bar */}
            <div className="p-space-sm bg-surface-container border-t border-surface-container-high flex items-center gap-2">
              <input
                value={simulatedSpeechInput}
                onChange={(e) => setSimulatedSpeechInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendCandidateTurn()}
                placeholder="Speak or type your answer to Dr. Vance..."
                className="flex-1 px-3 py-1.5 bg-[#0a0e17] text-on-surface text-body-sm rounded-lg border border-surface-container focus:outline-none focus:border-primary"
              />
              <button
                onClick={sendCandidateTurn}
                className="p-2 rounded-lg bg-primary text-on-primary hover:brightness-110 active:scale-95 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">send</span>
              </button>
            </div>

            {/* Candidate Speech Input Indicator Footer */}
            <div className="p-space-xs px-space-sm bg-[#0a0e17] flex items-center justify-between border-t border-surface-container text-[11px]">
              <div className="flex items-center gap-space-xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
                </span>
                <span className="font-label-caps text-on-surface-variant">Speech Recognition Audio Engine ACTIVE</span>
              </div>
              <span className="font-telemetry-metric text-outline">VAD 16kHz</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Digital Scratchpad Modal */}
      {showScratchpad && (
        <div className="fixed inset-0 z-50 bg-[#0a0e17]/80 backdrop-blur-md flex items-center justify-center p-space-md">
          <div className="bg-surface-container-low border border-surface-container-high rounded-xl w-full max-w-3xl flex flex-col overflow-hidden shadow-2xl">
            <div className="px-space-md py-space-sm bg-surface-container flex items-center justify-between border-b border-surface-container-high">
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-secondary text-[20px]">draw</span>
                <div>
                  <span className="font-headline-sm text-body-sm text-on-surface font-semibold">
                    Interactive System Design Scratchpad
                  </span>
                  <span className="block font-label-caps text-[10px] text-outline">
                    Real-time mirror with AI interviewer
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setScratchpadText('')}
                  className="px-space-sm py-1 rounded bg-surface-container-highest text-on-surface font-label-caps text-[11px] uppercase hover:bg-surface-bright transition-colors cursor-pointer"
                >
                  Clear Pad
                </button>
                <button
                  onClick={() => setShowScratchpad(false)}
                  className="p-1 rounded bg-surface-container text-outline hover:text-on-surface transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>
            </div>

            <div className="relative w-full h-80 bg-[#0a0e17] p-space-md flex flex-col justify-between">
              <textarea
                value={scratchpadText}
                onChange={(e) => setScratchpadText(e.target.value)}
                className="w-full h-64 bg-transparent resize-none text-on-surface font-mono text-[13px] leading-relaxed focus:outline-none"
              />
              <div className="flex items-center justify-between pt-space-xs text-on-surface-variant font-label-caps text-[10px] border-t border-surface-container">
                <span>AUTOSAVED TO PLACEMENT DOSSIER</span>
                <span>LATENCY IMPACT: 0%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* End Interview Confirmation Modal */}
      {showEndModal && (
        <div className="fixed inset-0 z-50 bg-[#0a0e17]/80 backdrop-blur-md flex items-center justify-center p-space-md">
          <div className="bg-surface-container-low border border-surface-container-high rounded-xl max-w-md w-full p-space-lg flex flex-col gap-space-md shadow-2xl">
            <div className="flex items-center gap-space-sm text-error">
              <span className="material-symbols-outlined text-[28px]">warning</span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Conclude Mock Interview?</h3>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant leading-normal">
              Are you sure you want to end this Google SDE-1 technical simulation? Your spoken responses, audio pace, and solution approach will be submitted for neural assessment scoring.
            </p>
            <div className="flex items-center justify-end gap-space-sm pt-2">
              <button
                onClick={() => setShowEndModal(false)}
                className="px-space-md py-2 rounded-lg bg-surface-container text-on-surface font-headline-sm text-body-sm hover:bg-surface-container-high transition-colors cursor-pointer"
              >
                Continue Interview
              </button>
              <button
                onClick={() => {
                  if (auth.currentUser) {
                    saveInterviewSession(auth.currentUser.uid, {
                      track: 'Google SDE-1 (L3)',
                      company: 'Google',
                      overallScore: 88,
                      technicalScore: 92,
                      communicationScore: 84,
                      problemSolved: 'Distributed Inventory Reservation with Redis Lua & Kafka',
                      transcriptSummary: 'Candidate demonstrated deep understanding of high concurrency, pessimistic vs optimistic locking, and event-driven fallback queues.',
                      barRaiserVerdict: 'STRONG HIRE (L3/SDE-1)',
                      durationMinutes: Math.max(1, Math.round(totalSeconds / 60)),
                    }).catch(console.error);
                  }
                  setShowEndModal(false);
                  onNavigate('history');
                }}
                className="px-space-md py-2 rounded-lg bg-error text-on-error font-headline-sm text-body-sm hover:brightness-110 active:scale-95 transition-all cursor-pointer font-semibold"
              >
                Yes, Generate Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
