import React from 'react';

interface FooterProps {
  onNavigate?: (tab: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-[#0a0e17] border-t border-surface-container py-space-xl mt-space-xl">
      <div className="w-full px-gutter mx-auto max-w-[1720px]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-space-lg mb-space-lg">
          {/* Brand Info */}
          <div className="space-y-space-sm">
            <div className="flex items-center gap-space-sm">
              <img 
                alt="MockPulse AI Brand Logo" 
                className="h-6 w-auto object-contain" 
                src="https://lh3.googleusercontent.com/aida/AEtjO1XM4HNy5cok3Vx3cbzvVJAQhuMgxXREpXvFK6XGtMR8NA8BJ0CJoycZw-A7KzMUT-UKC-DQylku7imns6CTunHSKWl-7aQ_E3EXwwSBwQnwlAPuYWZvnQlgHSziMzQtvRNkKhKH1qNEofJt5YtxqRPzEOoeqEV10NtjL5pYNGo5BP63vWYcPRlYkwDM9ynQUnj9rIxoFhZOs14h7v5GlutoAKiGiRU0wKdbo-oxhSVv05c3_YM1FwnHE_4" 
              />
              <span className="font-headline-sm text-body-lg text-on-surface font-semibold">
                MockPulse AI
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Engineering interview simulator calibrated for BTech tier-1 &amp; tier-2 campus placement drives. Real-time telemetry, live code profiling, and neural behavioral feedback.
            </p>
            <div className="flex items-center gap-space-xs text-tertiary font-telemetry-metric text-label-caps">
              <span className="material-symbols-outlined text-[14px]">verified</span>
              <span>CAMPUS PLACEMENT VERIFIED v3.4</span>
            </div>
          </div>

          {/* Campus Analytics */}
          <div className="space-y-space-sm">
            <div className="font-label-caps text-label-caps text-on-surface uppercase tracking-wider">
              Campus Analytics
            </div>
            <ul className="space-y-1.5 font-body-sm text-body-sm text-on-surface-variant">
              <li className="flex justify-between sm:justify-start sm:gap-2">
                <span>Tier-1 Drive Clearance:</span>
                <span className="text-tertiary font-telemetry-metric text-body-sm font-semibold">87.4%</span>
              </li>
              <li className="flex justify-between sm:justify-start sm:gap-2">
                <span>Avg Offer Jump:</span>
                <span className="text-secondary font-telemetry-metric text-body-sm font-semibold">+4.2 LPA</span>
              </li>
              <li className="flex justify-between sm:justify-start sm:gap-2">
                <span>Active Partner Campuses:</span>
                <span className="text-on-surface font-telemetry-metric text-body-sm font-semibold">140+</span>
              </li>
              <li className="flex justify-between sm:justify-start sm:gap-2">
                <span>DSA Test Benchmarks:</span>
                <span className="text-on-surface font-telemetry-metric text-body-sm font-semibold">12,400+</span>
              </li>
            </ul>
          </div>

          {/* FAANG & MNC Prep Paths */}
          <div className="space-y-space-sm">
            <div className="font-label-caps text-label-caps text-on-surface uppercase tracking-wider">
              FAANG &amp; MNC Prep Paths
            </div>
            <ul className="space-y-1.5 font-body-sm text-body-sm text-on-surface-variant">
              <li>
                <button 
                  onClick={() => onNavigate && onNavigate('coding-ide')} 
                  className="hover:text-primary transition-colors cursor-pointer text-left"
                >
                  Google SWE L3 Placement Track
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate && onNavigate('live-ai-mock')} 
                  className="hover:text-primary transition-colors cursor-pointer text-left"
                >
                  Amazon SDE-1 OA &amp; Bar Raiser
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate && onNavigate('coding-ide')} 
                  className="hover:text-primary transition-colors cursor-pointer text-left"
                >
                  Microsoft On-Campus Direct Hiring
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate && onNavigate('history')} 
                  className="hover:text-primary transition-colors cursor-pointer text-left"
                >
                  FinTech HFT Systems &amp; Low-Latency
                </button>
              </li>
            </ul>
          </div>

          {/* Engineering Governance */}
          <div className="space-y-space-sm">
            <div className="font-label-caps text-label-caps text-on-surface uppercase tracking-wider">
              Engineering Governance
            </div>
            <ul className="space-y-1.5 font-body-sm text-body-sm text-on-surface-variant">
              <li>
                <span className="text-on-surface-variant">Placement Privacy Compliance</span>
              </li>
              <li>
                <span className="text-on-surface-variant">FERPA &amp; Indian DPDP Act Standard</span>
              </li>
              <li>
                <span className="text-on-surface-variant">Proctoring &amp; Audio Telemetry Policy</span>
              </li>
              <li>
                <span className="text-on-surface-variant">Institutional Single Sign-On</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-space-md border-t border-surface-container flex flex-col sm:flex-row items-center justify-between gap-space-sm text-on-surface-variant">
          <span className="font-body-sm text-body-sm">
            © 2025 MockPulse AI Inc. Spec-Engineered for Engineering Graduates.
          </span>
          <div className="flex items-center gap-space-md font-label-caps text-label-caps text-on-surface-variant">
            <span className="text-tertiary">LATENCY: 18MS</span>
            <span className="text-secondary">MODEL: PULSE-GEN-4</span>
            <span className="text-tertiary">SYSTEM READY</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
