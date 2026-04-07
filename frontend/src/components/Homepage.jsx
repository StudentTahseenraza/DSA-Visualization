// frontend/src/components/Homepage.jsx (updated)
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import Sorting from "../../public/lottie/sorting.json";
import linkedListAnimation from "../../public/lottie/sorting.json";
import treeAnimation from "../../public/lottie/linkedlist.json";
import graphAnimation from "../../public/lottie/graph1.json";
import recursionAnimation from "../../public/lottie/sorting.json";
// import quizAnimation from "../../public/lottie/sorting.json";
import arrayAnimation from "../../public/lottie/sorting.json";
import stackAnimation from "../../public/lottie/Stack.json";
import queueAnimation from "../../public/lottie/Queue.json";
import dpAnimation from "../../public/lottie/sorting.json";
import greedyAnimation from "../../public/lottie/sorting.json";
import hashingAnimation from "../../public/lottie/sorting.json";
import stringAnimation from "../../public/lottie/sorting.json";
import comparisonAnimation from "../../public/lottie/sorting.json";
import aiAssistantAnimation from "../../public/lottie/sorting.json"; // Using existing animation
import "../styles/Homepage.css";
import ThemeToggle from "./ThemeToggle";
import quizAnimation from "../../public/lottie/sorting.json";

const Homepage = () => {
  const algorithmCategories = [
    {
      title: "Arrays",
      description: "Insertion, Deletion, Searching...",
      animation: arrayAnimation,
      color: "#ff6b6b",
      path: "/array-operations",
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
    // {
    //   title: "Stacks", 
    //   description: "LIFO, Applications, Implementations...",
    //   animation: stackAnimation,
    //   color: "#45b7d1",
    //   path: "/stacks",
    //   algorithms: [
    //     "Array Implementation",
    //     "Linked List Implementation",
    //     "Infix to Postfix",
    //     "Parenthesis Checking",
    //     "Next Greater Element",
    //   ],
    // },
    // {
    //   title: "Queues",
    //   description: "FIFO, Circular, Priority...",
    //   animation: queueAnimation,
    //   color: "#96ceb4",
    //   path: "/queues",
    //   algorithms: [
    //     "Array Implementation",
    //     "Linked List Implementation",
    //     "Circular Queue",
    //     "Priority Queue",
    //     "Deque",
    //     "Breadth-First Search",
    //   ],
    // },
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
    // {
    //   title: "Hashing",
    //   description: "Hash Tables, Collision Handling...",
    //   animation: hashingAnimation,
    //   color: "#00b894",
    //   path: "/hashing",
    //   algorithms: [
    //     "Hash Functions",
    //     "Separate Chaining",
    //     "Open Addressing",
    //     "Linear Probing",
    //     "Quadratic Probing",
    //     "Double Hashing",
    //   ],
    // },
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
      title: "DSA Quiz & Learning Center",
      description: "Interactive quizzes, AI tutor, step-by-step algorithm learning",
      animation: quizAnimation,
      color: "#f59e0b",
      path: "/dsa-quiz",
      algorithms: [
        "Algorithm Quizzes",
        "AI Tutor Explanations",
        "Step-by-Step Learning",
        "Sorting Visualizations",
        "Progress Tracking",
        "Interactive Challenges",
      ],
      isNew: true,
      isQuizFeature: true,
    },
    // {
    //   title: "Bitmask / Bit Manipulation",
    //   description: "Bitwise Operations, Tricks...",
    //   animation: stringAnimation,
    //   color: "#e17055",
    //   path: "/bitmask",
    //   algorithms: [
    //     "Bitmasking Techniques",
    //     "Subset Generation",
    //     "Dynamic Programming with Bitmasking",
    //     "Bitmasking and Graphs",
    //     "Bitmasking and Combinatorics",
    //   ],
    // },
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
    // {
    //   title: "Divide and Conquer",
    //   description: "Searching, Sorting, Manipulation...",
    //   animation: stringAnimation,
    //   color: "#e17055",
    //   path: "/divide-and-conquer",
    //   algorithms: [
    //     "Merge Sort",
    //     "Quick Sort",
    //     "Binary Search",
    //     "Closest Pair",
    //     "Convex Hull",
    //     "Matrix Multiplication",
    //   ],
    // },
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
      description: "Compare algorithms, Visualize differences, Performance metrics...",
      animation: comparisonAnimation,
      color: "#6c5ce7",
      path: "/algorithm-compare",
      algorithms: [
        "Compare algorithms",
        "Visualize differences",
        "Performance metrics",
        "Real-time analysis",
        "Side-by-side comparison",
        "Efficiency metrics",
      ],
    },
    // NEW AI CODE ASSISTANT CARD
    {
      title: "AI Code Assistant",
      description: "Generate, debug & visualize code using AI",
      animation: aiAssistantAnimation,
      color: "#a855f7",
      path: "/ai-code",
      algorithms: [
        "AI Code Explanation",
        "Code Execution",
        "Code Visualization",
        "Debug Assistance",
        "Complexity Analysis",
        "Optimization Tips",
      ],
      isNew: true,
      isAIFeature: false, // Keep in regular grid but with special styling
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
        {safeAlgorithmCategories
          .filter(cat => !cat.isAIFeature)
          .map((category, index) => (
            <Link
              to={category.path}
              key={index}
              className={`algorithm-card ${category.isNew ? 'new-ai-card' : ''}`}
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
                  <span className="new-badge">✨ NEW</span>
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