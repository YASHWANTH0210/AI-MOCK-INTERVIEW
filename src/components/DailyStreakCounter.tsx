import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

export interface DailyStreakCounterProps {
  onNavigate: (tab: any) => void;
  compact?: boolean;
  onOpenFullModal?: () => void;
}

interface DayActivity {
  dayLabel: string;
  dayShort: string;
  dateStr: string;
  status: 'completed' | 'freeze_used' | 'today_completed' | 'today_pending' | 'future';
  solvedCount: number;
  activityType?: string;
  summary?: string;
}

export const DailyStreakCounter: React.FC<DailyStreakCounterProps> = ({
  onNavigate,
  compact = false,
  onOpenFullModal,
}) => {
  // Streak state with persistence fallback
  const [streakDays, setStreakDays] = useState<number>(() => {
    const saved = localStorage.getItem('mockpulse_streak_days');
    return saved ? parseInt(saved, 10) : 19;
  });

  const [hasCompletedToday, setHasCompletedToday] = useState<boolean>(() => {
    const saved = localStorage.getItem('mockpulse_streak_today_completed');
    return saved ? saved === 'true' : true;
  });

  const [freezeShields, setFreezeShields] = useState<number>(1);
  const [showRewardsModal, setShowRewardsModal] = useState(false);
  const [selectedDayDetail, setSelectedDayDetail] = useState<DayActivity | null>(null);
  const [toastNotice, setToastNotice] = useState<string | null>(null);

  // Daily goals state
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Solve 1 Medium/Hard DSA in Code IDE',
      target: '1 Problem',
      done: true,
      points: '+25 XP',
      route: 'coding-ide',
    },
    {
      id: 2,
      title: 'Complete 1 Live AI Mock (Voice/Behavioral)',
      target: '1 Session',
      done: true,
      points: '+50 XP',
      route: 'live-ai-mock',
    },
    {
      id: 3,
      title: 'Review System Design / Core CS Theory',
      target: '15 Mins',
      done: false,
      points: '+20 XP',
      route: 'coding-ide',
    },
  ]);

  // Rolling 14-day history
  const [historyDays, setHistoryDays] = useState<DayActivity[]>([
    { dayLabel: 'Sun, Sep 14', dayShort: 'S', dateStr: 'Sep 14', status: 'completed', solvedCount: 3, activityType: 'DSA', summary: 'Graph DFS & Matrix Traversal' },
    { dayLabel: 'Mon, Sep 15', dayShort: 'M', dateStr: 'Sep 15', status: 'completed', solvedCount: 4, activityType: 'Both', summary: 'Amazon SDE-1 Mock + LRU Cache' },
    { dayLabel: 'Tue, Sep 16', dayShort: 'T', dateStr: 'Sep 16', status: 'completed', solvedCount: 2, activityType: 'DSA', summary: 'Trie Insert & Search' },
    { dayLabel: 'Wed, Sep 17', dayShort: 'W', dateStr: 'Sep 17', status: 'completed', solvedCount: 5, activityType: 'Both', summary: 'Google L3 Mock + Segment Trees' },
    { dayLabel: 'Thu, Sep 18', dayShort: 'T', dateStr: 'Sep 18', status: 'completed', solvedCount: 3, activityType: 'Core', summary: 'OS Virtual Memory & Paging' },
    { dayLabel: 'Fri, Sep 19', dayShort: 'F', dateStr: 'Sep 19', status: 'completed', solvedCount: 2, activityType: 'DSA', summary: 'Dynamic Programming 2D Grid' },
    { dayLabel: 'Sat, Sep 20', dayShort: 'S', dateStr: 'Sep 20', status: 'completed', solvedCount: 4, activityType: 'Both', summary: 'Full 45-min Live AI Mock' },
    { dayLabel: 'Sun, Sep 21', dayShort: 'S', dateStr: 'Sep 21', status: 'completed', solvedCount: 3, activityType: 'DSA', summary: 'Binary Tree Inversion & LCA' },
    { dayLabel: 'Mon, Sep 22', dayShort: 'M', dateStr: 'Sep 22', status: 'completed', solvedCount: 5, activityType: 'Both', summary: 'Microsoft Multithreading Mock' },
    { dayLabel: 'Tue, Sep 23', dayShort: 'T', dateStr: 'Sep 23', status: 'completed', solvedCount: 4, activityType: 'DSA', summary: 'Sliding Window & Two Pointers' },
    { dayLabel: 'Wed, Sep 24', dayShort: 'W', dateStr: 'Sep 24', status: 'completed', solvedCount: 3, activityType: 'Both', summary: 'Atlassian Rate Limiter Mock' },
    { dayLabel: 'Thu, Sep 25', dayShort: 'T', dateStr: 'Sep 25', status: 'completed', solvedCount: 4, activityType: 'DSA', summary: 'Topological Sort on DAGs' },
    { dayLabel: 'Fri, Sep 26 (Today)', dayShort: 'F', dateStr: 'Today', status: 'today_completed', solvedCount: 2, activityType: 'Both', summary: '2 Tasks Completed: SDE-1 Code + Voice' },
    { dayLabel: 'Sat, Sep 27 (Tomorrow)', dayShort: 'S', dateStr: 'Tomorrow', status: 'future', solvedCount: 0, activityType: 'Upcoming', summary: 'Day 20 Milestone: 1 Mock to Unlock Grandmaster' },
  ]);

  const triggerConfetti = () => {
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#4edea3', '#38bdf8', '#fbbf24', '#c084fc'],
    });
  };

  const handleToggleTask = (taskId: number) => {
    const updated = tasks.map((t) => (t.id === taskId ? { ...t, done: !t.done } : t));
    setTasks(updated);

    const allDone = updated.every((t) => t.done);
    if (allDone && !hasCompletedToday) {
      handleCompleteDay();
    }
  };

  const handleCompleteDay = () => {
    if (!hasCompletedToday) {
      const nextStreak = streakDays + 1;
      setStreakDays(nextStreak);
      setHasCompletedToday(true);
      localStorage.setItem('mockpulse_streak_days', nextStreak.toString());
      localStorage.setItem('mockpulse_streak_today_completed', 'true');

      // Sync streak to Firestore for authenticated user
      if (auth.currentUser) {
        const userRef = doc(db, 'users', auth.currentUser.uid);
        updateDoc(userRef, {
          streakCount: nextStreak,
          lastActiveDate: new Date().toISOString().split('T')[0],
        }).catch((err) => console.warn('Could not sync streak to Firestore:', err));
      }

      // Update today's tile
      setHistoryDays((prev) =>
        prev.map((d) =>
          d.dateStr === 'Today'
            ? { ...d, status: 'today_completed', solvedCount: d.solvedCount + 1 }
            : d
        )
      );

      triggerConfetti();
      setToastNotice(`🔥 Streak Extended to ${nextStreak} Days! Consistency Multiplier Active!`);
      setTimeout(() => setToastNotice(null), 3500);
    }
  };

  const handleUseFreeze = () => {
    if (freezeShields > 0) {
      setFreezeShields(0);
      setToastNotice('🛡️ Streak Freeze Shield Armed! Your 19-day streak is protected for 48 hours.');
      setTimeout(() => setToastNotice(null), 3500);
    } else {
      setToastNotice('No freeze shields left! Complete a 7-day streak milestone to earn your next shield.');
      setTimeout(() => setToastNotice(null), 3500);
    }
  };

  // Milestone Progress calculations
  const nextMilestoneDays = 21;
  const prevMilestoneDays = 14;
  const progressPercent = Math.min(
    100,
    Math.round(((streakDays - prevMilestoneDays) / (nextMilestoneDays - prevMilestoneDays)) * 100)
  );

  // If compact widget (for Top Telemetry grid replacement)
  if (compact) {
    return (
      <div 
        onClick={onOpenFullModal || (() => setShowRewardsModal(true))}
        className="relative rounded-xl bg-surface-container-low p-space-md flex flex-col justify-between shadow-lg overflow-hidden border border-surface-container hover:border-tertiary/60 transition-all cursor-pointer group"
      >
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">
                Daily Practice Streak
              </span>
              <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
            </div>
            <div className="flex items-baseline gap-space-xs">
              <span className="font-display text-display text-tertiary leading-none group-hover:scale-105 transition-transform">
                {streakDays}
              </span>
              <span className="font-body-md text-tertiary font-medium">Days Fire</span>
            </div>
          </div>
          <div className="p-2.5 rounded-lg bg-surface-container text-tertiary group-hover:bg-tertiary group-hover:text-black transition-all">
            <span className="material-symbols-outlined text-[26px]">local_fire_department</span>
          </div>
        </div>

        <div className="mt-space-md space-y-2">
          {/* Day of Week Dots */}
          <div className="flex items-center justify-between text-on-surface-variant font-label-caps text-[10px]">
            {historyDays.slice(7, 14).map((d, i) => (
              <span key={i} className={d.dateStr === 'Today' ? 'text-tertiary font-bold' : ''}>
                {d.dayShort}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {historyDays.slice(7, 14).map((d, i) => {
              const isToday = d.dateStr === 'Today';
              const isDone = d.status === 'completed' || d.status === 'today_completed';
              return (
                <div
                  key={i}
                  className={`h-2 rounded-full transition-all ${
                    isToday
                      ? isDone
                        ? 'bg-tertiary animate-pulse'
                        : 'bg-tertiary/40 border border-tertiary'
                      : isDone
                      ? 'bg-tertiary'
                      : 'bg-surface-container-highest'
                  }`}
                  title={`${d.dayLabel}: ${d.summary}`}
                />
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-1 text-[11px] font-mono">
            <span className="text-secondary flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">shield</span>
              1 Shield Active
            </span>
            <span className="text-on-surface-variant group-hover:text-tertiary transition-colors">
              {streakDays >= 21 ? 'Grandmaster' : `${21 - streakDays}d to Grandmaster →`}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Full Rich Dashboard Section
  return (
    <section className="rounded-xl bg-surface-container-low p-space-lg shadow-xl relative overflow-hidden border border-surface-container">
      {/* Background Subtle Gradient */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-tertiary/5 blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md mb-space-lg relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="material-symbols-outlined text-tertiary text-xl">local_fire_department</span>
            <span className="font-label-caps text-label-caps text-tertiary uppercase tracking-wider font-semibold">
              ENGINEERING CONSISTENCY ENGINE
            </span>
            <span className="text-slate-500">·</span>
            <span className="font-mono text-xs text-slate-400">Streak Level: Campus Titan</span>
          </div>

          <h2 className="font-headline-lg text-headline-sm md:text-headline-lg text-on-surface uppercase tracking-tight flex items-center gap-3">
            <span>{streakDays}-Day Practice Streak</span>
            <span className="text-xs font-mono font-normal normal-case px-2.5 py-1 rounded bg-tertiary/10 border border-tertiary/30 text-tertiary">
              1.25x Placement Multiplier Active
            </span>
          </h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant max-w-2xl mt-1">
            Engineered consistency separates top-tier campus offers from close misses. Practicing daily fortifies your cognitive muscle memory against interview fatigue.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <button
            onClick={handleUseFreeze}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high border border-surface-container-high text-xs font-mono text-slate-200 transition-colors"
            title="Arm streak freeze protection"
          >
            <span className="material-symbols-outlined text-sm text-secondary">shield</span>
            <span>{freezeShields > 0 ? '1 Freeze Armed' : '0 Freezes Left'}</span>
          </button>

          <button
            onClick={() => setShowRewardsModal(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high border border-surface-container-high text-xs font-mono text-tertiary transition-colors"
          >
            <span className="material-symbols-outlined text-sm">military_tech</span>
            <span>Milestone Perks ({streakDays}/21d)</span>
          </button>

          {!hasCompletedToday ? (
            <button
              onClick={handleCompleteDay}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-tertiary text-black font-semibold text-xs font-mono hover:brightness-110 active:scale-95 transition-all shadow-md shadow-tertiary/20"
            >
              <span className="material-symbols-outlined text-sm">check_circle</span>
              <span>Claim Today's Streak (+1 Day)</span>
            </button>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-emerald-400 font-mono text-xs">
              <span className="material-symbols-outlined text-sm">done_all</span>
              <span>Day Checked In!</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Grid: 14-Day Heatmap Strip + Daily Placement Quests */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg relative z-10">
        
        {/* Left 7 Cols: 14-Day Activity Heatmap & Milestone Progress */}
        <div className="lg:col-span-7 space-y-space-md">
          {/* Milestone Progress Bar */}
          <div className="p-space-md rounded-xl bg-surface-container border border-surface-container-high">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-base">workspace_premium</span>
                <span className="text-xs font-headline-sm uppercase text-on-surface font-semibold">
                  Next Milestone: Day-1 Grandmaster (21 Days)
                </span>
              </div>
              <span className="text-xs font-mono text-secondary font-bold">
                {21 - streakDays <= 0 ? 'Unlocked!' : `${21 - streakDays} Days Remaining`}
              </span>
            </div>

            <div className="w-full bg-[#0a0e17] h-2.5 rounded-full overflow-hidden mb-2">
              <div
                className="bg-gradient-to-r from-secondary via-tertiary to-primary h-full transition-all duration-700"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Day 14 (Campus Titan · Unlocked)</span>
              <span className="text-tertiary">{progressPercent}% Completed</span>
              <span>Day 21 (Grandmaster · TPO Seal)</span>
            </div>
          </div>

          {/* 14-Day Calendar Heatmap Visualizer */}
          <div className="p-space-md rounded-xl bg-surface-container border border-surface-container-high">
            <div className="flex items-center justify-between mb-3">
              <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
                14-Day Rolling Practice Ledger
              </span>
              <span className="text-[11px] font-mono text-tertiary">
                47 Problems Solved · 9 Mocks Executed
              </span>
            </div>

            <div className="grid grid-cols-7 sm:grid-cols-14 gap-1.5 sm:gap-2">
              {historyDays.map((d, i) => {
                const isToday = d.dateStr === 'Today';
                const isSelected = selectedDayDetail?.dateStr === d.dateStr;
                const isDone = d.status === 'completed' || d.status === 'today_completed';

                return (
                  <button
                    key={i}
                    onClick={() => setSelectedDayDetail(d)}
                    className={`flex flex-col items-center p-2 rounded-lg border transition-all text-center ${
                      isSelected
                        ? 'bg-[#1a253a] border-tertiary ring-1 ring-tertiary'
                        : isToday
                        ? 'bg-tertiary/10 border-tertiary/60'
                        : isDone
                        ? 'bg-[#0f172a] border-surface-container-highest hover:border-slate-500'
                        : 'bg-[#0a0e17] border-surface-container opacity-50'
                    }`}
                  >
                    <span className="text-[10px] font-mono text-slate-400 uppercase">
                      {d.dayShort}
                    </span>
                    <span className="text-[11px] font-bold font-mono text-white my-0.5">
                      {d.dateStr.replace('Sep ', '')}
                    </span>
                    <div className="mt-1">
                      {isDone ? (
                        <span className="material-symbols-outlined text-xs text-tertiary">
                          check_circle
                        </span>
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-slate-600 block my-1" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Day Inspector */}
            {selectedDayDetail && (
              <div className="mt-3 p-3 rounded-lg bg-[#0a0e17] border border-surface-container flex items-center justify-between text-xs font-mono animate-fade-in">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary text-base">event_available</span>
                  <div>
                    <span className="text-white font-semibold">{selectedDayDetail.dayLabel}:</span>{' '}
                    <span className="text-slate-300">{selectedDayDetail.summary}</span>
                  </div>
                </div>
                <span className="text-tertiary font-bold whitespace-nowrap">
                  {selectedDayDetail.solvedCount} Items Logged
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right 5 Cols: Today's Daily Practice Quests */}
        <div className="lg:col-span-5 p-space-md rounded-xl bg-surface-container border border-surface-container-high flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-surface-container-high">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-base">task_alt</span>
                <h3 className="font-headline-sm text-body-md text-on-surface font-semibold uppercase">
                  Today's Placement Quests
                </h3>
              </div>
              <span className="text-[11px] font-mono text-tertiary">
                {tasks.filter((t) => t.done).length}/{tasks.length} Completed
              </span>
            </div>

            <div className="space-y-2.5">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`p-3 rounded-lg border transition-all flex items-center justify-between gap-3 ${
                    task.done
                      ? 'bg-[#0f172a] border-emerald-500/30'
                      : 'bg-[#0a0e17] border-surface-container-highest hover:border-slate-500'
                  }`}
                >
                  <button
                    onClick={() => handleToggleTask(task.id)}
                    className="flex items-start gap-2.5 text-left flex-1"
                  >
                    <div
                      className={`w-5 h-5 rounded flex items-center justify-center font-mono text-xs shrink-0 mt-0.5 transition-colors ${
                        task.done
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : 'border border-slate-600 hover:border-primary'
                      }`}
                    >
                      {task.done && <span className="material-symbols-outlined text-sm">check</span>}
                    </div>
                    <div>
                      <div className={`text-xs font-medium ${task.done ? 'text-slate-300 line-through opacity-80' : 'text-white'}`}>
                        {task.title}
                      </div>
                      <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                        Target: {task.target} · <span className="text-secondary">{task.points}</span>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => onNavigate(task.route)}
                    className="px-2.5 py-1 rounded bg-surface-container-high hover:bg-primary hover:text-black text-slate-300 text-[11px] font-mono transition-colors shrink-0 flex items-center gap-1"
                  >
                    <span>Go</span>
                    <span className="material-symbols-outlined text-xs">arrow_forward</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Streak Reward Alert */}
          <div className="mt-4 pt-3 border-t border-surface-container-high flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-tertiary" />
              Streak Shield: 48h Grace Window
            </span>
            <button
              onClick={() => onNavigate('coding-ide')}
              className="text-tertiary hover:underline font-semibold"
            >
              Open IDE Sandbox →
            </button>
          </div>
        </div>

      </div>

      {/* Floating Toast Notification */}
      {toastNotice && (
        <div className="absolute bottom-4 right-4 z-50 animate-bounce-short">
          <div className="bg-[#0f172a] border border-tertiary text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 backdrop-blur-md">
            <span className="material-symbols-outlined text-tertiary text-xl">
              local_fire_department
            </span>
            <span className="text-xs font-mono text-slate-200">{toastNotice}</span>
          </div>
        </div>
      )}

      {/* Consistency Rewards & Milestones Modal */}
      {showRewardsModal && (
        <div className="fixed inset-0 z-50 bg-[#0a0e17]/85 backdrop-blur-md flex items-center justify-center p-space-md">
          <div className="bg-surface-container-low border border-surface-container-high rounded-2xl max-w-xl w-full p-space-lg shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-surface-variant mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary text-2xl">
                  military_tech
                </span>
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface uppercase">
                    Consistency &amp; Placement Multiplier Dossier
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">
                    Current Streak: {streakDays} Consecutive Days
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowRewardsModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded cursor-pointer"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            {/* Tiers List */}
            <div className="space-y-3 mb-6">
              {[
                {
                  days: '3 Days',
                  title: 'Code Initiate',
                  unlocked: streakDays >= 3,
                  perk: '+5% Baseline Score Multiplier · Access to Amazon starter mocks',
                  badgeColor: 'text-primary border-primary/30 bg-primary/10',
                },
                {
                  days: '7 Days',
                  title: 'Sprint Warrior',
                  unlocked: streakDays >= 7,
                  perk: 'Unlocks Hard Graph/Tree Questions & Priority AI Feedback Latency',
                  badgeColor: 'text-secondary border-secondary/30 bg-secondary/10',
                },
                {
                  days: '14 Days',
                  title: 'Campus Titan',
                  unlocked: streakDays >= 14,
                  perk: '1.25x Placement Readiness Multiplier · 1 Free Streak Freeze Protection Shield',
                  badgeColor: 'text-tertiary border-tertiary/30 bg-tertiary/10',
                },
                {
                  days: '21 Days',
                  title: 'Day-1 Grandmaster',
                  unlocked: streakDays >= 21,
                  perk: '1.5x Placement Index · Institutional TPO Priority Badge · Top 3% Batch Highlight',
                  badgeColor: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
                },
                {
                  days: '30 Days',
                  title: 'FAANG Placement Legend',
                  unlocked: streakDays >= 30,
                  perk: 'Direct T&P Recruiter Export Dossier · Zero-Error Compiler Calibration',
                  badgeColor: 'text-purple-400 border-purple-500/30 bg-purple-500/10',
                },
              ].map((tier, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl border flex items-start gap-3.5 transition-all ${
                    tier.unlocked
                      ? 'bg-[#0f172a] border-emerald-500/40'
                      : 'bg-[#0a0e17] border-surface-container opacity-60'
                  }`}
                >
                  <div className={`px-2.5 py-1 rounded text-xs font-mono font-bold border shrink-0 mt-0.5 ${tier.badgeColor}`}>
                    {tier.days}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white font-headline">
                        {tier.title}
                      </h4>
                      {tier.unlocked ? (
                        <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                          <span className="material-symbols-outlined text-xs">verified</span>
                          Active
                        </span>
                      ) : (
                        <span className="text-[11px] font-mono text-slate-400">
                          Locked ({streakDays}/{parseInt(tier.days)}d)
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      {tier.perk}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-surface-container">
              <span className="text-xs font-mono text-slate-400">
                Consistency increases Day-1 placement probability by 3.4x
              </span>
              <button
                onClick={() => {
                  setShowRewardsModal(false);
                  triggerConfetti();
                }}
                className="px-4 py-2 rounded-lg bg-tertiary text-black font-semibold text-xs font-mono hover:brightness-110"
              >
                Keep Pushing Streak 🔥
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
