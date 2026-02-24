// frontend/src/components/Homepage.jsx
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import Sorting from "../../public/lottie/sorting.json";
import linkedListAnimation from "../../public/lottie/sorting.json";
import treeAnimation from "../../public/lottie/linkedlist.json";
import graphAnimation from "../../public/lottie/graph1.json";
import recursionAnimation from "../../public/lottie/sorting.json";
import quizAnimation from "../../public/lottie/sorting.json";
import arrayAnimation from "../../public/lottie/sorting.json";
import stackAnimation from "../../public/lottie/Stack.json";
import queueAnimation from "../../public/lottie/Queue.json";
import dpAnimation from "../../public/lottie/sorting.json";
import greedyAnimation from "../../public/lottie/sorting.json";
import hashingAnimation from "../../public/lottie/sorting.json";
import stringAnimation from "../../public/lottie/sorting.json";
import comparisonAnimation from "../../public/lottie/sorting.json"; // New Lottie file for Algorithm Compare
import "../styles/Homepage.css";
import ThemeToggle from "./ThemeToggle";

// Import new animations for AI features (you can reuse existing or create new ones)
import aiCodeAnimation from "../../public/lottie/sorting.json"; // Replace with AI-specific animation
import aiDebugAnimation from "../../public/lottie/sorting.json"; // Replace with debug-specific animation

