import React, { useState, useEffect } from 'react';
import { Header, NavTab } from './components/Header';
import { Footer } from './components/Footer';
import {
  auth,
  onAuthStateChanged,
  signInWithGoogle,
  logoutUser,
  getUserProfile,
  FirebaseUser,
} from './lib/firebase';

// Views
import { OverviewView } from './views/OverviewView';
import { DashboardView } from './views/DashboardView';
import { LiveAiMockView } from './views/LiveAiMockView';
import { CodingIdeView } from './views/CodingIdeView';
import { AnalyticsView } from './views/AnalyticsView';
import { HistoryView } from './views/HistoryView';
import { OnboardingView } from './views/OnboardingView';
import { LoginView } from './views/LoginView';

export interface UserProfile {
  name: string;
  college: string;
  batch: string;
  track: string;
  avatarUrl?: string;
  email?: string;
  readinessScore: number;
}

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('overview');
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Rohan Sharma',
    college: 'IIT Delhi (B.Tech CSE)',
    batch: '2026',
    track: 'Tier-1 SDE-1 (Google/Amazon)',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    readinessScore: 84.6,
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Sync with Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const stored = await getUserProfile(user.uid);
        setUserProfile((prev) => ({
          ...prev,
          name: user.displayName || stored?.displayName || prev.name,
          email: user.email || prev.email,
          avatarUrl: user.photoURL || prev.avatarUrl,
          college: stored?.college || prev.college,
          batch: stored?.batch || prev.batch,
          track: stored?.targetTrack || prev.track,
          readinessScore: stored?.readinessScore || prev.readinessScore,
        }));
        showToast(`Signed in as ${user.displayName || user.email}`);
      }
    });

    return () => unsubscribe();
  }, []);

  // Scroll to top upon tab switch
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentTab]);

  const handleLoginSuccess = (userData: { name: string; college: string; batch: string; track: string; photoURL?: string; email?: string }) => {
    setUserProfile((prev) => ({
      ...prev,
      name: userData.name,
      college: userData.college,
      batch: userData.batch,
      track: userData.track,
      avatarUrl: userData.photoURL || prev.avatarUrl,
      email: userData.email || prev.email,
    }));
    showToast(`Authenticated as ${userData.name} • ${userData.college}`);
  };

  const handleProfileComplete = (data: any) => {
    setUserProfile((prev) => ({
      ...prev,
      name: data.name,
      college: data.college,
      batch: data.batch,
      track: data.track,
    }));
    showToast(`Placement dossier generated for ${data.name}!`);
  };

  // Switch views cleanly
  const renderCurrentView = () => {
    switch (currentTab) {
      case 'overview':
        return <OverviewView onNavigate={setCurrentTab} />;
      case 'dashboard':
        return <DashboardView onNavigate={setCurrentTab} />;
      case 'live-ai-mock':
        return <LiveAiMockView onNavigate={setCurrentTab} />;
      case 'coding-ide':
        return <CodingIdeView onNavigate={setCurrentTab} />;
      case 'analytics':
        return <AnalyticsView onNavigate={setCurrentTab} />;
      case 'history':
        return <HistoryView onNavigate={setCurrentTab} />;
      case 'onboarding':
        return (
          <OnboardingView
            onNavigate={setCurrentTab}
            onProfileComplete={handleProfileComplete}
          />
        );
      case 'login':
        return (
          <LoginView
            onNavigate={setCurrentTab}
            onLoginSuccess={handleLoginSuccess}
          />
        );
      default:
        return <OverviewView onNavigate={setCurrentTab} />;
    }
  };

  // Determine if header or footer should be adjusted
  // When in full live mock or IDE mode, we want a high-focus cockpit layout
  const isCockpitMode = currentTab === 'live-ai-mock' || currentTab === 'coding-ide';

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col font-sans selection:bg-primary/30 selection:text-primary-bright">
      {/* Top Navigation Bar */}
      <Header
        currentTab={currentTab}
        onNavigate={setCurrentTab}
        candidateName={userProfile.name}
        candidateCollege={userProfile.college}
        candidatePhoto={userProfile.avatarUrl}
        onGoogleSignIn={() => signInWithGoogle().catch(console.error)}
        onSignOut={() => logoutUser().catch(console.error)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full flex flex-col pt-16 pb-16 sm:pb-0">
        {renderCurrentView()}
      </main>

      {/* Global Interactive Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 animate-bounce-short">
          <div className="bg-[#0f172a] border border-primary/40 text-white px-4 py-3 rounded-xl shadow-2xl shadow-primary/20 flex items-center gap-3 backdrop-blur-md">
            <span className="material-symbols-outlined text-primary text-xl">
              check_circle
            </span>
            <span className="text-xs font-mono text-slate-200">{toastMessage}</span>
            <button
              onClick={() => setToastMessage(null)}
              className="text-slate-400 hover:text-white ml-2 text-xs"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation Bar for Clean Phone Experience */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0a0e17]/95 backdrop-blur-xl border-t border-surface-container-high/60 px-2 py-1.5 flex items-center justify-around shadow-2xl">
        {[
          { id: 'overview', label: 'Home', icon: 'home' },
          { id: 'dashboard', label: 'Streak', icon: 'dashboard' },
          { id: 'live-ai-mock', label: 'AI Mock', icon: 'videocam' },
          { id: 'coding-ide', label: 'Code IDE', icon: 'terminal' },
          { id: 'analytics', label: 'Analytics', icon: 'query_stats' },
        ].map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id as NavTab)}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-lg transition-all min-h-[44px] ${
                isActive
                  ? 'text-primary font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span
                className={`material-symbols-outlined text-[20px] ${
                  isActive ? 'text-primary scale-110' : 'text-slate-400'
                }`}
              >
                {item.icon}
              </span>
              <span className="text-[10px] font-mono mt-0.5 tracking-tight leading-none">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Footer (omitted only on full screen IDE if preferred, but useful for links) */}
      {!isCockpitMode && <Footer onNavigate={setCurrentTab} />}
    </div>
  );
}
