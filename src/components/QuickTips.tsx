import React, { useState } from 'react';

export type CareerTrackId = 'google' | 'amazon' | 'microsoft' | 'fintech' | 'atlassian' | 'ai-systems';

export interface QuickTipsProps {
  initialTrack?: CareerTrackId;
  onNavigate: (tab: any) => void;
  onTrackChange?: (trackId: CareerTrackId) => void;
}

interface TrackStrategyData {
  id: CareerTrackId;
  name: string;
  shortName: string;
  icon: string;
  badge: string;
  ctcBand: string;
  barRaiserWeight: string;
  fatalMistake: string;
  goldenRule: string;
  phases: {
    number: string;
    title: string;
    duration: string;
    objective: string;
    tips: string[];
    rubricHighlight: string;
  }[];
  dos: string[];
  donts: string[];
  mockPrompt: {
    question: string;
    interviewerProbe: string;
    strategicAnswer: string;
    keyInsight: string;
  };
}

export const CAREER_TRACKS_STRATEGIES: Record<CareerTrackId, TrackStrategyData> = {
  google: {
    id: 'google',
    name: 'Google Campus SDE-1 (L3)',
    shortName: 'Google',
    icon: 'code_blocks',
    badge: 'Graph Theory & Googliness',
    ctcBand: '32 – 48 LPA',
    barRaiserWeight: 'Hard DSA (60%) / Googliness (25%) / LLD (15%)',
    fatalMistake: 'Jumping straight into code without proving mathematical correctness and asymptotic bounds on edge cases.',
    goldenRule: 'Treat the interviewer as a senior staff peer on your team. Over-communicate assumptions and verify scale constraints before writing a single line.',
    phases: [
      {
        number: '01',
        title: 'Problem Framing & Boundary Negotiation',
        duration: '0 to 4 Mins',
        objective: 'Dissect the prompt, confirm graph constraints, and nail numeric ranges.',
        tips: [
          'Ask explicitly about scale: "What is the maximum vertex count V and edge count E? Can there be self-loops, negative weight cycles, or disconnected components?"',
          'Clarify memory limits: "Are we optimizing for strict auxiliary space or can we trade O(N) memory for amortized O(1) lookups?"',
          'Work through a miniature test case manually on the whiteboard before proposing any algorithmic paradigm.',
        ],
        rubricHighlight: 'Analytical Rigor • Edge Exploration',
      },
      {
        number: '02',
        title: 'Algorithmic Proof & Complexity Contract',
        duration: '4 to 12 Mins',
        objective: 'State the naive baseline, then derive the optimal DP / Graph / Tree reduction.',
        tips: [
          'State the naive O(2^N) or O(N^2) solution first in 30 seconds to establish a baseline: "A brute force recursive search checks all subtrees..."',
          'Transition to optimal: "We can reduce this to O(V + E log V) using Dijkstra with an indexed priority queue, or O(N log N) via coordinate compression."',
          'Confirm alignment: "Does this O(N log K) time and O(K) space approach sound optimal to proceed with?"',
        ],
        rubricHighlight: 'Algorithmic Fluency • Trade-off Clarity',
      },
      {
        number: '03',
        title: 'Idiomatic Production-Grade Implementation',
        duration: '12 to 32 Mins',
        objective: 'Write clean, modular code with descriptive variable names and zero syntactic fuzziness.',
        tips: [
          'Modularize helper methods: create clear signatures like `bool isValidPath(...)` rather than cramming 50 lines into one block.',
          'Guard against integer overflows: in C++/Java, watch for `mid = left + (right - left) / 2` and `long long` accumulators.',
          'Verbalize line-by-line intent: keep speaking while typing so the interviewer tracks your mental state.',
        ],
        rubricHighlight: 'Coding Cleanliness • Standard Library Mastery',
      },
      {
        number: '04',
        title: 'Dry Run, Edge Stress & Googliness Walkthrough',
        duration: '32 to 45 Mins',
        objective: 'Trace step-by-step with an adversarial edge case and propose follow-up scaling.',
        tips: [
          'Never say "I think it works." Trace variable state in comments across empty inputs, single element, or skewed trees.',
          'Propose streaming or distributed extensions if the input stream exceeds RAM: "If elements arrive via an infinite Kafka stream, we can use Reservoir Sampling..."',
          'Demonstrate openness if the interviewer hints at a bug: "Great observation; let me re-check the boundary condition on index right."',
        ],
        rubricHighlight: 'Self-Correction • Receptive Problem Solving',
      },
    ],
    dos: [
      'Write out mathematical recurrences: e.g. T(n) = 2T(n/2) + O(n)',
      'Use standard library primitives (std::priority_queue, std::unordered_map)',
      'State space complexity including recursive call stack depth (O(H) for tree recursion)',
      'Inquire whether input data is read-only or can be mutated in-place',
    ],
    donts: [
      'Do not start coding during the first 5 minutes',
      'Do not use single-letter variables like x, y, a, b for domain objects',
      'Do not dismiss interviewer hints; Google interviewers give hints intentionally to test coachability',
      'Do not stay silent for more than 15-20 seconds without signaling your thought process',
    ],
    mockPrompt: {
      question: 'Design an algorithm to find the longest path in a directed acyclic graph (DAG) where each node has an associated processing latency.',
      interviewerProbe: 'Interviewer asks: "What if the graph contains millions of nodes and memory cannot fit the entire adjacency list at once?"',
      strategicAnswer: 'First confirm that because the graph is a DAG, we can find the longest path in O(V + E) using Topological Sort and dynamic programming. For the memory-constrained probe, pivot to an external-memory topological sort using Kahn\'s algorithm with chunked disk-backed queues or partitioned node intervals using consistent hashing.',
      keyInsight: 'Google probes test whether you recognize DAG properties (absence of cycles makes longest path polynomial instead of NP-hard).',
    },
  },

  amazon: {
    id: 'amazon',
    name: 'Amazon SDE-1 Bar Raiser',
    shortName: 'Amazon',
    icon: 'shopping_bag',
    badge: '16 Leadership Principles & Scalable Data Structures',
    ctcBand: '28 – 45 LPA',
    barRaiserWeight: 'Leadership Principles (45%) / DSA & Coding (45%) / System Scalability (10%)',
    fatalMistake: 'Giving vague, team-credit behavioral answers ("We did this") instead of owner-level "I" statements structured in STAR.',
    goldenRule: 'Every technical decision must tie back to Customer Obsession and Frugality. The Bar-Raiser is specifically listening for Ownership and Bias for Action.',
    phases: [
      {
        number: '01',
        title: 'Behavioral Deep-Dive (STAR Method)',
        duration: '0 to 15 Mins',
        objective: 'Deliver crisp, quantified stories showcasing Customer Obsession, Ownership, and Have Backbone.',
        tips: [
          'Format every answer strictly: Situation (15%), Task (10%), Action (60%), Result (15% with numeric impact like "% latency drop" or "X users enabled").',
          'Use exclusively "I" statements for actions: "I profiled the heap dump, identified the memory leak in the Netty connection pool, and rewrote the serializer."',
          'Prepare a failure story with genuine accountability and systemic learnings for "Earn Trust".',
        ],
        rubricHighlight: 'Ownership • Customer Obsession • Bias for Action',
      },
      {
        number: '02',
        title: 'Coding Prompt & Data Structure Selection',
        duration: '15 to 25 Mins',
        objective: 'Quickly lock in the optimal data structure (Priority Queue, Monotonic Stack, or Trie).',
        tips: [
          'Amazon favorites: LRU Cache (Hash + Doubly Linked List), Meeting Rooms II (Min-Heap), Rotten Oranges (Multi-source BFS), Word Search II (Trie + DFS).',
          'Clarify real-world concurrency needs: "Should this LRU cache be thread-safe for multi-threaded read/write workloads?"',
          'Verify constraints on duplicates and key sizes.',
        ],
        rubricHighlight: 'Standard Data Structure Ergonomics',
      },
      {
        number: '03',
        title: 'Object-Oriented Implementation & Edge Handling',
        duration: '25 to 40 Mins',
        objective: 'Write maintainable, modular code with proper class contracts and exception safety.',
        tips: [
          'Define clean helper classes (e.g. `class Node { int key, val; Node* prev; Node* next; };`).',
          'Handle boundary cases immediately: empty list, capacity = 0, updating existing keys vs inserting new keys.',
          'Keep method responsibilities single (SRP): `removeNode()`, `addToHead()`, `popTail()`.',
        ],
        rubricHighlight: 'Modularity • Exception Handling',
      },
      {
        number: '04',
        title: 'Complexity Audit & Customer-Facing Edge Scenarios',
        duration: '40 to 45 Mins',
        objective: 'Demonstrate how the code behaves under degraded network conditions or high load.',
        tips: [
          'Discuss eviction policies: "If capacity is full, we evict the least recently used element in O(1) time without blocking new writes."',
          'Highlight operational metrics: "In production, I would add CloudWatch metrics for cache hit-ratio and lock contention latency."',
          'Have 2 smart questions prepared regarding team service architecture and operational excellence.',
        ],
        rubricHighlight: 'Frugality • Operational Excellence',
      },
    ],
    dos: [
      'Quantify results in behavioral stories: e.g. "reduced API response time from 350ms to 42ms for 200k daily requests"',
      'Demonstrate trade-offs: explain why you chose Min-Heap over sorting an array each time',
      'Ask clarifying questions about concurrency and thread-safety',
      'Acknowledge mistakes gracefully and show continuous improvement',
    ],
    donts: [
      'Do not use "we" when asked "What did YOU do?"—Amazon recruiters will interrupt you',
      'Do not skip writing unit test cases at the end of your implementation',
      'Do not select an overly complex algorithm when a simple heap or queue solves the customer problem reliably',
      'Do not fabricate stories; Bar-Raisers will ask 4 levels of follow-ups ("What was the exact commit? What was the metric?")',
    ],
    mockPrompt: {
      question: 'Design an in-memory Key-Value store with TTL (Time To Live) expiration and Least Frequently Used (LFU) eviction.',
      interviewerProbe: 'Interviewer asks: "How will you prevent the background TTL cleanup from causing latency spikes for live customer read requests?"',
      strategicAnswer: 'Propose a dual-approach: Lazy expiration during active `get()` calls (evict if expired before returning), paired with an asynchronous background sweeper using a Min-Heap or bucketed wheel timer that runs in batches during low-throughput cycles.',
      keyInsight: 'Shows mastery of Customer Obsession (p99 latency preservation) and Frugality (avoiding unnecessary full-memory sweeps).',
    },
  },

  microsoft: {
    id: 'microsoft',
    name: 'Microsoft Core Campus Drive',
    shortName: 'Microsoft',
    icon: 'desktop_windows',
    badge: 'OS Fundamentals, Multithreading & Clean OOP',
    ctcBand: '24 – 38 LPA',
    barRaiserWeight: 'DSA (40%) / OS & Concurrency (30%) / LLD & OOP (30%)',
    fatalMistake: 'Treating code as a mathematical puzzle while ignoring OS realities (cache misses, race conditions, memory alignment).',
    goldenRule: 'Microsoft interviewers love clean OOP abstractions, solid pointers/references, and candidates who deeply understand OS processes, virtual memory, and deadlocks.',
    phases: [
      {
        number: '01',
        title: 'Core Fundamentals & Low-Level Invariants',
        duration: '0 to 8 Mins',
        objective: 'Demonstrate deep grasp of operating system concepts, thread synchronization, and data structures.',
        tips: [
          'Be ready for rapid-fire core questions: Process vs Thread, Mutex vs Semaphore, Virtual Memory paging, Cache locality, TCP 3-way handshake.',
          'When given a coding problem (e.g. Reverse Linked List in K-groups, Binary Tree Serialization), check pointer invariants explicitly.',
          'Discuss memory layout: contiguous array storage vs pointer-chasing in linked nodes.',
        ],
        rubricHighlight: 'Systems Literacy • Memory Awareness',
      },
      {
        number: '02',
        title: 'Design Pattern & OOP Scaffold',
        duration: '8 to 20 Mins',
        objective: 'Construct class hierarchies using SOLID principles before implementing core logic.',
        tips: [
          'If the problem has an OOP flavor (e.g. Parking Lot, File System, Rate Limiter), define interfaces first (`IRateLimiter`, `IStorageEngine`).',
          'Use appropriate design patterns: Strategy for pluggable algorithms, Factory for entity creation, Observer for event notifications.',
          'Emphasize thread-safety: mention `std::mutex`, `std::shared_lock` or `synchronized` / `ReentrantLock`.',
        ],
        rubricHighlight: 'Object-Oriented Design • Extensibility',
      },
      {
        number: '03',
        title: 'Bulletproof Defensive Coding',
        duration: '20 to 35 Mins',
        objective: 'Write complete, compilable code without syntax shortcuts or unhandled null references.',
        tips: [
          'Validate all inputs against null/nullptr at the method entry: `if (!root) return nullptr;`.',
          'Watch out for cycle detection in graph/linked-list questions: use Floyd\'s cycle-finding (tortoise and hare).',
          'Clean up allocated resources in languages with manual memory management (RAII in C++ with `std::unique_ptr`).',
        ],
        rubricHighlight: 'Defensive Programming • Resource Safety',
      },
      {
        number: '04',
        title: 'Multithreading & Concurrency Stress Test',
        duration: '35 to 45 Mins',
        objective: 'Walk through race conditions, deadlocks (Coffman conditions), and reader-writer locking.',
        tips: [
          'Identify shared mutable state: "If multiple threads access this method concurrently, a race condition will occur during counter increments."',
          'Explain lock granularity: show why fine-grained row/bucket locks outperform a global monitor lock.',
          'Discuss atomic operations (`std::atomic<int>`) for lock-free counter implementations.',
        ],
        rubricHighlight: 'Concurrency Mastery • Thread-Safety',
      },
    ],
    dos: [
      'Use modern C++20 / Java 21 idiomatic syntax and smart pointers',
      'Explain the 4 Coffman conditions for deadlocks and how to break circular wait',
      'Check for null pointer exceptions, stack overflow on deep recursion, and memory leaks',
      'Structure code cleanly with public interfaces and private helper methods',
    ],
    donts: [
      'Do not ignore thread safety when designing shared caches or counters',
      'Do not use raw pointers without clear ownership semantics in modern C++',
      'Do not confuse processes (isolated address space) with threads (shared heap)',
      'Do not rush without writing clean helper class definitions',
    ],
    mockPrompt: {
      question: 'Implement a thread-safe bounded blocking queue supporting `put(item)` and `take()` operations with fixed capacity.',
      interviewerProbe: 'Interviewer asks: "Why should we use `while` instead of `if` when checking the queue full condition around `wait()`?"',
      strategicAnswer: 'Because of "spurious wakeups" where a waiting thread can awaken without an explicit notify, and to protect against race conditions where another thread sneaks in and consumes the slot before this thread reacquires the monitor lock. The `while` loop re-verifies the invariant.',
      keyInsight: 'A classic Microsoft systems question that separates candidates who memorize code from those who understand monitor synchronization.',
    },
  },

  fintech: {
    id: 'fintech',
    name: 'Fintech & Quant Systems (Tower / Graviton / Razorpay)',
    shortName: 'Fintech / HFT',
    icon: 'currency_rupee',
    badge: 'Micro-second Latency, ACID & Distributed Locks',
    ctcBand: '35 – 70+ LPA',
    barRaiserWeight: 'Low-Level C++/Go (40%) / High-Throughput Architecture (35%) / Math & DSA (25%)',
    fatalMistake: 'Proposing solutions that fail under concurrent double-spends or relying on non-atomic database transactions.',
    goldenRule: 'In fintech and high-frequency trading, correctness and deterministic latency are non-negotiable. Always account for idempotency, atomic CAS loops, and ledger balance zero-sum invariants.',
    phases: [
      {
        number: '01',
        title: 'Financial Correctness & Invariants Audit',
        duration: '0 to 8 Mins',
        objective: 'Pinpoint the non-negotiable invariants: double-entry bookkeeping, monotonic ordering, zero money loss.',
        tips: [
          'Ask: "What is the peak order/transaction volume? Are we targeting sub-millisecond p99 latency or transactional ACID guarantees across sharded DBs?"',
          'Never use floating point numbers (`float`/`double`) for currency! Use fixed-point representation or integer cents/paise (e.g. `int64_t`).',
          'Identify idempotency key requirements: prevent duplicate charges on network timeouts.',
        ],
        rubricHighlight: 'Precision • Financial Invariant Defense',
      },
      {
        number: '02',
        title: 'Lock-Free & Low-Latency Data Structures',
        duration: '8 to 22 Mins',
        objective: 'Design data structures with minimal cache misses, lock-free queues, or memory-mapped ring buffers.',
        tips: [
          'Quant / HFT favorites: L2/L3 Order Book (Price-Time Priority using dual B-Trees or SkipList + Doubly Linked List), Ring Buffer (Disruptor pattern).',
          'Fintech Backend favorites: Distributed SAGA pattern, Two-Phase Commit (2PC), Optimistic Concurrency Control (OCC) with version columns.',
          'Discuss cache lines: avoid false sharing by padding shared atomic variables to 64 bytes.',
        ],
        rubricHighlight: 'Cache Locality • Atomic Memory Primitives',
      },
      {
        number: '03',
        title: 'Deterministic Implementation & Error Modes',
        duration: '22 to 36 Mins',
        objective: 'Write deterministic code that handles partial failures, rollbacks, and network partition states.',
        tips: [
          'In distributed fintech prompts, show how payment webhooks are verified with HMAC-SHA256 signatures.',
          'Demonstrate Redis Distributed Locks using Redlock or atomic Lua scripts (`SET resource_name my_random_value NX PX 30000`).',
          'Write strict zero-allocation loops in critical paths: avoid dynamic memory allocations (`malloc`/`new`) inside tick processing.',
        ],
        rubricHighlight: 'Deterministic Execution • Zero Allocation',
      },
      {
        number: '04',
        title: 'Failure Injections & Reconciliation Walkthrough',
        duration: '36 to 45 Mins',
        objective: 'Prove that if the service crashes at line 42, the system recovers cleanly without ledger discrepancy.',
        tips: [
          'Demonstrate out-of-order message handling: use sequence numbers and Write-Ahead Logging (WAL).',
          'Explain automated end-of-day reconciliation routines between internal balance tables and payment gateway settlements.',
          'Discuss dead-letter queues (DLQ) for malformed transactional events.',
        ],
        rubricHighlight: 'Resilience • Reconciliation Math',
      },
    ],
    dos: [
      'Use 64-bit integers for currency (e.g. amount in micro-units/cents to avoid floating point truncation)',
      'Design idempotent APIs with unique `idempotency_key` headers and Redis deduplication',
      'Explain database isolation levels: Read Committed vs Repeatable Read vs Serializable',
      'Mention CPU cache line alignment (alignas(64)) for high-frequency trading code',
    ],
    donts: [
      'Never ever use float or double for money calculations',
      'Do not rely on single-node in-memory state without a persistent Write-Ahead Log',
      'Do not assume network requests always succeed or fail cleanly; handle the "in-flight / timed out" state',
      'Do not propose global locking on customer balances; use account-level sharding or optimistic version checks',
    ],
    mockPrompt: {
      question: 'Design a high-concurrency wallet transfer API that moves ₹10,000 from Account A to Account B with 10,000 requests/second without deadlock or double spending.',
      interviewerProbe: 'Interviewer asks: "If two users simultaneously transfer money to each other (A -> B and B -> A), how will you prevent a classic database deadlock?"',
      strategicAnswer: 'Enforce strict global lock ordering by sorting the account IDs before acquiring row-level locks: always acquire the lock on `min(accountA_id, accountB_id)` first, followed by `max(accountA_id, accountB_id)`. This breaks the circular wait condition guaranteed.',
      keyInsight: 'Demonstrates deep database transaction mastery and elimination of Coffman deadlock conditions in financial software.',
    },
  },

  atlassian: {
    id: 'atlassian',
    name: 'Atlassian P20 / Scaled Distributed Backend',
    shortName: 'Atlassian / Scale',
    icon: 'tune',
    badge: 'Clean Architecture, Pair-Coding & Rate Limiters',
    ctcBand: '26 – 44 LPA',
    barRaiserWeight: 'Clean Code & Craft (40%) / Collaborative Problem Solving (35%) / System Scalability (25%)',
    fatalMistake: 'Writing "hacky" competitive programming code with cryptic variable names and zero tests instead of production-grade software.',
    goldenRule: 'Atlassian grades heavily on engineering craft and peer collaboration. They want to see clean interfaces, thorough unit tests, and how you behave during a live pair-programming session.',
    phases: [
      {
        number: '01',
        title: 'Contract Negotiation & Requirements Engineering',
        duration: '0 to 8 Mins',
        objective: 'Establish clean API schemas, data models, and edge scenarios collaboratively.',
        tips: [
          'Ask thoughtful collaborative questions: "Should we optimize for write-heavy Jira issue updates or read-heavy Confluence document views?"',
          'Define data structures with clear semantic names: `FileChunkMetadata`, `RateLimiterPolicy`, `TokenBucket`.',
          'Discuss error codes and graceful client degradation.',
        ],
        rubricHighlight: 'Collaborative Chemistry • Domain Modeling',
      },
      {
        number: '02',
        title: 'Modular Architecture & Extensible Design',
        duration: '8 to 22 Mins',
        objective: 'Separate concerns into distinct layers: Storage, In-Memory Engine, and Interface.',
        tips: [
          'Atlassian classic prompts: Token Bucket / Leaky Bucket Rate Limiter, Resumable Multipart File Uploader, Jira Sprint Tag Router, Snake Game.',
          'Use dependency injection principles: pass the clock interface (`IClock`) to allow deterministic mocking of time in unit tests.',
          'Keep cyclomatic complexity low: avoid nested if-else structures; use guard clauses.',
        ],
        rubricHighlight: 'Clean Code • Testability By Design',
      },
      {
        number: '03',
        title: 'Iterative Implementation With Pair Feedback',
        duration: '22 to 36 Mins',
        objective: 'Write readable, self-documenting code with continuous peer dialogue.',
        tips: [
          'Invite feedback: "I am implementing the sliding window log approach first. If memory becomes an issue under burst traffic, we can transition to a sliding window counter. How does that sound?"',
          'Handle boundary cases directly: timestamp edge cases, zero tokens remaining, out-of-order chunks.',
          'Write idiomatic code: use collections, lambdas, and streams cleanly.',
        ],
        rubricHighlight: 'Pair Programming • Code Readability',
      },
      {
        number: '04',
        title: 'Automated Unit Tests & Distributed Scale',
        duration: '36 to 45 Mins',
        objective: 'Write concrete test assertions (Happy path, boundary 0, burst limit) and discuss cluster scale.',
        tips: [
          'Write a suite of unit test cases directly: `testAllowsRequestWithinCapacity()`, `testRejectsRequestExceedingBurstRate()`.',
          'Discuss distributed scaling: "To scale this rate limiter across 50 nodes behind a load balancer, we would synchronize state via Redis with sliding log Lua scripts."',
          'Highlight observability: logging, rate-limit rejection telemetry, and alert thresholds.',
        ],
        rubricHighlight: 'Unit Testing Rigor • Production Readiness',
      },
    ],
    dos: [
      'Mock or inject system time (`IClock`) to make time-dependent logic testable',
      'Write descriptive method and variable names that read like English prose',
      'Actively solicit interviewer feedback: treat the session as real pair programming',
      'Write explicit unit test methods covering edge boundaries',
    ],
    donts: [
      'Do not write all code in one massive 150-line `main` method',
      'Do not hardcode constants: use descriptive `static final` or `constexpr` configurations',
      'Do not ignore time drift or thread contention in distributed rate-limiting scenarios',
      'Do not dismiss the interviewer’s perspective during architectural debates',
    ],
    mockPrompt: {
      question: 'Design a distributed rate limiter supporting both per-user burst thresholds and rolling 1-hour quota limits.',
      interviewerProbe: 'Interviewer asks: "How will you prevent the Sliding Window Log algorithm from causing an OOM (Out Of Memory) event under a sudden DDoS spike of 500,000 requests/sec?"',
      strategicAnswer: 'Acknowledge that Sliding Window Log stores an entry per request which balloons memory during spikes. Propose upgrading to the Hybrid Sliding Window Counter algorithm: divide the window into small time buckets (e.g. 1-second counters). We only store an integer counter per bucket, maintaining O(1) space while retaining 99.5% accuracy.',
      keyInsight: 'Exhibits high engineering maturity: understanding the exact memory trade-off between strict accuracy and production survival.',
    },
  },

  'ai-systems': {
    id: 'ai-systems',
    name: 'AI / Foundation Model Systems (NVIDIA / Adobe / Infra)',
    shortName: 'AI Systems',
    icon: 'psychology',
    badge: 'GPU Memory Hierarchy, KV-Cache & Tensor Serving',
    ctcBand: '30 – 55 LPA',
    barRaiserWeight: 'Systems & GPU Concurrency (40%) / DSA & Math (35%) / Model Serving Infra (25%)',
    fatalMistake: 'Treating AI as just calling high-level Python libraries without understanding memory bandwidth limits and batching bottlenecks.',
    goldenRule: 'For systems AI roles, the bottleneck is almost always memory bandwidth (HBM) and KV-cache management, not raw compute. Speak fluently in throughput vs time-to-first-token (TTFT) trade-offs.',
    phases: [
      {
        number: '01',
        title: 'Hardware & Throughput Boundaries',
        duration: '0 to 8 Mins',
        objective: 'Define token generation latency, memory requirements for weights + KV-cache, and batch constraints.',
        tips: [
          'Calculate memory footprint on paper: "For a 7B parameter FP16 model, weights consume ~14GB. Each token in the KV cache takes 2 * layers * hidden_dim * bytes."',
          'Clarify the SLA: "Are we optimizing for lowest Time To First Token (TTFT) or maximum aggregate throughput in tokens/second?"',
          'Identify whether the workload is compute-bound (Prefill/Prompt phase) or memory-bandwidth bound (Autoregressive decode phase).',
        ],
        rubricHighlight: 'Hardware Constraints • Arithmetic Intensity',
      },
      {
        number: '02',
        title: 'Serving Architecture & Paged Memory',
        duration: '8 to 22 Mins',
        objective: 'Design dynamic memory allocation schemes for variable-length inference sequences.',
        tips: [
          'AI Infra favorites: PagedAttention (virtual memory paging for KV cache to eliminate fragmentation), Continuous Batching, FlashAttention principles.',
          'Vector database indexing: HNSW (Hierarchical Navigable Small World) graphs vs Inverted File Index (IVF-PQ).',
          'Discuss quantization trade-offs: FP16 vs INT8 vs INT4 AWQ/GPTQ and accuracy impact.',
        ],
        rubricHighlight: 'Paged Memory Management • Tensor Parallelism',
      },
      {
        number: '03',
        title: 'Parallelism & Pipeline Implementation',
        duration: '22 to 36 Mins',
        objective: 'Implement high-performance primitives: Ring-AllReduce, asynchronous queueing, or custom operators.',
        tips: [
          'Show how Tensor Parallelism splits matrix multiplications across GPUs via NCCL All-Reduce.',
          'Demonstrate zero-copy tensor slicing and pinned host memory transfers (CUDA streams).',
          'Implement thread-safe request schedulers with priority queues for high-priority conversational traffic.',
        ],
        rubricHighlight: 'CUDA / Systems Primitives • Communication Overhead',
      },
      {
        number: '04',
        title: 'Evaluation, Drift & Failure Resilience',
        duration: '36 to 45 Mins',
        objective: 'Address inference worker failures, model cold starts, and speculative decoding optimizations.',
        tips: [
          'Explain Speculative Decoding: using a small 1B draft model to generate candidate tokens verified in parallel by the 70B target model.',
          'Discuss cold-start mitigation: pre-warmed GPU containers and model weight streaming from high-speed NVMe storage.',
          'Cover monitoring metrics: GPU memory utilization (VRAM), token generation rate, queue wait time, and perplexity drift.',
        ],
        rubricHighlight: 'Speculative Optimization • Observability',
      },
    ],
    dos: [
      'Distinguish clearly between prefill phase (compute-bound) and decode phase (memory-bandwidth bound)',
      'Calculate precise VRAM memory budgets for weights, activations, and KV cache',
      'Explain how continuous batching prevents GPU underutilization on variable prompt lengths',
      'Mention communication primitives like NCCL All-Reduce, All-Gather, and scatter-gather',
    ],
    donts: [
      'Do not assume model inference behaves like a standard stateless REST API',
      'Do not ignore memory fragmentation caused by dynamic sequence lengths',
      'Do not confuse model fine-tuning with low-latency inference serving requirements',
      'Do not omit discussing floating-point precision trade-offs (BF16, FP8, INT4)',
    ],
    mockPrompt: {
      question: 'Design an LLM inference serving engine that handles 10,000 concurrent conversational sessions on a cluster of 8x H100 GPUs.',
      interviewerProbe: 'Interviewer asks: "Why does standard static batching fail miserably in LLM inference, and how does Continuous (Iteration-level) Batching fix it?"',
      strategicAnswer: 'In static batching, all sequences must wait for the longest sequence in the batch to finish generating, causing massive GPU core idling (padding tokens waste up to 70% compute). Continuous batching schedules at the iteration/token step: as soon as a sequence emits EOS (End of Sequence), it is evicted and a newly arrived prompt fills that exact execution slot immediately.',
      keyInsight: 'Core concept behind vLLM and TensorRT-LLM that proves real-world systems architecture understanding.',
    },
  },
};

