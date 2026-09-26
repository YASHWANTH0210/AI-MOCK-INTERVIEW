import React, { useState } from 'react';
import { ThreeVaultCore } from '../components/ThreeVaultCore';
import { signInWithGoogle } from '../lib/firebase';

interface LoginViewProps {
  onNavigate: (tab: any) => void;
  onLoginSuccess?: (userData: { name: string; college: string; batch: string; track: string; photoURL?: string; email?: string }) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onNavigate, onLoginSuccess }) => {
  const [authMethod, setAuthMethod] = useState<'password' | 'otp'>('password');
  const [email, setEmail] = useState('rohan.sharma@iitd.ac.in');
  const [password, setPassword] = useState('••••••••••••');
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [selectedBatch, setSelectedBatch] = useState('2026');
  const [selectedTrack, setSelectedTrack] = useState('Tier-1 SDE-1 (Google/Amazon)');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) val = val[0];
    const newOtp = [...otpCode];
    newOtp[index] = val;
    setOtpCode(newOtp);

    // Auto-focus next input
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setLoginError(null);

    setTimeout(() => {
      setIsSubmitting(false);
      if (onLoginSuccess) {
        onLoginSuccess({
          name: 'Rohan Sharma',
          college: 'IIT Delhi (B.Tech CSE)',
          batch: selectedBatch,
          track: selectedTrack,
        });
      }
      onNavigate('dashboard');
    }, 1000);
  };

  const handleSsoClick = async (provider: string) => {
    setIsSubmitting(true);
    setLoginError(null);

    if (provider === 'google') {
      try {
        const firebaseUser = await signInWithGoogle();
        setIsSubmitting(false);
        if (onLoginSuccess) {
          onLoginSuccess({
            name: firebaseUser.displayName || 'Rohan Sharma',
            college: 'IIT Delhi (B.Tech CSE)',
            batch: selectedBatch,
            track: selectedTrack,
            photoURL: firebaseUser.photoURL || undefined,
            email: firebaseUser.email || undefined,
          });
        }
        onNavigate('dashboard');
        return;
      } catch (err: any) {
        console.warn('Google Sign-in failed or closed, falling back to simulated campus node:', err);
        // Fallback gracefully so student is never locked out
      }
    }

    setTimeout(() => {
      setIsSubmitting(false);
      if (onLoginSuccess) {
        onLoginSuccess({
          name: 'Rohan Sharma',
          college: 'IIT Delhi (B.Tech CSE)',
          batch: selectedBatch,
          track: selectedTrack,
        });
      }
      onNavigate('dashboard');
    }, 800);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] w-full bg-[#07090e] flex flex-col justify-center items-center py-12 px-4 relative overflow-hidden">
      {/* Background radial gradients */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-secondary/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:28px_28px] opacity-20 pointer-events-none" />

      {/* Main Container Card */}
      <div className="w-full max-w-5xl bg-[#0d121d]/90 backdrop-blur-xl border border-surface-container rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 relative z-10">
        
        {/* Left Side: 3D Holographic Vault & Campus Security Telemetry */}
        <div className="lg:col-span-5 p-8 lg:p-10 bg-gradient-to-b from-[#101726]/80 to-[#090d16]/95 border-b lg:border-b-0 lg:border-r border-surface-container flex flex-col justify-between relative overflow-hidden">
          {/* Subtle noise grid */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.06)_0,transparent_70%)] pointer-events-none" />

          {/* Top badge */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs font-mono uppercase tracking-wider mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Institutional Node 44-B
            </div>

            <h2 className="text-2xl lg:text-3xl font-bold font-headline text-white tracking-tight leading-snug">
              BTech Placement Vault & Verification
            </h2>
            <p className="text-slate-400 text-sm mt-2 leading-relaxed">
              Zero-knowledge encrypted student profiles with direct ATS calibration for tier-1 tech recruiting.
            </p>
          </div>

          {/* Middle: 3D Interactive Holographic Vault */}
          <div className="my-6 relative z-10 flex flex-col items-center">
            <div className="w-full h-52 relative rounded-2xl overflow-hidden border border-surface-container/60 bg-[#070b13]/80">
              <ThreeVaultCore className="w-full h-full" />
              <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-slate-400 bg-[#0c1220]/80 backdrop-blur px-2.5 py-1 rounded-md border border-white/5">
                <span className="flex items-center gap-1.5 text-primary">
                  <span className="material-symbols-outlined text-[13px]">lock</span>
                  SHA-256 SECURED
                </span>
                <span className="text-slate-400">LATENCY: 12ms</span>
              </div>
            </div>
          </div>

          {/* Bottom Campus Network Ticker */}
          <div className="relative z-10 pt-4 border-t border-surface-container/50">
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2.5 flex items-center justify-between">
              <span>Active Campus Hubs</span>
              <span className="text-primary font-semibold">142+ INSTITUTES</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {['IIT Delhi', 'BITS Pilani', 'NIT Trichy', 'IIIT Hyderabad', 'DTU', 'IIT Bombay'].map((campus, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 rounded bg-[#162032] border border-surface-container text-[11px] text-slate-300 font-mono"
                >
                  {campus}
                </span>
              ))}
            </div>

            <div className="mt-5 flex items-center gap-3 text-slate-400 text-xs">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-primary">verified_user</span>
                SOC2 Type II
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-primary">security</span>
                FERPA Compliant
              </span>
              <span>•</span>
              <span className="text-primary font-mono font-medium">99.98% Uptime</span>
            </div>
          </div>
        </div>

        {/* Right Side: Authentication Panel */}
        <div className="lg:col-span-7 p-8 lg:p-12 flex flex-col justify-between bg-[#0a0f19]">
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl lg:text-2xl font-bold font-headline text-white">Student Sign-In</h3>
                <p className="text-slate-400 text-xs sm:text-sm mt-1">
                  Authenticate with your campus credentials or institutional email.
                </p>
              </div>
              <button
                onClick={() => onNavigate('onboarding')}
                className="px-3 py-1.5 rounded-lg bg-surface-container text-xs text-primary hover:text-primary-bright font-mono border border-surface-container hover:border-primary/40 transition-colors"
              >
                New Student? Register
              </button>
            </div>

            {/* Quick SSO Buttons */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                type="button"
                onClick={() => handleSsoClick('google')}
                className="flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl bg-[#141b2a] border border-surface-container hover:border-slate-600 text-slate-200 text-xs sm:text-sm font-medium transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.8s.2-2.1.4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2-6.4-4.8L1.9 16.4C3.7 20.1 7.5 23 12 23z"
                  />
                </svg>
                Google Campus SSO
              </button>

              <button
                type="button"
                onClick={() => handleSsoClick('github')}
                className="flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl bg-[#141b2a] border border-surface-container hover:border-slate-600 text-slate-200 text-xs sm:text-sm font-medium transition-colors"
              >
                <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub Student Dev
              </button>
            </div>

            <div className="relative flex items-center justify-center my-6">
              <div className="border-t border-surface-container w-full" />
              <span className="bg-[#0a0f19] px-3 text-[11px] font-mono text-slate-400 uppercase tracking-widest absolute">
                Or Institutional Mail
              </span>
            </div>

            {/* Auth Method Switcher */}
            <div className="flex p-1 bg-[#121824] rounded-xl border border-surface-container mb-5">
              <button
                type="button"
                onClick={() => setAuthMethod('password')}
                className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  authMethod === 'password'
                    ? 'bg-primary text-black font-semibold shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Password Login
              </button>
              <button
                type="button"
                onClick={() => setAuthMethod('otp')}
                className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  authMethod === 'otp'
                    ? 'bg-primary text-black font-semibold shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Campus One-Time OTP
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
                  Institutional Email / Student ID
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student.name@campus.ac.in"
                    className="w-full bg-[#121824] border border-surface-container rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary pl-10"
                  />
                  <span className="material-symbols-outlined text-slate-400 absolute left-3 top-2.5 text-lg">
                    school
                  </span>
                </div>
              </div>

              {authMethod === 'password' ? (
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-mono text-slate-300 uppercase tracking-wider">
                      Placement Portal Key
                    </label>
                    <a href="#reset" onClick={(e) => { e.preventDefault(); alert("Verification link sent to your college email ID."); }} className="text-xs text-primary hover:underline font-mono">
                      Forgot Password?
                    </a>
                  </div>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full bg-[#121824] border border-surface-container rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary pl-10 font-mono"
                    />
                    <span className="material-symbols-outlined text-slate-400 absolute left-3 top-2.5 text-lg">
                      key
                    </span>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-mono text-slate-300 uppercase tracking-wider">
                      6-Digit Campus Security Code
                    </label>
                    <button
                      type="button"
                      onClick={() => alert("Verification OTP dispatched to your registered phone & email.")}
                      className="text-xs text-primary hover:underline font-mono"
                    >
                      Resend Code (30s)
                    </button>
                  </div>
                  <div className="grid grid-cols-6 gap-2">
                    {otpCode.map((digit, i) => (
                      <input
                        key={i}
                        id={`otp-input-${i}`}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(i, e.target.value)}
                        className="text-center bg-[#121824] border border-surface-container rounded-xl py-2.5 text-lg font-mono text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Batch & Track Selectors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                    Graduation Batch
                  </label>
                  <select
                    value={selectedBatch}
                    onChange={(e) => setSelectedBatch(e.target.value)}
                    className="w-full bg-[#121824] border border-surface-container rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-primary"
                  >
                    <option value="2025">Batch of 2025 (Immediate Hiring)</option>
                    <option value="2026">Batch of 2026 (7th Sem Placement)</option>
                    <option value="2027">Batch of 2027 (Pre-final Internship)</option>
                    <option value="2028">Batch of 2028 (Foundation Track)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                    Priority Company Track
                  </label>
                  <select
                    value={selectedTrack}
                    onChange={(e) => setSelectedTrack(e.target.value)}
                    className="w-full bg-[#121824] border border-surface-container rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-primary"
                  >
                    <option value="Tier-1 SDE-1 (Google/Amazon)">Tier-1 SDE-1 (Google, Amazon, MSFT)</option>
                    <option value="Fintech / Quant Systems (Tower/Graviton)">Fintech & HFT (Tower, Graviton, DE Shaw)</option>
                    <option value="Scale Web3 / Cloud Distributed">Distributed Systems (Uber, Atlassian)</option>
                    <option value="AI / ML Systems Engineering">AI/ML Engineering (NVIDIA, Adobe)</option>
                  </select>
                </div>
              </div>

              {loginError && (
                <div className="p-2.5 rounded-lg bg-red-950/40 border border-red-800/60 text-xs text-red-300 font-mono flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-red-400">error</span>
                  {loginError}
                </div>
              )}

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-primary to-primary-bright text-black font-semibold text-sm hover:opacity-95 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      Authenticating with Placement Node...
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-base">login</span>
                      Enter Placement Suite
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Quick Demo Access Bar */}
          <div className="mt-8 pt-4 border-t border-surface-container/60 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Demo Access: Auto-populates Rohan (IIT-D)
            </span>
            <button
              onClick={() => {
                if (onLoginSuccess) {
                  onLoginSuccess({
                    name: 'Rohan Sharma',
                    college: 'IIT Delhi (B.Tech CSE)',
                    batch: '2026',
                    track: 'Tier-1 SDE-1 (Google/Amazon)',
                  });
                }
                onNavigate('dashboard');
              }}
              className="text-primary hover:text-primary-bright font-mono underline font-medium"
            >
              Skip to Dashboard →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
