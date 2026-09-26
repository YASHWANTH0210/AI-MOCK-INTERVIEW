import React, { useState } from 'react';
import { DailyStreakCounter } from '../components/DailyStreakCounter';
import { SearchGroundingIntel } from '../components/SearchGroundingIntel';

interface DashboardViewProps {
  onNavigate: (tab: any) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onNavigate }) => {
  const [selectedMockTrack, setSelectedMockTrack] = useState<'dsa' | 'core' | 'sysdesign' | 'hr'>('dsa');
  const [isStartingMock, setIsStartingMock] = useState(false);
  const [drillModal, setDrillModal] = useState<string | null>(null);

  const handleStartMock = () => {
    setIsStartingMock(true);
    setTimeout(() => {
      setIsStartingMock(false);
      onNavigate('live-ai-mock');
    }, 800);
  };

  return (
    <div className="w-full px-3 sm:px-gutter py-4 sm:py-space-lg mx-auto max-w-[1720px] space-y-5 sm:space-y-space-xl">
      {/* Top Greeting & Placement Status Bar */}
      <div className="relative overflow-hidden rounded-xl bg-surface-container-low p-4 sm:p-space-lg shadow-xl border border-surface-container">
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl pointer-events-none"></div>
        <div className="absolute right-1/3 -bottom-20 w-80 h-80 rounded-full bg-secondary/10 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
          <div className="space-y-space-xs">
            <div className="inline-flex items-center gap-space-xs px-space-sm py-1 rounded-full bg-surface-container-high text-secondary border border-secondary/20">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              <span className="font-label-caps text-label-caps uppercase tracking-wider">
                Placement Season Active • Tier-1 Drive Priority
              </span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight flex items-center gap-space-sm flex-wrap">
              <span>Welcome back, Rohan!</span>
              <span className="text-secondary select-none">🚀</span>
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant flex items-center gap-space-xs flex-wrap">
              <span className="text-primary font-headline-sm text-body-md font-semibold">Target: Amazon &amp; Google SDE-1</span>
              <span className="text-outline">•</span>
              <span className="text-tertiary">Placement Season starts in 28 Days</span>
              <span className="text-outline">•</span>
              <span>Batch: IIT / CSE '25</span>
            </p>
          </div>

          <div className="flex items-center gap-space-sm flex-wrap">
            <a
              href="#streak-section"
              className="px-space-md py-space-xs rounded-lg bg-surface-container hover:bg-surface-container-high transition-colors flex items-center gap-space-sm border border-surface-container-high cursor-pointer"
            >
              <span className="material-symbols-outlined text-tertiary text-[20px]">local_fire_department</span>
              <div className="flex flex-col">
                <span className="font-label-caps text-[10px] text-on-surface-variant uppercase">Daily Streak</span>
                <span className="font-telemetry-metric text-body-sm text-tertiary font-bold">19 DAYS FIRE 🔥</span>
              </div>
            </a>

            <div className="px-space-md py-space-xs rounded-lg bg-surface-container flex items-center gap-space-sm border border-surface-container-high">
              <span className="w-2.5 h-2.5 rounded-full bg-tertiary animate-pulse"></span>
              <div className="flex flex-col">
                <span className="font-label-caps text-[10px] text-on-surface-variant uppercase">Drive Telemetry</span>
                <span className="font-telemetry-metric text-body-sm text-tertiary">CALIBRATION OPTIMAL</span>
              </div>
            </div>
            <button
              onClick={() => onNavigate('onboarding')}
              className="px-space-md py-space-sm rounded-lg bg-primary text-on-primary font-headline-sm text-body-sm shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center gap-space-xs cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">play_circle</span>
              <span>Resume Diagnostic</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Key Telemetry Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-space-md">
        {/* Card 1: Placement Readiness Index */}
        <div className="relative rounded-xl bg-surface-container-low p-space-md flex flex-col justify-between shadow-lg overflow-hidden border border-surface-container hover:border-primary/40 transition-all">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Readiness Index</span>
              <div className="flex items-baseline gap-space-xs">
                <span className="font-display text-display text-on-surface leading-none">84</span>
                <span className="font-telemetry-metric text-headline-sm text-outline-variant">/100</span>
              </div>
            </div>
            {/* Gauge Radial SVG */}
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 36 36">
                <path
                  className="text-surface-container-highest stroke-current"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  strokeWidth="3.5"
                />
                <path
                  className="text-tertiary stroke-current"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  strokeDasharray="84, 100"
                  strokeLinecap="round"
                  strokeWidth="3.5"
                />
              </svg>
              <span className="material-symbols-outlined absolute text-[20px] text-tertiary">bolt</span>
            </div>
          </div>
          <div className="mt-space-md pt-space-xs flex items-center justify-between font-body-sm text-body-sm">
            <div className="flex items-center gap-1 text-tertiary">
              <span className="material-symbols-outlined text-[16px]">trending_up</span>
              <span className="font-telemetry-metric text-body-sm">+12 pts this month</span>
            </div>
            <span className="text-on-surface-variant font-label-caps text-[11px]">Top 6% / 14.2k peers</span>
          </div>
        </div>

        {/* Card 2: Mocks Completed */}
        <div className="relative rounded-xl bg-surface-container-low p-space-md flex flex-col justify-between shadow-lg overflow-hidden border border-surface-container hover:border-secondary/40 transition-all">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Mocks Completed</span>
              <div className="flex items-baseline gap-space-xs">
                <span className="font-display text-display text-secondary leading-none">24</span>
                <span className="font-body-md text-on-surface-variant">Sessions</span>
              </div>
            </div>
            <div className="p-2.5 rounded-lg bg-surface-container text-secondary">
              <span className="material-symbols-outlined text-[24px]">terminal</span>
            </div>
          </div>
          <div className="mt-space-md space-y-2">
            <div className="flex justify-between font-label-caps text-[10px] text-on-surface-variant">
              <span>16 DSA &amp; SYSTEM</span>
              <span>8 HR &amp; CS CORE</span>
            </div>
            <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden flex">
              <div className="h-full bg-primary" style={{ width: '66.6%' }}></div>
              <div className="h-full bg-secondary" style={{ width: '33.4%' }}></div>
            </div>
          </div>
        </div>

        {/* Card 3: Average Score */}
        <div className="relative rounded-xl bg-surface-container-low p-space-md flex flex-col justify-between shadow-lg overflow-hidden border border-surface-container hover:border-primary/40 transition-all">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Cumulative Average</span>
              <div className="flex items-baseline gap-space-xs">
                <span className="font-display text-display text-primary leading-none">88.5</span>
                <span className="font-telemetry-metric text-headline-sm text-outline-variant">%</span>
              </div>
            </div>
            <div className="p-2.5 rounded-lg bg-surface-container text-primary">
              <span className="material-symbols-outlined text-[24px]">analytics</span>
            </div>
          </div>
          <div className="mt-space-md grid grid-cols-2 gap-space-xs pt-space-xs">
            <div className="p-1.5 rounded bg-surface-container text-center">
              <div className="font-label-caps text-[10px] text-on-surface-variant">TECHNICAL</div>
              <div className="font-telemetry-metric text-body-md text-tertiary font-bold">92.0%</div>
            </div>
            <div className="p-1.5 rounded bg-surface-container text-center">
              <div className="font-label-caps text-[10px] text-on-surface-variant">COMM &amp; STAR</div>
              <div className="font-telemetry-metric text-body-md text-secondary font-bold">85.0%</div>
            </div>
          </div>
        </div>

        {/* Card 4: Dynamic Daily Streak */}
        <DailyStreakCounter
          onNavigate={onNavigate}
          compact={true}
          onOpenFullModal={() => {
            const el = document.getElementById('streak-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      </div>

      {/* FULL INTERACTIVE DAILY STREAK & CONSISTENCY REWARDS HUB */}
      <div id="streak-section" className="scroll-mt-6">
        <DailyStreakCounter onNavigate={onNavigate} />
      </div>

      {/* Main Content Workspace (Split Columns) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-lg">
        {/* LEFT / CENTER COLUMN (8 cols) */}
        <div className="xl:col-span-8 space-y-space-xl">
          {/* Quick Launch Next AI Mock Module */}
          <section className="rounded-xl bg-surface-container-low p-space-lg shadow-lg relative overflow-hidden border border-surface-container">
            <div className="flex items-center justify-between mb-space-md">
              <div className="flex items-center gap-space-sm">
                <span className="p-2 rounded-lg bg-primary-container text-on-primary-container">
                  <span className="material-symbols-outlined text-[20px]">psychology</span>
                </span>
                <div>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface">Quick Launch Next AI Mock</h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Calibrated against SDE-1 campus rubrics for Amazon, Google &amp; Microsoft
                  </p>
                </div>
              </div>
              <span className="hidden sm:inline-flex font-label-caps text-[11px] px-space-sm py-1 rounded bg-surface-container text-secondary border border-secondary/20">
                REAL-TIME AUDIO • DSA COMPILER
              </span>
            </div>

            {/* Round Selection Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-sm mb-space-lg">
              {/* Option 1: DSA */}
              <div
                onClick={() => setSelectedMockTrack('dsa')}
                className={`cursor-pointer p-space-md rounded-lg transition-all border ${
                  selectedMockTrack === 'dsa'
                    ? 'bg-surface-container-high border-primary/60 shadow-md'
                    : 'bg-surface-container border-surface-container-high hover:bg-surface-container-high'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-headline-sm text-body-md text-on-surface font-semibold">
                      DSA &amp; Algorithms
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-error-container text-on-error-container font-label-caps text-[10px]">
                      HARD / MED
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Trees, DP State Spaces, Graph Traversals, and Concurrency.
                  </p>
                  <div className="font-telemetry-metric text-[11px] text-secondary pt-1">
                    Recommended next: DP 2D Grids
                  </div>
                </div>
              </div>

              {/* Option 2: Core CS */}
              <div
                onClick={() => setSelectedMockTrack('core')}
                className={`cursor-pointer p-space-md rounded-lg transition-all border ${
                  selectedMockTrack === 'core'
                    ? 'bg-surface-container-high border-primary/60 shadow-md'
                    : 'bg-surface-container border-surface-container-high hover:bg-surface-container-high'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-headline-sm text-body-md text-on-surface font-semibold">
                      Core CS Fundamentals
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-label-caps text-[10px]">
                      THEORY • OS/DBMS
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Virtual Memory, Inode Systems, ACID Transactions, TCP 3-Way Handshake.
                  </p>
                  <div className="font-telemetry-metric text-[11px] text-tertiary pt-1">
                    Pass rate: 91%
                  </div>
                </div>
              </div>

              {/* Option 3: System Design */}
              <div
                onClick={() => setSelectedMockTrack('sysdesign')}
                className={`cursor-pointer p-space-md rounded-lg transition-all border ${
                  selectedMockTrack === 'sysdesign'
                    ? 'bg-surface-container-high border-primary/60 shadow-md'
                    : 'bg-surface-container border-surface-container-high hover:bg-surface-container-high'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-headline-sm text-body-md text-on-surface font-semibold">
                      System Design &amp; Architecture
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-label-caps text-[10px]">
                      HLD / LLD
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Scalable URL Shortener, Notification Microservices, Cache Coherence.
                  </p>
                  <div className="font-telemetry-metric text-[11px] text-primary pt-1">
                    Simulates 45-min whiteboard
                  </div>
                </div>
              </div>

              {/* Option 4: HR & STAR */}
              <div
                onClick={() => setSelectedMockTrack('hr')}
                className={`cursor-pointer p-space-md rounded-lg transition-all border ${
                  selectedMockTrack === 'hr'
                    ? 'bg-surface-container-high border-primary/60 shadow-md'
                    : 'bg-surface-container border-surface-container-high hover:bg-surface-container-high'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-headline-sm text-body-md text-on-surface font-semibold">
                      HR &amp; Leadership Principles
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-label-caps text-[10px]">
                      AMAZON 16 LPs
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Customer Obsession, Disagree &amp; Commit, Bias for Action with STAR.
                  </p>
                  <div className="font-telemetry-metric text-[11px] text-secondary pt-1">
                    Audio sentiment + WPM analyzer
                  </div>
                </div>
              </div>
            </div>

            {/* Launcher Action Bar */}
            <div className="p-space-md rounded-lg bg-surface-container flex flex-col sm:flex-row items-center justify-between gap-space-md border border-surface-container-high">
              <div className="flex items-center gap-space-md w-full sm:w-auto">
                <div className="flex items-center gap-space-xs text-on-surface-variant font-body-sm text-body-sm">
                  <span className="material-symbols-outlined text-[18px] text-tertiary">tune</span>
                  <span>Proctoring: Active</span>
                </div>
                <div className="flex items-center gap-space-xs text-on-surface-variant font-body-sm text-body-sm">
                  <span className="material-symbols-outlined text-[18px] text-secondary">mic</span>
                  <span>Latency: 22ms</span>
                </div>
              </div>

              <button
                onClick={handleStartMock}
                disabled={isStartingMock}
                className="w-full sm:w-auto px-space-lg py-space-sm rounded-lg bg-primary text-on-primary font-headline-sm text-body-md flex items-center justify-center gap-space-xs hover:brightness-110 active:scale-95 shadow-[0_0_20px_rgba(99,102,241,0.35)] transition-all cursor-pointer disabled:opacity-70"
              >
                {isStartingMock ? (
                  <>
                    <span className="material-symbols-outlined text-[20px] animate-spin">refresh</span>
                    <span>Connecting to Pulse-Gen-4...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[20px]">bolt</span>
                    <span>Start Adaptive AI Mock ({selectedMockTrack.toUpperCase()})</span>
                  </>
                )}
              </button>
            </div>
          </section>

          {/* Upcoming Scheduled Mocks & Company Drive Sims */}
          <section className="space-y-space-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-[20px] text-primary">calendar_month</span>
                <h2 className="font-headline-sm text-headline-sm text-on-surface">Upcoming Scheduled Mocks &amp; Drive Sims</h2>
              </div>
              <button onClick={() => onNavigate('live-ai-mock')} className="font-label-caps text-label-caps text-secondary uppercase hover:underline cursor-pointer">
                Full Drive Schedule →
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
              {/* Card 1 */}
              <div className="p-space-md rounded-xl bg-surface-container-low shadow-md space-y-space-sm hover:bg-surface-container transition-all border border-surface-container">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-space-sm">
                    <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center text-secondary">
                      <span className="material-symbols-outlined text-[22px]">smart_toy</span>
                    </div>
                    <div>
                      <span className="px-1.5 py-0.5 rounded bg-surface-container text-secondary font-label-caps text-[10px] font-semibold">
                        AMAZON SDE-1
                      </span>
                      <h3 className="font-headline-sm text-body-lg text-on-surface font-semibold mt-0.5">
                        Bar Raiser &amp; Low-Latency Sim
                      </h3>
                    </div>
                  </div>
                  <span className="px-space-xs py-0.5 rounded bg-tertiary-container text-on-tertiary font-label-caps text-[10px]">
                    CONFIRMED
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Focus: Hard Binary Tree Serialization, Cache Systems, and Customer Obsession deep-dive.
                </p>
                <div className="pt-space-xs flex items-center justify-between text-on-surface-variant font-label-caps text-[11px]">
                  <div className="flex items-center gap-1 text-on-surface">
                    <span className="material-symbols-outlined text-[16px] text-primary">schedule</span>
                    <span>Tomorrow • 6:00 PM IST (60 mins)</span>
                  </div>
                  <button
                    onClick={() => onNavigate('live-ai-mock')}
                    className="px-space-sm py-1 rounded bg-surface-container-high text-on-surface hover:text-primary transition-colors cursor-pointer"
                  >
                    Join Waiting Room
                  </button>
                </div>
              </div>

              {/* Card 2 */}
              <div className="p-space-md rounded-xl bg-surface-container-low shadow-md space-y-space-sm hover:bg-surface-container transition-all border border-surface-container">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-space-sm">
                    <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-[22px]">code_blocks</span>
                    </div>
                    <div>
                      <span className="px-1.5 py-0.5 rounded bg-surface-container text-primary font-label-caps text-[10px] font-semibold">
                        MICROSOFT CAMPUS
                      </span>
                      <h3 className="font-headline-sm text-body-lg text-on-surface font-semibold mt-0.5">
                        Online Assessment 3-Problem Sim
                      </h3>
                    </div>
                  </div>
                  <span className="px-space-xs py-0.5 rounded bg-surface-container-high text-on-surface font-label-caps text-[10px]">
                    TIME LOCKED
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Focus: 90-minute timed OA environment with Codility-like edge case proctoring.
                </p>
                <div className="pt-space-xs flex items-center justify-between text-on-surface-variant font-label-caps text-[11px]">
                  <div className="flex items-center gap-1 text-on-surface">
                    <span className="material-symbols-outlined text-[16px] text-secondary">schedule</span>
                    <span>Saturday • 10:00 AM IST (90 mins)</span>
                  </div>
                  <button
                    onClick={() => alert('Calendar event reminder synced!')}
                    className="px-space-sm py-1 rounded bg-surface-container-high text-on-surface hover:text-secondary transition-colors cursor-pointer"
                  >
                    Add to Cal
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Real-time Google Search Grounding Intelligence Hub */}
          <SearchGroundingIntel />

          {/* Recent Mock Interview Sessions Detailed Ledger */}
          <section className="rounded-xl bg-surface-container-low p-4 sm:p-space-lg shadow-lg space-y-space-md border border-surface-container">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-headline-sm text-headline-sm text-on-surface">Recent Mock Interview Sessions</h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Deep-dive transcripts, audio metrics, and code profiling history
                </p>
              </div>
              <button
                onClick={() => onNavigate('history')}
                className="font-label-caps text-label-caps text-primary uppercase hover:underline cursor-pointer"
              >
                View All 24 Sessions →
              </button>
            </div>

            <div className="space-y-space-sm">
              {/* Row 1 */}
              <div className="p-space-md rounded-lg bg-surface-container flex flex-col lg:flex-row lg:items-center justify-between gap-space-md hover:bg-surface-container-high transition-all border border-surface-container-high/60">
                <div className="flex items-center gap-space-md">
                  <img
                    alt="AI Interviewer"
                    className="w-12 h-12 rounded-lg object-cover bg-surface-container-highest shrink-0"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQ18nHRraXlyKMA7-_zB2JtCCAAdv9jkqB0ayqS8o3HMAvNyCdPcoVJM0T3siUm2GOJKe8u8nVEzoRtOso8LELZ1_YY0VBmD83DFBB1SadjGumbagHSBaWYXcr5yotKBD0og8dZ2HCYO-VCeU39hp-kJWQy2iVii21dH46Cx7pQV2C2Ww5NzstXmF-lk4MSbfoGiLBC-0r4j3PNapQO8NQGZ5r_ZGtm_EBN_XkAalD44LI2Gruin9z"
                  />
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-space-xs flex-wrap">
                      <span className="font-headline-sm text-body-lg text-on-surface font-semibold">
                        LRU Cache &amp; Concurrency
                      </span>
                      <span className="px-1.5 py-0.2 rounded bg-surface-container-highest text-secondary font-label-caps text-[10px]">
                        GOOGLE SWE TRACK
                      </span>
                      <span className="font-label-caps text-[10px] text-on-surface-variant">2 days ago</span>
                    </div>
                    <div className="flex items-center gap-space-sm font-body-sm text-body-sm text-on-surface-variant">
                      <span>AI Interviewer: <span className="text-on-surface">Pulse-Alpha L3</span></span>
                      <span>•</span>
                      <span>Runtime: <span className="font-telemetry-metric text-on-surface text-body-sm">42 mins</span></span>
                      <span>•</span>
                      <span>Language: <span className="font-telemetry-metric text-primary text-body-sm">C++20</span></span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between lg:justify-end gap-space-md shrink-0">
                  <div className="flex items-center gap-space-sm text-right">
                    <div>
                      <div className="font-telemetry-metric text-telemetry-metric text-tertiary font-bold">94%</div>
                      <div className="font-label-caps text-[10px] text-on-surface-variant uppercase">O(1) Pass All</div>
                    </div>
                    <div className="h-8 w-1 rounded-full bg-surface-container-highest overflow-hidden">
                      <div className="w-full bg-tertiary h-[94%]"></div>
                    </div>
                  </div>
                  <button
                    onClick={() => onNavigate('coding-ide')}
                    className="px-space-md py-space-xs rounded bg-surface-container-highest hover:bg-primary hover:text-on-primary text-on-surface font-headline-sm text-body-sm transition-all flex items-center gap-space-xs cursor-pointer"
                  >
                    <span>Review Code IDE</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
              </div>

              {/* Row 2 */}
              <div className="p-space-md rounded-lg bg-surface-container flex flex-col lg:flex-row lg:items-center justify-between gap-space-md hover:bg-surface-container-high transition-all border border-surface-container-high/60">
                <div className="flex items-center gap-space-md">
                  <img
                    alt="AI Interviewer"
                    className="w-12 h-12 rounded-lg object-cover bg-surface-container-highest shrink-0"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsrBJD0MQsu5fl0b3gZfiGNsV_7wxw3qit24E0V-hQCyEjJMfzib05FqAtVgGwNv5f70661qDAHnd3V0EwegHVgIXrW0EUT6XIVUU-PSsD-_welSGstLVdOS6I0WjeprlZOzqDMRFk1nJ9coVuU-6d3RBlsiItOq68K1Agg8X0Yc1GU52QYV4ae2JEwT5RkzN9cE7WddXOVJPYxqLovfu_-N4RkOYaH36mA83qjg3OrOw6vpABenfw"
                  />
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-space-xs flex-wrap">
                      <span className="font-headline-sm text-body-lg text-on-surface font-semibold">
                        Distributed Rate Limiter (Token Bucket)
                      </span>
                      <span className="px-1.5 py-0.2 rounded bg-surface-container-highest text-primary font-label-caps text-[10px]">
                        AMAZON SDE-1 HLD
                      </span>
                      <span className="font-label-caps text-[10px] text-on-surface-variant">4 days ago</span>
                    </div>
                    <div className="flex items-center gap-space-sm font-body-sm text-body-sm text-on-surface-variant">
                      <span>AI Interviewer: <span className="text-on-surface">Pulse-Architect</span></span>
                      <span>•</span>
                      <span>Runtime: <span className="font-telemetry-metric text-on-surface text-body-sm">48 mins</span></span>
                      <span>•</span>
                      <span>Redis/Lua script</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between lg:justify-end gap-space-md shrink-0">
                  <div className="flex items-center gap-space-sm text-right">
                    <div>
                      <div className="font-telemetry-metric text-telemetry-metric text-secondary font-bold">81%</div>
                      <div className="font-label-caps text-[10px] text-on-surface-variant uppercase">Race Cond Warning</div>
                    </div>
                    <div className="h-8 w-1 rounded-full bg-surface-container-highest overflow-hidden">
                      <div className="w-full bg-secondary h-[81%]"></div>
                    </div>
                  </div>
                  <button
                    onClick={() => onNavigate('history')}
                    className="px-space-md py-space-xs rounded bg-surface-container-highest hover:bg-primary hover:text-on-primary text-on-surface font-headline-sm text-body-sm transition-all flex items-center gap-space-xs cursor-pointer"
                  >
                    <span>Review Transcript</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
              </div>

              {/* Row 3 */}
              <div className="p-space-md rounded-lg bg-surface-container flex flex-col lg:flex-row lg:items-center justify-between gap-space-md hover:bg-surface-container-high transition-all border border-surface-container-high/60">
                <div className="flex items-center gap-space-md">
                  <img
                    alt="AI Interviewer"
                    className="w-12 h-12 rounded-lg object-cover bg-surface-container-highest shrink-0"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEJXVHkBe4fdpTqj-xAHPAcqtPkj1_KIGKmgn_135heDEtG1fE7NeY7cBkUON4qSoASq9Iogx80a1-5vdfcuLjqCpPG-5JdCU7fXpepIx_EJ4WRY2u_s0NuGhLiCebz1soQ8vy7BzG4IiwycEezGfZ2S_R7cLQdMJgWtrUnVHBYSpIWfZFNzMJrHrig3Y4_VP4h-n5NSuzTqQWTlx4XDT9QFnX1DQaWoU4Hpp4_ZYdifolRdsWSCD6"
                  />
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-space-xs flex-wrap">
                      <span className="font-headline-sm text-body-lg text-on-surface font-semibold">
                        Virtual Memory &amp; Deadlock Resolution
                      </span>
                      <span className="px-1.5 py-0.2 rounded bg-surface-container-highest text-tertiary font-label-caps text-[10px]">
                        CORE CS • OS
                      </span>
                      <span className="font-label-caps text-[10px] text-on-surface-variant">1 week ago</span>
                    </div>
                    <div className="flex items-center gap-space-sm font-body-sm text-body-sm text-on-surface-variant">
                      <span>AI Interviewer: <span className="text-on-surface">Pulse-CoreOS</span></span>
                      <span>•</span>
                      <span>Runtime: <span className="font-telemetry-metric text-on-surface text-body-sm">35 mins</span></span>
                      <span>•</span>
                      <span>Banker's Algorithm</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between lg:justify-end gap-space-md shrink-0">
                  <div className="flex items-center gap-space-sm text-right">
                    <div>
                      <div className="font-telemetry-metric text-telemetry-metric text-tertiary font-bold">91%</div>
                      <div className="font-label-caps text-[10px] text-on-surface-variant uppercase">Exemplary Theory</div>
                    </div>
                    <div className="h-8 w-1 rounded-full bg-surface-container-highest overflow-hidden">
                      <div className="w-full bg-tertiary h-[91%]"></div>
                    </div>
                  </div>
                  <button
                    onClick={() => onNavigate('history')}
                    className="px-space-md py-space-xs rounded bg-surface-container-highest hover:bg-primary hover:text-on-primary text-on-surface font-headline-sm text-body-sm transition-all flex items-center gap-space-xs cursor-pointer"
                  >
                    <span>Review Transcript</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN (4 cols) */}
        <div className="xl:col-span-4 space-y-space-xl">
          {/* Domain Mastery Radar */}
          <section className="rounded-xl bg-surface-container-low p-space-lg shadow-lg space-y-space-md border border-surface-container">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-label-caps text-label-caps text-secondary uppercase tracking-wider">Placement Radar</span>
                <h2 className="font-headline-sm text-headline-sm text-on-surface">Domain Mastery</h2>
              </div>
              <span className="material-symbols-outlined text-secondary text-[22px]">radar</span>
            </div>

            {/* Radar Chart SVG Illustration */}
            <div className="relative w-full h-44 flex items-center justify-center bg-surface-container rounded-lg p-2 border border-surface-container-high">
              <svg className="w-full h-full max-w-[240px]" viewBox="0 0 100 100">
                <polygon className="text-surface-variant stroke-current" fill="none" points="50,5 93,30 93,70 50,95 7,70 7,30" strokeWidth="0.75" />
                <polygon className="text-surface-variant stroke-current" fill="none" points="50,20 78,37 78,63 50,80 22,63 22,37" strokeWidth="0.75" />
                <polygon className="text-surface-variant stroke-current" fill="none" points="50,35 64,43 64,57 50,65 36,57 36,43" strokeWidth="0.75" />

                <line className="text-surface-variant stroke-current" strokeWidth="0.5" x1="50" x2="50" y1="50" y2="5" />
                <line className="text-surface-variant stroke-current" strokeWidth="0.5" x1="50" x2="93" y1="50" y2="30" />
                <line className="text-surface-variant stroke-current" strokeWidth="0.5" x1="50" x2="93" y1="50" y2="70" />
                <line className="text-surface-variant stroke-current" strokeWidth="0.5" x1="50" x2="50" y1="50" y2="95" />
                <line className="text-surface-variant stroke-current" strokeWidth="0.5" x1="50" x2="7" y1="50" y2="70" />
                <line className="text-surface-variant stroke-current" strokeWidth="0.5" x1="50" x2="7" y1="50" y2="30" />

                <polygon fill="rgba(78, 222, 163, 0.25)" points="50,8 83,35 88,68 50,89 19,65 11,32" stroke="#4edea3" strokeWidth="1.8" />
                <circle cx="50" cy="8" fill="#4cd7f6" r="2.5" />
                <circle cx="83" cy="35" fill="#c0c1ff" r="2.5" />
                <circle cx="88" cy="68" fill="#4edea3" r="2.5" />
                <circle cx="50" cy="89" fill="#4edea3" r="2.5" />
                <circle cx="19" cy="65" fill="#c0c1ff" r="2.5" />
                <circle cx="11" cy="32" fill="#4cd7f6" r="2.5" />
              </svg>
              <div className="absolute bottom-1 right-2 text-on-surface-variant font-label-caps text-[9px]">PULSE RADAR V2</div>
            </div>

            {/* Skill Bars List */}
            <div className="space-y-space-sm pt-space-xs">
              <div className="space-y-1">
                <div className="flex justify-between font-body-sm text-body-sm">
                  <span className="text-on-surface font-medium">Data Structures</span>
                  <div className="flex items-center gap-space-xs">
                    <span className="font-telemetry-metric text-tertiary font-bold">94%</span>
                    <span className="font-label-caps text-[10px] text-on-surface-variant">(Expert)</span>
                  </div>
                </div>
                <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
                  <div className="bg-tertiary h-full rounded-full" style={{ width: '94%' }}></div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between font-body-sm text-body-sm">
                  <span className="text-on-surface font-medium">Algorithms &amp; DP</span>
                  <div className="flex items-center gap-space-xs">
                    <span className="font-telemetry-metric text-error font-bold">78%</span>
                    <span className="font-label-caps text-[10px] text-error">(Needs Polish)</span>
                  </div>
                </div>
                <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
                  <div className="bg-error h-full rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between font-body-sm text-body-sm">
                  <span className="text-on-surface font-medium">Operating Systems &amp; Linux</span>
                  <div className="flex items-center gap-space-xs">
                    <span className="font-telemetry-metric text-secondary font-bold">88%</span>
                    <span className="font-label-caps text-[10px] text-on-surface-variant">(Strong)</span>
                  </div>
                </div>
                <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
                  <div className="bg-secondary h-full rounded-full" style={{ width: '88%' }}></div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between font-body-sm text-body-sm">
                  <span className="text-on-surface font-medium">Database Management (SQL/NoSQL)</span>
                  <div className="flex items-center gap-space-xs">
                    <span className="font-telemetry-metric text-primary font-bold">85%</span>
                    <span className="font-label-caps text-[10px] text-on-surface-variant">(Solid)</span>
                  </div>
                </div>
                <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between font-body-sm text-body-sm">
                  <span className="text-on-surface font-medium">System Design</span>
                  <div className="flex items-center gap-space-xs">
                    <span className="font-telemetry-metric text-on-surface font-bold">72%</span>
                    <span className="font-label-caps text-[10px] text-outline">(Intermediate)</span>
                  </div>
                </div>
                <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
                  <div className="bg-surface-variant h-full rounded-full" style={{ width: '72%' }}></div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between font-body-sm text-body-sm">
                  <span className="text-on-surface font-medium">Behavioral &amp; STAR Method</span>
                  <div className="flex items-center gap-space-xs">
                    <span className="font-telemetry-metric text-tertiary font-bold">90%</span>
                    <span className="font-label-caps text-[10px] text-on-surface-variant">(Strong)</span>
                  </div>
                </div>
                <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
                  <div className="bg-tertiary h-full rounded-full" style={{ width: '90%' }}></div>
                </div>
              </div>
            </div>
          </section>

          {/* Critical AI Remediation Recommendations */}
          <section className="rounded-xl bg-surface-container-low p-space-lg shadow-lg space-y-space-md border border-surface-container">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-error text-[20px]">warning</span>
              <h2 className="font-headline-sm text-headline-sm text-on-surface">Targeted AI Remediation</h2>
            </div>

            <div className="space-y-space-sm">
              <div className="p-space-md rounded-lg bg-surface-container space-y-space-xs hover:bg-surface-container-high transition-all border border-surface-container-high">
                <div className="flex items-center justify-between">
                  <span className="px-1.5 py-0.5 rounded bg-error-container text-on-error-container font-label-caps text-[10px]">
                    CRITICAL GAP
                  </span>
                  <span className="font-label-caps text-[10px] text-on-surface-variant">Estimated: 20 Mins</span>
                </div>
                <h3 className="font-headline-sm text-body-md text-on-surface font-semibold">
                  Dynamic Programming State Transitions
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  You hesitated on recursive memoization base-cases in Session #23. Take a focused 0/1 Knapsack drill.
                </p>
                <button
                  onClick={() => setDrillModal('Dynamic Programming 0/1 Knapsack Drill')}
                  className="w-full mt-space-xs py-1.5 rounded bg-surface-container-highest hover:bg-primary hover:text-on-primary text-secondary font-headline-sm text-body-sm transition-all flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                  <span>Launch 20-min Knapsack Drill</span>
                </button>
              </div>

              <div className="p-space-md rounded-lg bg-surface-container space-y-space-xs hover:bg-surface-container-high transition-all border border-surface-container-high">
                <div className="flex items-center justify-between">
                  <span className="px-1.5 py-0.5 rounded bg-surface-container-highest text-secondary font-label-caps text-[10px]">
                    VERBAL TELEMETRY
                  </span>
                  <span className="font-label-caps text-[10px] text-on-surface-variant">Estimated: 12 Mins</span>
                </div>
                <h3 className="font-headline-sm text-body-md text-on-surface font-semibold">
                  STAR Structure in Conflict Scenarios
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Action component in 'Disagree &amp; Commit' answers was brief (18% of talk time vs 45% benchmark).
                </p>
                <button
                  onClick={() => setDrillModal('Verbal STAR Conflict Resolution Re-take')}
                  className="w-full mt-space-xs py-1.5 rounded bg-surface-container-highest hover:bg-secondary hover:text-on-secondary text-secondary font-headline-sm text-body-sm transition-all flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">mic</span>
                  <span>Practice Verbal STAR Re-Take</span>
                </button>
              </div>
            </div>
          </section>

          {/* Campus Leaderboard Snapshot */}
          <section className="rounded-xl bg-surface-container-low p-space-lg shadow-lg space-y-space-md border border-surface-container">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-tertiary text-[20px]">trophy</span>
                <h2 className="font-headline-sm text-headline-sm text-on-surface">Campus Leaderboard</h2>
              </div>
              <span className="font-label-caps text-label-caps text-on-surface-variant">CSE '25 BATCH</span>
            </div>

            <div className="space-y-space-xs">
              {/* Peer 1 */}
              <div className="p-space-xs px-space-sm rounded-lg bg-surface-container flex items-center justify-between">
                <div className="flex items-center gap-space-sm">
                  <span className="font-telemetry-metric text-body-md text-tertiary font-bold w-4">1</span>
                  <div className="w-7 h-7 rounded-full bg-surface-container-highest flex items-center justify-center font-label-caps text-body-sm text-on-surface font-bold">
                    AK
                  </div>
                  <div>
                    <div className="font-headline-sm text-body-sm text-on-surface font-medium">Aarav Kapoor</div>
                    <div className="font-label-caps text-[10px] text-on-surface-variant">Offer: Google L3 Intern</div>
                  </div>
                </div>
                <span className="font-telemetry-metric text-body-sm text-tertiary font-bold">96.2</span>
              </div>

              {/* Peer 2 */}
              <div className="p-space-xs px-space-sm rounded-lg bg-surface-container flex items-center justify-between">
                <div className="flex items-center gap-space-sm">
                  <span className="font-telemetry-metric text-body-md text-secondary font-bold w-4">2</span>
                  <div className="w-7 h-7 rounded-full bg-surface-container-highest flex items-center justify-center font-label-caps text-body-sm text-on-surface font-bold">
                    SM
                  </div>
                  <div>
                    <div className="font-headline-sm text-body-sm text-on-surface font-medium">Sneha Mukhopadhyay</div>
                    <div className="font-label-caps text-[10px] text-on-surface-variant">Target: Uber SDE-1</div>
                  </div>
                </div>
                <span className="font-telemetry-metric text-body-sm text-secondary font-bold">94.8</span>
              </div>

              {/* Peer 3 */}
              <div className="p-space-xs px-space-sm rounded-lg bg-surface-container flex items-center justify-between">
                <div className="flex items-center gap-space-sm">
                  <span className="font-telemetry-metric text-body-md text-primary font-bold w-4">3</span>
                  <div className="w-7 h-7 rounded-full bg-surface-container-highest flex items-center justify-center font-label-caps text-body-sm text-on-surface font-bold">
                    TN
                  </div>
                  <div>
                    <div className="font-headline-sm text-body-sm text-on-surface font-medium">Tanmay Nair</div>
                    <div className="font-label-caps text-[10px] text-on-surface-variant">Target: Atlassian P30</div>
                  </div>
                </div>
                <span className="font-telemetry-metric text-body-sm text-primary font-bold">92.0</span>
              </div>

              {/* Peer 4 (You) */}
              <div className="p-space-xs px-space-sm rounded-lg bg-surface-container-high border border-primary/40 flex items-center justify-between">
                <div className="flex items-center gap-space-sm">
                  <span className="font-telemetry-metric text-body-md text-tertiary font-bold w-4">4</span>
                  <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center font-label-caps text-body-sm text-on-primary font-bold">
                    RS
                  </div>
                  <div>
                    <div className="font-headline-sm text-body-sm text-on-surface font-semibold flex items-center gap-1">
                      <span>Rohan Sharma</span>
                      <span className="font-label-caps text-[9px] px-1 py-0.2 rounded bg-primary text-on-primary">YOU</span>
                    </div>
                    <div className="font-label-caps text-[10px] text-tertiary">Target: Amazon / Google</div>
                  </div>
                </div>
                <span className="font-telemetry-metric text-body-sm text-tertiary font-bold">88.5</span>
              </div>

              {/* Peer 5 */}
              <div className="p-space-xs px-space-sm rounded-lg bg-surface-container flex items-center justify-between">
                <div className="flex items-center gap-space-sm">
                  <span className="font-telemetry-metric text-body-md text-on-surface-variant font-bold w-4">5</span>
                  <div className="w-7 h-7 rounded-full bg-surface-container-highest flex items-center justify-center font-label-caps text-body-sm text-on-surface font-bold">
                    PV
                  </div>
                  <div>
                    <div className="font-headline-sm text-body-sm text-on-surface font-medium">Pranav Verma</div>
                    <div className="font-label-caps text-[10px] text-on-surface-variant">Target: Microsoft SWE</div>
                  </div>
                </div>
                <span className="font-telemetry-metric text-body-sm text-on-surface-variant font-bold">87.4</span>
              </div>
            </div>

            <div className="pt-space-xs text-center">
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                You are 3.5 points away from Rank 3 Tanmay
              </span>
            </div>
          </section>
        </div>
      </div>

      {/* Drill Modal */}
      {drillModal && (
        <div className="fixed inset-0 z-50 bg-[#0a0e17]/80 backdrop-blur-md flex items-center justify-center p-space-md">
          <div className="bg-surface-container-low border border-surface-container-high rounded-xl max-w-md w-full p-space-lg flex flex-col gap-space-md shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-surface-variant">
              <div className="flex items-center gap-2 text-secondary">
                <span className="material-symbols-outlined text-[22px]">play_circle</span>
                <span className="font-headline-sm text-body-md font-semibold text-on-surface">
                  {drillModal}
                </span>
              </div>
              <button
                onClick={() => setDrillModal(null)}
                className="text-on-surface-variant hover:text-on-surface cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <p className="text-body-md text-on-surface-variant">
              Preparing sandbox instance calibrated with real FAANG placement assertions...
            </p>
            <div className="p-3 bg-surface-container rounded-lg font-mono text-[12px] text-tertiary">
              ✓ Test harness loaded<br />
              ✓ Audio telemetry calibrated<br />
              ✓ Proctoring environment initialized
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setDrillModal(null)}
                className="px-space-md py-1.5 rounded-lg bg-surface-container text-body-sm hover:bg-surface-container-high cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setDrillModal(null);
                  onNavigate('coding-ide');
                }}
                className="px-space-md py-1.5 rounded-lg bg-primary text-on-primary font-headline-sm text-body-sm hover:brightness-110 cursor-pointer"
              >
                Enter Sandbox
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