export const QuickTips: React.FC<QuickTipsProps> = ({
  initialTrack = 'google',
  onNavigate,
  onTrackChange,
}) => {
  const [selectedTrack, setSelectedTrack] = useState<CareerTrackId>(initialTrack);
  const [activeTab, setActiveTab] = useState<'phases' | 'matrix' | 'probe'>('phases');
  const [showCounterStrategy, setShowCounterStrategy] = useState(false);
  const [copiedChecklist, setCopiedChecklist] = useState(false);

  const track = CAREER_TRACKS_STRATEGIES[selectedTrack] || CAREER_TRACKS_STRATEGIES.google;

  const handleSelectTrack = (id: CareerTrackId) => {
    setSelectedTrack(id);
    setShowCounterStrategy(false);
    if (onTrackChange) onTrackChange(id);
  };

  const handleCopyChecklist = () => {
    const text = `🎯 ${track.name} Quick Strategy Checklist\n\n📌 Golden Rule:\n${track.goldenRule}\n\n⚠️ Fatal Mistake to Avoid:\n${track.fatalMistake}\n\n✅ Key Dos:\n${track.dos.map((d) => `• ${d}`).join('\n')}\n\n❌ Key Don'ts:\n${track.donts.map((d) => `• ${d}`).join('\n')}\n\n🔗 Practice now on MockPulse AI Placement Suite`;

    navigator.clipboard.writeText(text);
    setCopiedChecklist(true);
    setTimeout(() => setCopiedChecklist(false), 2500);
  };

  return (
    <div className="w-full bg-[#0a0e17] border border-surface-container rounded-2xl overflow-hidden shadow-2xl transition-all">
      {/* Top Header & Track Selector */}
      <div className="p-4 sm:p-6 lg:p-8 bg-gradient-to-b from-[#111726] to-[#0a0e17] border-b border-surface-container">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-primary text-xl">psychology</span>
              <span className="text-xs font-mono uppercase tracking-wider text-primary font-semibold">
                TACTICAL CAMPUS PLAYBOOK
              </span>
              <span className="text-slate-500">·</span>
              <span className="text-xs font-mono text-slate-400">Dynamic Strategy Matrix</span>
            </div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white font-headline tracking-tight">
              SDE-1 Company-Specific Interview Strategy
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Real-time calibration tips, phase-by-phase time allocation, behavioral traps, and counter-strategies curated from 48,000+ evaluated campus mocks.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              onClick={handleCopyChecklist}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-2 rounded-xl bg-surface-container text-xs font-mono text-slate-200 hover:text-white hover:bg-surface-container-high transition-colors border border-surface-container min-h-[40px]"
              title="Copy strategy checklist to clipboard"
            >
              <span className="material-symbols-outlined text-sm text-primary">
                {copiedChecklist ? 'check' : 'content_copy'}
              </span>
              {copiedChecklist ? 'Checklist Copied!' : 'Export Checklist'}
            </button>

            <button
              onClick={() => onNavigate('live-ai-mock')}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-primary text-black font-semibold text-xs font-mono hover:bg-primary-bright transition-all shadow-md shadow-primary/20 min-h-[40px]"
            >
              <span className="material-symbols-outlined text-sm">play_arrow</span>
              Test in Live AI Mock
            </button>
          </div>
        </div>

        {/* Dynamic Career Track Pill/Segmented Switcher */}
        <div>
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center justify-between">
            <span>Select Target Recruiter Track:</span>
            <span className="text-tertiary font-medium">6 Calibrated Profiles</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {(Object.keys(CAREER_TRACKS_STRATEGIES) as CareerTrackId[]).map((tId) => {
              const tData = CAREER_TRACKS_STRATEGIES[tId];
              const isSelected = selectedTrack === tId;
              return (
                <button
                  key={tId}
                  onClick={() => handleSelectTrack(tId)}
                  className={`flex flex-col items-start p-3 rounded-xl border text-left transition-all relative overflow-hidden ${
                    isSelected
                      ? 'bg-[#182338] border-primary text-white shadow-lg shadow-primary/10 ring-1 ring-primary/40'
                      : 'bg-[#0d1320] border-surface-container/70 text-slate-400 hover:text-slate-200 hover:border-slate-600'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-bl-full" />
                  )}
                  <div className="flex items-center gap-1.5 mb-1">
                    <span
                      className={`material-symbols-outlined text-base ${
                        isSelected ? 'text-primary' : 'text-slate-400'
                      }`}
                    >
                      {tData.icon}
                    </span>
                    <span className="text-xs font-bold font-headline truncate text-white">
                      {tData.shortName}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 truncate w-full">
                    {tData.ctcBand}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Track Telemetry Bar (Zero-Pill Restraint) */}
      <div className="bg-[#0e1422] px-6 lg:px-8 py-3.5 border-b border-surface-container grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
        <div className="flex items-center gap-2 text-slate-300">
          <span className="text-slate-400 uppercase tracking-wider text-[11px]">Primary Focus:</span>
          <span className="text-primary font-medium truncate">{track.badge}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-300">
          <span className="text-slate-400 uppercase tracking-wider text-[11px]">Bar-Raiser Weight:</span>
          <span className="text-secondary font-medium truncate">{track.barRaiserWeight}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-300 md:justify-end">
          <span className="text-slate-400 uppercase tracking-wider text-[11px]">Target Band:</span>
          <span className="text-tertiary font-bold">{track.ctcBand}</span>
        </div>
      </div>

      {/* Main Content Area: Golden Rule & Nav Tabs */}
      <div className="p-6 lg:p-8">
        {/* Golden Rule & Fatal Mistake Hero Callouts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
          <div className="lg:col-span-7 p-4 rounded-xl bg-[#111928] border border-primary/25 relative overflow-hidden">
            <div className="flex items-center gap-2 text-xs font-mono text-primary uppercase tracking-wider mb-1.5">
              <span className="material-symbols-outlined text-sm">stars</span>
              Core Golden Rule for {track.shortName}
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
              "{track.goldenRule}"
            </p>
          </div>

          <div className="lg:col-span-5 p-4 rounded-xl bg-red-950/20 border border-red-500/30 relative overflow-hidden">
            <div className="flex items-center gap-2 text-xs font-mono text-red-400 uppercase tracking-wider mb-1.5">
              <span className="material-symbols-outlined text-sm">dangerous</span>
              #1 Instant Rejection Trap
            </div>
            <p className="text-xs sm:text-sm text-red-200/90 leading-relaxed font-sans">
              {track.fatalMistake}
            </p>
          </div>
        </div>

        {/* Strategy Section View Tabs */}
        <div className="flex items-center justify-between border-b border-surface-container pb-4 mb-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('phases')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
                activeTab === 'phases'
                  ? 'bg-primary text-black font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white bg-surface-container/50'
              }`}
            >
              <span className="material-symbols-outlined text-sm">timelapse</span>
              45-Min Phase-by-Phase Plan
            </button>

            <button
              onClick={() => setActiveTab('matrix')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
                activeTab === 'matrix'
                  ? 'bg-primary text-black font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white bg-surface-container/50'
              }`}
            >
              <span className="material-symbols-outlined text-sm">checklist</span>
              Dos &amp; Don'ts Matrix
            </button>

            <button
              onClick={() => setActiveTab('probe')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
                activeTab === 'probe'
                  ? 'bg-primary text-black font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white bg-surface-container/50'
              }`}
            >
              <span className="material-symbols-outlined text-sm">record_voice_over</span>
              Bar-Raiser Probe Flashcard
            </button>
          </div>

          <span className="hidden sm:inline-block text-[11px] font-mono text-slate-400">
            Active: <span className="text-slate-200">{track.name}</span>
          </span>
        </div>

        {/* TAB 1: 45-Min Phase-by-Phase Plan */}
        {activeTab === 'phases' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {track.phases.map((phase) => (
                <div
                  key={phase.number}
                  className="p-5 rounded-xl bg-[#0d1320] border border-surface-container hover:border-slate-600 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded bg-primary/10 border border-primary/30 flex items-center justify-center font-mono text-xs text-primary font-bold">
                          {phase.number}
                        </span>
                        <h4 className="text-sm font-bold text-white font-headline">
                          {phase.title}
                        </h4>
                      </div>
                      <span className="text-[11px] font-mono text-tertiary">
                        {phase.duration}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 mb-3 font-mono italic">
                      🎯 {phase.objective}
                    </p>

                    <ul className="space-y-2 mb-4">
                      {phase.tips.map((tip, idx) => (
                        <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                          <span className="text-primary font-mono text-[11px] mt-0.5">•</span>
                          <span className="leading-relaxed">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-3 border-t border-surface-container/60 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-slate-400 uppercase tracking-wider">Evaluation Bar:</span>
                    <span className="text-primary font-medium">{phase.rubricHighlight}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-[#121927] border border-surface-container flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
              <span className="text-slate-300">
                Want to execute this 45-minute blueprint against an active AI Bar Raiser?
              </span>
              <button
                onClick={() => onNavigate('live-ai-mock')}
                className="px-4 py-2 rounded-lg bg-primary text-black font-semibold hover:bg-primary-bright transition-all whitespace-nowrap"
              >
                Launch Mock for {track.shortName} →
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: Dos and Don'ts Matrix */}
        {activeTab === 'matrix' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* The Dos */}
            <div className="p-5 rounded-xl bg-[#0d1422] border border-emerald-500/25">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-emerald-500/20">
                <span className="material-symbols-outlined text-emerald-400 text-lg">check_circle</span>
                <h4 className="text-sm font-bold text-white font-headline">
                  High-Impact Positive Signals (Do This)
                </h4>
              </div>
              <ul className="space-y-3">
                {track.dos.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                    <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-mono shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* The Don'ts */}
            <div className="p-5 rounded-xl bg-[#0d1422] border border-red-500/25">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-red-500/20">
                <span className="material-symbols-outlined text-red-400 text-lg">cancel</span>
                <h4 className="text-sm font-bold text-white font-headline">
                  Instant Red Flags (Avoid These)
                </h4>
              </div>
              <ul className="space-y-3">
                {track.donts.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                    <span className="w-4 h-4 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center text-[10px] font-mono shrink-0 mt-0.5">
                      ✕
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* TAB 3: Bar-Raiser Probe Flashcard */}
        {activeTab === 'probe' && (
          <div className="p-6 rounded-xl bg-[#0d1320] border border-surface-container">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-xs font-mono text-tertiary">
                <span className="material-symbols-outlined text-base">psychology_alt</span>
                <span>REAL BAR-RAISER CHALLENGE SIMULATION</span>
              </div>
              <span className="text-[11px] font-mono text-slate-400">
                Track: {track.shortName}
              </span>
            </div>

            {/* The Question */}
            <div className="mb-4">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                Typical On-Campus Prompt:
              </span>
              <p className="text-sm font-semibold text-white font-headline bg-[#121826] p-3.5 rounded-lg border border-surface-container">
                "{track.mockPrompt.question}"
              </p>
            </div>

            {/* The Mid-Interview Probe */}
            <div className="mb-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-300 font-semibold mb-1">
                <span className="material-symbols-outlined text-sm">priority_high</span>
                Interviewer Pushback / Follow-up Curveball:
              </div>
              <p className="text-xs text-amber-100 font-mono italic">
                {track.mockPrompt.interviewerProbe}
              </p>
            </div>

            {/* Reveal Strategy Action */}
            <div className="border-t border-surface-container/60 pt-4">
              {!showCounterStrategy ? (
                <div className="text-center py-4">
                  <p className="text-xs text-slate-400 mb-3 font-mono">
                    How would you respond to keep your offer on the table?
                  </p>
                  <button
                    onClick={() => setShowCounterStrategy(true)}
                    className="px-5 py-2.5 rounded-xl bg-primary text-black font-semibold text-xs font-mono hover:bg-primary-bright transition-all shadow-md shadow-primary/20"
                  >
                    Reveal Calibrated Bar-Raiser Counter-Strategy
                  </button>
                </div>
              ) : (
                <div className="space-y-4 animate-fade-in">
                  <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono text-emerald-400 font-semibold flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-sm">verified</span>
                        Calibrated Counter-Response (What top candidates say):
                      </span>
                      <button
                        onClick={() => setShowCounterStrategy(false)}
                        className="text-[11px] font-mono text-slate-400 hover:text-white"
                      >
                        Hide
                      </button>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed font-sans">
                      {track.mockPrompt.strategicAnswer}
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-[#141d2f] border border-surface-container flex items-center gap-2.5 text-xs text-slate-300 font-mono">
                    <span className="material-symbols-outlined text-primary text-base">lightbulb</span>
                    <span>
                      <strong className="text-white">Why This Works:</strong> {track.mockPrompt.keyInsight}
                    </span>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      onClick={() => onNavigate('coding-ide')}
                      className="px-4 py-2 rounded-lg bg-surface-container text-xs font-mono text-slate-200 hover:text-white border border-surface-container"
                    >
                      Practice in Code IDE
                    </button>
                    <button
                      onClick={() => onNavigate('live-ai-mock')}
                      className="px-4 py-2 rounded-lg bg-primary text-black font-semibold text-xs font-mono hover:bg-primary-bright"
                    >
                      Test in Real-Time Voice Mock →
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
