import React, { useState } from 'react';
import confetti from 'canvas-confetti';

interface OnboardingViewProps {
  onNavigate: (tab: any) => void;
  onProfileComplete?: (data: any) => void;
}

export const OnboardingView: React.FC<OnboardingViewProps> = ({ onNavigate, onProfileComplete }) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1: Academics & Profile
  const [formData, setFormData] = useState({
    fullName: 'Rohan Sharma',
    college: 'IIT Delhi',
    branch: 'Computer Science and Engineering',
    cgpa: '9.14',
    batchYear: '2026',
    targetRole: 'Tier-1 SDE-1 / Systems Software Engineer',
    targetCtc: '32 - 50 LPA',
    dreamCompanies: ['Google', 'Amazon', 'Microsoft', 'Atlassian', 'Uber'],
  });

  // Step 2: Resume Ingestion & ATS
  const [resumeUploaded, setResumeUploaded] = useState(true);
  const [isScanningResume, setIsScanningResume] = useState(false);
  const [scanProgress, setScanProgress] = useState(100);
  const [atsScore, setAtsScore] = useState(88);
  const [detectedSkills, setDetectedSkills] = useState([
    'C++20', 'Distributed Systems', 'Golang', 'Redis', 'Kafka', 'React/TypeScript', 'PostgreSQL', 'Docker'
  ]);
  const [githubUser, setGithubUser] = useState('rohansharma-dev');
  const [leetcodeUser, setLeetcodeUser] = useState('rohan_algo_99');

  // Step 3: Quick Diagnostic Questions
  const [diagnosticAnswers, setDiagnosticAnswers] = useState<{ [qId: number]: number }>({
    1: 2, // Correct
    2: 1, // Correct
    3: 0, // Correct
  });
  const [diagnosticSubmitted, setDiagnosticSubmitted] = useState(false);

  const diagnosticQuestions = [
    {
      id: 1,
      topic: 'Algorithms & Complexity',
      question: 'What is the average and worst-case time complexity of finding the k-th smallest element in an unsorted array using Quickselect?',
      options: [
        'Average: O(n log n), Worst: O(n^2)',
        'Average: O(n), Worst: O(n log n)',
        'Average: O(n), Worst: O(n^2)',
        'Average: O(log n), Worst: O(n)',
      ],
      correct: 2,
      explanation: 'Quickselect drops half the search space on each partition on average giving T(n) = T(n/2) + O(n) = O(n). Worst-case with degenerate pivots is O(n^2).',
    },
    {
      id: 2,
      topic: 'Distributed Systems & Consistency',
      question: 'In the Raft consensus algorithm, what ensures that a newly elected leader has all committed log entries from prior terms?',
      options: [
        'Leaders fetch missing logs from followers upon election.',
        'The Election Restriction: Candidates must have a log at least as up-to-date as a majority quorum to win votes.',
        'Heartbeat intervals automatically overwrite lagging candidate state.',
        'A dedicated ZooKeeper metadata store guarantees entry monotonicity.',
      ],
      correct: 1,
      explanation: 'Raft guarantees the Leader Completeness property by enforcing that voters reject candidates whose log is less up-to-date than their own.',
    },
    {
      id: 3,
      topic: 'Concurrency & Memory Models',
      question: 'Which of the following guarantees does an atomic Compare-And-Swap (CAS) loop provide against the ABA problem in lock-free data structures?',
      options: [
        'Plain CAS cannot prevent ABA; tagged pointers or generation counters are required to detect state reincarnation.',
        'Hardware memory barriers natively serialize ABA transitions.',
        'Volatile pointers in C++ eliminate intermediate value rewrites.',
        'The mutex lock automatically upgrades lock-free loops into critical sections.',
      ],
      correct: 0,
      explanation: 'Plain CAS only checks value equality. If a value changes from A -> B -> A, CAS succeeds despite intermediate mutations. Tagged pointers or hazard pointers are necessary.',
    },
  ];

  const handleNextStep = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    } else if (currentStep === 3) {
      setDiagnosticSubmitted(true);
      setTimeout(() => {
        setCurrentStep(4);
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#38bdf8', '#34d399', '#f59e0b', '#818cf8'],
        });
      }, 600);
    }
  };

  const handleTriggerRescan = () => {
    setIsScanningResume(true);
    setScanProgress(10);
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanningResume(false);
          setAtsScore(91);
          return 100;
        }
        return prev + 25;
      });
    }, 250);
  };

  const handleFinishOnboarding = () => {
    if (onProfileComplete) {
      onProfileComplete({
        name: formData.fullName,
        college: formData.college,
        batch: formData.batchYear,
        track: formData.targetRole,
        atsScore,
        skills: detectedSkills,
      });
    }
    onNavigate('dashboard');
  };

  return (
    <div className="min-h-[calc(100vh-64px)] w-full bg-[#07090e] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Onboarding Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono mb-3">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            BTech Campus Calibration Pipeline v4.2
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-headline text-white tracking-tight">
            Student Placement Profile & Baseline
          </h1>
          <p className="text-slate-400 text-sm mt-2 max-w-xl mx-auto">
            Configure your academic credentials, deep-scan your resume, and benchmark your algorithmic skills against Tier-1 SDE cutoffs.
          </p>
        </div>

        {/* 4-Step Progress Indicator */}
        <div className="mb-8 bg-[#0d1322] border border-surface-container rounded-2xl p-4 sm:p-5 shadow-lg">
          <div className="grid grid-cols-4 gap-2 sm:gap-4 relative">
            {[
              { num: 1, title: 'Identity & Academics', icon: 'school' },
              { num: 2, title: 'Resume & GitHub Ingest', icon: 'description' },
              { num: 3, title: 'Technical Diagnostics', icon: 'psychology' },
              { num: 4, title: 'Baseline Calibrated', icon: 'verified' },
            ].map((step) => {
              const isDone = currentStep > step.num;
              const isCurrent = currentStep === step.num;
              return (
                <button
                  key={step.num}
                  onClick={() => {
                    if (step.num < currentStep) setCurrentStep(step.num as any);
                  }}
                  disabled={step.num > currentStep}
                  className={`flex flex-col items-center text-center transition-all ${
                    isCurrent
                      ? 'text-primary'
                      : isDone
                      ? 'text-emerald-400'
                      : 'text-slate-500 opacity-60'
                  }`}
                >
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center font-bold text-sm mb-1.5 transition-all ${
                      isCurrent
                        ? 'bg-primary text-black shadow-lg shadow-primary/30 ring-2 ring-primary/40'
                        : isDone
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : 'bg-surface-container text-slate-400'
                    }`}
                  >
                    {isDone ? (
                      <span className="material-symbols-outlined text-lg">check</span>
                    ) : (
                      <span className="font-mono">{step.num}</span>
                    )}
                  </div>
                  <span className="text-[11px] sm:text-xs font-semibold font-headline truncate max-w-full">
                    {step.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Progress Bar Line */}
          <div className="w-full bg-[#182337] h-1.5 rounded-full mt-4 overflow-hidden">
            <div
              className="bg-gradient-to-r from-primary to-emerald-400 h-full transition-all duration-500"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* STEP 1: Academic & Target Profile */}
        {currentStep === 1 && (
          <div className="bg-[#0c1220] border border-surface-container rounded-2xl p-6 sm:p-8 shadow-xl animate-fade-in">
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-surface-container">
              <div>
                <h3 className="text-xl font-bold font-headline text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">school</span>
                  Step 1: Academic & Target Placement Credentials
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Calibrated to Indian engineering campus recruitment criteria (IIT, NIT, IIIT, BITS & Tier-1).
                </p>
              </div>
              <span className="text-xs font-mono text-primary bg-primary/10 px-2.5 py-1 rounded-md border border-primary/20">
                Tier-1 Calibrated
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
                  Candidate Full Name
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-[#141b2b] border border-surface-container rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
                  College / Institute
                </label>
                <input
                  type="text"
                  value={formData.college}
                  onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                  placeholder="e.g. IIT Delhi, BITS Pilani, NIT Trichy"
                  className="w-full bg-[#141b2b] border border-surface-container rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
                  Degree & Branch
                </label>
                <select
                  value={formData.branch}
                  onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                  className="w-full bg-[#141b2b] border border-surface-container rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary"
                >
                  <option value="Computer Science and Engineering">B.Tech - Computer Science & Engineering (CSE)</option>
                  <option value="Information Technology">B.Tech - Information Technology (IT)</option>
                  <option value="Electronics & Communication Engineering">B.Tech - Electronics & Communication (ECE)</option>
                  <option value="Artificial Intelligence and Data Science">B.Tech - AI & Data Science (AI/DS)</option>
                  <option value="Electrical Engineering">B.Tech - Electrical Engineering (EE)</option>
                  <option value="Dual Degree CSE (B.Tech + M.Tech)">Dual Degree CSE (B.Tech + M.Tech 5-Yr)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
                    Current CGPA
                  </label>
                  <input
                    type="text"
                    value={formData.cgpa}
                    onChange={(e) => setFormData({ ...formData, cgpa: e.target.value })}
                    className="w-full bg-[#141b2b] border border-surface-container rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
                    Passing Year
                  </label>
                  <select
                    value={formData.batchYear}
                    onChange={(e) => setFormData({ ...formData, batchYear: e.target.value })}
                    className="w-full bg-[#141b2b] border border-surface-container rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary font-mono"
                  >
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
                  Target Company Track & Persona
                </label>
                <select
                  value={formData.targetRole}
                  onChange={(e) => setFormData({ ...formData, targetRole: e.target.value })}
                  className="w-full bg-[#141b2b] border border-surface-container rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary"
                >
                  <option value="Tier-1 SDE-1 / Systems Software Engineer">Tier-1 SDE-1: Google (L3), Amazon, Microsoft</option>
                  <option value="High Frequency Trading / Low Latency C++">Fintech / Quant Systems: Graviton, Tower Research, Jane Street</option>
                  <option value="Cloud Native / Distributed Backend Systems">High-Scale Backend: Uber, Atlassian, Razorpay, Swiggy</option>
                  <option value="AI / Foundation Model Systems Engineer">AI Systems & ML Infra: NVIDIA, Adobe, OpenAI</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
                  Target Compensation Expectation (CTC)
                </label>
                <div className="flex gap-3">
                  {['18 - 25 LPA', '28 - 38 LPA', '40 - 55 LPA', '60+ LPA (Quant/US)'].map((tier) => (
                    <button
                      key={tier}
                      type="button"
                      onClick={() => setFormData({ ...formData, targetCtc: tier })}
                      className={`flex-1 py-2 px-2 text-xs rounded-xl border transition-all font-mono ${
                        formData.targetCtc === tier
                          ? 'bg-primary/20 border-primary text-primary font-semibold'
                          : 'bg-[#141b2b] border-surface-container text-slate-400 hover:text-white'
                      }`}
                    >
                      {tier}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-surface-container flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-emerald-400">check_circle</span>
                All fields verified for campus audit
              </span>
              <button
                onClick={handleNextStep}
                className="px-6 py-2.5 rounded-xl bg-primary text-black font-semibold text-sm hover:bg-primary-bright transition-all flex items-center gap-2 shadow-lg shadow-primary/20"
              >
                Continue to Resume Deep-Scan
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Resume Deep-Scan & Tech Stack */}
        {currentStep === 2 && (
          <div className="bg-[#0c1220] border border-surface-container rounded-2xl p-6 sm:p-8 shadow-xl animate-fade-in">
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-surface-container">
              <div>
                <h3 className="text-xl font-bold font-headline text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">description</span>
                  Step 2: Resume Deep-Scan & ATS Calibration
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Our neural parser assesses keyword saturation, quantified impact metrics, and repo signals.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800 px-2.5 py-1 rounded-md">
                  ATS Score: {atsScore}/100
                </span>
              </div>
            </div>

            {/* Resume Upload / Ingestion Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
              <div className="lg:col-span-7 bg-[#111726] border border-surface-container rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
                      <span className="material-symbols-outlined">picture_as_pdf</span>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white font-mono">Rohan_Sharma_Resume_2026.pdf</div>
                      <div className="text-xs text-slate-400">184 KB • Uploaded & Indexed</div>
                    </div>
                  </div>
                  <button
                    onClick={handleTriggerRescan}
                    disabled={isScanningResume}
                    className="px-3 py-1.5 rounded-lg bg-surface-container text-xs text-primary font-mono hover:bg-slate-700 transition-colors flex items-center gap-1.5"
                  >
                    <span className={`material-symbols-outlined text-sm ${isScanningResume ? 'animate-spin' : ''}`}>
                      refresh
                    </span>
                    Re-Scan
                  </button>
                </div>

                {isScanningResume && (
                  <div className="mb-4">
                    <div className="flex justify-between text-xs font-mono text-primary mb-1">
                      <span>Neural Extraction in Progress...</span>
                      <span>{scanProgress}%</span>
                    </div>
                    <div className="w-full bg-[#1b263b] h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-primary h-full transition-all duration-300"
                        style={{ width: `${scanProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* ATS Metric Breakdown */}
                <div className="grid grid-cols-3 gap-3 pt-3 border-t border-surface-container/60">
                  <div className="bg-[#162033] p-2.5 rounded-lg text-center">
                    <div className="text-[11px] text-slate-400 font-mono">Action Verbs</div>
                    <div className="text-sm font-bold text-emerald-400 font-mono mt-0.5">94% High</div>
                  </div>
                  <div className="bg-[#162033] p-2.5 rounded-lg text-center">
                    <div className="text-[11px] text-slate-400 font-mono">Quantified Impact</div>
                    <div className="text-sm font-bold text-amber-400 font-mono mt-0.5">82% Good</div>
                  </div>
                  <div className="bg-[#162033] p-2.5 rounded-lg text-center">
                    <div className="text-[11px] text-slate-400 font-mono">Tier-1 Keywords</div>
                    <div className="text-sm font-bold text-primary font-mono mt-0.5">88% Match</div>
                  </div>
                </div>

                {/* Missing Recommended Keywords Banner */}
                <div className="mt-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-base text-amber-400 mt-0.5">lightbulb</span>
                  <div>
                    <span className="font-semibold text-amber-300">Recommended Additions:</span> Add mention of "Raft / Paxos consensus" or "Distributed Caching (LRU/LFU)" to bump ATS score past 92.
                  </div>
                </div>
              </div>

              {/* Verified Technical Skills from PDF */}
              <div className="lg:col-span-5 bg-[#111726] border border-surface-container rounded-xl p-5 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
                    <span>Parsed Tech Stack</span>
                    <span className="text-emerald-400 font-mono">8 Verified</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {detectedSkills.map((sk, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-md bg-[#19243a] text-xs font-mono text-slate-200 border border-surface-container flex items-center gap-1"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-surface-container/60">
                  <div className="text-xs font-mono text-slate-400 mb-2">Coding Platform Sync</div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-[#162033] border border-surface-container text-xs font-mono text-slate-300">
                      <span className="material-symbols-outlined text-sm text-slate-400">code</span>
                      <span className="truncate">{githubUser}</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-[#162033] border border-surface-container text-xs font-mono text-amber-400">
                      <span className="material-symbols-outlined text-sm">stars</span>
                      <span className="truncate">{leetcodeUser}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-5 border-t border-surface-container flex items-center justify-between">
              <button
                onClick={() => setCurrentStep(1)}
                className="px-4 py-2 rounded-xl bg-surface-container text-slate-300 text-xs font-mono hover:text-white"
              >
                ← Back
              </button>
              <button
                onClick={handleNextStep}
                className="px-6 py-2.5 rounded-xl bg-primary text-black font-semibold text-sm hover:bg-primary-bright transition-all flex items-center gap-2 shadow-lg shadow-primary/20"
              >
                Proceed to Skill Baseline Test
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Quick Diagnostic Questions */}
        {currentStep === 3 && (
          <div className="bg-[#0c1220] border border-surface-container rounded-2xl p-6 sm:p-8 shadow-xl animate-fade-in">
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-surface-container">
              <div>
                <h3 className="text-xl font-bold font-headline text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">psychology</span>
                  Step 3: Rapid Engineering Skill Baseline
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Answer 3 rapid-fire architecture & algorithm dilemmas to calibrate your initial placement readiness score.
                </p>
              </div>
              <div className="text-xs font-mono text-slate-400">
                Question {Object.keys(diagnosticAnswers).length} of 3
              </div>
            </div>

            <div className="space-y-6">
              {diagnosticQuestions.map((q, idx) => {
                const selected = diagnosticAnswers[q.id];
                return (
                  <div
                    key={q.id}
                    className="p-5 rounded-xl bg-[#111726] border border-surface-container hover:border-slate-600 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[11px] font-mono border border-primary/20">
                        {q.topic}
                      </span>
                      <span className="text-xs font-mono text-slate-400">Q{idx + 1}</span>
                    </div>

                    <h4 className="text-sm font-semibold text-slate-100 mb-4 leading-relaxed">
                      {q.question}
                    </h4>

                    <div className="space-y-2">
                      {q.options.map((opt, optIdx) => {
                        const isChosen = selected === optIdx;
                        const isCorrect = q.correct === optIdx;
                        let btnStyle = 'bg-[#162033] border-surface-container text-slate-300 hover:border-slate-500';
                        if (isChosen) {
                          btnStyle = 'bg-primary/20 border-primary text-primary font-medium';
                        }
                        return (
                          <button
                            key={optIdx}
                            type="button"
                            onClick={() =>
                              setDiagnosticAnswers({ ...diagnosticAnswers, [q.id]: optIdx })
                            }
                            className={`w-full text-left p-3 rounded-lg border text-xs transition-all flex items-start gap-3 ${btnStyle}`}
                          >
                            <span className="w-5 h-5 rounded-full border flex-shrink-0 flex items-center justify-center text-[10px] font-mono mt-0.5 border-current">
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span>{opt}</span>
                          </button>
                        );
                      })}
                    </div>

                    {selected !== undefined && (
                      <div className="mt-3 pt-3 border-t border-white/5 text-[11px] font-mono text-slate-400 flex items-start gap-2">
                        <span className="material-symbols-outlined text-xs text-primary mt-0.5">info</span>
                        <span>{q.explanation}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-8 pt-5 border-t border-surface-container flex items-center justify-between">
              <button
                onClick={() => setCurrentStep(2)}
                className="px-4 py-2 rounded-xl bg-surface-container text-slate-300 text-xs font-mono hover:text-white"
              >
                ← Back
              </button>
              <button
                onClick={handleNextStep}
                disabled={diagnosticSubmitted}
                className="px-6 py-2.5 rounded-xl bg-primary text-black font-semibold text-sm hover:bg-primary-bright transition-all flex items-center gap-2 shadow-lg shadow-primary/20 disabled:opacity-50"
              >
                {diagnosticSubmitted ? (
                  <>
                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    Computing Calibration...
                  </>
                ) : (
                  <>
                    Calibrate Placement Readiness
                    <span className="material-symbols-outlined text-base">auto_awesome</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Calibration Complete & Placement Dossier */}
        {currentStep === 4 && (
          <div className="bg-[#0c1220] border border-surface-container rounded-2xl p-6 sm:p-8 shadow-xl animate-fade-in text-center">
            
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-primary flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/30">
              <span className="material-symbols-outlined text-3xl text-black">verified</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Calibration Complete • BTech Placement Index v4.2
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold font-headline text-white">
              You are Calibrated for Tier-1 Mocks!
            </h3>
            <p className="text-slate-400 text-sm max-w-lg mx-auto mt-2">
              Profile synced with IIT Delhi placement criteria. Your baseline readiness score puts you in the top 14% of the 2026 graduating cohort.
            </p>

            {/* Scorecard Hero Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8 text-left">
              <div className="bg-[#121827] border border-surface-container rounded-xl p-5">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  Baseline Readiness
                </div>
                <div className="text-3xl font-extrabold text-primary font-headline mt-1">
                  78 <span className="text-xs font-normal text-slate-400 font-mono">/ 100</span>
                </div>
                <div className="text-[11px] text-emerald-400 mt-2 flex items-center gap-1 font-mono">
                  <span className="material-symbols-outlined text-xs">trending_up</span>
                  +12 pts over batch median
                </div>
              </div>

              <div className="bg-[#121827] border border-surface-container rounded-xl p-5">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  ATS Resume Quality
                </div>
                <div className="text-3xl font-extrabold text-emerald-400 font-headline mt-1">
                  88%
                </div>
                <div className="text-[11px] text-slate-300 mt-2 flex items-center gap-1 font-mono">
                  <span className="material-symbols-outlined text-xs text-primary">check</span>
                  Quantified Impact High
                </div>
              </div>

              <div className="bg-[#121827] border border-surface-container rounded-xl p-5">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  Priority Calibrated Track
                </div>
                <div className="text-base font-bold text-white font-headline mt-2 truncate">
                  Google SDE-1 (L3)
                </div>
                <div className="text-[11px] text-slate-400 mt-2 font-mono">
                  Target CTC: 32 - 45 LPA
                </div>
              </div>
            </div>

            {/* Recommended 4-Week Sprint */}
            <div className="bg-[#111726] border border-surface-container rounded-xl p-5 text-left mb-8">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
                <span>Personalized 4-Week Placement Sprint</span>
                <span className="text-primary font-mono">Sprint 1 of 4</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#162033] border border-surface-container">
                  <span className="material-symbols-outlined text-primary text-base">check_circle</span>
                  <span className="text-slate-200">Week 1: High-Performance LRU & Lock-Free Queues</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#162033] border border-surface-container">
                  <span className="material-symbols-outlined text-slate-500 text-base">radio_button_unchecked</span>
                  <span className="text-slate-300">Week 2: Distributed Consensus & Raft Elections</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#162033] border border-surface-container">
                  <span className="material-symbols-outlined text-slate-500 text-base">radio_button_unchecked</span>
                  <span className="text-slate-300">Week 3: Dynamic Programming on Trees & DAGs</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#162033] border border-surface-container">
                  <span className="material-symbols-outlined text-slate-500 text-base">radio_button_unchecked</span>
                  <span className="text-slate-300">Week 4: Google Behavioral & Leadership Bar</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => {
                  handleFinishOnboarding();
                  onNavigate('live-ai-mock');
                }}
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-primary to-primary-bright text-black font-semibold text-sm hover:opacity-95 transition-all shadow-lg shadow-primary/25 flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-base">videocam</span>
                Launch First Live AI Mock Interview
              </button>

              <button
                onClick={() => {
                  handleFinishOnboarding();
                  onNavigate('dashboard');
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#141d2e] border border-surface-container text-white text-sm font-medium hover:bg-[#1a253a] transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-base">dashboard</span>
                Go to Placement Dashboard
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
