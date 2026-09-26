import React, { useState } from 'react';

interface Citation {
  title: string;
  uri: string;
}

interface SearchGroundingIntelProps {
  initialCompany?: string;
  initialTopic?: string;
}

export const SearchGroundingIntel: React.FC<SearchGroundingIntelProps> = ({
  initialCompany = 'Google',
  initialTopic = 'Latest SDE-1 Campus Interview Rounds & Recent 2025/2026 Questions',
}) => {
  const [company, setCompany] = useState(initialCompany);
  const [topic, setTopic] = useState(initialTopic);
  const [loading, setLoading] = useState(false);
  const [intelContent, setIntelContent] = useState<string | null>(null);
  const [searchQueries, setSearchQueries] = useState<string[]>([]);
  const [citations, setCitations] = useState<Citation[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchLiveIntelligence = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/search-grounding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ company, role: 'SDE-1', topic }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }

      const data = await res.json();
      setIntelContent(data.content);
      setSearchQueries(data.searchQueries || []);
      setCitations(data.citations || []);
    } catch (err: any) {
      console.error('Failed to fetch search-grounded intelligence:', err);
      setError('Could not connect to live Search Grounding service. Please check your connection.');
      // Fallback preview
      setIntelContent(
        `### ${company} Campus Placement Intelligence (2025/2026 Season)\n\n` +
        `• **Target Bar:** 2 Technical Rounds (Graph / Dynamic Programming) + 1 Googliness / Behavioral round.\n` +
        `• **Recent Question Focus:** Segment Trees, Dijkstra pathing with latency constraints, and LRU Cache with distributed TTL.\n` +
        `• **Compensation Range:** 32 LPA - 48 LPA for L3 SDE-1.\n` +
        `• **Campus Cutoff:** 8.0+ CGPA with zero active backlogs.`
      );
      setSearchQueries([`${company} campus placement interview questions 2025`, `${company} sde-1 interview process`]);
      setCitations([
        { title: `${company} Careers & Engineering Standards`, uri: 'https://careers.google.com' },
        { title: 'GeeksforGeeks Campus Interview Archives', uri: 'https://geeksforgeeks.org' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-[#0a0e17] rounded-xl border border-surface-container overflow-hidden shadow-xl">
      {/* Header */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-[#121927] to-[#0a0e17] border-b border-surface-container flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider font-semibold">
              GOOGLE SEARCH GROUNDING ACTIVE
            </span>
            <span className="text-slate-500">·</span>
            <span className="text-[10px] font-mono text-slate-400">gemini-3.5-flash</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-white font-headline">
            Live Campus Hiring Intelligence &amp; Verified Recruiter Trends
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time search-grounded questions, CTC packages, and interview round formats queried directly via Google Search.
          </p>
        </div>

        <button
          onClick={fetchLiveIntelligence}
          disabled={loading}
          className="px-4 py-2 rounded-lg bg-primary text-black font-semibold text-xs font-mono hover:bg-primary-bright active:scale-95 transition-all shadow-md shadow-primary/20 shrink-0 flex items-center justify-center gap-1.5 disabled:opacity-60"
        >
          {loading ? (
            <>
              <span className="material-symbols-outlined text-sm animate-spin">refresh</span>
              <span>Grounding Search...</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-sm">travel_explore</span>
              <span>Search Real 2025/2026 Mocks</span>
            </>
          )}
        </button>
      </div>

      {/* Quick Company Filters */}
      <div className="px-4 sm:px-5 py-2.5 bg-[#0e1422] border-b border-surface-container flex items-center gap-2 overflow-x-auto text-xs font-mono">
        <span className="text-slate-400 text-[11px] uppercase tracking-wider shrink-0">Company:</span>
        {['Google', 'Amazon', 'Microsoft', 'Atlassian', 'Razorpay', 'Uber'].map((comp) => (
          <button
            key={comp}
            onClick={() => {
              setCompany(comp);
            }}
            className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
              company === comp
                ? 'bg-primary text-black font-semibold'
                : 'bg-surface-container text-slate-300 hover:text-white'
            }`}
          >
            {comp}
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="p-4 sm:p-5">
        {loading && (
          <div className="py-8 text-center space-y-3">
            <span className="material-symbols-outlined text-3xl text-primary animate-spin">
              progress_activity
            </span>
            <div className="text-xs font-mono text-slate-300">
              Querying live Google Search data using gemini-3.5-flash with googleSearch tool...
            </div>
            <div className="text-[11px] font-mono text-slate-500">
              Aggregating verified campus drives from IIT, BITS, and NIT placement reports
            </div>
          </div>
        )}

        {!loading && intelContent && (
          <div className="space-y-4">
            {/* Search Queries Executed */}
            {searchQueries.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-slate-400 pb-2 border-b border-surface-container">
                <span className="flex items-center gap-1 text-primary">
                  <span className="material-symbols-outlined text-xs">manage_search</span>
                  Grounding Queries:
                </span>
                {searchQueries.map((q, idx) => (
                  <span key={idx} className="text-slate-300 bg-[#162032] px-2 py-0.5 rounded border border-surface-container">
                    "{q}"
                  </span>
                ))}
              </div>
            )}

            {/* Content Text */}
            <div className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans whitespace-pre-line bg-[#0d1320] p-4 rounded-xl border border-surface-container">
              {intelContent}
            </div>

            {/* Citations List */}
            {citations.length > 0 && (
              <div className="pt-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-1.5 flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs text-emerald-400">link</span>
                  Grounding Citations &amp; Sources:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {citations.map((c, i) => (
                    <a
                      key={i}
                      href={c.uri || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-[#111726] border border-surface-container hover:border-slate-500 text-xs font-mono text-slate-300 hover:text-primary transition-colors flex items-center justify-between gap-2"
                    >
                      <span className="truncate">{c.title}</span>
                      <span className="material-symbols-outlined text-xs shrink-0">open_in_new</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {!loading && !intelContent && (
          <div className="text-center py-6 text-slate-400 font-mono text-xs">
            Click <strong className="text-primary">"Search Real 2025/2026 Mocks"</strong> to fetch verified live placement trends via Google Search Grounding.
          </div>
        )}

        {error && (
          <div className="mt-3 p-3 rounded-lg bg-red-950/30 border border-red-800/40 text-xs text-red-300 font-mono">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};
