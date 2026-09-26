import React, { useState } from 'react';

interface AnalyticsViewProps {
  onNavigate: (tab: any) => void;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ onNavigate }) => {
  const [timeRange, setTimeRange] = useState<'10w' | '30d' | 'all'>('10w');
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [drillLaunched, setDrillLaunched] = useState<string | null>(null);

  const handleDownloadPdf = () => {
    setDownloadingPdf(true);
    setTimeout(() => {
      setDownloadingPdf(false);
      alert('Diagnostic Placement Report downloaded successfully (Rohan_Sharma_Diagnostic_Audit.pdf).');
    }, 1200);
  };

  return (
    <div className="w-full px-3 sm:px-gutter py-4 sm:py-space-lg mx-auto max-w-[1720px] flex flex-col gap-4 sm:gap-space-lg">
      {/* Top Action Bar & Cohort Filter */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md bg-surface-container-low p-3 sm:p-space-md rounded-xl border border-surface-container shadow-md">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-space-xs">
            <span className="inline-flex items-center justify-center w-2 h-2 rounded-full bg-tertiary"></span>
            <span className="font-label-caps text-label-caps text-tertiary uppercase">
              Real-Time Placement Telemetry
            </span>
            <span className="text-outline-variant font-code-block text-body-sm mx-1">/</span>
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">
              Updated 14 mins ago
            </span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
            Placement Readiness &amp; Skill Diagnostics
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Calibrated against 48,000+ candidate benchmarks across Day 1/Day 2 campus placements.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-space-sm">
          <div className="flex items-center gap-space-xs bg-surface-container px-space-md py-space-xs rounded-lg border border-surface-container-high">
            <span className="material-symbols-outlined text-[18px] text-secondary">group</span>
            <div className="flex flex-col">
              <span className="font-label-caps text-[10px] text-on-surface-variant uppercase">Benchmark Cohort</span>
              <span className="font-headline-sm text-body-sm text-on-surface font-medium">
                B.Tech CSE '25 | Tier-1 &amp; Tier-2 Campuses
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 bg-surface-container p-1 rounded-lg border border-surface-container-high">
            <button
              onClick={() => setTimeRange('10w')}
              className={`px-space-sm py-1 rounded font-body-sm text-body-sm font-medium transition-colors cursor-pointer ${
                timeRange === '10w' ? 'bg-primary text-on-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Last 10 Weeks
            </button>
            <button
              onClick={() => setTimeRange('30d')}
              className={`px-space-sm py-1 rounded font-body-sm text-body-sm font-medium transition-colors cursor-pointer ${
                timeRange === '30d' ? 'bg-primary text-on-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              30 Days
            </button>
            <button
              onClick={() => setTimeRange('all')}
              className={`px-space-sm py-1 rounded font-body-sm text-body-sm font-medium transition-colors cursor-pointer ${
                timeRange === 'all' ? 'bg-primary text-on-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              All-Time
            </button>
          </div>

          <button
            onClick={handleDownloadPdf}
            disabled={downloadingPdf}
            className="flex items-center gap-space-xs px-space-md py-space-xs bg-secondary text-on-secondary rounded-lg font-body-sm text-body-sm font-semibold hover:opacity-90 active:scale-95 transition-all shadow-md cursor-pointer disabled:opacity-60"
          >
            <span className="material-symbols-outlined text-[18px]">
              {downloadingPdf ? 'hourglass_top' : 'download'}
            </span>
            <span>{downloadingPdf ? 'Generating...' : 'Diagnostic PDF'}</span>
          </button>
        </div>
      </div>

      {/* 4 Key Metric Hero Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-space-md">
        {/* Metric 1: Overall Placement Score */}
        <div className="relative overflow-hidden bg-surface-container-low p-space-md rounded-xl flex flex-col justify-between border border-surface-container shadow-md">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Placement Score</span>
              <span className="font-display text-display text-on-surface tracking-tight mt-1 flex items-baseline gap-1">
                88<span className="font-body-md text-body-md text-on-surface-variant">/100</span>
              </span>
            </div>
            <div className="relative w-14 h-14 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 48 48">
                <circle className="stroke-surface-container-high" cx="24" cy="24" fill="none" r="20" strokeWidth="4"></circle>
                <circle
                  className="stroke-tertiary"
                  cx="24"
                  cy="24"
                  fill="none"
                  r="20"
                  strokeDasharray="125.6"
                  strokeDashoffset="15.07"
                  strokeLinecap="round"
                  strokeWidth="4"
                ></circle>
              </svg>
              <span className="absolute font-telemetry-metric text-body-sm text-tertiary">88%</span>
            </div>
          </div>
          <div className="mt-space-md pt-space-xs flex flex-col gap-1">
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-tertiary-container/30 text-tertiary-fixed w-fit">
              <span className="material-symbols-outlined text-[14px]">stars</span>
              <span className="font-label-caps text-[11px] font-semibold">Super Dream Eligible (20+ LPA)</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
              Qualified for Tier-1 Marquee SDE selection rounds.
            </p>
          </div>
        </div>

        {/* Metric 2: Mock Success Rate */}
        <div className="relative overflow-hidden bg-surface-container-low p-space-md rounded-xl flex flex-col justify-between border border-surface-container shadow-md">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Simulated Clearance</span>
              <span className="font-display text-display text-secondary tracking-tight mt-1">
                87.5%
              </span>
            </div>
            <div className="p-space-xs rounded-lg bg-surface-container text-secondary">
              <span className="material-symbols-outlined text-[24px]">terminal</span>
            </div>
          </div>
          <div className="mt-space-md pt-space-xs flex flex-col gap-1">
            <div className="flex items-center justify-between text-body-sm font-body-sm">
              <span className="text-on-surface">21 Cleared / 24 Rounds</span>
              <span className="text-tertiary font-telemetry-metric font-medium">+12.5% vs Prev</span>
            </div>
            <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden mt-1">
              <div className="h-full bg-secondary rounded-full" style={{ width: '87.5%' }}></div>
            </div>
            <span className="font-body-sm text-[11px] text-on-surface-variant mt-0.5">
              OA &amp; Live Bar-Raiser Simulations Completed
            </span>
          </div>
        </div>

        {/* Metric 3: Technical Mastery Percentile */}
        <div className="relative overflow-hidden bg-surface-container-low p-space-md rounded-xl flex flex-col justify-between border border-surface-container shadow-md">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">DSA &amp; CS Percentile</span>
              <span className="font-display text-display text-primary tracking-tight mt-1">
                94<sup className="text-body-lg text-primary-fixed-dim">th</sup>
              </span>
            </div>
            <div className="p-space-xs rounded-lg bg-surface-container text-primary">
              <span className="material-symbols-outlined text-[24px]">psychology</span>
            </div>
          </div>
          <div className="mt-space-md pt-space-xs flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-on-surface font-body-sm">
              <span className="material-symbols-outlined text-[16px] text-tertiary">trending_up</span>
              <span className="font-medium text-body-sm">Top 6% of national CS pool</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Exceptional on algorithmic optimality &amp; time constraints.
            </p>
          </div>
        </div>

        {/* Metric 4: Behavioral & Communication */}
        <div className="relative overflow-hidden bg-surface-container-low p-space-md rounded-xl flex flex-col justify-between border border-surface-container shadow-md">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Behavioral Index</span>
              <span className="font-display text-display text-on-surface tracking-tight mt-1">
                82<sup className="text-body-lg text-on-surface-variant">nd</sup>
              </span>
            </div>
            <div className="p-space-xs rounded-lg bg-surface-container text-tertiary">
              <span className="material-symbols-outlined text-[24px]">record_voice_over</span>
            </div>
          </div>
          <div className="mt-space-md pt-space-xs flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-on-surface font-body-sm">
              <span className="material-symbols-outlined text-[16px] text-secondary">check_circle</span>
              <span className="font-medium text-body-sm">Amazon LP &amp; Culture Fit Ready</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Speech telemetry: Low filler count &amp; solid articulation.
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Visualization & Company Preparedness */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
        {/* Left Column: Historical Trend + Skill Matrix (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-space-lg">
          {/* Trend Chart */}
          <div className="bg-surface-container-low p-space-md rounded-xl flex flex-col gap-space-md border border-surface-container shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs pb-space-xs border-b border-surface-container">
              <div>
                <div className="flex items-center gap-space-xs">
                  <span className="font-label-caps text-label-caps text-secondary uppercase">Evolution Trajectory</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-label-caps bg-surface-container text-on-surface-variant">
                    10 WEEKS
                  </span>
                </div>
                <h2 className="font-headline-sm text-headline-sm text-on-surface mt-0.5">Historical Performance Trend</h2>
              </div>

              {/* Legend */}
              <div className="flex items-center gap-space-sm">
                <div className="flex items-center gap-1">
                  <span className="w-3 h-0.5 rounded-full bg-primary inline-block"></span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">DSA</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-3 h-0.5 rounded-full bg-secondary inline-block"></span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Core CS</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-3 h-0.5 rounded-full bg-tertiary inline-block"></span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">System Design</span>
                </div>
              </div>
            </div>

            {/* Inline SVG Chart with Rich Data Nodes */}
            <div className="w-full bg-[#0a0e17] p-space-md rounded-lg flex flex-col gap-space-xs border border-surface-container">
              <div className="h-64 w-full relative">
                <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 600 220">
                  <defs>
                    <linearGradient id="dsaGrad" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#c0c1ff" stopOpacity="0.3"></stop>
                      <stop offset="100%" stopColor="#c0c1ff" stopOpacity="0.0"></stop>
                    </linearGradient>
                    <linearGradient id="sysGrad" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#4edea3" stopOpacity="0.2"></stop>
                      <stop offset="100%" stopColor="#4edea3" stopOpacity="0.0"></stop>
                    </linearGradient>
                  </defs>
                  {/* Gridlines */}
                  <line opacity="0.4" stroke="#31353f" strokeDasharray="3 3" x1="0" x2="600" y1="30" y2="30"></line>
                  <line opacity="0.4" stroke="#31353f" strokeDasharray="3 3" x1="0" x2="600" y1="85" y2="85"></line>
                  <line opacity="0.4" stroke="#31353f" strokeDasharray="3 3" x1="0" x2="600" y1="140" y2="140"></line>
                  <line opacity="0.4" stroke="#31353f" strokeDasharray="3 3" x1="0" x2="600" y1="195" y2="195"></line>

                  {/* Filled Area DSA */}
                  <path
                    d="M 0 160 L 65 145 L 130 135 L 195 120 L 260 95 L 325 80 L 390 60 L 455 50 L 520 40 L 600 28 L 600 220 L 0 220 Z"
                    fill="url(#dsaGrad)"
                  ></path>

                  {/* Line: DSA */}
                  <path
                    d="M 0 160 L 65 145 L 130 135 L 195 120 L 260 95 L 325 80 L 390 60 L 455 50 L 520 40 L 600 28"
                    fill="none"
                    stroke="#c0c1ff"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                  ></path>

                  {/* Line: Core CS */}
                  <path
                    d="M 0 175 L 65 168 L 130 150 L 195 140 L 260 120 L 325 110 L 390 92 L 455 80 L 520 70 L 600 58"
                    fill="none"
                    stroke="#4cd7f6"
                    strokeDasharray="4 2"
                    strokeLinecap="round"
                    strokeWidth="2"
                  ></path>

                  {/* Line: System Design */}
                  <path
                    d="M 0 190 L 65 185 L 130 175 L 195 165 L 260 148 L 325 130 L 390 120 L 455 105 L 520 85 L 600 68"
                    fill="none"
                    stroke="#4edea3"
                    strokeLinecap="round"
                    strokeWidth="2.2"
                  ></path>

                  {/* Milestone Points */}
                  <circle cx="260" cy="95" fill="#0f131c" r="4" stroke="#c0c1ff" strokeWidth="2"></circle>
                  <circle cx="455" cy="50" fill="#0f131c" r="4" stroke="#c0c1ff" strokeWidth="2"></circle>
                  <circle cx="600" cy="28" fill="#c0c1ff" r="5"></circle>
                </svg>
              </div>

              {/* X-Axis */}
              <div className="flex justify-between items-center text-on-surface-variant font-code-block text-[11px] px-1 pt-1 border-t border-surface-container">
                <span>W1 (Basics)</span>
                <span>W3</span>
                <span>W5 (Mid-Term)</span>
                <span>W7</span>
                <span>W8</span>
                <span className="text-secondary font-semibold">W10 (Sprint Peak)</span>
              </div>
            </div>

            {/* Bottom Micro-Telemetry Band */}
            <div className="grid grid-cols-3 gap-space-sm pt-space-xs">
              <div className="bg-surface-container p-space-sm rounded-lg border border-surface-container-high">
                <span className="font-label-caps text-[10px] text-on-surface-variant block">DSA VELOCITY</span>
                <span className="font-telemetry-metric text-body-lg text-primary font-bold">+34 pts</span>
                <span className="font-body-sm text-[11px] text-on-surface-variant block">Since Baseline Diagnostic</span>
              </div>
              <div className="bg-surface-container p-space-sm rounded-lg border border-surface-container-high">
                <span className="font-label-caps text-[10px] text-on-surface-variant block">COMPLEXITY ACCURACY</span>
                <span className="font-telemetry-metric text-body-lg text-secondary font-bold">96.2%</span>
                <span className="font-body-sm text-[11px] text-on-surface-variant block">Big-O analysis exactness</span>
              </div>
              <div className="bg-surface-container p-space-sm rounded-lg border border-surface-container-high">
                <span className="font-label-caps text-[10px] text-on-surface-variant block">SYS DESIGN SESSIONS</span>
                <span className="font-telemetry-metric text-body-lg text-tertiary font-bold">8 Done</span>
                <span className="font-body-sm text-[11px] text-on-surface-variant block">L4 Mock clearance verified</span>
              </div>
            </div>
          </div>

          {/* Skill Matrix & Category Deep Dive */}
          <div className="bg-surface-container-low p-space-md rounded-xl flex flex-col gap-space-md border border-surface-container shadow-md">
            <div className="flex items-center justify-between pb-space-xs border-b border-surface-container">
              <div>
                <span className="font-label-caps text-label-caps text-secondary uppercase">Competency Profiling</span>
                <h2 className="font-headline-sm text-headline-sm text-on-surface mt-0.5">
                  Skill Matrix &amp; Category Deep Dive
                </h2>
              </div>
              <span className="font-code-block text-body-sm text-on-surface-variant">6 Active Modules</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
              {/* Module 1 */}
              <div className="bg-surface-container p-space-md rounded-lg flex flex-col justify-between gap-space-sm border border-surface-container-high">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-headline-sm text-body-md text-on-surface font-semibold block">Graphs &amp; Trees</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">18/20 problems solved correctly</span>
                  </div>
                  <span className="font-telemetry-metric text-body-md text-tertiary font-bold">91%</span>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                    <div className="h-full bg-tertiary rounded-full" style={{ width: '91%' }}></div>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-label-caps text-on-surface-variant">
                    <span>MASTERY: ADVANCED</span>
                    <span className="text-tertiary">TIER-1 PASS</span>
                  </div>
                </div>
              </div>

              {/* Module 2 (Critical) */}
              <div className="bg-surface-container p-space-md rounded-lg flex flex-col justify-between gap-space-sm border border-error/30">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-headline-sm text-body-md text-on-surface font-semibold block">
                        Dynamic Programming
                      </span>
                      <span className="px-1.5 py-0.2 rounded bg-error-container text-error text-[10px] font-label-caps font-bold">
                        CRITICAL
                      </span>
                    </div>
                    <span className="font-body-sm text-body-sm text-error">State definitions &amp; space optimization</span>
                  </div>
                  <span className="font-telemetry-metric text-body-md text-error font-bold">68%</span>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                    <div className="h-full bg-error rounded-full" style={{ width: '68%' }}></div>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-label-caps text-on-surface-variant">
                    <span>MASTERY: INTERMEDIATE</span>
                    <span className="text-error font-semibold">ATTENTION REQUIRED</span>
                  </div>
                </div>
              </div>

              {/* Module 3 */}
              <div className="bg-surface-container p-space-md rounded-lg flex flex-col justify-between gap-space-sm border border-surface-container-high">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-headline-sm text-body-md text-on-surface font-semibold block">
                      Concurrency &amp; Threading
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Deadlocks, Mutex &amp; Async queues</span>
                  </div>
                  <span className="font-telemetry-metric text-body-md text-secondary font-bold">85%</span>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                    <div className="h-full bg-secondary rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-label-caps text-on-surface-variant">
                    <span>MASTERY: PROFICIENT</span>
                    <span className="text-secondary">SOLID</span>
                  </div>
                </div>
              </div>

              {/* Module 4 */}
              <div className="bg-surface-container p-space-md rounded-lg flex flex-col justify-between gap-space-sm border border-surface-container-high">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-headline-sm text-body-md text-on-surface font-semibold block">
                      DBMS &amp; SQL Indexing
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">B+ Trees, Query Execution Plans</span>
                  </div>
                  <span className="font-telemetry-metric text-body-md text-tertiary font-bold">90%</span>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                    <div className="h-full bg-tertiary rounded-full" style={{ width: '90%' }}></div>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-label-caps text-on-surface-variant">
                    <span>MASTERY: ADVANCED</span>
                    <span className="text-tertiary">EXCELLENT</span>
                  </div>
                </div>
              </div>

              {/* Module 5 */}
              <div className="bg-surface-container p-space-md rounded-lg flex flex-col justify-between gap-space-sm border border-surface-container-high">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-headline-sm text-body-md text-on-surface font-semibold block">
                      Low-Level OO Design
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">SOLID, Factory, Observer Patterns</span>
                  </div>
                  <span className="font-telemetry-metric text-body-md text-primary font-bold">88%</span>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: '88%' }}></div>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-label-caps text-on-surface-variant">
                    <span>MASTERY: ADVANCED</span>
                    <span className="text-primary">PRODUCT READY</span>
                  </div>
                </div>
              </div>

              {/* Module 6 */}
              <div className="bg-surface-container p-space-md rounded-lg flex flex-col justify-between gap-space-sm border border-surface-container-high">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-headline-sm text-body-md text-on-surface font-semibold block">
                      STAR Behavioral Format
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Situation-Task-Action-Result fidelity</span>
                  </div>
                  <span className="font-telemetry-metric text-body-md text-secondary font-bold">84%</span>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                    <div className="h-full bg-secondary rounded-full" style={{ width: '84%' }}></div>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-label-caps text-on-surface-variant">
                    <span>MASTERY: PROFICIENT</span>
                    <span className="text-secondary">BAR-RAISER COMPLIANT</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Company Preparedness + Speech Diagnostics + Sprint Plan (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-space-lg">
          {/* Company-Specific Preparedness Index */}
          <div className="bg-surface-container-low p-space-md rounded-xl flex flex-col gap-space-md border border-surface-container shadow-md">
            <div className="flex items-center justify-between pb-space-xs border-b border-surface-container">
              <div>
                <span className="font-label-caps text-label-caps text-secondary uppercase">Placement Calibration</span>
                <h2 className="font-headline-sm text-headline-sm text-on-surface mt-0.5">Company Preparedness Index</h2>
              </div>
              <span className="material-symbols-outlined text-secondary">verified_user</span>
            </div>

            <div className="flex flex-col gap-space-sm">
              {/* Google */}
              <div className="flex items-center justify-between p-space-sm bg-surface-container rounded-lg border border-surface-container-high">
                <div className="flex items-center gap-space-sm">
                  <div className="w-9 h-9 rounded bg-surface-container-high flex items-center justify-center font-headline-sm text-primary font-bold text-body-md">
                    G
                  </div>
                  <div className="flex flex-col">
                    <span className="font-headline-sm text-body-sm text-on-surface font-semibold">Google (L3 SDE)</span>
                    <span className="font-body-sm text-[11px] text-on-surface-variant">Heavy DSA &amp; Graph Invariants</span>
                  </div>
                </div>
                <div className="flex items-center gap-space-sm">
                  <div className="flex flex-col text-right">
                    <span className="font-telemetry-metric text-body-md text-on-surface font-bold">82%</span>
                    <span className="font-label-caps text-[10px] text-secondary">READY</span>
                  </div>
                  <div className="w-12 h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                    <div className="h-full bg-secondary rounded-full" style={{ width: '82%' }}></div>
                  </div>
                </div>
              </div>

              {/* Amazon */}
              <div className="flex items-center justify-between p-space-sm bg-surface-container rounded-lg border border-surface-container-high">
                <div className="flex items-center gap-space-sm">
                  <div className="w-9 h-9 rounded bg-surface-container-high flex items-center justify-center font-headline-sm text-tertiary font-bold text-body-md">
                    A
                  </div>
                  <div className="flex flex-col">
                    <span className="font-headline-sm text-body-sm text-on-surface font-semibold">Amazon (SDE-1)</span>
                    <span className="font-body-sm text-[11px] text-on-surface-variant">OA + 16 Leadership Principles</span>
                  </div>
                </div>
                <div className="flex items-center gap-space-sm">
                  <div className="flex flex-col text-right">
                    <span className="font-telemetry-metric text-body-md text-tertiary font-bold">91%</span>
                    <span className="font-label-caps text-[10px] text-tertiary">HIGH CLEAR</span>
                  </div>
                  <div className="w-12 h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                    <div className="h-full bg-tertiary rounded-full" style={{ width: '91%' }}></div>
                  </div>
                </div>
              </div>

              {/* Microsoft */}
              <div className="flex items-center justify-between p-space-sm bg-surface-container rounded-lg border border-surface-container-high">
                <div className="flex items-center gap-space-sm">
                  <div className="w-9 h-9 rounded bg-surface-container-high flex items-center justify-center font-headline-sm text-primary font-bold text-body-md">
                    MS
                  </div>
                  <div className="flex flex-col">
                    <span className="font-headline-sm text-body-sm text-on-surface font-semibold">Microsoft (SDE)</span>
                    <span className="font-body-sm text-[11px] text-on-surface-variant">On-Campus Direct Hire Track</span>
                  </div>
                </div>
                <div className="flex items-center gap-space-sm">
                  <div className="flex flex-col text-right">
                    <span className="font-telemetry-metric text-body-md text-primary font-bold">89%</span>
                    <span className="font-label-caps text-[10px] text-primary">STRONG FIT</span>
                  </div>
                  <div className="w-12 h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: '89%' }}></div>
                  </div>
                </div>
              </div>

              {/* Atlassian */}
              <div className="flex items-center justify-between p-space-sm bg-surface-container rounded-lg border border-surface-container-high">
                <div className="flex items-center gap-space-sm">
                  <div className="w-9 h-9 rounded bg-surface-container-high flex items-center justify-center font-headline-sm text-secondary font-bold text-body-md">
                    AT
                  </div>
                  <div className="flex flex-col">
                    <span className="font-headline-sm text-body-sm text-on-surface font-semibold">Atlassian (P20)</span>
                    <span className="font-body-sm text-[11px] text-on-surface-variant">Low-Level System Design &amp; Values</span>
                  </div>
                </div>
                <div className="flex items-center gap-space-sm">
                  <div className="flex flex-col text-right">
                    <span className="font-telemetry-metric text-body-md text-on-surface font-bold">86%</span>
                    <span className="font-label-caps text-[10px] text-secondary">READY</span>
                  </div>
                  <div className="w-12 h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                    <div className="h-full bg-secondary rounded-full" style={{ width: '86%' }}></div>
                  </div>
                </div>
              </div>

              {/* Razorpay */}
              <div className="flex items-center justify-between p-space-sm bg-surface-container rounded-lg border border-surface-container-high">
                <div className="flex items-center gap-space-sm">
                  <div className="w-9 h-9 rounded bg-surface-container-high flex items-center justify-center font-headline-sm text-tertiary font-bold text-body-md">
                    RZ
                  </div>
                  <div className="flex flex-col">
                    <span className="font-headline-sm text-body-sm text-on-surface font-semibold">Razorpay / Swiggy</span>
                    <span className="font-body-sm text-[11px] text-on-surface-variant">High-Throughput Engineering Tier</span>
                  </div>
                </div>
                <div className="flex items-center gap-space-sm">
                  <div className="flex flex-col text-right">
                    <span className="font-telemetry-metric text-body-md text-tertiary font-bold">94%</span>
                    <span className="font-label-caps text-[10px] text-tertiary">PEAK CLEAR</span>
                  </div>
                  <div className="w-12 h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                    <div className="h-full bg-tertiary rounded-full" style={{ width: '94%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Speech & Behavioral Diagnostics Breakdown */}
          <div className="bg-surface-container-low p-space-md rounded-xl flex flex-col gap-space-md border border-surface-container shadow-md">
            <div className="flex items-center justify-between pb-space-xs border-b border-surface-container">
              <div>
                <span className="font-label-caps text-label-caps text-secondary uppercase">Neural Audio Profiler</span>
                <h2 className="font-headline-sm text-headline-sm text-on-surface mt-0.5">
                  Speech &amp; Behavioral Diagnostics
                </h2>
              </div>
              <span className="px-2 py-0.5 rounded bg-surface-container text-tertiary text-[11px] font-label-caps border border-tertiary/20">
                VOICE CALIBRATED
              </span>
            </div>

            <div className="grid grid-cols-2 gap-space-sm">
              <div className="bg-surface-container p-space-sm rounded-lg flex flex-col gap-1 border border-surface-container-high">
                <div className="flex items-center justify-between text-on-surface-variant">
                  <span className="font-body-sm text-[11px]">Speech Cadence</span>
                  <span className="material-symbols-outlined text-[16px] text-secondary">speed</span>
                </div>
                <span className="font-telemetry-metric text-telemetry-metric text-on-surface font-bold">
                  135 <span className="text-body-sm text-on-surface-variant font-normal">WPM</span>
                </span>
                <span className="font-label-caps text-[10px] text-tertiary">OPTIMAL (130-150 TARGET)</span>
              </div>

              <div className="bg-surface-container p-space-sm rounded-lg flex flex-col gap-1 border border-surface-container-high">
                <div className="flex items-center justify-between text-on-surface-variant">
                  <span className="font-body-sm text-[11px]">Filler Word Density</span>
                  <span className="material-symbols-outlined text-[16px] text-tertiary">record_voice_over</span>
                </div>
                <span className="font-telemetry-metric text-telemetry-metric text-tertiary font-bold">1.8%</span>
                <span className="font-label-caps text-[10px] text-tertiary">CONTROLLED (&lt;2.0% TARGET)</span>
              </div>

              <div className="bg-surface-container p-space-sm rounded-lg flex flex-col gap-1 border border-surface-container-high">
                <div className="flex items-center justify-between text-on-surface-variant">
                  <span className="font-body-sm text-[11px]">Gaze Persistence</span>
                  <span className="material-symbols-outlined text-[16px] text-secondary">visibility</span>
                </div>
                <span className="font-telemetry-metric text-telemetry-metric text-on-surface font-bold">91%</span>
                <span className="font-label-caps text-[10px] text-secondary">HIGH ENGAGEMENT</span>
              </div>

              <div className="bg-surface-container p-space-sm rounded-lg flex flex-col gap-1 border border-surface-container-high">
                <div className="flex items-center justify-between text-on-surface-variant">
                  <span className="font-body-sm text-[11px]">Clarity Index</span>
                  <span className="material-symbols-outlined text-[16px] text-primary">equalizer</span>
                </div>
                <span className="font-telemetry-metric text-telemetry-metric text-primary font-bold">
                  8.6 <span className="text-body-sm text-on-surface-variant font-normal">/10</span>
                </span>
                <span className="font-label-caps text-[10px] text-primary">CLEAR MODULATION</span>
              </div>
            </div>

            {/* Waveform Micro Visualization */}
            <div className="bg-[#0a0e17] p-space-sm rounded-lg flex items-center gap-1 h-12 px-space-md border border-surface-container">
              <span className="h-2 w-1 bg-secondary rounded-full"></span>
              <span className="h-4 w-1 bg-secondary rounded-full"></span>
              <span className="h-7 w-1 bg-secondary rounded-full"></span>
              <span className="h-3 w-1 bg-secondary rounded-full"></span>
              <span className="h-5 w-1 bg-tertiary rounded-full"></span>
              <span className="h-8 w-1 bg-tertiary rounded-full"></span>
              <span className="h-6 w-1 bg-secondary rounded-full"></span>
              <span className="h-2 w-1 bg-secondary rounded-full"></span>
              <span className="h-5 w-1 bg-secondary rounded-full"></span>
              <span className="h-7 w-1 bg-tertiary rounded-full"></span>
              <span className="h-4 w-1 bg-secondary rounded-full"></span>
              <span className="h-2 w-1 bg-secondary rounded-full"></span>
              <span className="h-6 w-1 bg-secondary rounded-full"></span>
              <span className="h-8 w-1 bg-tertiary rounded-full"></span>
              <span className="h-3 w-1 bg-secondary rounded-full"></span>
              <span className="h-2 w-1 bg-secondary rounded-full"></span>
              <span className="h-7 w-1 bg-secondary rounded-full"></span>
              <span className="h-4 w-1 bg-secondary rounded-full"></span>
              <span className="h-5 w-1 bg-tertiary rounded-full"></span>
              <span className="h-2 w-1 bg-secondary rounded-full"></span>
              <span className="ml-auto font-code-block text-[11px] text-on-surface-variant">
                PITCH JITTER: 0.12%
              </span>
            </div>
          </div>

          {/* Recommended 7-Day Sprint Plan */}
          <div className="bg-surface-container-low p-space-md rounded-xl flex flex-col gap-space-md border border-surface-container shadow-md">
            <div className="flex items-center justify-between pb-space-xs border-b border-surface-container">
              <div>
                <span className="font-label-caps text-label-caps text-tertiary uppercase">AI Prescriptive Engine</span>
                <h2 className="font-headline-sm text-headline-sm text-on-surface mt-0.5">
                  Recommended 7-Day Sprint Plan
                </h2>
              </div>
              <button
                onClick={() => alert('Sprint Plan customized based on Amazon SDE-1 priority schedule.')}
                className="text-body-sm font-body-sm text-primary hover:underline cursor-pointer"
              >
                Customize
              </button>
            </div>

            <div className="flex flex-col gap-space-xs">
              {/* Day 1 */}
              <div className="p-space-sm bg-surface-container rounded-lg flex items-center justify-between hover:bg-surface-container-high transition-colors border border-surface-container-high">
                <div className="flex items-center gap-space-sm">
                  <div className="flex flex-col items-center justify-center w-10 h-10 rounded bg-error-container/40 text-error">
                    <span className="font-label-caps text-[9px] uppercase">DAY</span>
                    <span className="font-telemetry-metric text-body-md font-bold leading-none">01</span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="font-headline-sm text-body-sm text-on-surface font-semibold">
                        3x DP on Trees Drills
                      </span>
                      <span className="text-[10px] font-label-caps px-1 rounded bg-error/20 text-error">
                        WEAK POINT
                      </span>
                    </div>
                    <span className="font-body-sm text-[12px] text-on-surface-variant">
                      Focus: Subtree re-computation &amp; post-order caching
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setDrillLaunched('Day 1: 3x DP on Trees')}
                  className="px-space-sm py-1 bg-surface-container-highest text-on-surface text-body-sm rounded font-body-sm hover:bg-primary hover:text-on-primary transition-colors cursor-pointer"
                >
                  Start
                </button>
              </div>

              {/* Day 2 */}
              <div className="p-space-sm bg-surface-container rounded-lg flex items-center justify-between hover:bg-surface-container-high transition-colors border border-surface-container-high">
                <div className="flex items-center gap-space-sm">
                  <div className="flex flex-col items-center justify-center w-10 h-10 rounded bg-surface-container-high text-secondary">
                    <span className="font-label-caps text-[9px] uppercase">DAY</span>
                    <span className="font-telemetry-metric text-body-md font-bold leading-none">02</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-headline-sm text-body-sm text-on-surface font-semibold">
                      Distributed Caching Mock
                    </span>
                    <span className="font-body-sm text-[12px] text-on-surface-variant">
                      Focus: Redis eviction policies, write-through vs write-back
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setDrillLaunched('Day 2: Distributed Caching Mock')}
                  className="px-space-sm py-1 bg-surface-container-highest text-on-surface text-body-sm rounded font-body-sm hover:bg-primary hover:text-on-primary transition-colors cursor-pointer"
                >
                  Prep
                </button>
              </div>

              {/* Day 3 */}
              <div className="p-space-sm bg-surface-container rounded-lg flex items-center justify-between hover:bg-surface-container-high transition-colors border border-surface-container-high">
                <div className="flex items-center gap-space-sm">
                  <div className="flex flex-col items-center justify-center w-10 h-10 rounded bg-surface-container-high text-tertiary">
                    <span className="font-label-caps text-[9px] uppercase">DAY</span>
                    <span className="font-telemetry-metric text-body-md font-bold leading-none">03</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-headline-sm text-body-sm text-on-surface font-semibold">
                      Behavioral STAR: Ownership &amp; Conflict
                    </span>
                    <span className="font-body-sm text-[12px] text-on-surface-variant">
                      Focus: Amazon LP 'Have Backbone; Disagree &amp; Commit'
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setDrillLaunched('Day 3: Behavioral STAR Drill')}
                  className="px-space-sm py-1 bg-surface-container-highest text-on-surface text-body-sm rounded font-body-sm hover:bg-primary hover:text-on-primary transition-colors cursor-pointer"
                >
                  Queue
                </button>
              </div>
            </div>

            <div className="p-space-sm rounded bg-[#0a0e17] flex items-center justify-between border border-surface-container">
              <div className="flex items-center gap-space-xs text-on-surface-variant">
                <span className="material-symbols-outlined text-[18px] text-secondary">calendar_today</span>
                <span className="font-body-sm text-body-sm">Days 4-7 lock post Day 3 evaluation</span>
              </div>
              <span className="font-code-block text-[11px] text-secondary font-medium">AUTO-ADAPTIVE ON</span>
            </div>
          </div>
        </div>
      </div>

      {/* Student Benchmark Comparison Strip */}
      <div className="w-full bg-surface-container-low p-space-md rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-space-md border border-surface-container shadow-md">
        <div className="flex items-center gap-space-md">
          <div className="w-12 h-12 rounded-full bg-primary-container/20 flex items-center justify-center text-primary shrink-0">
            <span className="material-symbols-outlined text-[24px]">verified</span>
          </div>
          <div className="flex flex-col">
            <span className="font-headline-sm text-body-lg text-on-surface font-semibold">
              Placement Cell Verification Seal
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              Verified by T&amp;P Department for Direct Round-1 Exemption shortlist in Top Marquee MNC Drives.
            </span>
          </div>
        </div>

        <div className="flex items-center gap-space-sm">
          <button
            onClick={() => onNavigate('dashboard')}
            className="px-space-md py-space-xs rounded-lg bg-surface-container text-on-surface font-body-sm text-body-sm hover:bg-surface-container-high transition-colors cursor-pointer border border-surface-container-high"
          >
            View Peer Ranks
          </button>
          <button
            onClick={() => onNavigate('coding-ide')}
            className="px-space-md py-space-xs rounded-lg bg-primary text-on-primary font-body-sm text-body-sm font-semibold hover:opacity-90 active:scale-95 transition-opacity cursor-pointer shadow-md"
          >
            Launch Practice Assessment
          </button>
        </div>
      </div>

      {/* Drill Launch Confirmation Modal */}
      {drillLaunched && (
        <div className="fixed inset-0 z-50 bg-[#0a0e17]/80 backdrop-blur-md flex items-center justify-center p-space-md">
          <div className="bg-surface-container-low border border-surface-container-high rounded-xl max-w-md w-full p-space-lg flex flex-col gap-space-md shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-surface-variant">
              <span className="font-headline-sm text-body-md font-semibold text-on-surface">
                {drillLaunched}
              </span>
              <button onClick={() => setDrillLaunched(null)} className="text-on-surface-variant cursor-pointer">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <p className="text-body-md text-on-surface-variant">
              Initializing personalized session with target complexity timers and algorithmic edge-case tests...
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setDrillLaunched(null)}
                className="px-4 py-1.5 rounded-lg bg-surface-container text-body-sm hover:bg-surface-container-high cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setDrillLaunched(null);
                  onNavigate('coding-ide');
                }}
                className="px-4 py-1.5 rounded-lg bg-primary text-on-primary font-headline-sm text-body-sm hover:brightness-110 cursor-pointer"
              >
                Start Drill Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
