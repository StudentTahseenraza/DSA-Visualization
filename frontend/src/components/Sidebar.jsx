// components/Sidebar.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/Sidebar.css";

const Sidebar = ({
  category,
  selectedAlgorithm,
  onSelectAlgorithm,
  isSidebarOpen,
  toggleSidebar,
}) => {
  const [algorithms, setAlgorithms] = useState([]);

  useEffect(() => {
    // Define algorithms for each category
      const normalizedCategory = category === "arrays" ? "array-operations" : category;

    const algorithmMap = {
      "array-operations": [
        { id: "traverse", name: "Traverse" },
        { id: "search", name: "Search" },
        { id: "insert", name: "Insert" },
        { id: "push", name: "Push" },
        { id: "pop", name: "Pop" },
        { id: "delete", name: "Delete" },
        { id: "update", name: "Update" },
        { id: "rotate", name: "Rotate" },
        { id: "reverse", name: "Reverse" },
      ],
      sorting: [
        { id: "bubble-sort", name: "Bubble Sort" },
        { id: "merge-sort", name: "Merge Sort" },
        { id: "quick-sort", name: "Quick Sort" },
        { id: "heap-sort", name: "Heap Sort" },
        { id: "selection-sort", name: "Selection Sort" },
        { id: "insertion-sort", name: "Insertion Sort" },
      ],
      "linked-list": [
        { id: "singly-linked-list", name: "Singly Linked List" },
        { id: "doubly-linked-list", name: "Doubly Linked List" },
        { id: "circular-linked-list", name: "Circular Linked List" },
      ],
      trees: [
        { id: "binary-search-tree", name: "Binary Search Tree" },
        { id: "avl-tree", name: "AVL Tree" },
        { id: "tree-traversals", name: "Tree Traversals" },
      ],
      graphs: [
        { id: "breadth-first-search", name: "Breadth-First Search" },
        { id: "depth-first-search", name: "Depth-First Search" },
        { id: "dijkstra", name: "Dijkstra's Algorithm" },
        { id: "minimum-spanning-tree", name: "Minimum Spanning Tree" },
      ],
      // ADD STACK CATEGORY HERE
      "stack": [
    { id: "stack-operations", name: "Stack Operations" },
    { id: "push-operation", name: "Push Operation" },
    { id: "pop-operation", name: "Pop Operation" },
    { id: "peek-operation", name: "Peek Operation" },
    { id: "stack-traversal", name: "Stack Traversal" },
  ],
  "queue": [
    { id: "queue-operations", name: "Queue Operations" },
    { id: "enqueue-operation", name: "Enqueue Operation" },
    { id: "dequeue-operation", name: "Dequeue Operation" },
  ],
      greedy: [
        { id: "activity-selection", name: "Activity Selection Problem" },
        { id: "fractional-knapsack", name: "Fractional Knapsack Problem" },
        { id: "job-scheduling", name: "Job Scheduling Problem" },
        { id: "huffman-encoding", name: "Huffman Encoding" },
        { id: "prims-algorithm", name: "Prim's Algorithm" },
        { id: "kruskals-algorithm", name: "Kruskal's Algorithm" },
        { id: "dijkstras-algorithm", name: "Dijkstra's Algorithm" },
        { id: "coin-change-greedy", name: "Coin Change (Greedy)" },
      ],
      backtracking: [
        { id: "n-queens", name: "N-Queens Problem" },
        { id: "rat-in-maze", name: "Rat in a Maze Problem" },
        { id: "knights-tour", name: "Knight's Tour Problem" },
        { id: "word-search", name: "Word Search Problem" },
        { id: "sudoku-solver", name: "Sudoku Solver" },
        { id: "graph-coloring", name: "Graph Coloring Problem" },
        { id: "hamiltonian-cycle", name: "Hamiltonian Cycle Problem" },
        { id: "power-set", name: "Generate All Subsets" },
        { id: "generate-permutations", name: "Generate All Permutations" },
        { id: "combination-sum", name: "Combination Sum Problem" },
        { id: "palindrome-partitioning", name: "Palindrome Partitioning" },
        { id: "word-break", name: "Word Break" },
        { id: "crossword-solver", name: "Crossword Puzzle Solving" },
        { id: "all-paths-graph", name: "All Paths in Graph" },
        { id: "partition-k-subsets", name: "Partition to K Subsets" },
      ],
      "dynamic-programming": [
        { id: "fibonacci-dp", name: "Fibonacci (DP)" },
        {
          id: "longest-common-subsequence",
          name: "Longest Common Subsequence",
        },
        { id: "0-1-knapsack", name: "0/1 Knapsack Problem" },
        { id: "coin-change-dp", name: "Coin Change Problem (DP)" },
        { id: "edit-distance", name: "Edit Distance" },
      ],
      recursion: [
        { id: "tower-of-hanoi", name: "Tower of Hanoi" },
        { id: "n-queens", name: "N-Queens Problem" },
        { id: "sudoku-solver", name: "Sudoku Solver" },
      ],
      quizzes: [
        { id: "complexity-analysis", name: "Complexity Analysis" },
        { id: "algorithm-challenges", name: "Algorithm Challenges" },
      ],
      "complexity-analysis": [
        { id: "time-complexity", name: "Time Complexity Analysis" },
        { id: "space-complexity", name: "Space Complexity Analysis" },
        { id: "big-o-notation", name: "Big O Notation" },
        { id: "comparative-analysis", name: "Comparative Analysis" },
        { id: "real-time-measurement", name: "Real-time Measurement" },
      ],
    };

    setAlgorithms(algorithmMap[normalizedCategory] || []);
  }, [category]);

  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        delay: 0.1,
      },
    },
  };

  const overlayVariants = {
    open: { opacity: 1, pointerEvents: "auto" },
    closed: { opacity: 0, pointerEvents: "none" },
  };

  const itemVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
    closed: { opacity: 0, y: 20 },
  };

  const sidebarContent = (
    <motion.div
      className="sidebar-content"
      variants={sidebarVariants}
      initial="closed"
      animate={isSidebarOpen ? "open" : "closed"}
    >
      <div className="sidebar-header">
        <h3>
          {category
            ? category.charAt(0).toUpperCase() +
              category.slice(1).replace("-", " ")
            : "Algorithms"}
        </h3>
        <button
          className="close-sidebar"
          onClick={toggleSidebar}
          aria-label="Close sidebar"
        >
          &times;
        </button>
      </div>

      <div className="algorithm-list">
        <AnimatePresence>
          {algorithms.map((algorithm, index) => (
            <motion.button
              key={algorithm.id}
              className={selectedAlgorithm === algorithm.id ? "active" : ""}
              onClick={() => {
                onSelectAlgorithm(algorithm.id);
                toggleSidebar();
              }}
              variants={itemVariants}
              initial="closed"
              animate="open"
              exit="closed"
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {algorithm.name}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );

  return (
    <>
      <motion.div
        className="sidebar-overlay"
        variants={overlayVariants}
        initial="closed"
        animate={isSidebarOpen ? "open" : "closed"}
        onClick={toggleSidebar}
      />

      {sidebarContent}

      {!isSidebarOpen && (
        <button
          className="sidebar-toggle"
          onClick={toggleSidebar}
          aria-label="Open sidebar"
        >
          ☰
        </button>
      )}
    </>
  );
};

export default Sidebar;
