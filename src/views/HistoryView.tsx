import React, { useState } from 'react';

interface HistoryViewProps {
  onNavigate: (tab: any) => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({ onNavigate }) => {
  const [selectedSessionKey, setSelectedSessionKey] = useState<string>('amzn');
  const [searchQuery, setSearchQuery] = useState('');
  const [trackFilter, setTrackFilter] = useState('all');
  const [verdictFilter, setVerdictFilter] = useState('all');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [currentTimeSec, setCurrentTimeSec] = useState(1122); // 18m 42s
  const [exportingDossier, setExportingDossier] = useState(false);
  const [activeDrillModal, setActiveDrillModal] = useState<string | null>(null);

  // Audio timer ticker simulation
  React.useEffect(() => {
    let interval: any = null;
    if (isPlayingAudio) {
      interval = setInterval(() => {
        setCurrentTimeSec((prev) => (prev < 2892 ? prev + 1 : 2892));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlayingAudio]);

  const formatScrubTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const sessionsData: Record<string, any> = {
    amzn: {
      key: 'amzn',
      title: 'Amazon SDE-1 • Distributed Rate Limiter & Concurrency',
      cohort: 'AWS SDE-1 COHORT',
      refCode: 'AMZ-99120',
      tag: 'FAANG Bar Raiser',
      badge: 'TIER-1 CLEARED',
      score: 88,
      verdict: 'RECOMMENDED (DAY-1)',
      duration: '48m 12s / 60m MAX',
      evaluator: 'Pulse-Alpha L7 (Amazon Engine)',
      evaluatorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBn02SsuloiW5QRaUxlHnM8cGYxKMVmuhBsz42HhVp7R1wVuwzOj8NJAlwlOfGNw0sb-ZAH95fSMPGbgz3Xk07r1YcnoM96TYz-W7ORN1bWF7AMVR4I_TWH4S6gZ6UVS2Q8Tm4xrORZH2LW4mQ805Cc-KM7cEi_jTmfC9TlJxw-KAqgnGvzqyJBvLxmv_ML2sELcY_5Obm_Q4yDcC2qAKGB6Bj6BeDbZ_TMAaegjdkJUt0tzx-_Mwf2',
      q1Title: '1. Architectural Rigor',
      q1Score: '91/100',
      q1Desc: 'Candidate explicitly justified sliding-window counter vs token bucket trade-offs for 100,000 req/sec bursts. Leveraged Redis EVALSHA to bundle commands into a single round-trip.',
      q2Title: '2. Space & Time Bounds',
      q2Score: '86/100',
      q2Desc: 'Time complexity bounded to O(1) amortized. Memory calculation computed precisely: 24 bytes per active tenant ID, estimating 240MB footprint for 10M live users.',
      q3Title: '3. Verbal & Behavioral Cadence',
      q3Score: '89/100',
      q3Desc: 'Paced articulation with measured clarity. Speech rate hovered at 138 WPM (sweet spot: 130–150). Vocal pitch stable during pressure probing. Filler words restricted to 3 occurrences.',
      q4Title: '4. Amazon LP Alignment',
      q4Score: '88/100',
      q4Desc: 'Solid resonance with "Customer Obsession" when framing rate-limiting degraded states. Scored exceptionally high on "Dive Deep" regarding Linux file descriptors and socket buffer pools.',
      transcriptTurns: [
        {
          speaker: 'ai',
          name: 'Pulse-Alpha L7 (Bar Raiser)',
          time: '[12:30]',
          badge: 'SCENARIO PROMPT',
          text: '“Your token bucket algorithm looks sound on paper. However, suppose 5,000 requests hit your gateway simultaneously during an unannounced flash sale. How does your storage layer prevent race conditions when multiple nodes check and decrement the remaining tokens?”',
        },
        {
          speaker: 'user',
          name: 'Rohan Sharma (You)',
          time: '[12:45]',
          badge: 'OPTIMAL OPTIMIZATION (+4 PTS)',
          text: '“If we manage the lock at the API gateway layer via distributed mutexes like Redlock, we introduce extreme network overhead and thread contention. Instead, I delegate the decrement directly into Redis via an inline Lua script. Because Redis runs Lua scripts single-threaded on its primary event loop, the check-and-decrement becomes inherently atomic without explicit mutex orchestration.”',
          evaluatorNote: 'Evaluator Note: Demonstrates high systems maturity by avoiding over-engineering distributed locks in hot request paths.',
        },
        {
          speaker: 'ai',
          name: 'Pulse-Alpha L7 (Bar Raiser)',
          time: '[24:10]',
          badge: 'RECOVERY NEEDED',
          text: '“Fair point. Now, what happens during an asynchronous replication failover if the replica promoted to master hasn’t received the latest token state? How would you guard against inadvertent customer throttling?”',
          latencyWarning: 'Audio latency spike: Candidate paused for 6.2s before referencing quorum ack (`WAIT`).',
        },
      ],
      drills: [
        {
          title: 'Handling Split-Brain in Distributed In-Memory Caches',
          est: '15 MINS',
          desc: 'Practice configuring Redis Sentinel quorum parameters, configuring client fallback to soft degraded limit mode during cluster network isolation.',
          btn: 'Launch 15-Min Mini Drill',
        },
        {
          title: 'STAR Framing: "Disagreement With Senior Tech Lead"',
          est: '8 MINS',
          desc: 'Re-record the behavioral response using the Situation-Task-Action-Result format with strict adherence to concrete data metrics over subjective opinions.',
          btn: 'Re-Attempt STAR Module',
        },
      ],
    },
    goog: {
      key: 'goog',
      title: 'Google SWE L3 • LRU Cache & O(1) Eviction Pipeline',
      cohort: 'GOOGLE SWE TRACK',
      refCode: 'GOOG-L3-4821',
      tag: 'Coding & DSA',
      badge: 'EXEMPLARY 94%',
      score: 94,
      verdict: 'TOP 1% PERCENTILE',
      duration: '42m 04s / 45m MAX',
      evaluator: 'Pulse-Gemini Pro (Google SWE Track)',
      evaluatorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQ18nHRraXlyKMA7-_zB2JtCCAAdv9jkqB0ayqS8o3HMAvNyCdPcoVJM0T3siUm2GOJKe8u8nVEzoRtOso8LELZ1_YY0VBmD83DFBB1SadjGumbagHSBaWYXcr5yotKBD0og8dZ2HCYO-VCeU39hp-kJWQy2iVii21dH46Cx7pQV2C2Ww5NzstXmF-lk4MSbfoGiLBC-0r4j3PNapQO8NQGZ5r_ZGtm_EBN_XkAalD44LI2Gruin9z',
      q1Title: '1. Algorithmic Rigor',
      q1Score: '96/100',
      q1Desc: 'Optimal splice usage with std::list and unordered_map. No redundant allocations on cache hits.',
      q2Title: '2. Big-O Exactness',
      q2Score: '95/100',
      q2Desc: 'Precise analysis of hash collision handling and amortized O(1) get/put operations.',
      q3Title: '3. Code Cleanliness',
      q3Score: '92/100',
      q3Desc: 'Clean modular methods, private member variable encapsulation, modern C++20 conventions.',
      q4Title: '4. Googliness & Collaboration',
      q4Score: '93/100',
      q4Desc: 'Proactively clarified thread-safety requirements and memory footprint under 64-bit Linux.',
      transcriptTurns: [
        {
          speaker: 'ai',
          name: 'Pulse-Gemini Pro (Interviewer)',
          time: '[08:14]',
          badge: 'CORNER CASE',
          text: '“Suppose capacity is 1, and we invoke put(1, 10), then put(2, 20). Walk me through pointer dereferences.”',
        },
        {
          speaker: 'user',
          name: 'Rohan Sharma (You)',
          time: '[08:32]',
          badge: 'ACCURATE TRACE',
          text: '“When size reaches capacity 1, dll.back().first gives key 1. We erase 1 from cacheMap in O(1), pop_back, then emplace_front (2, 20) and update iterator in map.”',
        },
      ],
      drills: [
        {
          title: 'LFU Cache (Least Frequently Used) with Frequency Lists',
          est: '25 MINS',
          desc: 'Build on doubly linked list patterns to implement LFU cache with min-frequency tracking.',
          btn: 'Launch LFU Drill',
        },
      ],
    },
    msft: {
      key: 'msft',
      title: 'Microsoft Campus • Virtual Memory & Multi-Threading',
      cohort: 'MICROSOFT CAMPUS DIRECT',
      refCode: 'MSFT-CORE-7731',
      tag: 'System Architecture',
      badge: 'STRONG HIRE',
      score: 91,
      verdict: 'STRONG HIRE VERIFIED',
      duration: '35m 18s / 45m MAX',
      evaluator: 'Pulse-Azure L6 (Microsoft Core)',
      evaluatorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEJXVHkBe4fdpTqj-xAHPAcqtPkj1_KIGKmgn_135heDEtG1fE7NeY7cBkUON4qSoASq9Iogx80a1-5vdfcuLjqCpPG-5JdCU7fXpepIx_EJ4WRY2u_s0NuGhLiCebz1soQ8vy7BzG4IiwycEezGfZ2S_R7cLQdMJgWtrUnVHBYSpIWfZFNzMJrHrig3Y4_VP4h-n5NSuzTqQWTlx4XDT9QFnX1DQaWoU4Hpp4_ZYdifolRdsWSCD6',
      q1Title: '1. OS Architecture',
      q1Score: '93/100',
      q1Desc: 'Accurately articulated TLB miss penalties, page tables, and pthread condition variable barrier implementations.',
      q2Title: '2. Concurrency Safety',
      q2Score: '89/100',
      q2Desc: 'Explained deadlock avoidance via Banker’s Algorithm and hierarchical lock acquisition ordering.',
      q3Title: '3. Technical Articulation',
      q3Score: '90/100',
      q3Desc: 'Strong explanation of reader-writer locks vs mutexes for high-read shared memory.',
      q4Title: '4. Culture & Values',
      q4Score: '92/100',
      q4Desc: 'Growth mindset displayed during simulated multi-tenant memory thrashing scenario.',
      transcriptTurns: [
        {
          speaker: 'ai',
          name: 'Pulse-Azure L6 (Interviewer)',
          time: '[14:02]',
          badge: 'DEADLOCK SCENARIO',
          text: '“What causes priority inversion when a low-priority thread holds a mutex that a high-priority thread requires?”',
        },
        {
          speaker: 'user',
          name: 'Rohan Sharma (You)',
          time: '[14:20]',
          badge: 'EXEMPLARY ANSWER',
          text: '“A medium-priority thread can preempt the low-priority thread, effectively stalling the high-priority thread indefinitely. The remedy is Priority Inheritance protocol.”',
        },
      ],
      drills: [
        {
          title: 'Pthreads Condition Variable Dining Philosophers',
          est: '20 MINS',
          desc: 'Implement starvation-free concurrency barrier in C++.',
          btn: 'Launch Concurrency Drill',
        },
      ],
    },
  };

  const activeSession = sessionsData[selectedSessionKey] || sessionsData['amzn'];

  const allSessionCards = [
    {
      key: 'amzn',
      title: 'Amazon SDE-1 Bar Raiser: Distributed Rate Limiter & Concurrency',
      time: 'Yesterday, 4:15 PM',
      badge: 'TIER-1 CLEARED',
      badgeClass: 'bg-secondary-container text-on-secondary-container',
      score: '88%',
      summary: 'Demonstrated strong Redis Lua atomic patterns; subtle stall on lock-free queue edge cases under simulated network splits.',
      tags: ['Token Bucket', 'Redis Lua', 'Concurrency', 'STAR Method'],
      duration: '48m 12s',
      category: 'faang',
    },
    {
      key: 'goog',
      title: 'Google SWE L3: LRU Cache & O(1) Eviction Pipeline',
      time: '3 days ago',
      badge: 'EXEMPLARY 94%',
      badgeClass: 'bg-primary-container text-on-primary-container',
      score: '94%',
      summary: 'Flawless implementation using std::list splice and hash map pointer lookup. Zero memory leak detected in address sanitizer.',
      tags: ['C++20', 'Doubly Linked List', 'O(1) Bounds'],
      duration: '42m 04s',
      category: 'dsa',
    },
    {
      key: 'msft',
      title: 'Microsoft Campus: Virtual Memory & Multi-Threading Synchronization',
      time: '1 week ago',
      badge: 'STRONG HIRE',
      badgeClass: 'bg-secondary-container text-on-secondary-container',
      score: '91%',
      summary: 'Accurately articulated TLB miss penalties, page tables, and pthread condition variable barrier implementations.',
      tags: ['OS Internals', 'Pthreads', 'Mutex Locks'],
      duration: '35m 18s',
      category: 'sysarch',
    },
    {
      key: 'atlas',
      title: 'Atlassian P20: Distributed Notification Pipeline & Event Sourcing',
      time: '2 weeks ago',
      badge: 'BORDERLINE',
      badgeClass: 'bg-surface-container-highest text-tertiary',
      score: '76%',
      summary: 'Addressed consumer groups adequately, but failed to address Kafka consumer partition rebalance storms during pod redeployment.',
      tags: ['Apache Kafka', 'Event-Driven', 'Dead Letter Queue'],
      duration: '50m 10s',
      category: 'sysarch',
    },
    {
      key: 'hft',
      title: 'FinTech HFT: Lockless Ring Buffers & L1/L2 Cache Locality',
      time: '2 weeks ago',
      badge: 'CLEARED',
      badgeClass: 'bg-secondary-container text-on-secondary-container',
      score: '82%',
      summary: 'Good grasp of CPU memory barriers and false sharing prevention. Minor gap in explainable atomic CAS memory orders.',
      tags: ['Lock-Free', 'Cache Lines', 'Low-Latency'],
      duration: '45m 30s',
      category: 'dsa',
    },
  ];

  const filteredCards = allSessionCards.filter((card) => {
    if (trackFilter !== 'all' && card.category !== trackFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match =
        card.title.toLowerCase().includes(q) ||
        card.summary.toLowerCase().includes(q) ||
        card.tags.some((t) => t.toLowerCase().includes(q));
      if (!match) return false;
    }
    if (verdictFilter === 'cleared') {
      if (!card.badge.includes('CLEARED') && !card.badge.includes('EXEMPLARY') && !card.badge.includes('STRONG HIRE'))
        return false;
    } else if (verdictFilter === 'borderline') {
      if (!card.badge.includes('BORDERLINE')) return false;
    }
    return true;
  });

  const handleExportDossier = () => {
    setExportingDossier(true);
    setTimeout(() => {
      setExportingDossier(false);
      alert('MockPulse Placement Dossier compiled and exported (Audit_Dossier_Rohan_Sharma_AMZ99120.pdf)');
    }, 1200);
  };

  return (
    <div className="w-full flex flex-col bg-surface min-h-[calc(100vh-4rem)]">
      {/* Top Banner & Control Ribbon */}
      <section className="w-full px-3 sm:px-gutter pt-4 sm:pt-space-lg pb-3 sm:pb-space-md bg-[#0a0e17] border-b border-surface-container">
        <div className="max-w-[1720px] mx-auto flex flex-col gap-space-md">
          {/* Top Meta Breadcrumb + Action Controls */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-md">
            <div className="flex flex-col gap-space-xs">
              <div className="flex items-center gap-space-xs">
                <span className="font-label-caps text-label-caps uppercase text-secondary">
                  EVALUATION TELEMETRY ARCHIVE
                </span>
                <span className="text-outline-variant font-body-sm">/</span>
                <span className="font-label-caps text-label-caps uppercase text-tertiary">
                  TIER-1 PLACEMENT BENCHMARK v3.4
                </span>
              </div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                Interview History &amp; Detailed Feedback
              </h1>
            </div>

            {/* Metric Stat Badges */}
            <div className="flex flex-wrap items-center gap-space-xs sm:gap-space-sm">
              <div className="px-space-md py-space-xs rounded-xl bg-surface-container-low flex items-center gap-space-sm shadow-sm border border-surface-container">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                <div className="flex flex-col">
                  <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Mocks Completed</span>
                  <span className="font-telemetry-metric text-telemetry-metric text-on-surface leading-none">
                    24 Sessions
                  </span>
                </div>
              </div>

              <div className="px-space-md py-space-xs rounded-xl bg-surface-container-low flex items-center gap-space-sm shadow-sm border border-surface-container">
                <span className="material-symbols-outlined text-secondary text-[20px]">analytics</span>
                <div className="flex flex-col">
                  <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Aggregate Score</span>
                  <span className="font-telemetry-metric text-telemetry-metric text-secondary leading-none">
                    88.5% <span className="font-body-sm text-body-sm text-tertiary font-normal">(Day-1 Ready)</span>
                  </span>
                </div>
              </div>

              <div className="px-space-md py-space-xs rounded-xl bg-surface-container-low flex items-center gap-space-sm shadow-sm border border-surface-container">
                <span className="material-symbols-outlined text-tertiary text-[20px]">verified</span>
                <div className="flex flex-col">
                  <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">TPO Clearance</span>
                  <span className="font-telemetry-metric text-telemetry-metric text-tertiary leading-none">
                    FAANG Tier-A
                  </span>
                </div>
              </div>

              <button
                onClick={handleExportDossier}
                disabled={exportingDossier}
                className="flex items-center gap-space-xs px-space-md py-space-xs rounded-xl bg-primary text-on-primary font-headline-sm text-body-sm shadow-[0_0_16px_-2px_rgba(99,102,241,0.35)] hover:bg-primary-container hover:text-on-primary-container active:scale-95 transition-all cursor-pointer disabled:opacity-60"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {exportingDossier ? 'progress_activity' : 'picture_as_pdf'}
                </span>
                <span>{exportingDossier ? 'Compiling Dossier...' : 'Export Full Dossier (PDF)'}</span>
              </button>
            </div>
          </div>

          {/* Segment Filter Ribbons */}
          <div className="pt-space-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-space-sm">
            {/* Track Tabs */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-surface-container overflow-x-auto border border-surface-container-high">
              <button
                onClick={() => setTrackFilter('all')}
                className={`px-space-md py-space-xs rounded-lg font-headline-sm text-body-sm whitespace-nowrap transition-all cursor-pointer ${
                  trackFilter === 'all'
                    ? 'bg-primary-container text-on-primary-container font-semibold'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                All (24)
              </button>
              <button
                onClick={() => setTrackFilter('faang')}
                className={`px-space-md py-space-xs rounded-lg font-headline-sm text-body-sm whitespace-nowrap transition-all cursor-pointer ${
                  trackFilter === 'faang'
                    ? 'bg-primary-container text-on-primary-container font-semibold'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                FAANG Bar Raiser (8)
              </button>
              <button
                onClick={() => setTrackFilter('dsa')}
                className={`px-space-md py-space-xs rounded-lg font-headline-sm text-body-sm whitespace-nowrap transition-all cursor-pointer ${
                  trackFilter === 'dsa'
                    ? 'bg-primary-container text-on-primary-container font-semibold'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Coding &amp; DSA (10)
              </button>
              <button
                onClick={() => setTrackFilter('sysarch')}
                className={`px-space-md py-space-xs rounded-lg font-headline-sm text-body-sm whitespace-nowrap transition-all cursor-pointer ${
                  trackFilter === 'sysarch'
                    ? 'bg-primary-container text-on-primary-container font-semibold'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                System Architecture (4)
              </button>
            </div>

            {/* Filter Sub-Controls */}
            <div className="flex items-center gap-space-xs">
              <div className="flex items-center gap-1.5 px-space-md py-space-xs rounded-xl bg-surface-container-low text-on-surface-variant text-body-sm border border-surface-container">
                <span className="material-symbols-outlined text-[16px] text-outline">calendar_month</span>
                <select className="bg-transparent font-body-sm text-body-sm text-on-surface focus:outline-none cursor-pointer">
                  <option className="bg-surface-container text-on-surface" value="last-30">Last 30 Days</option>
                  <option className="bg-surface-container text-on-surface" value="last-90">Pre-Placement Drive (90 Days)</option>
                  <option className="bg-surface-container text-on-surface" value="all-time">Full 7th Sem Archive</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5 px-space-md py-space-xs rounded-xl bg-surface-container-low text-on-surface-variant text-body-sm border border-surface-container">
                <span className="material-symbols-outlined text-[16px] text-outline">filter_alt</span>
                <select
                  value={verdictFilter}
                  onChange={(e) => setVerdictFilter(e.target.value)}
                  className="bg-transparent font-body-sm text-body-sm text-on-surface focus:outline-none cursor-pointer"
                >
                  <option className="bg-surface-container text-on-surface" value="all">Verdict: All</option>
                  <option className="bg-surface-container text-on-surface" value="cleared">Cleared Benchmark</option>
                  <option className="bg-surface-container text-on-surface" value="borderline">Borderline Review</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Master-Detail Canvas */}
      <main className="w-full px-3 sm:px-gutter py-4 sm:py-space-lg flex-1">
        <div className="max-w-[1720px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
          {/* LEFT COLUMN (5 cols): Sessions List */}
          <div className="lg:col-span-5 flex flex-col gap-space-md">
            {/* Live Search */}
            <div className="relative w-full">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[18px] text-outline">
                search
              </span>
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by question, algorithm, or company tag..."
                className="w-full pl-10 pr-space-md py-space-xs rounded-xl bg-surface-container-low text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container border border-surface-container shadow-sm transition-all"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-label-caps text-outline bg-surface-container-high px-1.5 py-0.5 rounded">
                <span>⌘</span><span>K</span>
              </div>
            </div>

            {/* Session Cards Feed */}
            <div className="flex flex-col gap-space-sm">
              {filteredCards.map((card) => {
                const isSelected = selectedSessionKey === card.key;
                return (
                  <div
                    key={card.key}
                    onClick={() => setSelectedSessionKey(card.key)}
                    className={`p-space-md rounded-xl cursor-pointer shadow-md transition-all relative overflow-hidden border ${
                      isSelected
                        ? 'bg-surface-container border-primary/60'
                        : 'bg-surface-container-low border-surface-container hover:bg-surface-container'
                    }`}
                  >
                    {isSelected && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary"></div>}

                    <div className="flex items-start justify-between gap-space-sm mb-2">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className={`px-2 py-0.5 rounded-full font-label-caps text-label-caps uppercase font-bold tracking-wider ${card.badgeClass}`}>
                            {card.badge}
                          </span>
                          <span className="font-body-sm text-body-sm text-outline-variant">• {card.time}</span>
                        </div>
                        <h3 className="font-headline-sm text-body-lg text-on-surface font-semibold leading-snug">
                          {card.title}
                        </h3>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="font-telemetry-metric text-telemetry-metric text-secondary font-bold">
                          {card.score}
                        </span>
                        <span className="font-label-caps text-[10px] text-on-surface-variant uppercase">
                          INDEX SCORE
                        </span>
                      </div>
                    </div>

                    <p className="font-body-sm text-body-sm text-on-surface-variant mb-3 line-clamp-2">
                      {card.summary}
                    </p>

                    <div className="flex flex-wrap items-center gap-1.5">
                      {card.tags.map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface text-label-caps font-label-caps"
                        >
                          {t}
                        </span>
                      ))}
                      <span className="ml-auto font-body-sm text-body-sm text-outline flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">videocam</span> {card.duration}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Archival Status Footer */}
            <div className="p-space-sm rounded-xl bg-surface-container-lowest flex items-center justify-between text-outline-variant font-label-caps text-label-caps border border-surface-container">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px] text-tertiary">check_circle</span>
                ALL CODE REPOSITORIES BACKED UP TO S3
              </span>
              <span className="text-on-surface-variant">SHOWING {filteredCards.length} OF 24</span>
            </div>
          </div>

          {/* RIGHT COLUMN (7 cols): Granular Session Deep-Dive Review */}
          <div className="lg:col-span-7 flex flex-col gap-space-lg">
            {/* Header Banner & AI Bar Raiser Persona Card */}
            <div className="w-full p-space-lg rounded-2xl bg-surface-container shadow-xl relative overflow-hidden border border-surface-container-high">
              <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-primary/10 blur-3xl pointer-events-none"></div>

              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md mb-space-md">
                <div>
                  <div className="flex items-center gap-space-xs mb-1">
                    <span className="px-2 py-0.5 rounded bg-tertiary-container text-on-tertiary font-label-caps text-label-caps font-bold">
                      {activeSession.cohort}
                    </span>
                    <span className="font-label-caps text-label-caps text-outline-variant">
                      PULSE SESSION #{activeSession.refCode}
                    </span>
                  </div>
                  <h2 className="font-headline-md text-headline-md text-on-surface font-semibold tracking-tight">
                    {activeSession.title}
                  </h2>
                </div>

                <div className="flex items-center gap-space-md px-space-md py-space-sm rounded-xl bg-surface-container-high shadow-inner border border-surface-container-highest">
                  <div className="flex flex-col text-right">
                    <span className="font-label-caps text-[10px] text-on-surface-variant uppercase">AUDIT VERDICT</span>
                    <span className="font-headline-sm text-body-sm text-secondary font-bold">
                      {activeSession.verdict}
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-primary-container/20 flex items-center justify-center font-telemetry-metric text-headline-sm text-primary">
                    {activeSession.score}
                  </div>
                </div>
              </div>

              {/* Persona Info Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm pt-space-xs pb-space-sm">
                <div className="p-space-sm rounded-lg bg-surface-container-low flex items-center gap-space-sm border border-surface-container">
                  <img
                    alt="Evaluator Avatar"
                    className="w-10 h-10 rounded-full object-cover shadow-sm"
                    src={activeSession.evaluatorAvatar}
                  />
                  <div className="flex flex-col">
                    <span className="font-label-caps text-label-caps text-on-surface-variant">BAR RAISER AI EVALUATOR</span>
                    <span className="font-headline-sm text-body-sm text-on-surface font-semibold truncate">
                      {activeSession.evaluator}
                    </span>
                  </div>
                </div>

                <div className="p-space-sm rounded-lg bg-surface-container-low flex items-center gap-space-sm border border-surface-container">
                  <span className="material-symbols-outlined text-secondary text-[24px]">timer</span>
                  <div className="flex flex-col">
                    <span className="font-label-caps text-label-caps text-on-surface-variant">DURATION AUDITED</span>
                    <span className="font-telemetry-metric text-body-lg text-on-surface font-bold">
                      {activeSession.duration}
                    </span>
                  </div>
                </div>

                <div className="p-space-sm rounded-lg bg-surface-container-low flex items-center gap-space-sm border border-surface-container">
                  <span className="material-symbols-outlined text-tertiary text-[24px]">verified_user</span>
                  <div className="flex flex-col">
                    <span className="font-label-caps text-label-caps text-on-surface-variant">TPO ACCREDITATION</span>
                    <span className="font-headline-sm text-body-sm text-tertiary font-semibold">Verified IIT/NIT Pass</span>
                  </div>
                </div>
              </div>

              {/* Interactive Audio & Code Scrub Bar */}
              <div className="mt-space-sm p-space-md rounded-xl bg-[#0a0e17] flex flex-col gap-space-xs shadow-md border border-surface-container">
                <div className="flex items-center justify-between text-body-sm">
                  <div className="flex items-center gap-space-xs">
                    <button
                      onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                      className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {isPlayingAudio ? 'pause' : 'play_arrow'}
                      </span>
                    </button>
                    <span className="font-label-caps text-label-caps text-on-surface uppercase tracking-wide">
                      Synchronized Telemetry Stream:
                    </span>
                    <span className="font-telemetry-metric text-body-sm text-secondary">
                      {formatScrubTime(currentTimeSec)}
                    </span>
                    <span className="font-body-sm text-body-sm text-outline-variant">/ 48:12</span>
                  </div>

                  <div className="hidden sm:flex items-center gap-space-md text-[11px] font-label-caps">
                    <span className="flex items-center gap-1 text-on-surface">
                      <span className="w-2 h-2 rounded-full bg-secondary"></span> Optimal Cadence
                    </span>
                    <span className="flex items-center gap-1 text-on-surface">
                      <span className="w-2 h-2 rounded-full bg-tertiary"></span> Hesitation / Pause
                    </span>
                    <span className="flex items-center gap-1 text-on-surface">
                      <span className="w-2 h-2 rounded-full bg-primary"></span> High STAR Density
                    </span>
                  </div>
                </div>

                {/* Waveform Canvas */}
                <div
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
                    setCurrentTimeSec(Math.floor(pct * 2892));
                  }}
                  className="relative w-full h-12 flex items-center gap-[3px] py-1 cursor-pointer overflow-hidden"
                >
                  <div className="w-1.5 h-4 bg-secondary/50 rounded-full"></div>
                  <div className="w-1.5 h-6 bg-secondary/70 rounded-full"></div>
                  <div className="w-1.5 h-8 bg-secondary rounded-full"></div>
                  <div className="w-1.5 h-10 bg-secondary rounded-full"></div>
                  <div className="w-1.5 h-5 bg-secondary/60 rounded-full"></div>
                  <div className="w-1.5 h-3 bg-tertiary rounded-full animate-pulse"></div>
                  <div className="w-1.5 h-2 bg-tertiary/70 rounded-full"></div>
                  <div className="w-1.5 h-7 bg-secondary/80 rounded-full"></div>
                  <div className="w-1.5 h-9 bg-primary rounded-full"></div>
                  <div className="w-1.5 h-11 bg-primary rounded-full"></div>
                  <div className="w-1.5 h-8 bg-primary rounded-full"></div>
                  <div className="w-1.5 h-6 bg-secondary/90 rounded-full"></div>
                  <div className="w-1.5 h-4 bg-secondary/60 rounded-full"></div>
                  <div className="w-1.5 h-10 bg-secondary rounded-full"></div>
                  <div className="w-1.5 h-12 bg-secondary rounded-full"></div>
                  <div className="w-1.5 h-9 bg-secondary rounded-full"></div>
                  <div className="w-1.5 h-6 bg-tertiary rounded-full"></div>
                  <div className="w-1.5 h-4 bg-tertiary rounded-full"></div>
                  <div className="w-1.5 h-8 bg-primary rounded-full"></div>
                  <div className="w-1.5 h-11 bg-primary rounded-full"></div>
                  <div className="w-1.5 h-10 bg-secondary rounded-full"></div>
                  <div className="w-1.5 h-7 bg-secondary/70 rounded-full"></div>
                  <div className="w-1.5 h-5 bg-secondary/50 rounded-full"></div>
                  <div className="w-1.5 h-8 bg-secondary rounded-full"></div>
                  <div className="w-1.5 h-10 bg-secondary rounded-full"></div>
                  <div className="w-1.5 h-6 bg-secondary/80 rounded-full"></div>
                  <div className="w-1.5 h-3 bg-secondary/40 rounded-full"></div>
                  <div className="w-1.5 h-9 bg-primary rounded-full"></div>
                  <div className="w-1.5 h-12 bg-primary rounded-full"></div>
                  <div className="w-1.5 h-7 bg-secondary/60 rounded-full"></div>
                  <div className="w-1.5 h-5 bg-secondary/40 rounded-full"></div>
                  <div className="w-1.5 h-8 bg-secondary rounded-full"></div>
                  <div className="w-1.5 h-10 bg-secondary rounded-full"></div>
                  <div className="w-1.5 h-11 bg-secondary rounded-full"></div>
                  <div className="w-1.5 h-6 bg-tertiary rounded-full"></div>
                  <div className="w-1.5 h-4 bg-tertiary/70 rounded-full"></div>
                  <div className="w-1.5 h-7 bg-secondary rounded-full"></div>
                  <div className="w-1.5 h-9 bg-secondary rounded-full"></div>
                  <div className="w-1.5 h-12 bg-primary rounded-full"></div>
                  <div className="w-1.5 h-8 bg-primary rounded-full"></div>
                  <div className="w-1.5 h-5 bg-secondary/60 rounded-full"></div>

                  {/* Scrubber marker */}
                  <div
                    style={{ left: `${Math.min((currentTimeSec / 2892) * 100, 98)}%` }}
                    className="absolute top-0 bottom-0 w-0.5 bg-tertiary flex items-center justify-center pointer-events-none"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-tertiary shadow-[0_0_8px_rgba(245,158,11,0.8)]"></span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] font-label-caps text-outline-variant pt-1">
                  <span>00:00 (Introductions)</span>
                  <span>12:30 (Token Bucket Architecture)</span>
                  <span className="text-tertiary font-bold">18:42 (Split Brain Defense)</span>
                  <span>35:00 (STAR Experience)</span>
                  <span>48:12 (Wrap-up)</span>
                </div>
              </div>
            </div>

            {/* 4-Quadrant Metric Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
              {/* Q1 */}
              <div className="p-space-md rounded-xl bg-surface-container flex flex-col justify-between shadow-md border border-surface-container-high">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-secondary text-[20px]">account_tree</span>
                      <span className="font-headline-sm text-body-md text-on-surface font-semibold">{activeSession.q1Title}</span>
                    </div>
                    <span className="font-telemetry-metric text-telemetry-metric text-secondary">{activeSession.q1Score}</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-sm leading-relaxed">
                    {activeSession.q1Desc}
                  </p>
                </div>
                <div className="pt-space-xs space-y-1.5">
                  <div className="flex justify-between text-label-caps font-label-caps text-on-surface-variant">
                    <span>Atomic Execution</span>
                    <span className="text-on-surface font-bold">100% (Pass)</span>
                  </div>
                  <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                    <div className="h-full bg-secondary rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>
              </div>

              {/* Q2 */}
              <div className="p-space-md rounded-xl bg-surface-container flex flex-col justify-between shadow-md border border-surface-container-high">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-primary text-[20px]">memory</span>
                      <span className="font-headline-sm text-body-md text-on-surface font-semibold">{activeSession.q2Title}</span>
                    </div>
                    <span className="font-telemetry-metric text-telemetry-metric text-primary">{activeSession.q2Score}</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-sm leading-relaxed">
                    {activeSession.q2Desc}
                  </p>
                </div>
                <div className="pt-space-xs space-y-1.5">
                  <div className="flex justify-between text-label-caps font-label-caps text-on-surface-variant">
                    <span>Complexity Profiling</span>
                    <span className="text-on-surface font-bold">92%</span>
                  </div>
                  <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
              </div>

              {/* Q3 */}
              <div className="p-space-md rounded-xl bg-surface-container flex flex-col justify-between shadow-md border border-surface-container-high">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-secondary text-[20px]">record_voice_over</span>
                      <span className="font-headline-sm text-body-md text-on-surface font-semibold">{activeSession.q3Title}</span>
                    </div>
                    <span className="font-telemetry-metric text-telemetry-metric text-secondary">{activeSession.q3Score}</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-sm leading-relaxed">
                    {activeSession.q3Desc}
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-2 pt-space-xs text-center">
                  <div className="p-2 rounded-lg bg-surface-container-high">
                    <span className="font-label-caps text-[10px] text-outline-variant block">SPEECH PACE</span>
                    <span className="font-telemetry-metric text-body-md text-secondary font-bold">138 WPM</span>
                  </div>
                  <div className="p-2 rounded-lg bg-surface-container-high">
                    <span className="font-label-caps text-[10px] text-outline-variant block">EYE CONTACT</span>
                    <span className="font-telemetry-metric text-body-md text-secondary font-bold">92%</span>
                  </div>
                  <div className="p-2 rounded-lg bg-surface-container-high">
                    <span className="font-label-caps text-[10px] text-outline-variant block">FILLER WORDS</span>
                    <span className="font-telemetry-metric text-body-md text-secondary font-bold">1.4%</span>
                  </div>
                </div>
              </div>

              {/* Q4 */}
              <div className="p-space-md rounded-xl bg-surface-container flex flex-col justify-between shadow-md border border-surface-container-high">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-tertiary text-[20px]">corporate_fare</span>
                      <span className="font-headline-sm text-body-md text-on-surface font-semibold">{activeSession.q4Title}</span>
                    </div>
                    <span className="font-telemetry-metric text-telemetry-metric text-tertiary">{activeSession.q4Score}</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-sm leading-relaxed">
                    {activeSession.q4Desc}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-space-xs">
                  <span className="px-2 py-1 rounded bg-surface-container-high text-secondary text-label-caps font-label-caps flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">done</span> Customer Obsession: High
                  </span>
                  <span className="px-2 py-1 rounded bg-surface-container-high text-secondary text-label-caps font-label-caps flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">done</span> Dive Deep: Exemplary
                  </span>
                  <span className="px-2 py-1 rounded bg-surface-container-high text-tertiary text-label-caps font-label-caps flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">priority_high</span> Bias for Action: Good
                  </span>
                </div>
              </div>
            </div>

            {/* Synchronized Transcript */}
            <div className="w-full p-space-lg rounded-2xl bg-surface-container shadow-md flex flex-col gap-space-md border border-surface-container-high">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-secondary text-[22px]">record_voice_over</span>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                    Audited Moments of Truth &amp; Speech Transcript
                  </h3>
                </div>
                <span className="font-label-caps text-label-caps text-outline-variant">
                  PULSE STT ENGINE • ACCURACY 99.4%
                </span>
              </div>

              <div className="flex flex-col gap-space-sm">
                {activeSession.transcriptTurns.map((turn: any, idx: number) => (
                  <div
                    key={idx}
                    className={`p-space-md rounded-xl flex flex-col gap-space-xs border ${
                      turn.speaker === 'ai'
                        ? 'bg-surface-container-low border-surface-container'
                        : 'bg-surface-container-high border-primary/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-space-xs">
                        <span className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center font-headline-sm text-[12px] text-secondary">
                          {turn.speaker === 'ai' ? 'AI' : 'YOU'}
                        </span>
                        <span className="font-headline-sm text-body-sm text-on-surface font-semibold">{turn.name}</span>
                        <span className="font-telemetry-metric text-body-sm text-secondary ml-2">{turn.time}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-surface-container-highest text-outline font-label-caps text-[10px]">
                        {turn.badge}
                      </span>
                    </div>

                    <p className="font-body-md text-body-md text-on-surface leading-relaxed pl-8">
                      {turn.text}
                    </p>

                    {turn.evaluatorNote && (
                      <div className="ml-8 mt-1 p-space-xs px-space-sm rounded-lg bg-[#0a0e17] flex items-center gap-space-xs text-body-sm text-secondary border border-secondary/20">
                        <span className="material-symbols-outlined text-[16px]">psychology</span>
                        <span>{turn.evaluatorNote}</span>
                      </div>
                    )}

                    {turn.latencyWarning && (
                      <div className="ml-8 mt-1 p-space-xs px-space-sm rounded-lg bg-surface-container-highest flex items-center justify-between border border-tertiary/20">
                        <div className="flex items-center gap-space-xs text-body-sm text-tertiary">
                          <span className="material-symbols-outlined text-[16px]">timer_pause</span>
                          <span>{turn.latencyWarning}</span>
                        </div>
                        <span className="font-label-caps text-label-caps text-tertiary uppercase">
                          Remediation Suggested Below
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Prescriptive Remediation & 1-Click Drills */}
            <div className="w-full p-space-lg rounded-2xl bg-surface-container shadow-md flex flex-col gap-space-md border border-surface-container-high">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-tertiary text-[22px]">flag_circle</span>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                    Prescriptive Remediation &amp; 1-Click Launch Drills
                  </h3>
                </div>
                <span className="font-label-caps text-label-caps text-tertiary uppercase">
                  CALIBRATED FOR DAY-1 CLEARANCE
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                {activeSession.drills.map((drill: any, idx: number) => (
                  <div
                    key={idx}
                    className="p-space-md rounded-xl bg-surface-container-low flex flex-col justify-between shadow-sm border border-surface-container"
                  >
                    <div className="space-y-space-xs">
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded bg-surface-container-highest text-tertiary font-label-caps text-[10px] uppercase font-bold">
                          IDENTIFIED GAP
                        </span>
                        <span className="font-body-sm text-body-sm text-outline-variant">EST: {drill.est}</span>
                      </div>
                      <h4 className="font-headline-sm text-body-lg text-on-surface font-semibold">{drill.title}</h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">{drill.desc}</p>
                    </div>

                    <div className="pt-space-md">
                      <button
                        onClick={() => setActiveDrillModal(drill.title)}
                        className="w-full py-space-xs px-space-md rounded-lg bg-primary text-on-primary hover:bg-primary-container font-headline-sm text-body-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
                      >
                        <span className="material-symbols-outlined text-[18px]">play_circle</span>
                        <span>{drill.btn}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Verification Ribbon */}
              <div className="p-space-md rounded-xl bg-[#0a0e17] flex flex-col sm:flex-row items-center justify-between gap-space-sm shadow-md border border-surface-container">
                <div className="flex items-center gap-space-sm">
                  <span className="material-symbols-outlined text-tertiary text-[28px]">verified</span>
                  <div className="flex flex-col">
                    <span className="font-headline-sm text-body-sm text-on-surface font-semibold">
                      Institutional Placement Audit Status: CERTIFIED
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Session telemetry verified and hashed into student TPO dossier (Cryptographic Hash: #d4a9-8f01). Eligible for direct Day-1 shortlist bypass.
                    </span>
                  </div>
                </div>
                <div className="px-space-md py-1.5 rounded-lg bg-surface-container-high text-on-surface font-label-caps text-label-caps uppercase whitespace-nowrap border border-surface-container-highest">
                  SEAL: IIT-NIT TPO PASS
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Drill Launcher Modal */}
      {activeDrillModal && (
        <div className="fixed inset-0 z-50 bg-[#0a0e17]/80 backdrop-blur-md flex items-center justify-center p-space-md">
          <div className="bg-surface-container-low border border-surface-container-high rounded-xl max-w-md w-full p-space-lg flex flex-col gap-space-md shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-surface-variant">
              <span className="font-headline-sm text-body-md font-semibold text-on-surface">
                {activeDrillModal}
              </span>
              <button onClick={() => setActiveDrillModal(null)} className="text-on-surface-variant cursor-pointer">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <p className="text-body-md text-on-surface-variant">
              Loading test harness &amp; initializing simulated Bar-Raiser prompt...
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setActiveDrillModal(null)}
                className="px-4 py-1.5 rounded-lg bg-surface-container text-body-sm hover:bg-surface-container-high cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setActiveDrillModal(null);
                  onNavigate('coding-ide');
                }}
                className="px-4 py-1.5 rounded-lg bg-primary text-on-primary font-headline-sm text-body-sm hover:brightness-110 cursor-pointer"
              >
                Launch In IDE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
