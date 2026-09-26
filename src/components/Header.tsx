import React, { useState } from 'react';

export type NavTab = 
  | 'overview'
  | 'dashboard'
  | 'live-ai-mock'
  | 'coding-ide'
  | 'analytics'
  | 'history'
  | 'onboarding'
  | 'login';

interface HeaderProps {
  currentTab: NavTab;
  onNavigate: (tab: NavTab) => void;
  onLaunchMock?: () => void;
  candidateName?: string;
  candidateCollege?: string;
  candidatePhoto?: string;
  onGoogleSignIn?: () => void;
  onSignOut?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onNavigate,
  onLaunchMock,
  candidateName = 'Rohan Sharma',
  candidateCollege = "B.Tech CSE '26",
  candidatePhoto,
  onGoogleSignIn,
  onSignOut,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const notifications = [
    {
      id: 1,
      title: 'Google Campus Shortlist',
      desc: 'Selected for Round-1 L3 Technical Simulation on Oct 3rd',
      time: '12m ago',
      unread: true,
    },
    {
      id: 2,
      title: 'Amazon Bar-Raiser Feedback Ready',
      desc: 'Your Distributed Rate Limiter transcript was audited (Score: 88%)',
      time: '1h ago',
      unread: true,
    },
    {
      id: 3,
      title: 'Placement Cell Verification',
      desc: 'T&P Department confirmed Day-1 exemption waiver',
      time: '5h ago',
      unread: false,
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0e17]/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.6)] border-b border-surface-container-high/40">
      <div className="h-16 w-full px-3 sm:px-gutter flex items-center justify-between gap-2 sm:gap-space-md">
        {/* Brand Lockup */}
        <div className="flex items-center gap-2 sm:gap-space-lg">
          <button 
            onClick={() => onNavigate('overview')}
            className="flex items-center gap-2 text-left group cursor-pointer focus:outline-none"
          >
            <img 
              alt="MockPulse AI Brand Logo" 
              className="h-7 sm:h-8 w-auto object-contain group-hover:scale-105 transition-transform" 
              src="https://lh3.googleusercontent.com/aida/AEtjO1XM4HNy5cok3Vx3cbzvVJAQhuMgxXREpXvFK6XGtMR8NA8BJ0CJoycZw-A7KzMUT-UKC-DQylku7imns6CTunHSKWl-7aQ_E3EXwwSBwQnwlAPuYWZvnQlgHSziMzQtvRNkKhKH1qNEofJt5YtxqRPzEOoeqEV10NtjL5pYNGo5BP63vWYcPRlYkwDM9ynQUnj9rIxoFhZOs14h7v5GlutoAKiGiRU0wKdbo-oxhSVv05c3_YM1FwnHE_4" 
            />
            <div className="flex flex-col">
              <span className="font-headline-sm text-sm sm:text-headline-sm text-on-surface tracking-tight leading-none font-bold">
                MockPulse AI
              </span>
              <span className="font-label-caps text-[9px] sm:text-[10px] text-secondary uppercase tracking-wider mt-0.5 hidden xs:inline">
                BTech Placement Suite
              </span>
            </div>
          </button>

          <div className="hidden xl:block h-6 w-[1px] bg-surface-variant"></div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => onNavigate('dashboard')}
              className={`px-3 py-1.5 rounded-lg text-body-md transition-all cursor-pointer font-medium ${
                currentTab === 'dashboard'
                  ? 'bg-primary-container text-on-primary-container font-semibold shadow-sm'
                  : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => onNavigate('live-ai-mock')}
              className={`px-3 py-1.5 rounded-lg text-body-md transition-all cursor-pointer font-medium ${
                currentTab === 'live-ai-mock'
                  ? 'bg-primary-container text-on-primary-container font-semibold shadow-sm'
                  : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
              }`}
            >
              Live AI Mock
            </button>
            <button
              onClick={() => onNavigate('coding-ide')}
              className={`px-3 py-1.5 rounded-lg text-body-md transition-all cursor-pointer font-medium ${
                currentTab === 'coding-ide'
                  ? 'bg-primary-container text-on-primary-container font-semibold shadow-sm'
                  : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
              }`}
            >
              Coding IDE Interview
            </button>
            <button
              onClick={() => onNavigate('analytics')}
              className={`px-3 py-1.5 rounded-lg text-body-md transition-all cursor-pointer font-medium ${
                currentTab === 'analytics'
                  ? 'bg-primary-container text-on-primary-container font-semibold shadow-sm'
                  : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
              }`}
            >
              Analytics &amp; Readiness
            </button>
            <button
              onClick={() => onNavigate('history')}
              className={`px-3 py-1.5 rounded-lg text-body-md transition-all cursor-pointer font-medium ${
                currentTab === 'history'
                  ? 'bg-primary-container text-on-primary-container font-semibold shadow-sm'
                  : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
              }`}
            >
              Interview History
            </button>
            <button
              onClick={() => onNavigate('onboarding')}
              className={`px-3 py-1.5 rounded-lg text-body-md transition-all cursor-pointer font-medium ${
                currentTab === 'onboarding'
                  ? 'bg-primary-container text-on-primary-container font-semibold shadow-sm'
                  : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
              }`}
            >
              Onboarding
            </button>
          </nav>
        </div>

        {/* Right Action Cluster */}
        <div className="flex items-center gap-1.5 sm:gap-space-md">
          {/* Institutional Track Pill */}
          <div className="hidden 2xl:flex items-center gap-space-xs px-space-sm py-1 rounded bg-surface-container border border-outline-variant/30 text-secondary">
            <span className="material-symbols-outlined text-[16px]">school</span>
            <span className="font-label-caps text-[10px] uppercase">IIT / NIT / BITS Track</span>
          </div>

          {/* Launch Mock Action */}
          <button
            onClick={() => {
              if (onLaunchMock) onLaunchMock();
              else onNavigate('live-ai-mock');
            }}
            className="relative group flex items-center gap-1 sm:gap-space-xs px-2.5 sm:px-space-md py-1.5 rounded-lg bg-primary text-on-primary font-headline-sm text-xs sm:text-body-sm shadow-[0_0_16px_-2px_rgba(99,102,241,0.35)] hover:shadow-[0_0_20px_2px_rgba(99,102,241,0.5)] active:scale-95 transition-all cursor-pointer whitespace-nowrap"
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
            </span>
            <span className="hidden md:inline font-semibold">Launch Mock</span>
            <span className="md:hidden font-semibold">Mock</span>
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              aria-label="Notifications" 
              className="relative p-1.5 sm:p-2 rounded-lg hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-error ring-2 ring-surface-container-lowest"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 sm:w-96 max-w-[calc(100vw-24px)] rounded-xl bg-surface-container border border-surface-container-high shadow-2xl p-space-sm z-50">
                <div className="flex items-center justify-between pb-2 border-b border-surface-variant px-2">
                  <span className="font-headline-sm text-body-sm font-semibold text-on-surface">Campus Placement Alerts</span>
                  <span className="font-label-caps text-[10px] text-primary">2 NEW</span>
                </div>
                <div className="flex flex-col gap-1 py-1 max-h-72 overflow-y-auto">
                  {notifications.map((n) => (
                    <div 
                      key={n.id} 
                      className={`p-2.5 rounded-lg transition-colors cursor-pointer ${
                        n.unread ? 'bg-surface-container-high/80' : 'hover:bg-surface-container-high/40'
                      }`}
                      onClick={() => setShowNotifications(false)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-headline-sm text-[13px] text-on-surface font-semibold">{n.title}</span>
                        <span className="font-label-caps text-[10px] text-on-surface-variant">{n.time}</span>
                      </div>
                      <p className="font-body-sm text-[12px] text-on-surface-variant mt-0.5">{n.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="pt-2 border-t border-surface-variant text-center">
                  <button 
                    onClick={() => {
                      setShowNotifications(false);
                      onNavigate('history');
                    }}
                    className="font-body-sm text-[12px] text-primary hover:underline cursor-pointer"
                  >
                    View All Placement Dossiers →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Pill */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-space-sm pl-space-xs border-l border-surface-variant text-left cursor-pointer hover:opacity-90"
            >
              <div className="hidden sm:flex flex-col text-right">
                <span className="font-headline-sm text-body-sm text-on-surface leading-tight font-semibold">
                  {candidateName}
                </span>
                <span className="font-label-caps text-[10px] text-secondary tracking-wide">
                  {candidateCollege}
                </span>
              </div>
              <img 
                alt="Profile" 
                className="w-8 h-8 rounded-full object-cover ring-1 ring-primary/40 shadow-sm" 
                src={candidatePhoto || "https://lh3.googleusercontent.com/aida-public/AB6AXuAppeLaFqQ_KfiUJh-5lgr6Ip5BEheNd2icPe8etzXxAJE7jsDHY9ObYKxrSuTcwVoA7S_L7FPrz1l7uMA77mmJKvGiPzsR3dL2CL9Qrm79BWicSVoaodOV44Ecx7NSh7Oc4__VJKZjaz7ezs3hlGYnUzE1zcl6Xm48TPooJVPUR1sMg2TS5p_kpoatQ0VRXwT0bL2oT6ipmTa8-GvkFd725OGleDXZibuadRPBiOmtcKBdEIW7VuRJ"} 
              />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-64 rounded-xl bg-surface-container border border-surface-container-high shadow-2xl p-space-sm z-50">
                <div className="p-2 border-b border-surface-variant">
                  <div className="font-headline-sm text-body-sm font-semibold text-on-surface">{candidateName}</div>
                  <div className="font-body-sm text-[12px] text-on-surface-variant truncate">{candidateCollege}</div>
                  <div className="inline-flex items-center gap-1 mt-1 px-1.5 py-0.5 rounded bg-tertiary-container/30 text-tertiary text-[10px] font-label-caps">
                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span> Firebase Auth Active
                  </div>
                </div>
                <div className="py-1 flex flex-col gap-0.5">
                  {onGoogleSignIn && (
                    <button 
                      onClick={() => {
                        setShowProfileMenu(false);
                        onGoogleSignIn();
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded hover:bg-surface-container-high text-body-sm text-primary transition-colors cursor-pointer flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-sm">login</span>
                      Sign in with Google
                    </button>
                  )}
                  <button 
                    onClick={() => {
                      setShowProfileMenu(false);
                      onNavigate('onboarding');
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded hover:bg-surface-container-high text-body-sm text-on-surface transition-colors cursor-pointer"
                  >
                    Edit Candidate Profile &amp; Resume
                  </button>
                  <button 
                    onClick={() => {
                      setShowProfileMenu(false);
                      onNavigate('analytics');
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded hover:bg-surface-container-high text-body-sm text-on-surface transition-colors cursor-pointer"
                  >
                    TPO Readiness Diagnostics
                  </button>
                  <button 
                    onClick={() => {
                      setShowProfileMenu(false);
                      if (onSignOut) onSignOut();
                      onNavigate('login');
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded hover:bg-surface-container-high text-body-sm text-error transition-colors cursor-pointer"
                  >
                    Switch Account / Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-surface-container-high text-on-surface cursor-pointer"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0c1220] border-b border-surface-container px-4 py-3 flex flex-col gap-1.5 shadow-2xl max-h-[calc(100vh-64px)] overflow-y-auto">
          {[
            { id: 'overview', label: 'Overview / Home', icon: 'home' },
            { id: 'dashboard', label: 'Dashboard & Streak', icon: 'dashboard' },
            { id: 'live-ai-mock', label: 'Live AI Mock Studio', icon: 'videocam' },
            { id: 'coding-ide', label: 'Coding IDE Interview', icon: 'terminal' },
            { id: 'analytics', label: 'Analytics & Readiness', icon: 'analytics' },
            { id: 'history', label: 'Interview History & Dossier', icon: 'history' },
            { id: 'onboarding', label: 'Placement Calibration', icon: 'tune' },
            { id: 'login', label: 'Campus Sign-In', icon: 'login' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id as NavTab);
                setMobileMenuOpen(false);
              }}
              className={`text-left py-2.5 px-3 rounded-xl text-sm font-medium transition-colors flex items-center gap-2.5 min-h-[44px] ${
                currentTab === item.id
                  ? 'bg-primary text-black font-semibold shadow-sm'
                  : 'text-slate-200 hover:bg-surface-container-high'
              }`}
            >
              <span className="material-symbols-outlined text-base">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
          {onGoogleSignIn && (
            <button
              onClick={() => {
                onGoogleSignIn();
                setMobileMenuOpen(false);
              }}
              className="mt-2 py-2.5 px-3 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary font-mono text-xs flex items-center justify-center gap-2 border border-primary/30 min-h-[44px]"
            >
              <span className="material-symbols-outlined text-base">verified_user</span>
              <span>Connect Google Account</span>
            </button>
          )}
        </div>
      )}
    </header>
  );
};