const Homepage = () => {
  const algorithmCategories = [
    {
      title: "Arrays",
      description: "Insertion, Deletion, Searching...",
      animation: arrayAnimation,
      color: "#ff6b6b",
      path: "/array-operations", // Change this from "/arrays"
      algorithms: [
        "Insertion",
        "Deletion",
        "Searching",
        "Traversal",
        "Updating",
        "Array Rotation",
        "Reverse Array",
      ],
    },
    {
      title: "Sorting",
      description: "Searching, Sorting, Manipulation...",
      animation: Sorting,
      color: "#ff6b6b",
      path: "/sorting",
      algorithms: [
        "Bubble Sort",
        "Selection Sort",
        "Insertion Sort",
        "Merge Sort",
        "Quick Sort",
      ],
    },
    {
      title: "Linked List",
      description: "Singly, Doubly, Circular...",
      animation: linkedListAnimation,
      color: "#4ecdc4",
      path: "/linked-list",
      algorithms: [
        "Singly Linked List",
        "Doubly Linked List",
        "Circular Linked List",
        "Reverse Linked List",
        "Detect Cycle",
        "Merge Two Lists",
      ],
    },
    {
      title: "Stacks", 
      description: "LIFO, Applications, Implementations...",
      animation: stackAnimation,
      color: "#45b7d1",
      path: "/stacks",
      algorithms: [
        "Array Implementation",
        "Linked List Implementation",
        "Infix to Postfix",
        "Parenthesis Checking",
        "Next Greater Element",
      ],
    },
    {
      title: "Queues",
      description: "FIFO, Circular, Priority...",
      animation: queueAnimation,
      color: "#96ceb4",
      path: "/queues",
      algorithms: [
        "Array Implementation",
        "Linked List Implementation",
        "Circular Queue",
        "Priority Queue",
        "Deque",
        "Breadth-First Search",
      ],
    },
    {
      title: "Trees",
      description: "Binary Trees, BST, Traversals...",
      animation: treeAnimation,
      color: "#feca57",
      path: "/trees",
      algorithms: [
        "Binary Search Tree",
        "AVL Tree",
        "Tree Traversals",
        "Height Calculation",
        "Lowest Common Ancestor",
        "Binary Heap",
      ],
    },
    {
      title: "Graphs",
      description: "BFS, DFS, Shortest Path...",
      animation: graphAnimation,
      color: "#ff9ff3",
      path: "/graphs",
      algorithms: [
        "Breadth-First Search",
        "Depth-First Search",
        "Dijkstra's Algorithm",
        "Bellman-Ford",
        "Prim's Algorithm",
        "Kruskal's Algorithm",
      ],
    },
    {
      title: "Dynamic Programming",
      description: "Memoization, Tabulation, Patterns...",
      animation: dpAnimation,
      color: "#6c5ce7",
      path: "/dynamic-programming",
      algorithms: [
        "Fibonacci",
        "Knapsack Problem",
        "Longest Common Subsequence",
        "Matrix Chain Multiplication",
        "Coin Change",
        "Edit Distance",
      ],
    },
    {
      title: "Greedy Algorithms",
      description: "Optimal Solutions, Applications...",
      animation: greedyAnimation,
      color: "#fd79a8",
      path: "/greedy",
      algorithms: [
        "Activity Selection",
        "Huffman Coding",
        "Fractional Knapsack",
        "Job Sequencing",
        "Dijkstra's Algorithm",
        "Prim's Algorithm",
      ],
    },
    {
      title: "Hashing",
      description: "Hash Tables, Collision Handling...",
      animation: hashingAnimation,
      color: "#00b894",
      path: "/hashing",
      algorithms: [
        "Hash Functions",
        "Separate Chaining",
        "Open Addressing",
        "Linear Probing",
        "Quadratic Probing",
        "Double Hashing",
      ],
    },
    {
      title: "Strings",
      description: "Pattern Matching, Manipulation...",
      animation: stringAnimation,
      color: "#e17055",
      path: "/strings",
      algorithms: [
        "String Reversal",
        "Palindrome Check",
        "KMP Algorithm",
        "Rabin-Karp Algorithm",
        "Longest Common Substring",
        "Anagram Detection",
      ],
    },
    {
      title: "Recursion",
      description: "Tower of Hanoi, N-Queens...",
      animation: recursionAnimation,
      color: "#fdcb6e",
      path: "/recursion",
      algorithms: [
        "Tower of Hanoi",
        "N-Queens Problem",
        "Sudoku Solver",
        "Rat in a Maze",
        "Permutations",
        "Subsets",
      ],
    },
    {
      title: "Backtracking",
      description: "Tower of Hanoi, N-Queens...",
      animation: recursionAnimation,
      color: "#fdcb6e",
      path: "/backtracking",
      algorithms: [
        "Tower of Hanoi",
        "N-Queens Problem",
        "Sudoku Solver",
        "Rat in a Maze",
        "Permutations",
        "Subsets",
      ],
    },
    {
      title: "Quizzes & Practice",
      description: "Test your knowledge",
      animation: quizAnimation,
      color: "#a29bfe",
      path: "/quizzes",
      algorithms: [
        "Complexity Analysis",
        "Algorithm Challenges",
        "Data Structure Quizzes",
        "Problem Solving",
        "Interview Prep",
        "Mock Tests",
        "Algorithm Comparisons",
      ],
    },
    {
      title: "Bitmask / Bit Manipulation",
      description: "Bitwise Operations, Tricks...",
      animation: stringAnimation,
      color: "#e17055",
      path: "/bitmask",
      algorithms: [
        "Bitmasking Techniques",
        "Subset Generation",
        "Dynamic Programming with Bitmasking",
        "Bitmasking and Graphs",
        "Bitmasking and Combinatorics",
      ],
    },
    {
      title: "Heap",
      description: "Heap Operations, Applications...",
      animation: stringAnimation,
      color: "#e17055",
      path: "/heap",
      algorithms: [
        "Min Heap",
        "Max Heap",
        "Heapify",
        "Heap Sort",
        "Priority Queue Implementation",
        "Kth Largest Element",
      ],
    },
    {
      title: "Divide and Conquer",
      description: "Searching, Sorting, Manipulation...",
      animation: stringAnimation,
      color: "#e17055",
      path: "/divide-and-conquer",
      algorithms: [
        "Merge Sort",
        "Quick Sort",
        "Binary Search",
        "Closest Pair",
        "Convex Hull",
        "Matrix Multiplication",
      ],
    },
    {
      title: "Mathematical Algorithms",
      description: "Number Theory, Combinatorics...",
      animation: stringAnimation,
      color: "#e17055",
      path: "/mathematical-algorithms",
      algorithms: [
        "Greatest Common Divisor",
        "Sieve of Eratosthenes",
        "Modular Exponentiation",
        "Fibonacci Numbers",
        "Prime Factorization",
        "Combinatorial Algorithms",
      ],
    },
    {
      title: "Complexity Analysis",
      description: "Complexity, Comparisons...",
      animation: stringAnimation,
      color: "#e17055",
      path: "/complexity-analysis",
      algorithms: [
        "Space complexity",
        "Time complexity",
        "Worst, Average and Best Case",
        "Asymptotic Notations",
        "Big O Notation",
        "Omega and Theta Notations",
      ],
    },
    {
      title: "Algorithm Compare",
      description:
        "Compare algorithms, Visualize differences, Performance metrics...",
      animation: comparisonAnimation,
      color: "#6c5ce7",
      path: "/algorithm-compare", // This will be handled as a special category
      algorithms: [
        "Compare algorithms",
        "Visualize differences",
        "Performance metrics",
        "Real-time analysis",
        "Side-by-side comparison",
        "Efficiency metrics",
      ],
    },
    {
      title: "🔍 AI Debugger Mode",
      description: "Find bugs in your algorithm logic automatically!",
      longDescription: "Paste your faulty algorithm and AI pinpoints the exact error, explains why it's wrong, and suggests fixes.",
      animation: aiDebugAnimation,
      color: "#e74c3c", // Red for debug
      path: "/ai-debugger",
      algorithms: [ // Added missing algorithms array
        "Bug Detection",
        "Error Analysis",
        "Fix Suggestions",
        "Step-by-step Debugging",
        "Logic Validation",
        "Code Correction"
      ],
      features: [
        "Detects logical errors",
        "Shows first failure step",
        "Compares with expected behavior",
        "Explains why output diverges",
        "Suggests corrections",
        "Perfect for debugging assignments"
      ],
      tagline: "🐛 First algorithm error analyzer!",
      isNew: true
    },
    {
      title: "🤖 AI Code Visualizer",
      description: "Paste any code (Java/C++/Python) and watch it come alive!",
      longDescription: "Upload your own code and our AI engine generates step-by-step visualization of YOUR exact logic. Works with any algorithm!",
      animation: aiCodeAnimation,
      color: "#9b59b6", // Purple for AI
      path: "/ai-code-visualizer",
      algorithms: [ // Added missing algorithms array
        "Java Visualization",
        "C++ Visualization",
        "Python Visualization",
        "Step-by-step Execution",
        "Variable State Tracking",
        "Algorithm Animation"
      ],
      features: [
        "Supports Java, C++, Python",
        "Auto-generates visualization steps",
        "Shows variable states in real-time",
        "Highlights comparisons & swaps",
        "Step-by-step execution",
        "Works with ANY algorithm logic"
      ],
      tagline: "✨ Unique: No other visualizer does this!",
      isNew: true
    },
  ];

  // Add safe check before rendering
  const safeAlgorithmCategories = algorithmCategories.map(category => ({
    ...category,
    algorithms: category.algorithms || [] // Ensure algorithms array exists
  }));

  return (
    <div className="homepage">
      <div className="homepage-header">
        <div className="header-content">
          <h1>DSA Visualization</h1>
          <p>Interactive visualizations for data structures and algorithms</p>
          <div className="header-actions">
            <Link to="/" className="nav-button">
              ← Back to Landing
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
      <div className="algorithm-grid">
        {safeAlgorithmCategories.map((category, index) => (
          <Link
            to={category.path}
            key={index}
            className="algorithm-card"
            style={{ "--card-color": category.color }}
          >
            <div className="card-animation">
              <Lottie
                animationData={category.animation}
                loop={true}
                autoplay={true}
                style={{ height: 120 }}
              />
            </div>
            <div className="card-content">
              <h3>{category.title}</h3>
              <p>{category.description}</p>
              {category.algorithms && category.algorithms.length > 0 && (
                <div className="algorithm-tags">
                  {category.algorithms.slice(0, 3).map((algo, i) => (
                    <span key={i} className="algorithm-tag">
                      {algo}
                    </span>
                  ))}
                  {category.algorithms.length > 3 && (
                    <span className="algorithm-tag">
                      +{category.algorithms.length - 3} more
                    </span>
                  )}
                </div>
              )}
              {category.isNew && (
                <span className="new-badge">NEW</span>
              )}
            </div>
            <div className="card-explore">
              <span>Explore →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Homepage;