import { fifo } from '../algorithms/fifo.js';
import { lru } from '../algorithms/lru.js';
import { optimal } from '../algorithms/optimal.js';
import { clock } from '../algorithms/clock.js';
import { mru } from '../algorithms/mru.js';

export const AlgorithmLogic = {
  FIFO: fifo,
  LRU: lru,
  Optimal: optimal,
  SecondChance: clock,
  MRU: mru,
};


// these are the algorithm configuration that tells the user about the basic of algorithm
export const ALGORITHM_CONFIG = {
  FIFO: {
    name: "First In First Out",
    description: "Replaces the oldest page in memory using a queue-based approach",
    complexityBadge: "O(1)",
    timeComplexity: "O(1) per operation",
    spaceComplexity: "O(n) for queue maintenance",
    advantages: ["Simple to implement", "Low overhead", "Predictable behavior"],
    disadvantages: ["Poor performance in practice", "Suffers from Belady's anomaly", "Ignores page usage patterns"],
    realWorldUse: "Simple embedded systems, basic caching mechanisms",
    dataStructures: "Queue to track insertion order"
  },
  LRU: {
    name: "Least Recently Used",
    description: "Replaces the page that has been unused for the longest time",
    complexityBadge: "O(1)",
    timeComplexity: "O(1) with proper data structures (doubly linked list + hash map)",
    spaceComplexity: "O(n) for tracking usage order",
    advantages: ["Excellent performance", "Exploits temporal locality", "No Belady's anomaly"],
    disadvantages: ["Complex implementation", "Higher memory overhead", "Requires hardware support"],
    realWorldUse: "CPU cache management, operating system page replacement, database buffer pools",
    dataStructures: "Doubly linked list with hash map for O(1) access"
  },
  Optimal: {
    name: "Optimal (Belady's Algorithm)",
    description: "Replaces the page that will not be used for the longest time in the future",
    complexityBadge: "O(n)",
    timeComplexity: "O(m * n) total — each replacement may scan all frames (m = references, n = frames)",
    spaceComplexity: "O(1) additional space",
    advantages: ["Theoretically optimal performance", "Minimum possible page faults", "Perfect benchmark for comparison"],
    disadvantages: ["Cannot be implemented in practice", "Requires future knowledge", "Only useful for analysis"],
    realWorldUse: "Theoretical analysis, algorithm performance benchmarking",
    dataStructures: "Future reference lookup table"
  }
  ,
  SecondChance: {
    name: "Second Chance (Clock Algorithm)",
    description: "Enhanced FIFO with reference bits - gives recently used pages a second chance",
    complexityBadge: "O(1)",
    timeComplexity: "O(1) amortized, O(n) worst case",
    spaceComplexity: "O(n) for reference bit storage",
    advantages: ["Better than pure FIFO", "Simple implementation", "Good compromise"],
    disadvantages: ["Can degrade to FIFO performance", "Still not optimal", "Reference bit overhead"],
    realWorldUse: "Operating system page replacement, virtual memory management",
    dataStructures: "Circular buffer with reference bits and clock hand pointer"
  }
  ,
  MRU: {
    name: "Most Recently Used (MRU)",
    description: "Replaces the most recently used page — useful in specific access patterns where recently used pages are less likely to be needed again.",
    complexityBadge: "O(1)",
    timeComplexity: "O(1) per operation with proper tracking",
    spaceComplexity: "O(n) for tracking usage order",
    advantages: ["Simple to implement", "Can perform well for certain workloads"],
    disadvantages: ["Often performs poorly for typical temporal-locality workloads", "Can evict useful pages"],
    realWorldUse: "Specialized caching scenarios and educational comparisons",
    dataStructures: "Stack or list to track most-recently-used order"
  }
};


// example of some reference page string that user can use 
export const EXAMPLE_CONFIG = {
  basic: { string: "7,0,1,2,0,3,0,4,2,3,0,3,2", frames: 3, description: "Standard example" },
  belady3: { string: "1,2,3,4,1,2,5,1,2,3,4,5", frames: 3, description: "Belady's Anomaly (3 frames)" },
  belady4: { string: "1,2,3,4,1,2,5,1,2,3,4,5", frames: 4, description: "Belady's Anomaly (4 frames)" },
  sequential: { string: "1,2,3,4,5,6,7,8,9,10", frames: 3, description: "Sequential Access" },
  repeated: { string: "1,2,3,1,2,3,1,2,3,1,2,3", frames: 3, description: "Repeated Pattern" },
  random: { string: "2,5,1,8,3,7,4,6,2,9,1,5,8,3,7", frames: 4, description: "Random Access" },
  'lru-worst': { string: "1,2,3,4,1,2,3,4,1,2,3,4", frames: 3, description: "LRU Worst Case" },
  'optimal-demo': { string: "7,0,1,2,0,3,0,4,2,3,0,3,2,3", frames: 4, description: "Optimal vs Others" },
  'mru-demo': { string: "1,2,3,4,1,2,5,1,2,3,4,5", frames: 3, description: "MRU example"
  }
};