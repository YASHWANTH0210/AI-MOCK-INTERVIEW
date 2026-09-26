import React, { useState } from 'react';
import { ThreeNeuralCore } from '../components/ThreeNeuralCore';
import { QuickTips, CareerTrackId } from '../components/QuickTips';

interface OverviewViewProps {
  onNavigate: (tab: any) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({ onNavigate }) => {
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [tpoSubmitted, setTpoSubmitted] = useState(false);
  const [selectedStrategyTrack, setSelectedStrategyTrack] = useState<CareerTrackId>('google');

  const handleTrackSelect = (trackId: CareerTrackId) => {
    setSelectedStrategyTrack(trackId);
    const element = document.getElementById('quick-tips');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTpoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTpoSubmitted(true);
    setTimeout(() => {
      alert('Institutional Pilot Request Submitted! Our Campus Engineering Lead will contact you within 4 hours.');
      setTpoSubmitted(false);
    }, 800);
  };

  return (
    <div className="w-full flex flex-col bg-surface">
      {/* HERO SECTION WITH EMBEDDED 3D SCENE */}
      <section className="relative w-full min-h-[620px] sm:min-h-[740px] lg:min-h-[880px] flex items-center justify-center overflow-hidden bg-[#0a0e17] -mt-16 pt-20 sm:pt-28 pb-8 sm:pb-space-xl">
        {/* Three.js Interactive 3D Canvas Background */}
        <div className="absolute inset-0 w-full h-full pointer-events-auto">
          <ThreeNeuralCore className="opacity-90" />
        </div>

        {/* Ambient Radial Gradient Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-container/20 via-[#0a0e17]/70 to-[#0a0e17]"></div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-gutter flex flex-col items-center text-center">
          {/* Live Badge */}
          <div className="inline-flex items-center gap-space-xs sm:gap-space-sm px-3 sm:px-space-md py-1 sm:py-1.5 rounded-full bg-surface-container-high/80 backdrop-blur-md shadow-lg shadow-primary/5 mb-4 sm:mb-space-lg border border-surface-container-highest max-w-[95%]">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-tertiary"></span>
            </span>
            <span className="font-label-caps text-[9px] sm:text-label-caps text-on-surface uppercase tracking-wider truncate">
              TIER-1 &amp; TIER-2 CAMPUS CALIBRATED • 2025/2026 PLACEMENT ENGINE
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-display text-2xl sm:text-4xl lg:text-display max-w-5xl tracking-tight text-on-surface uppercase drop-shadow-sm mb-3 sm:mb-space-md leading-tight">
            Ace Your Dream SDE-1 Drives With Real-Time{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-tertiary">
              3D AI Interviewers
            </span>
          </h1>

          {/* Subtitle */}
          <p className="font-body-md sm:font-body-lg text-xs sm:text-body-lg text-on-surface-variant max-w-3xl leading-relaxed mb-6 sm:mb-space-xl">
            Live neural video avatars, compiler-driven DSA coding bar-raisers, micro-latency voice feedback, and institutional T&amp;P placement analytics tuned to Google, Amazon, Microsoft &amp; Flipkart benchmarks.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-2.5 sm:gap-space-md mb-6 sm:mb-space-xl w-full max-w-xl">
            <button
              onClick={() => onNavigate('live-ai-mock')}
              className="w-full sm:w-auto sm:flex-1 inline-flex items-center justify-center gap-space-sm px-space-lg py-3 rounded-lg bg-primary text-on-primary font-headline-sm text-xs sm:text-body-md uppercase tracking-wider shadow-lg shadow-primary/30 hover:brightness-110 active:scale-95 transition-all cursor-pointer min-h-[44px]"
            >
              <span className="material-symbols-outlined text-[18px]">terminal</span>
              Launch Instant AI Mock (Free)
            </button>
            <a
              href="#tracks"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-space-sm px-space-md py-3 rounded-lg bg-surface-container-high text-on-surface font-headline-sm text-xs sm:text-body-md uppercase tracking-wider hover:bg-surface-bright transition-all border border-surface-container-highest min-h-[44px]"
            >
              Explore Tracks
            </a>
            <a
              href="#quick-tips"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs px-space-md py-3 rounded-lg bg-surface-container text-primary font-headline-sm text-xs sm:text-body-md uppercase tracking-wider hover:bg-surface-container-high transition-all border border-primary/30 min-h-[44px]"
            >
              <span className="material-symbols-outlined text-[18px]">psychology</span>
              Quick Tips
            </a>
            <button
              onClick={() => setShowDemoModal(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs px-space-md py-3 rounded-lg bg-surface-container text-tertiary font-headline-sm text-xs sm:text-body-md uppercase tracking-wider hover:bg-surface-container-high transition-all border border-tertiary/20 cursor-pointer min-h-[44px]"
            >
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                play_circle
              </span>
              45s Demo
            </button>
          </div>

          {/* Quick Live Telemetry Overlay */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-space-md w-full max-w-4xl p-3 sm:p-space-md rounded-xl bg-[#0a0e17]/85 backdrop-blur-xl shadow-2xl border border-surface-container">
            <div className="flex flex-col items-center sm:items-start p-space-sm">
              <div className="flex items-center gap-space-xs mb-1">
                <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
                <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
                  Real Mocks Evaluated
                </span>
              </div>
              <span className="font-telemetry-metric text-telemetry-metric text-on-surface">48,290+ Sessions</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">Calibrated on real SDE-1 transcripts</span>
            </div>

            <div className="flex flex-col items-center sm:items-start p-space-sm">
              <div className="flex items-center gap-space-xs mb-1">
                <span className="material-symbols-outlined text-tertiary text-[18px]">query_stats</span>
                <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
                  Drive Clearance
                </span>
              </div>
              <span className="font-telemetry-metric text-telemetry-metric text-tertiary">87.4% Rate</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">Day-1 &amp; Day-2 on-campus offers</span>
            </div>

            <div className="flex flex-col items-center sm:items-start p-space-sm">
              <div className="flex items-center gap-space-xs mb-1">
                <span className="material-symbols-outlined text-primary text-[18px]">trending_up</span>
                <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
                  Salary Multiplier
                </span>
              </div>
              <span className="font-telemetry-metric text-telemetry-metric text-primary">+4.2 LPA Jump</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">Avg CTC delta across 320+ colleges</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: FOUR RIGOROUS INTERVIEW DIMENSIONS */}
      <section className="w-full py-space-xl px-gutter bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl">
            <div>
              <span className="font-label-caps text-label-caps text-tertiary uppercase tracking-widest block mb-space-xs">
                EVALUATION ARCHITECTURE
              </span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface uppercase tracking-tight">
                Four Rigorous Interview Dimensions
              </h2>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md mt-space-sm md:mt-0">
              Replicating the intense pressure and high-fidelity standards of senior SDE &amp; Principal interview panels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
            {/* Card 1: 3D Holographic Bar Raiser */}
            <div className="group relative rounded-xl bg-surface-container-low p-space-lg transition-all duration-300 hover:bg-surface-container-high shadow-xl flex flex-col justify-between border border-surface-container">
              <div>
                <div className="flex items-center justify-between mb-space-md">
                  <span className="font-label-caps text-label-caps px-space-sm py-1 rounded bg-secondary-container text-on-secondary-container uppercase">
                    Live Avatar Simulator
                  </span>
                  <span className="font-telemetry-metric text-body-sm text-tertiary">01 / DIMENSION</span>
                </div>
                <div className="relative w-full h-48 rounded-lg overflow-hidden mb-space-md bg-[#0a0e17] flex items-center justify-center border border-surface-container">
                  <img
                    alt="AI Avatar"
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJDr2Fz_jfmNSHV1K0Vr8m4HNfrL_QkgbG9tmlI8BbljyJxFbZh9ZiF1EFshEL9HeQIhQ3RCG_1t-55SmO6XtasTstscXqAPPjJ1sc_azVWcid9YnUJJQQTm8v1ot_GTdl0txwTJ-J9jL9gfasuDBdNoHMBX3CVzVoNN_MO7xv_fvjM8yaX0GLxD3vjVGzbejTzv_FJu2ggLC03O-L33g9hT3DHggu1bh84I-Wwqq4Vkpzgr-RWkUx"
                  />
                  <div className="absolute bottom-2 left-2 right-2 p-2 rounded bg-[#0a0e17]/90 backdrop-blur-md flex items-center justify-between text-on-surface border border-surface-container-high">
                    <div className="flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-[16px] text-tertiary">graphic_eq</span>
                      <span className="font-label-caps text-label-caps">CADENCE: 134 WPM</span>
                    </div>
                    <div className="flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-[16px] text-primary">visibility</span>
                      <span className="font-label-caps text-label-caps">EYE-CONTACT: 92%</span>
                    </div>
                    <span className="font-label-caps text-label-caps text-primary px-1.5 py-0.5 rounded bg-surface-container">
                      STAR OK
                    </span>
                  </div>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface uppercase mb-space-xs">
                  3D Neural Bar Raiser
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-space-md">
                  Speaks, pauses, interrupts, and challenges edge cases in natural speech. Real-time gaze tracking, sentiment evaluation, and speech filler telemetry ensure your articulation matches top product firm standards.
                </p>
              </div>
              <div className="flex items-center gap-space-sm pt-space-sm border-t border-surface-container">
                <span className="font-label-caps text-label-caps text-on-surface uppercase">Metrics:</span>
                <span className="font-body-sm text-body-sm text-primary">Gaze Drift</span>
                <span className="text-on-surface-variant">•</span>
                <span className="font-body-sm text-body-sm text-primary">Filler Frequency</span>
                <span className="text-on-surface-variant">•</span>
                <span className="font-body-sm text-body-sm text-primary">STAR Coherence</span>
              </div>
            </div>

            {/* Card 2: In-Browser Live IDE & Compiler */}
            <div className="group relative rounded-xl bg-surface-container-low p-space-lg transition-all duration-300 hover:bg-surface-container-high shadow-xl flex flex-col justify-between border border-surface-container">
              <div>
                <div className="flex items-center justify-between mb-space-md">
                  <span className="font-label-caps text-label-caps px-space-sm py-1 rounded bg-secondary-container text-on-secondary-container uppercase">
                    Sandbox Engine
                  </span>
                  <span className="font-telemetry-metric text-body-sm text-primary">02 / DIMENSION</span>
                </div>
                <div className="relative w-full h-48 rounded-lg overflow-hidden mb-space-md bg-[#0a0e17] p-space-sm font-code-block text-code-block text-on-surface flex flex-col justify-between border border-surface-container">
                  <div className="flex items-center justify-between text-on-surface-variant text-[11px] pb-1 border-b border-surface-container">
                    <span>solution.cpp • C++20 Clang</span>
                    <span className="text-tertiary">Memory: 14.2 MB (O(1))</span>
                  </div>
                  <pre className="text-[12px] leading-tight text-secondary font-mono">
{`int trapRainWater(vector<int>& height) {
    int left = 0, right = height.size() - 1;
    int maxL = 0, maxR = 0, water = 0;
    while(left <= right) { ... }
    return water; // Automated test suite: 12/12 PASSED
}`}
                  </pre>
                  <div className="flex items-center gap-space-xs text-[11px] text-tertiary">
                    <span className="material-symbols-outlined text-[14px]">check_circle</span>
                    <span>O(N) Time • O(1) Space optimal pass</span>
                  </div>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface uppercase mb-space-xs">
                  In-Browser Polyglot Compiler
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-space-md">
                  Zero-setup live execution for C++, Java 21, Python 3.12, and Go. LeetCode Hard and Codeforces test harnesses run simultaneously with live memory profilers and cyclomatic complexity scoring.
                </p>
              </div>
              <div className="flex items-center gap-space-sm pt-space-sm border-t border-surface-container">
                <span className="font-label-caps text-label-caps text-on-surface uppercase">Support:</span>
                <span className="font-body-sm text-body-sm text-primary">LLVM 18</span>
                <span className="text-on-surface-variant">•</span>
                <span className="font-body-sm text-body-sm text-primary">GraalVM</span>
                <span className="text-on-surface-variant">•</span>
                <span className="font-body-sm text-body-sm text-primary">PyPy3</span>
                <span className="text-on-surface-variant">•</span>
                <span className="font-body-sm text-body-sm text-primary">Anti-Cheat Keystroke</span>
              </div>
            </div>

            {/* Card 3: Real-Time System Design Whiteboard */}
            <div className="group relative rounded-xl bg-surface-container-low p-space-lg transition-all duration-300 hover:bg-surface-container-high shadow-xl flex flex-col justify-between border border-surface-container">
              <div>
                <div className="flex items-center justify-between mb-space-md">
                  <span className="font-label-caps text-label-caps px-space-sm py-1 rounded bg-secondary-container text-on-secondary-container uppercase">
                    Architecture Lab
                  </span>
                  <span className="font-telemetry-metric text-body-sm text-tertiary">03 / DIMENSION</span>
                </div>
                <div className="relative w-full h-48 rounded-lg overflow-hidden mb-space-md bg-[#0a0e17] p-space-sm flex items-center justify-center border border-surface-container">
                  <svg className="w-full h-full text-secondary" fill="none" viewBox="0 0 400 160">
                    <rect className="fill-surface-container stroke-primary" height="50" rx="4" strokeWidth="1.5" width="70" x="20" y="55"></rect>
                    <text className="font-label-caps text-[10px]" fill="currentColor" textAnchor="middle" x="55" y="83">CLIENT / LB</text>
                    <path d="M90 80 H140" stroke="currentColor" strokeDasharray="3 3" strokeWidth="1.5"></path>
                    <rect className="fill-surface-container stroke-tertiary" height="40" rx="4" strokeWidth="1.5" width="80" x="140" y="30"></rect>
                    <text className="font-label-caps text-[10px]" fill="currentColor" textAnchor="middle" x="180" y="54">KAFKA CLUSTER</text>
                    <rect className="fill-surface-container stroke-primary" height="40" rx="4" strokeWidth="1.5" width="80" x="140" y="90"></rect>
                    <text className="font-label-caps text-[10px]" fill="currentColor" textAnchor="middle" x="180" y="114">REDIS CACHE</text>
                    <path d="M220 50 H270" stroke="currentColor" strokeWidth="1.5"></path>
                    <path d="M220 110 H270" stroke="currentColor" strokeWidth="1.5"></path>
                    <rect className="fill-surface-container stroke-secondary" height="50" rx="4" strokeWidth="1.5" width="100" x="270" y="55"></rect>
                    <text className="font-label-caps text-[10px]" fill="currentColor" textAnchor="middle" x="320" y="78">SHARDED POSTGRES</text>
                    <text className="font-label-caps text-[9px]" fill="#ffb783" textAnchor="middle" x="320" y="93">CONSISTENT HASH</text>
                  </svg>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface uppercase mb-space-xs">
                  System Design Whiteboard
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-space-md">
                  Tackle high-throughput distributed system prompts. Drag and deploy microservices, distributed message brokers, replication logs, and database partitions with AI querying load calculations and single points of failure.
                </p>
              </div>
              <div className="flex items-center gap-space-sm pt-space-sm border-t border-surface-container">
                <span className="font-label-caps text-label-caps text-on-surface uppercase">Focus:</span>
                <span className="font-body-sm text-body-sm text-tertiary">CAP Theorem</span>
                <span className="text-on-surface-variant">•</span>
                <span className="font-body-sm text-body-sm text-tertiary">WAL Logging</span>
                <span className="text-on-surface-variant">•</span>
                <span className="font-body-sm text-body-sm text-tertiary">Backpressure</span>
              </div>
            </div>

            {/* Card 4: Institutional TPO Diagnostic Suite */}
            <div className="group relative rounded-xl bg-surface-container-low p-space-lg transition-all duration-300 hover:bg-surface-container-high shadow-xl flex flex-col justify-between border border-surface-container">
              <div>
                <div className="flex items-center justify-between mb-space-md">
                  <span className="font-label-caps text-label-caps px-space-sm py-1 rounded bg-secondary-container text-on-secondary-container uppercase">
                    TPO Institutional Admin
                  </span>
                  <span className="font-telemetry-metric text-body-sm text-primary">04 / DIMENSION</span>
                </div>
                <div className="relative w-full h-48 rounded-lg overflow-hidden mb-space-md bg-[#0a0e17] p-space-md flex flex-col justify-center gap-space-xs border border-surface-container">
                  <div className="flex justify-between items-center text-[12px] font-headline-sm uppercase">
                    <span className="text-on-surface">Batch Readiness Index</span>
                    <span className="text-tertiary">89.2% SDE-Ready</span>
                  </div>
                  <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-primary to-tertiary h-full rounded-full w-[89%]"></div>
                  </div>
                  <div className="flex justify-between items-center text-[12px] font-headline-sm uppercase mt-2">
                    <span className="text-on-surface">DSA Benchmark (Trees &amp; DP)</span>
                    <span className="text-primary">94.1 Percentile</span>
                  </div>
                  <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                    <div className="bg-primary h-full rounded-full w-[94%]"></div>
                  </div>
                  <div className="flex justify-between items-center text-[12px] font-headline-sm uppercase mt-2">
                    <span className="text-on-surface">Anti-Proxy Integrity Verified</span>
                    <span className="text-tertiary">100% Tamper Free</span>
                  </div>
                  <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                    <div className="bg-tertiary h-full rounded-full w-[100%]"></div>
                  </div>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface uppercase mb-space-xs">
                  Institutional TPO Analytics
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-space-md">
                  Empowering Heads of T&amp;P cells with department-level talent readiness dashboards, cohort percentile curves, tamper-proof skill seals, and direct recruiter export formats.
                </p>
              </div>
              <div className="flex items-center gap-space-sm pt-space-sm border-t border-surface-container">
                <span className="font-label-caps text-label-caps text-on-surface uppercase">Features:</span>
                <span className="font-body-sm text-body-sm text-primary">NIRF Audit Trail</span>
                <span className="text-on-surface-variant">•</span>
                <span className="font-body-sm text-body-sm text-primary">Batch Filters</span>
                <span className="text-on-surface-variant">•</span>
                <span className="font-body-sm text-body-sm text-primary">CSV/ERP Sync</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: TARGET RECRUITERS PREP TRACKS */}
      <section className="w-full py-space-xl px-gutter bg-[#0a0e17] border-t border-b border-surface-container" id="tracks">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-space-xl">
            <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest block mb-space-xs">
              SPECIALIZED COMPANY SYLLABI
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface uppercase tracking-tight mb-space-xs">
              Calibrated Company Track Simulations
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Every campus drive carries its own behavioral ethos and technical depth. Switch interview rubrics with one click.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-space-md">
            {/* Google */}
            <div 
              onClick={() => handleTrackSelect('google')} 
              className="p-space-lg rounded-xl bg-surface-container-low hover:bg-surface-container transition-all flex flex-col justify-between shadow-md border border-surface-container cursor-pointer group hover:border-primary/50"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center mb-space-md text-primary font-headline-md font-bold group-hover:scale-110 transition-transform">
                  G
                </div>
                <span className="font-label-caps text-label-caps text-tertiary block mb-1">LEVEL: L3 SWE / SDE-1</span>
                <h4 className="font-headline-sm text-headline-sm text-on-surface uppercase mb-space-xs">Google Campus</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
                  Heavy Graph theory, Dijkstra variations, Segment Trees, and rigorous "Googliness" collaborative problem solving.
                </p>
              </div>
              <div>
                <div className="pt-space-sm border-t border-surface-container flex justify-between items-center mb-2">
                  <span className="font-label-caps text-label-caps text-on-surface-variant">45 MOCKS AVAIL</span>
                  <span className="font-label-caps text-label-caps text-primary uppercase">Hard DSA</span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-primary group-hover:text-primary-bright">
                  <span>Strategy Tips ↓</span>
                  <span className="material-symbols-outlined text-sm">arrow_downward</span>
                </div>
              </div>
            </div>

            {/* Amazon */}
            <div 
              onClick={() => handleTrackSelect('amazon')} 
              className="p-space-lg rounded-xl bg-surface-container-low hover:bg-surface-container transition-all flex flex-col justify-between shadow-md border border-surface-container cursor-pointer group hover:border-tertiary/50"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center mb-space-md text-tertiary font-headline-md font-bold group-hover:scale-110 transition-transform">
                  A
                </div>
                <span className="font-label-caps text-label-caps text-tertiary block mb-1">BAR RAISER CALIBRATED</span>
                <h4 className="font-headline-sm text-headline-sm text-on-surface uppercase mb-space-xs">Amazon SDE-1</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
                  16 Leadership Principles evaluation paired with BFS/DFS matrices, Topo Sort, and LRU Cache implementations.
                </p>
              </div>
              <div>
                <div className="pt-space-sm border-t border-surface-container flex justify-between items-center mb-2">
                  <span className="font-label-caps text-label-caps text-on-surface-variant">52 MOCKS AVAIL</span>
                  <span className="font-label-caps text-label-caps text-tertiary uppercase">LP + Code</span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-tertiary group-hover:brightness-125">
                  <span>Strategy Tips ↓</span>
                  <span className="material-symbols-outlined text-sm">arrow_downward</span>
                </div>
              </div>
            </div>

            {/* Microsoft */}
            <div 
              onClick={() => handleTrackSelect('microsoft')} 
              className="p-space-lg rounded-xl bg-surface-container-low hover:bg-surface-container transition-all flex flex-col justify-between shadow-md border border-surface-container cursor-pointer group hover:border-secondary/50"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center mb-space-md text-secondary font-headline-md font-bold group-hover:scale-110 transition-transform">
                  M
                </div>
                <span className="font-label-caps text-label-caps text-tertiary block mb-1">CAMPUS DIRECT DRIVE</span>
                <h4 className="font-headline-sm text-headline-sm text-on-surface uppercase mb-space-xs">Microsoft Core</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
                  Doubly-Linked Lists, Tries, OS multithreading, concurrency locks, and Low-Level Object Oriented Parking Lot designs.
                </p>
              </div>
              <div>
                <div className="pt-space-sm border-t border-surface-container flex justify-between items-center mb-2">
                  <span className="font-label-caps text-label-caps text-on-surface-variant">38 MOCKS AVAIL</span>
                  <span className="font-label-caps text-label-caps text-secondary uppercase">OS + LLD</span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-secondary group-hover:brightness-125">
                  <span>Strategy Tips ↓</span>
                  <span className="material-symbols-outlined text-sm">arrow_downward</span>
                </div>
              </div>
            </div>

            {/* Fintech */}
            <div 
              onClick={() => handleTrackSelect('fintech')} 
              className="p-space-lg rounded-xl bg-surface-container-low hover:bg-surface-container transition-all flex flex-col justify-between shadow-md border border-surface-container cursor-pointer group hover:border-primary/50"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center mb-space-md text-primary font-headline-md font-bold group-hover:scale-110 transition-transform">
                  ₹
                </div>
                <span className="font-label-caps text-label-caps text-tertiary block mb-1">HIGH CTC TECH UNICORNS</span>
                <h4 className="font-headline-sm text-headline-sm text-on-surface uppercase mb-space-xs">Fintech / Scale</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
                  Idempotency keys, transactional ACID isolation levels, Redis distributed locks, and real-time ledger consistency.
                </p>
              </div>
              <div>
                <div className="pt-space-sm border-t border-surface-container flex justify-between items-center mb-2">
                  <span className="font-label-caps text-label-caps text-on-surface-variant">30 MOCKS AVAIL</span>
                  <span className="font-label-caps text-label-caps text-primary uppercase">Concurrency</span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-primary group-hover:text-primary-bright">
                  <span>Strategy Tips ↓</span>
                  <span className="material-symbols-outlined text-sm">arrow_downward</span>
                </div>
              </div>
            </div>

            {/* Atlassian */}
            <div 
              onClick={() => handleTrackSelect('atlassian')} 
              className="p-space-lg rounded-xl bg-surface-container-low hover:bg-surface-container transition-all flex flex-col justify-between shadow-md border border-surface-container cursor-pointer group hover:border-tertiary/50"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center mb-space-md text-tertiary font-headline-md font-bold group-hover:scale-110 transition-transform">
                  ▲
                </div>
                <span className="font-label-caps text-label-caps text-tertiary block mb-1">TIER-1 HIGH PAY (P20)</span>
                <h4 className="font-headline-sm text-headline-sm text-on-surface uppercase mb-space-xs">Atlassian P20</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
                  Complex rate limiters, file chunking, design patterns, clean code principles, and collaborative pair coding.
                </p>
              </div>
              <div>
                <div className="pt-space-sm border-t border-surface-container flex justify-between items-center mb-2">
                  <span className="font-label-caps text-label-caps text-on-surface-variant">25 MOCKS AVAIL</span>
                  <span className="font-label-caps text-label-caps text-tertiary uppercase">Clean Code</span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-tertiary group-hover:brightness-125">
                  <span>Strategy Tips ↓</span>
                  <span className="material-symbols-outlined text-sm">arrow_downward</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2.5: DYNAMIC QUICK TIPS & STRATEGIES BY CAREER TRACK */}
      <section className="w-full py-space-xl px-gutter bg-[#070b13] border-b border-surface-container scroll-mt-20" id="quick-tips">
        <div className="max-w-7xl mx-auto">
          <QuickTips
            initialTrack={selectedStrategyTrack}
            onNavigate={onNavigate}
            onTrackChange={(t) => setSelectedStrategyTrack(t)}
          />
        </div>
      </section>

      {/* SECTION 3: REAL STUDENT SUCCESS STORIES */}
      <section className="w-full py-space-xl px-gutter bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl">
            <div>
              <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest block mb-space-xs">
                CAMPUS PLACEMENT PROOF
              </span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface uppercase tracking-tight">
                Real Engineered Breakthroughs
              </h2>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-sm mt-space-sm md:mt-0">
              From panic before on-campus Day 1 to multiple 24+ LPA product offers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
            {/* Story 1 */}
            <div className="rounded-xl bg-surface-container-low p-space-lg shadow-xl flex flex-col justify-between border border-surface-container">
              <div>
                <div className="flex items-center gap-space-md mb-space-md">
                  <img
                    alt="Arnav Deshmukh"
                    className="w-12 h-12 rounded-full object-cover shadow-md ring-1 ring-primary/40"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKtz5AkoJFYT6PAmJMlq5f7EASugxRV_YZygtby1KQkGQS5WagSY4EZTjOUzzlmtwCaOYEeLkA2jubRNuH9ph-OfFZWkoY7GJ_3KEm4163_5y-ap_WdE0U0IvzlFCGxBaXTUUXlZ6wjrvZGCyK8GdI-IcAHgnl1F004MPtzzjx2zOttELeOTUmBqdfJoPtBc_Xk6zmXFe7MN2MeleDoFRg7aElXoLkM0iP1WQ0ECqroPaBaWdlJRi9"
                  />
                  <div>
                    <h4 className="font-headline-sm text-headline-sm text-on-surface">Arnav Deshmukh</h4>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">IIT Bombay • B.Tech CSE '24</span>
                  </div>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant italic mb-space-md leading-relaxed">
                  “The AI Bar-Raiser caught my verbal filler habits within 3 minutes and drilled me on DP memoization bounds that exactly appeared in my Amazon on-campus round.”
                </p>
              </div>
              <div className="p-space-sm rounded-lg bg-[#0a0e17] flex items-center justify-between border border-surface-container">
                <div>
                  <span className="font-label-caps text-label-caps text-on-surface-variant block">PLACEMENT OUTCOME</span>
                  <span className="font-headline-sm text-headline-sm text-tertiary">Amazon SDE-1</span>
                </div>
                <div className="text-right">
                  <span className="font-label-caps text-label-caps text-on-surface-variant block">OFFER JUMP</span>
                  <span className="font-telemetry-metric text-telemetry-metric text-primary">11 → 32 LPA</span>
                </div>
              </div>
            </div>

            {/* Story 2 */}
            <div className="rounded-xl bg-surface-container-low p-space-lg shadow-xl flex flex-col justify-between border border-surface-container">
              <div>
                <div className="flex items-center gap-space-md mb-space-md">
                  <img
                    alt="Sneha Varma"
                    className="w-12 h-12 rounded-full object-cover shadow-md ring-1 ring-primary/40"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1xNDQDxOiIHLSmvoMVBOLiSzHC68TnvNGhMq2BAN_MfVowgNUaYkrUOhmSOjm8niGPQoXqwtFCE-BOTkb3wXGw0nomUO7SQIJ93Ib7MP-LdIvTK49iReywHbwtHPDO7ncd042yaB-nmCpNbqJ7VUKiITxG4-q0x3X1tToyakNhw9Gay8jyDM_PLXlUfle7H4lHnzA0OON2X1wnn6sUyS9YfC7xloMl4HqlnKlJTmYVgjRhJKewu2O"
                  />
                  <div>
                    <h4 className="font-headline-sm text-headline-sm text-on-surface">Sneha Varma</h4>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">BITS Pilani • CS &amp; MSc '24</span>
                  </div>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant italic mb-space-md leading-relaxed">
                  “The low-latency speech feedback simulated the stressful back-and-forth of senior hiring managers. My STAR behavioral framework clarity went from 60% to 94%.”
                </p>
              </div>
              <div className="p-space-sm rounded-lg bg-[#0a0e17] flex items-center justify-between border border-surface-container">
                <div>
                  <span className="font-label-caps text-label-caps text-on-surface-variant block">PLACEMENT OUTCOME</span>
                  <span className="font-headline-sm text-headline-sm text-tertiary">Google Bangalore</span>
                </div>
                <div className="text-right">
                  <span className="font-label-caps text-label-caps text-on-surface-variant block">OFFER JUMP</span>
                  <span className="font-telemetry-metric text-telemetry-metric text-primary">14 → 38 LPA</span>
                </div>
              </div>
            </div>

            {/* Story 3 */}
            <div className="rounded-xl bg-surface-container-low p-space-lg shadow-xl flex flex-col justify-between border border-surface-container">
              <div>
                <div className="flex items-center gap-space-md mb-space-md">
                  <img
                    alt="Karthik R."
                    className="w-12 h-12 rounded-full object-cover shadow-md ring-1 ring-primary/40"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0Yu7cluRrjF8gMtdQ2FJsKGg_N_A4tyzykc_eYOCSqvXgrgRr7UQK3gRcxbUIhAwvXG8M7pYDCjUtMwebBoFKWiCUhfnk4MhhFjtBHYsk1XiIii_q0JnXxmkonKJ214C2ahmPM6hc0J8FRM6m1AlLapuWic14Q_GVkhFYmD7LRpsuC18PF9zXr0b_a7RIJord0bXSjvSvdiseY_DbZZI7hRsstTO0GvEwZcgIPPWl6MMptPsQNRTm"
                  />
                  <div>
                    <h4 className="font-headline-sm text-headline-sm text-on-surface">Karthik R.</h4>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">NIT Trichy • ECE '25</span>
                  </div>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant italic mb-space-md leading-relaxed">
                  “Coming from Non-CS background, system design was terrifying. MockPulse's sharding and Kafka sandbox gave me the exact architecture vocabulary to crack direct rounds.”
                </p>
              </div>
              <div className="p-space-sm rounded-lg bg-[#0a0e17] flex items-center justify-between border border-surface-container">
                <div>
                  <span className="font-label-caps text-label-caps text-on-surface-variant block">PLACEMENT OUTCOME</span>
                  <span className="font-headline-sm text-headline-sm text-tertiary">Microsoft IDC</span>
                </div>
                <div className="text-right">
                  <span className="font-label-caps text-label-caps text-on-surface-variant block">OFFER JUMP</span>
                  <span className="font-telemetry-metric text-telemetry-metric text-primary">7.5 → 28.5 LPA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: INSTITUTIONAL TPO PARTNERSHIP */}
      <section className="w-full py-space-xl px-gutter bg-[#0a0e17] border-t border-surface-container">
        <div className="max-w-7xl mx-auto rounded-2xl bg-gradient-to-r from-surface-container via-surface-container-high to-surface-container p-space-lg md:p-space-xl shadow-2xl relative overflow-hidden border border-surface-container-high">
          <div className="absolute -right-16 -bottom-16 w-96 h-96 rounded-full bg-primary/10 blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl relative z-10 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-space-xs px-space-md py-1 rounded bg-secondary-container text-on-secondary-container font-label-caps text-label-caps uppercase tracking-wider mb-space-md">
                <span className="material-symbols-outlined text-[16px]">domain</span>
                Institutional TPO Partnership Plan
              </div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface uppercase tracking-tight mb-space-md">
                Equip Your Entire B.Tech Cohort With Standardized AI Interview Labs
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed mb-space-lg">
                Bulk campus licenses, dedicated NIRF audit reports, custom company syllabi tailored to visiting recruiters, and automated candidate shortlisting matrix for Training &amp; Placement Cells.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-space-md mb-space-lg">
                <div className="p-space-sm rounded bg-[#0a0e17] border border-surface-container">
                  <span className="font-telemetry-metric text-telemetry-metric text-tertiary block">500 to 5,000</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Student Seat Buckets</span>
                </div>
                <div className="p-space-sm rounded bg-[#0a0e17] border border-surface-container">
                  <span className="font-telemetry-metric text-telemetry-metric text-primary block">Zero Audio Storage</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Strict AICTE / Privacy Compliant</span>
                </div>
                <div className="p-space-sm rounded bg-[#0a0e17] border border-surface-container col-span-2 sm:col-span-1">
                  <span className="font-telemetry-metric text-telemetry-metric text-tertiary block">24hr Turnaround</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Fast On-Campus Pilot</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#0a0e17]/90 backdrop-blur-xl p-space-lg rounded-xl shadow-xl border border-surface-container">
              <h3 className="font-headline-sm text-headline-sm text-on-surface uppercase mb-1">
                Request TPO Institutional Pilot
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
                Schedule a live demo session with our campus engineering leads.
              </p>

              <form onSubmit={handleTpoSubmit} className="flex flex-col gap-space-sm">
                <div>
                  <label className="font-label-caps text-label-caps text-on-surface-variant uppercase block mb-1">
                    College / University Name
                  </label>
                  <input
                    className="w-full px-space-md py-2.5 rounded-lg bg-surface text-on-surface font-body-md text-body-md focus:outline-none focus:border-primary border border-surface-container"
                    placeholder="e.g. RV College of Engineering"
                    required
                    type="text"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                  <div>
                    <label className="font-label-caps text-label-caps text-on-surface-variant uppercase block mb-1">
                      Official T&amp;P Email
                    </label>
                    <input
                      className="w-full px-space-md py-2.5 rounded-lg bg-surface text-on-surface font-body-md text-body-md focus:outline-none focus:border-primary border border-surface-container"
                      placeholder="tpo@institute.ac.in"
                      required
                      type="email"
                    />
                  </div>
                  <div>
                    <label className="font-label-caps text-label-caps text-on-surface-variant uppercase block mb-1">
                      Graduating Batch Size
                    </label>
                    <select className="w-full px-space-md py-2.5 rounded-lg bg-surface text-on-surface font-body-md text-body-md focus:outline-none focus:border-primary border border-surface-container cursor-pointer">
                      <option>300 - 800 Students</option>
                      <option>800 - 2,000 Students</option>
                      <option>2,000+ Students (Multi-Campus)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-label-caps text-label-caps text-on-surface-variant uppercase block mb-1">
                    Primary Visiting Recruiters
                  </label>
                  <input
                    className="w-full px-space-md py-2.5 rounded-lg bg-surface text-on-surface font-body-md text-body-md focus:outline-none focus:border-primary border border-surface-container"
                    placeholder="e.g. Cisco, Wells Fargo, Oracle, TCS Digital"
                    type="text"
                  />
                </div>

                <button
                  disabled={tpoSubmitted}
                  className="mt-space-xs w-full py-3 rounded-lg bg-primary text-on-primary font-headline-sm text-body-md uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-md shadow-primary/20 cursor-pointer disabled:opacity-60"
                  type="submit"
                >
                  {tpoSubmitted ? 'Submitting Request...' : 'Book Institutional Walkthrough'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 45s DEMO MODAL */}
      {showDemoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-gutter bg-[#0a0e17]/80 backdrop-blur-md">
          <div className="w-full max-w-3xl rounded-xl bg-surface-container p-space-lg shadow-2xl relative border border-surface-container-high">
            <div className="flex items-center justify-between pb-space-sm mb-space-md border-b border-surface-variant">
              <div className="flex items-center gap-space-sm">
                <span className="w-3 h-3 rounded-full bg-error"></span>
                <span className="font-headline-sm text-headline-sm text-on-surface uppercase">
                  Live Simulator Snapshot • SDE-1 Bar Raiser
                </span>
              </div>
              <button
                className="p-1 rounded hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface cursor-pointer"
                onClick={() => setShowDemoModal(false)}
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="aspect-video w-full rounded-lg overflow-hidden bg-[#0a0e17] relative flex items-center justify-center border border-surface-container">
              <img
                alt="Demo Simulation"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCsuveBUArKPNu7VE8M4YzN3UT5B5F7-Iag62BcP1VNDpmoMvhuw3ABaTsQvQmxKV7-ADZK0u7EXVtn-0Ei6STKlffwLS-xxbXkxceBUDAwY_GauU8uEqy4DFp1spZZ7f34VphXN9AtNrVbIZJCK_nK43xGS9rpdz0BwdjVcbtttAsfjSYeRhyBernzcNvSfZ7T7GT_ASNsFXr_XoNRUZzQ96q2OMgBLo-HXSKD-TWyfYwFTbLZ8ht"
              />
              <div className="absolute inset-0 bg-[#0a0e17]/40 backdrop-blur-xs flex flex-col items-center justify-center text-center p-space-md">
                <span className="material-symbols-outlined text-[48px] text-tertiary mb-space-sm animate-pulse">
                  smart_toy
                </span>
                <span className="font-headline-sm text-headline-sm text-on-surface uppercase max-w-xl">
                  Interviewer AI: "Explain how you will handle LRU eviction when memory exceeds 4GB"
                </span>
                <span className="font-body-sm text-body-sm text-primary mt-2">
                  Speech Synthesizer Active • Latency: 16ms
                </span>
              </div>
            </div>

            <div className="mt-space-md flex flex-col sm:flex-row justify-between items-center gap-2">
              <span className="font-label-caps text-label-caps text-on-surface-variant uppercase text-center sm:text-left">
                Full interactive simulator available with no signup required
              </span>
              <button
                className="px-space-md py-2 rounded-lg bg-primary text-on-primary font-headline-sm text-body-sm uppercase hover:brightness-110 active:scale-95 transition-all cursor-pointer shadow-md"
                onClick={() => {
                  setShowDemoModal(false);
                  onNavigate('coding-ide');
                }}
              >
                Start Live Interactive Mock
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
