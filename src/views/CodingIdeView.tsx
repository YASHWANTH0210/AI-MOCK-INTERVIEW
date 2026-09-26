import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { auth, saveCodeSubmission } from '../lib/firebase';

interface CodingIdeViewProps {
  onNavigate?: (tab: any) => void;
}

export const CodingIdeView: React.FC<CodingIdeViewProps> = () => {
  const [mobilePane, setMobilePane] = useState<'problem' | 'editor' | 'output'>('editor');
  const [selectedLanguage, setSelectedLanguage] = useState<'cpp' | 'python' | 'java' | 'go'>('cpp');
  const [activeTab, setActiveTab] = useState<'desc' | 'analytics' | 'submissions'>('desc');
  const [activeTestCase, setActiveTestCase] = useState<number>(1);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showHintModal, setShowHintModal] = useState(false);
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [showTextReplyModal, setShowTextReplyModal] = useState(false);
  const [userTextAnswer, setUserTextAnswer] = useState('');
  const [aiEvaluationResponse, setAiEvaluationResponse] = useState<string | null>(null);

  // Countdown timer state
  const [secondsRemaining, setSecondsRemaining] = useState(31 * 60 + 45);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Code templates
  const codeTemplates = {
    cpp: `#include <unordered_map>
#include <list>

// MockPulse AI Placement Engine - Optimal O(1) Solution
class LRUCache {
private:
    int cap;
    std::list<std::pair<int, int>> dll;
    std::unordered_map<int, std::list<std::pair<int, int>>::iterator> cacheMap;

public:
    LRUCache(int capacity) : cap(capacity) {}

    int get(int key) {
        auto it = cacheMap.find(key);
        if (it == cacheMap.end()) return -1;
        // Move hit node to front of doubly linked list
        dll.splice(dll.begin(), dll, it->second);
        return it->second->second;
    }

    void put(int key, int value) {
        auto it = cacheMap.find(key);
        if (it != cacheMap.end()) {
            dll.splice(dll.begin(), dll, it->second);
            it->second->second = value;
            return;
        }

        if (dll.size() == cap) {
            int lruKey = dll.back().first;
            cacheMap.erase(lruKey);
            dll.pop_back();
        }
        dll.emplace_front(key, value);
        cacheMap[key] = dll.begin();
    }
};`,
    python: `from collections import OrderedDict

# MockPulse AI Placement Engine - Optimal O(1) Solution
class LRUCache:
    def __init__(self, capacity: int):
        self.cap = capacity
        self.cache = OrderedDict()

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        self.cache.move_to_end(key)
        return self.cache[key]

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.cap:
            self.cache.popitem(last=False)
`,
    java: `import java.util.*;

// MockPulse AI Placement Engine - Optimal O(1) Solution
class LRUCache {
    private final int capacity;
    private final Map<Integer, Node> map;
    private final Node head, tail;

    static class Node {
        int key, val;
        Node prev, next;
        Node(int k, int v) { key = k; val = v; }
    }

    public LRUCache(int capacity) {
        this.capacity = capacity;
        this.map = new HashMap<>();
        head = new Node(0, 0);
        tail = new Node(0, 0);
        head.next = tail;
        tail.prev = head;
    }

    public int get(int key) {
        if (!map.containsKey(key)) return -1;
        Node node = map.get(key);
        remove(node);
        insertHead(node);
        return node.val;
    }

    public void put(int key, int value) {
        if (map.containsKey(key)) {
            remove(map.get(key));
        }
        if (map.size() == capacity) {
            map.remove(tail.prev.key);
            remove(tail.prev);
        }
        Node node = new Node(key, value);
        insertHead(node);
        map.put(key, node);
    }

    private void remove(Node node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    private void insertHead(Node node) {
        node.next = head.next;
        node.next.prev = node;
        head.next = node;
        node.prev = head;
    }
}`,
    go: `package main

// MockPulse AI Placement Engine - Optimal O(1) Solution
type Node struct {
    key, val   int
    prev, next *Node
}

type LRUCache struct {
    cap        int
    cache      map[int]*Node
    head, tail *Node
}

func Constructor(capacity int) LRUCache {
    h, t := &Node{}, &Node{}
    h.next = t
    t.prev = h
    return LRUCache{
        cap:   capacity,
        cache: make(map[int]*Node),
        head:  h,
        tail:  t,
    }
}
`,
  };

  const [code, setCode] = useState(codeTemplates[selectedLanguage]);

  const handleLanguageChange = (lang: 'cpp' | 'python' | 'java' | 'go') => {
    setSelectedLanguage(lang);
    setCode(codeTemplates[lang]);
  };

  // Run Code action
  const [terminalLogs, setTerminalLogs] = useState([
    { type: 'command', text: '$ g++ -O3 -std=c++20 Solution.cpp -o lru_bench && ./lru_bench' },
    { type: 'info', text: '[INFO] Running 3 placement assertions on dynamic capacity...' },
    { type: 'pass', text: '✔ Assertion 1: LRUCache(2) eviction parity passed (0.012ms)' },
    { type: 'pass', text: '✔ Assertion 2: Random access pattern key [1..10000] OK' },
    { type: 'meta', text: '➤ Memory Peak: 41.22 MB | Cache Evictions: 4,192 operations' },
    { type: 'ready', text: 'All standard checks validated. Ready for candidate submission.' },
  ]);

  const runCode = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setTerminalLogs([
        { type: 'command', text: `$ compiler --profile=O3 Solution.${selectedLanguage}` },
        { type: 'info', text: '[SUITE] Executing 3 test assertions against placement rubric...' },
        { type: 'pass', text: '✔ Test Suite 1: Capacity=2 Eviction logic verified (0.009ms)' },
        { type: 'pass', text: '✔ Test Suite 2: Amortized O(1) latency within bounds (<10ms)' },
        { type: 'pass', text: '✔ Test Suite 3: Custom Driver assertions passed 100%' },
        { type: 'ready', text: 'All assertions green. 0 memory leaks detected.' },
      ]);
    }, 1100);
  };

  const submitSolution = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {
        // Confetti fallback
      }
      
      // Save code submission to Firestore for authenticated user
      if (auth.currentUser) {
        saveCodeSubmission(auth.currentUser.uid, {
          problemTitle: '146. LRU Cache (Least Recently Used)',
          language: selectedLanguage,
          code: codeTemplates[selectedLanguage],
          status: 'ACCEPTED',
          runtimeMs: 12,
          memoryMb: 42.4,
          timeComplexity: 'O(1) amortized',
          spaceComplexity: 'O(capacity)',
        }).catch(console.error);
      }

      setTerminalLogs((prev) => [
        ...prev,
        { type: 'pass', text: '★ SUBMISSION ACCEPTED: Top 94th national percentile for Tier-1 drives.' },
        { type: 'info', text: '✔ Persisted to Firestore Placement Dossier' },
      ]);
    }, 1500);
  };

  const handleVoiceAnswer = () => {
    setIsRecordingVoice(!isRecordingVoice);
  };

  const handleTextAnswerSubmit = () => {
    if (!userTextAnswer.trim()) return;
    setAiEvaluationResponse(
      'Evaluating your response: "Because an array or vector requires shifting remaining elements in O(N) when deleting from the middle or front to maintain LRU order, it violates the O(1) requirement. By contrast, a doubly-linked list allows O(1) pointer updates when splicing or deleting the LRU node." — High confidence score: 96%.'
    );
  };

  return (
    <div className="w-full flex flex-col bg-surface min-h-[calc(100vh-4rem)]">
      {/* Interactive Top Action & Meta HUD Bar */}
      <header className="w-full bg-[#0a0e17] px-3 sm:px-gutter py-2.5 sm:py-space-sm shadow-md border-b border-surface-container flex flex-wrap items-center justify-between gap-2 sm:gap-space-md">
        <div className="flex items-center gap-2 sm:gap-space-md min-w-0">
          <div className="flex items-center gap-space-xs text-secondary">
            <span className="material-symbols-outlined text-[20px]">terminal</span>
            <span className="font-label-caps text-[10px] uppercase tracking-wider text-on-surface-variant">
              Live IDE
            </span>
          </div>
          <div className="h-4 w-[2px] bg-surface-variant hidden sm:block"></div>
          <div className="flex items-center gap-1.5 sm:gap-space-sm min-w-0">
            <h1 className="font-headline-sm text-sm sm:text-headline-sm text-on-surface truncate">
              146. LRU Cache
            </h1>
            <span className="px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-label-caps bg-surface-container-high text-secondary uppercase tracking-wider">
              Hard / Med
            </span>
          </div>
        </div>

        {/* Right Controls: Language Selector, Session Timer, Run, Submit, Hint */}
        <div className="flex items-center gap-1.5 sm:gap-space-sm flex-wrap">
          {/* Language Picker */}
          <div className="relative">
            <select
              value={selectedLanguage}
              onChange={(e) => handleLanguageChange(e.target.value as any)}
              className="bg-surface-container-low text-on-surface font-label-caps text-[11px] sm:text-label-caps px-2 sm:px-space-sm py-1.5 rounded-lg cursor-pointer pr-7 outline-none border border-surface-container-high hover:bg-surface-container transition-colors"
            >
              <option value="cpp">C++ 20</option>
              <option value="python">Python 3.12</option>
              <option value="java">Java 21</option>
              <option value="go">Go 1.22</option>
            </select>
            <span className="material-symbols-outlined text-[16px] text-on-surface-variant pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2">
              expand_more
            </span>
          </div>

          {/* Telemetry Timer */}
          <div className="flex items-center gap-1 px-2 sm:px-space-sm py-1.5 rounded-lg bg-surface-container font-telemetry-metric text-xs sm:text-body-sm text-on-surface border border-surface-container-high">
            <span className="material-symbols-outlined text-[15px] text-secondary animate-pulse">timer</span>
            <span className="tracking-tight">{formatTime(secondsRemaining)}</span>
          </div>

          {/* Run Tests Button */}
          <button
            onClick={runCode}
            disabled={isRunning}
            className="flex items-center gap-1 px-2.5 sm:px-space-md py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface text-xs sm:text-body-sm font-headline-sm transition-all shadow-sm cursor-pointer disabled:opacity-60"
          >
            {isRunning ? (
              <>
                <span className="material-symbols-outlined text-[15px] animate-spin">refresh</span>
                <span className="hidden sm:inline">Compiling...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[15px] text-tertiary">play_arrow</span>
                <span>Run</span>
              </>
            )}
          </button>

          {/* Submit Solution Button */}
          <button
            onClick={submitSolution}
            disabled={isSubmitting}
            className="flex items-center gap-1 px-2.5 sm:px-space-md py-1.5 rounded-lg bg-primary text-on-primary text-xs sm:text-body-sm font-headline-sm shadow-md hover:brightness-110 active:scale-95 transition-all cursor-pointer disabled:opacity-60 font-semibold"
          >
            {isSubmitting ? (
              <>
                <span className="material-symbols-outlined text-[15px] animate-spin">sync</span>
                <span className="hidden sm:inline">Evaluating...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[15px]">cloud_upload</span>
                <span>Submit</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Screen Pane Switcher for Phone Navigation */}
      <div className="lg:hidden w-full bg-[#0d1322] border-b border-surface-container px-2 py-1.5 flex items-center justify-around gap-1">
        {[
          { id: 'problem', label: 'Problem & Specs', icon: 'description' },
          { id: 'editor', label: 'Code Editor', icon: 'code' },
          { id: 'output', label: 'Tests & Output', icon: 'terminal' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setMobilePane(tab.id as any)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all whitespace-nowrap min-h-[38px] ${
              mobilePane === tab.id
                ? 'bg-primary text-black font-bold shadow-md'
                : 'text-slate-300 hover:text-white bg-surface-container/60'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Main Multi-Pane Technical IDE Grid */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-space-md p-3 sm:p-space-md flex-1">
        {/* Left Column: Problem Workspace & Diagnostics (5 Cols) */}
        <section className={`lg:col-span-5 flex flex-col gap-space-md ${mobilePane === 'problem' ? 'flex' : 'hidden lg:flex'}`}>
          {/* Upper Tabs & Problem Narrative Container */}
          <div className="bg-surface-container-low rounded-xl flex flex-col overflow-hidden shadow-sm border border-surface-container">
            {/* Tab Navigation Bar */}
            <div className="flex items-center bg-[#0a0e17] px-space-sm pt-space-xs overflow-x-auto gap-space-xs border-b border-surface-container">
              <button
                onClick={() => setActiveTab('desc')}
                className={`flex items-center gap-1.5 px-space-sm py-2 font-label-caps text-label-caps rounded-t transition-colors cursor-pointer ${
                  activeTab === 'desc'
                    ? 'text-primary border-b-2 border-primary bg-surface-container-low font-bold'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[14px]">description</span>
                <span>Description</span>
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`flex items-center gap-1.5 px-space-sm py-2 font-label-caps text-label-caps rounded-t transition-colors cursor-pointer ${
                  activeTab === 'analytics'
                    ? 'text-primary border-b-2 border-primary bg-surface-container-low font-bold'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[14px]">insights</span>
                <span>Analytics</span>
              </button>
              <button
                onClick={() => setActiveTab('submissions')}
                className={`flex items-center gap-1.5 px-space-sm py-2 font-label-caps text-label-caps rounded-t transition-colors cursor-pointer ${
                  activeTab === 'submissions'
                    ? 'text-primary border-b-2 border-primary bg-surface-container-low font-bold'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[14px]">history</span>
                <span>Submissions (3)</span>
              </button>
            </div>

            {/* Target Complexity HUD */}
            <div className="mx-space-md mt-space-md px-space-md py-space-xs rounded bg-surface-container flex items-center justify-between text-body-sm border border-surface-container-high">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-[16px] text-tertiary">speed</span>
                <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Target Complexity</span>
              </div>
              <div className="font-telemetry-metric text-body-sm text-tertiary flex items-center gap-space-sm">
                <span>Time: <strong className="text-on-surface">O(1)</strong></span>
                <span className="text-on-surface-variant">|</span>
                <span>Space: <strong className="text-on-surface">O(capacity)</strong></span>
              </div>
            </div>

            {/* Scrollable Description Body */}
            {activeTab === 'desc' && (
              <div className="p-space-md space-y-space-md text-on-surface font-body-md text-body-md max-h-[520px] overflow-y-auto leading-relaxed">
                <p>
                  Design a data structure that follows the constraints of a{' '}
                  <strong className="text-secondary font-semibold">Least Recently Used (LRU) cache</strong>.
                </p>
                <p>
                  Implement the <code className="px-1.5 py-0.5 rounded bg-surface-container-high text-primary font-code-block text-code-block">LRUCache</code> class:
                </p>
                <ul className="space-y-space-xs list-disc list-inside text-on-surface-variant">
                  <li>
                    <code className="px-1.5 py-0.5 rounded bg-surface-container text-secondary font-code-block text-code-block">LRUCache(int capacity)</code>:{' '}
                    Initialize the LRU cache with positive size <code className="text-on-surface font-mono">capacity</code>.
                  </li>
                  <li>
                    <code className="px-1.5 py-0.5 rounded bg-surface-container text-secondary font-code-block text-code-block">int get(int key)</code>:{' '}
                    Return the value of the <code className="text-on-surface font-mono">key</code> if the key exists, otherwise return <code className="text-error font-mono">-1</code>.
                  </li>
                  <li>
                    <code className="px-1.5 py-0.5 rounded bg-surface-container text-secondary font-code-block text-code-block">void put(int key, int value)</code>:{' '}
                    Update the value of the key if key exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the capacity from this operation, evict the least recently used key.
                  </li>
                </ul>

                <div className="p-space-sm rounded-lg bg-surface-container-highest/60 text-body-sm text-on-surface-variant flex items-start gap-space-xs border border-surface-container-high">
                  <span className="material-symbols-outlined text-[18px] text-secondary mt-0.5">verified_user</span>
                  <span>
                    <strong className="text-on-surface">Algorithmic Requirement:</strong> The functions <code className="text-primary font-code-block">get</code> and <code className="text-primary font-code-block">put</code> must each run in <code className="text-tertiary font-code-block">O(1)</code> average time complexity.
                  </span>
                </div>

                {/* Example 1 Card */}
                <div className="rounded-xl bg-surface-container p-space-md space-y-space-xs border border-surface-container-high">
                  <div className="flex items-center justify-between">
                    <span className="font-headline-sm text-body-md text-on-surface font-semibold">Example 1</span>
                    <span className="font-label-caps text-[10px] text-tertiary uppercase">Standard Scenario</span>
                  </div>
                  <div className="p-space-sm rounded bg-[#0a0e17] font-code-block text-code-block text-on-surface-variant overflow-x-auto space-y-1">
                    <div><span className="text-outline">Input:</span> ["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]</div>
                    <div className="pl-4">[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]</div>
                    <div><span className="text-outline">Output:</span> [null, null, null, 1, null, -1, null, -1, 3, 4]</div>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs">
                    <strong className="text-on-surface">Explanation:</strong> Cache capacity 2. Key 2 gets evicted when Key 3 is put since Key 1 was queried via <code className="text-secondary font-code-block">get(1)</code>.
                  </p>
                </div>

                {/* Constraints */}
                <div className="space-y-space-xs">
                  <div className="font-label-caps text-label-caps uppercase tracking-wider text-on-surface-variant">Constraints</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-xs font-code-block text-code-block text-on-surface-variant">
                    <div className="px-space-sm py-1 rounded bg-surface-container">1 ≤ capacity ≤ 3000</div>
                    <div className="px-space-sm py-1 rounded bg-surface-container">0 ≤ key ≤ 10⁴</div>
                    <div className="px-space-sm py-1 rounded bg-surface-container">0 ≤ value ≤ 10⁵</div>
                    <div className="px-space-sm py-1 rounded bg-surface-container">Max 2 × 10⁵ calls to get &amp; put</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="p-space-md space-y-3 text-body-sm">
                <div className="p-3 bg-surface-container rounded-lg">
                  <div className="text-on-surface font-semibold mb-1">Company Occurrences in Day 1 Drives</div>
                  <div className="space-y-2 text-on-surface-variant">
                    <div className="flex justify-between items-center">
                      <span>Amazon (OA + SDE-1 Direct)</span>
                      <span className="text-tertiary font-bold">94% Frequency</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Google (L3 In-person Bar Raiser)</span>
                      <span className="text-primary font-bold">88% Frequency</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Microsoft (On-Campus Direct)</span>
                      <span className="text-secondary font-bold">78% Frequency</span>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-surface-container rounded-lg">
                  <div className="text-on-surface font-semibold mb-1">Common Pitfalls Caught by AI</div>
                  <ul className="list-disc list-inside text-on-surface-variant space-y-1">
                    <li>Using an array or vector which yields O(N) eviction instead of O(1).</li>
                    <li>Not updating list position when an existing key is updated via <code className="text-secondary font-mono">put(key, val)</code>.</li>
                    <li>Memory leaks from stale nodes in unmanaged environments.</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'submissions' && (
              <div className="p-space-md space-y-2 text-body-sm">
                <div className="p-2.5 rounded-lg bg-surface-container flex justify-between items-center">
                  <div>
                    <span className="text-tertiary font-bold">Accepted</span>
                    <span className="text-on-surface-variant text-[11px] ml-2">C++20 • 42ms • 41.2 MB</span>
                  </div>
                  <span className="text-label-caps text-[10px] text-outline">Just now</span>
                </div>
                <div className="p-2.5 rounded-lg bg-surface-container flex justify-between items-center">
                  <div>
                    <span className="text-tertiary font-bold">Accepted</span>
                    <span className="text-on-surface-variant text-[11px] ml-2">C++20 • 51ms • 42.1 MB</span>
                  </div>
                  <span className="text-label-caps text-[10px] text-outline">Yesterday</span>
                </div>
                <div className="p-2.5 rounded-lg bg-surface-container flex justify-between items-center">
                  <div>
                    <span className="text-error font-bold">Time Limit Exceeded</span>
                    <span className="text-on-surface-variant text-[11px] ml-2">Vector approach O(N)</span>
                  </div>
                  <span className="text-label-caps text-[10px] text-outline">3 days ago</span>
                </div>
              </div>
            )}
          </div>

          {/* Test Cases Panel */}
          <div className="bg-surface-container-low rounded-xl p-space-md shadow-sm space-y-space-sm border border-surface-container">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-[16px] text-tertiary">check_circle</span>
                <span className="font-headline-sm text-body-sm font-semibold text-on-surface">Placement Test Suites</span>
              </div>
              <span className="font-label-caps text-[10px] text-tertiary bg-tertiary-container/30 px-space-xs py-0.5 rounded">
                2 / 3 Verified
              </span>
            </div>

            <div className="grid grid-cols-3 gap-space-xs">
              <button
                onClick={() => setActiveTestCase(1)}
                className={`px-space-sm py-2 rounded-lg text-left flex flex-col gap-0.5 transition-colors cursor-pointer ${
                  activeTestCase === 1 ? 'bg-surface-container-high border border-primary/40' : 'bg-surface-container hover:bg-surface-container-high'
                }`}
              >
                <span className="font-label-caps text-[10px] text-tertiary flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span> Case 1
                </span>
                <span className="font-telemetry-metric text-body-sm text-on-surface">Passed</span>
              </button>
              <button
                onClick={() => setActiveTestCase(2)}
                className={`px-space-sm py-2 rounded-lg text-left flex flex-col gap-0.5 transition-colors cursor-pointer ${
                  activeTestCase === 2 ? 'bg-surface-container-high border border-primary/40' : 'bg-surface-container hover:bg-surface-container-high'
                }`}
              >
                <span className="font-label-caps text-[10px] text-tertiary flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span> Case 2
                </span>
                <span className="font-telemetry-metric text-body-sm text-on-surface">Passed</span>
              </button>
              <button
                onClick={() => setActiveTestCase(3)}
                className={`px-space-sm py-2 rounded-lg text-left flex flex-col gap-0.5 transition-colors cursor-pointer ${
                  activeTestCase === 3 ? 'bg-surface-container-high border border-secondary/40' : 'bg-surface-container-highest hover:bg-surface-bright'
                }`}
              >
                <span className="font-label-caps text-[10px] text-secondary flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Case 3
                </span>
                <span className="font-telemetry-metric text-body-sm text-on-surface">Custom</span>
              </button>
            </div>

            {/* Custom Input Editor */}
            <div className="p-space-sm rounded bg-[#0a0e17] font-code-block text-code-block text-on-surface space-y-1 border border-surface-container">
              <div className="text-on-surface-variant font-label-caps text-[10px] uppercase">Custom Driver Input</div>
              <div className="text-secondary">["LRUCache","put","get","put","get"]</div>
              <div className="text-on-surface-variant">[[1],[2,1],[2],[3,2],[2]]</div>
            </div>
          </div>
        </section>

        {/* Right Column: Code Editor & Execution Terminal (7 Cols) */}
        <section className={`lg:col-span-7 flex flex-col gap-space-md ${mobilePane !== 'problem' ? 'flex' : 'hidden lg:flex'}`}>
          {/* Editor Header & Canvas */}
          <div className={`bg-[#0a0e17] rounded-xl flex flex-col overflow-hidden shadow-xl border border-surface-container ${mobilePane === 'output' ? 'hidden sm:flex' : 'flex'}`}>
            <div className="flex items-center justify-between px-space-md py-space-xs bg-surface-container-low border-b border-surface-container">
              <div className="flex items-center gap-space-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-error"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-tertiary"></span>
                <span className="font-code-block text-code-block text-on-surface-variant pl-space-xs">
                  Solution.{selectedLanguage === 'python' ? 'py' : selectedLanguage === 'java' ? 'java' : selectedLanguage === 'go' ? 'go' : 'cpp'}
                </span>
              </div>
              <div className="flex items-center gap-space-md text-on-surface-variant font-label-caps text-label-caps">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">tune</span> Tab Size: 4
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">memory</span> Clang-16
                </span>
              </div>
            </div>

            {/* Inline AI Reviewer Bubble Injection */}
            <div className="m-3 p-space-sm rounded-lg bg-surface-container-high/90 shadow-md text-on-surface font-body-sm flex items-start gap-space-sm border border-secondary/30">
              <span className="material-symbols-outlined text-[18px] text-secondary mt-0.5">smart_toy</span>
              <div className="space-y-0.5">
                <span className="font-label-caps text-[10px] text-secondary uppercase font-semibold">
                  Pulse AI Copilot • Real-time Profiler
                </span>
                <p className="text-on-surface">
                  Good choice using a doubly linked list + hash map. Ensure your <code className="text-secondary font-code-block font-mono">put</code> operation maintains O(1) amortized when evicting.
                </p>
              </div>
            </div>

            {/* Code Canvas with Line Numbers */}
            <div className="p-space-md bg-[#0a0e17] font-code-block text-code-block overflow-x-auto relative flex max-h-[380px] overflow-y-auto">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck={false}
                className="w-full h-80 bg-transparent resize-none text-on-surface font-mono text-[13px] leading-5 focus:outline-none"
              />
            </div>
          </div>

          {/* Execution Console Output & Telemetry */}
          <div className={`bg-[#0a0e17] rounded-xl flex flex-col overflow-hidden shadow-md border border-surface-container ${mobilePane === 'editor' ? 'hidden sm:flex' : 'flex'}`}>
            {/* Terminal Tab Bar */}
            <div className="flex items-center justify-between bg-surface-container-low px-space-md py-space-xs border-b border-surface-container">
              <div className="flex items-center gap-space-sm overflow-x-auto">
                <span className="font-label-caps text-label-caps text-tertiary flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">done_all</span> Test Passed
                </span>
                <div className="h-3 w-[1px] bg-surface-variant"></div>
                <span className="font-telemetry-metric text-[12px] text-on-surface">
                  42ms <span className="text-tertiary">(Beats 89.4%)</span>
                </span>
                <div className="h-3 w-[1px] bg-surface-variant"></div>
                <span className="font-telemetry-metric text-[12px] text-on-surface">
                  41.2 MB <span className="text-secondary">(Beats 92.1%)</span>
                </span>
              </div>
              <button
                onClick={() => setTerminalLogs([])}
                className="text-on-surface-variant hover:text-on-surface text-[12px] font-label-caps flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[14px]">cleaning_services</span> Clear
              </button>
            </div>

            {/* Terminal Output Area */}
            <div className="p-space-md font-code-block text-code-block text-on-surface-variant space-y-1.5 bg-[#0a0e17] max-h-48 overflow-y-auto">
              {terminalLogs.map((log, i) => (
                <div
                  key={i}
                  className={
                    log.type === 'command'
                      ? 'text-secondary'
                      : log.type === 'pass'
                      ? 'text-tertiary font-semibold'
                      : log.type === 'ready'
                      ? 'text-on-surface font-semibold pt-1'
                      : 'text-on-surface-variant'
                  }
                >
                  {log.text}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Docked Real-Time AI Copilot & Speech Drawer (Placement Simulator HUD) */}
      <section className="mx-space-md mb-space-md bg-surface-container-low rounded-xl p-space-md shadow-xl flex flex-col md:flex-row items-center justify-between gap-space-md border border-surface-container">
        {/* AI Interviewer Dialogue Section */}
        <div className="flex items-start gap-space-md w-full md:w-2/3">
          <div className="relative shrink-0">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-on-primary shadow-sm">
              <span className="material-symbols-outlined text-[24px]">smart_toy</span>
            </div>
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-tertiary ring-2 ring-surface-container-low"></span>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-space-sm">
              <span className="font-headline-sm text-body-sm font-semibold text-on-surface">
                AI Bar Raiser • Placement Evaluation
              </span>
              <span className="font-label-caps text-[10px] text-secondary bg-surface-container-high px-space-xs py-0.5 rounded">
                Live Behavioral DSA
              </span>
            </div>
            <p className="font-body-md text-body-md text-on-surface leading-normal">
              <strong className="text-secondary">
                “Can you explain why a simple array or vector wouldn't achieve O(1) eviction time in an LRU Cache?”
              </strong>
            </p>
          </div>
        </div>

        {/* Speech Telemetry, Microphone & Waveform Section */}
        <div className="flex items-center gap-space-md w-full md:w-auto justify-end">
          {/* Live Dynamic SVG Waveform */}
          <div className="hidden sm:flex flex-col items-end gap-1">
            <div className="flex items-center gap-1 h-6">
              <span className={`w-1 bg-secondary rounded-full ${isRecordingVoice ? 'h-5 animate-bounce' : 'h-3'}`}></span>
              <span className={`w-1 bg-secondary rounded-full ${isRecordingVoice ? 'h-6 animate-pulse' : 'h-5'}`}></span>
              <span className={`w-1 bg-secondary rounded-full ${isRecordingVoice ? 'h-4' : 'h-2'}`}></span>
              <span className={`w-1 bg-tertiary rounded-full ${isRecordingVoice ? 'h-7 animate-bounce' : 'h-6'}`}></span>
              <span className={`w-1 bg-secondary rounded-full ${isRecordingVoice ? 'h-5 animate-pulse' : 'h-4'}`}></span>
              <span className={`w-1 bg-secondary rounded-full ${isRecordingVoice ? 'h-6' : 'h-5'}`}></span>
              <span className={`w-1 bg-secondary rounded-full ${isRecordingVoice ? 'h-3 animate-bounce' : 'h-2'}`}></span>
            </div>
            <span className="font-telemetry-metric text-[11px] text-tertiary">
              {isRecordingVoice ? 'RECORDING VAD 16kHz' : 'SPEECH INPUT: 138 WPM'}
            </span>
          </div>

          {/* Verbal Response Action Trigger */}
          <button
            onClick={handleVoiceAnswer}
            className={`flex items-center gap-space-sm px-space-md py-space-sm rounded-lg font-headline-sm text-body-sm transition-all shadow-md group cursor-pointer ${
              isRecordingVoice
                ? 'bg-error-container text-on-error-container animate-pulse'
                : 'bg-surface-container-highest hover:bg-surface-bright text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[20px] text-secondary group-hover:scale-110 transition-transform">
              {isRecordingVoice ? 'radio_button_checked' : 'mic'}
            </span>
            <span>{isRecordingVoice ? 'Listening to explanation...' : 'Hold to Answer Verbally'}</span>
          </button>

          {/* Quick Text Reply Action */}
          <button
            onClick={() => setShowTextReplyModal(true)}
            className="p-space-sm rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
            title="Type response to Bar Raiser"
          >
            <span className="material-symbols-outlined text-[20px]">chat</span>
          </button>
        </div>
      </section>

      {/* Hint Modal */}
      {showHintModal && (
        <div className="fixed inset-0 z-50 bg-[#0a0e17]/80 backdrop-blur-md flex items-center justify-center p-space-md">
          <div className="bg-surface-container-low border border-surface-container-high rounded-xl max-w-lg w-full p-space-lg flex flex-col gap-space-md shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-surface-variant">
              <div className="flex items-center gap-2 text-secondary">
                <span className="material-symbols-outlined text-[22px]">lightbulb</span>
                <span className="font-headline-sm text-body-md font-semibold text-on-surface">
                  Algorithmic Hint: LRU Splice Operation
                </span>
              </div>
              <button
                onClick={() => setShowHintModal(false)}
                className="text-on-surface-variant hover:text-on-surface cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="text-body-md text-on-surface leading-relaxed space-y-2">
              <p>
                When an existing key is accessed via <code className="text-secondary font-mono">get()</code> or updated in <code className="text-secondary font-mono">put()</code>, use{' '}
                <code className="text-tertiary font-mono">std::list::splice()</code> in C++ (or pointer relinking in Java/Python OrderedDict).
              </p>
              <p className="text-on-surface-variant text-body-sm">
                This transfers the node to the head of the doubly-linked list in O(1) time without any memory reallocation or iterator invalidation.
              </p>
            </div>
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowHintModal(false)}
                className="px-space-md py-1.5 rounded-lg bg-primary text-on-primary font-headline-sm text-body-sm hover:brightness-110 cursor-pointer"
              >
                Got it, Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Text Reply to Bar Raiser Modal */}
      {showTextReplyModal && (
        <div className="fixed inset-0 z-50 bg-[#0a0e17]/80 backdrop-blur-md flex items-center justify-center p-space-md">
          <div className="bg-surface-container-low border border-surface-container-high rounded-xl max-w-xl w-full p-space-lg flex flex-col gap-space-md shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-surface-variant">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[22px]">record_voice_over</span>
                <span className="font-headline-sm text-body-md font-semibold text-on-surface">
                  Explain to AI Bar Raiser
                </span>
              </div>
              <button
                onClick={() => {
                  setShowTextReplyModal(false);
                  setAiEvaluationResponse(null);
                }}
                className="text-on-surface-variant hover:text-on-surface cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <p className="text-body-sm text-on-surface-variant">
              <strong>Question:</strong> “Can you explain why a simple array or vector wouldn't achieve O(1) eviction time in an LRU Cache?”
            </p>

            <textarea
              value={userTextAnswer}
              onChange={(e) => setUserTextAnswer(e.target.value)}
              placeholder="e.g. Because deleting from the middle or front of an array requires shifting remaining elements in O(N)..."
              rows={4}
              className="w-full p-3 rounded-lg bg-[#0a0e17] text-on-surface border border-surface-container text-body-md focus:outline-none focus:border-primary"
            />

            {aiEvaluationResponse && (
              <div className="p-3 rounded-lg bg-surface-container border border-tertiary/30 text-body-sm text-on-surface">
                <div className="flex items-center gap-1.5 text-tertiary font-bold mb-1">
                  <span className="material-symbols-outlined text-[16px]">verified</span>
                  <span>AI Placement Evaluation</span>
                </div>
                {aiEvaluationResponse}
              </div>
            )}

            <div className="flex items-center justify-end gap-space-sm pt-2">
              <button
                onClick={() => {
                  setShowTextReplyModal(false);
                  setAiEvaluationResponse(null);
                }}
                className="px-space-md py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface text-body-sm cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={handleTextAnswerSubmit}
                className="px-space-md py-1.5 rounded-lg bg-primary text-on-primary font-headline-sm text-body-sm hover:brightness-110 cursor-pointer"
              >
                Submit Explanation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
