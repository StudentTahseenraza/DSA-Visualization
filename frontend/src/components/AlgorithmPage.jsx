// components/AlgorithmPage.jsx
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AnimationArea from "./AnimationArea";
import ControlButtons from "./ControlButtons";
import SortingViewer from "./SortingViewer";
// import ExplanationBox from "./ExplanationBox";
import LineChart from "./LineChart";
import CustomArrayInput from "./CustomArrayInput";
import BSTViewer from "./BSTViewer";
import GraphViewer from "./GraphViewer";
import LinkedListViewer from "./LinkedListViewer";
import HeapViewer from "./HeapViewer";
import TrieViewer from "./TrieViewer";
import BacktrackingViewer from "./BacktrackingViewer";
import GreedyViewer from "./GreedyViewer";
import DynamicProgrammingViewer from "./DynamicProgrammingViewer";
import Sidebar from "./Sidebar";
import ArrayVisualizer from "./ArrayVisualizer";
import ComplexityAnalysis from "./ComplexityAnalysis";
import AlgorithmCompare from "./AlgorithmCompare";
import StackVisualizer from "./StackVisualizer";
import QueueVisualizer from "./QueueVisualizer";
import "../styles/AlgorithmPage.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../contexts/ThemeContext";

const AlgorithmPage = () => {
  // Array states
  const [array, setArray] = useState([5, 2, 8, 1, 4, 3, 6, 7]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [algorithmData, setAlgorithmData] = useState({
    steps: [],
    pseudocode: [],
    explanations: [],
  });
  const [aiExplanation, setAiExplanation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [comparisonResults, setComparisonResults] = useState([]);

  // Array operation states
  const [arrayOperation, setArrayOperation] = useState("traverse");
  const [arrayValue, setArrayValue] = useState("");
  const [arrayPosition, setArrayPosition] = useState("");
  const [arrayDirection, setArrayDirection] = useState("left");
  const [arrayPositions, setArrayPositions] = useState(1);

  // Data structure states
  const [bstTree, setBstTree] = useState(null);
  const [bstValue, setBstValue] = useState("");
  const [bstOperation, setBstOperation] = useState("insert");

  const [graph, setGraph] = useState({
    A: { B: 1, C: 4 },
    B: { A: 1, D: 2 },
    C: { A: 4, D: 5 },
    D: { B: 2, C: 5 },
  });
  const [graphStartNode, setGraphStartNode] = useState("A");
  const [showMatrixInput, setShowMatrixInput] = useState(false);
  const [matrixInput, setMatrixInput] = useState("");

  const [linkedList, setLinkedList] = useState(null);
  const [listValue, setListValue] = useState(""); // Keep as string initially
  const [listOperation, setListOperation] = useState("insert");

  const [heap, setHeap] = useState(null);
  const [heapValue, setHeapValue] = useState("");
  const [heapOperation, setHeapOperation] = useState("insert");

  const [trie, setTrie] = useState(null);
  const [trieWord, setTrieWord] = useState("");
  const [trieOperation, setTrieOperation] = useState("insert");

  const [stack, setStack] = useState([]);
  const [stackValue, setStackValue] = useState("");
  const [stackValues, setStackValues] = useState("");
  const [stackOperation, setStackOperation] = useState("push");

  const [queue, setQueue] = useState([]);
  const [queueValue, setQueueValue] = useState("");
  const [queueOperation, setQueueOperation] = useState("enqueue");

  // Graph editor states
  const [graphNode, setGraphNode] = useState("");
  const [graphEdgeFrom, setGraphEdgeFrom] = useState("");
  const [graphEdgeTo, setGraphEdgeTo] = useState("");
  const [graphEdgeWeight, setGraphEdgeWeight] = useState("");

  // Backtracking states
  const [nQueensSize, setNQueensSize] = useState(4);
  const [sudokuGrid, setSudokuGrid] = useState([
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
  ]);
  const [mazeSize, setMazeSize] = useState(5);
  const [maze, setMaze] = useState([
    [1, 0, 1, 1, 1],
    [1, 1, 1, 0, 1],
    [0, 0, 0, 1, 1],
    [1, 1, 1, 1, 0],
    [1, 0, 0, 1, 1],
  ]);
  const [wordSearchBoard, setWordSearchBoard] = useState([
    ["A", "B", "C", "E"],
    ["S", "F", "C", "S"],
    ["A", "D", "E", "E"],
  ]);
  const [searchWord, setSearchWord] = useState("ABCCED");
  const [graphColoringGraph, setGraphColoringGraph] = useState([
    [0, 1, 1, 1],
    [1, 0, 1, 0],
    [1, 1, 0, 1],
    [1, 0, 1, 0],
  ]);
  const [graphColors, setGraphColors] = useState(3);

  // Greedy states
  const [activities, setActivities] = useState([
    { name: "A", start: 1, finish: 3 },
    { name: "B", start: 2, finish: 5 },
    { name: "C", start: 4, finish: 7 },
    { name: "D", start: 6, finish: 9 },
    { name: "E", start: 8, finish: 10 },
  ]);
  const [knapsackItems, setKnapsackItems] = useState([
    { name: "Item1", value: 60, weight: 10 },
    { name: "Item2", value: 100, weight: 20 },
    { name: "Item3", value: 120, weight: 30 },
  ]);
  const [knapsackCapacity, setKnapsackCapacity] = useState(50);
  const [jobs, setJobs] = useState([
    { id: "J1", profit: 20, deadline: 2 },
    { id: "J2", profit: 15, deadline: 2 },
    { id: "J3", profit: 10, deadline: 1 },
    { id: "J4", profit: 5, deadline: 3 },
    { id: "J5", profit: 1, deadline: 3 },
  ]);
  const [huffmanText, setHuffmanText] = useState("abracadabra");
  const [coins, setCoins] = useState([1, 2, 5, 10, 20, 50, 100]);
  const [coinAmount, setCoinAmount] = useState(93);

  // Dynamic Programming states
  const [fibonacciN, setFibonacciN] = useState(10);
  const [dpKnapsackItems, setDpKnapsackItems] = useState([
    { name: "Item1", value: 60, weight: 10 },
    { name: "Item2", value: 100, weight: 20 },
    { name: "Item3", value: 120, weight: 30 },
  ]);
  const [dpKnapsackCapacity, setDpKnapsackCapacity] = useState(50);
  const [lcsStr1, setLcsStr1] = useState("ABCDGH");
  const [lcsStr2, setLcsStr2] = useState("AEDFHR");
  const [matrixDimensions, setMatrixDimensions] = useState([10, 30, 5, 60]);
  const [dpCoins, setDpCoins] = useState([1, 2, 5]);
  const [dpCoinAmount, setDpCoinAmount] = useState(11);
  const [editStr1, setEditStr1] = useState("sunday");
  const [editStr2, setEditStr2] = useState("saturday");

  const { category } = useParams();
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const animationInterval = useRef(null);

  const { isDarkMode } = useTheme();


  const BASE_URL = "http://localhost:5000/api";
  // const BASE_URL = "https://dsa-visualization-j0uo.onrender.com/api";


  // Set default algorithm based on category
  useEffect(() => {
    if (category) {
      // Normalize category names
      const normalizedCategory =
        category === "arrays" ? "array-operations" : category;

      const defaultAlgorithms = {
        "array-operations": "traverse",
        sorting: "bubble-sort",
        "linked-list": "singly-linked-list",
        trees: "binary-search-tree",
        graphs: "breadth-first-search",
        heap: "min-heap",
        trie: "trie",
        backtracking: "n-queens",
        greedy: "activity-selection",
        "dynamic-programming": "fibonacci",
        stack: "stack-operations", // Make sure this matches
        queue: "queue-operations", // Make sure this matches
      };
      setSelectedAlgorithm(defaultAlgorithms[normalizedCategory] || "");
    }
  }, [category]);

  // Handle algorithm selection
  const handleSelectAlgorithm = (algorithmId) => {
    setSelectedAlgorithm(algorithmId);
    resetAnimation();
    setIsSidebarOpen(false);
  };

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Fetch algorithm steps
  const fetchAlgorithmSteps = async () => {
    setIsLoading(true);
    try {
      let response;
      const normalizedCategory =
        category === "arrays" ? "array-operations" : category;

      if (normalizedCategory === "array-operations") {
        response = await axios.post(`${BASE_URL}/array/${selectedAlgorithm}`, {
          array,
          value: arrayValue,
          position: arrayPosition,
          direction: arrayDirection,
          positions: arrayPositions,
        });
      } else if (category === "sorting") {
        response = await axios.post(`${BASE_URL}/sort/${selectedAlgorithm}`, {
          array,
        });
      } else if (category === "trees") {
        let operation =
          selectedAlgorithm === "avl-tree" ? "avlInsert" : bstOperation;
        let valueToSend = bstValue;
        let options = {};

        // Handle bulk insert
        if (bstOperation === "bulk-insert") {
    try {
      // Parse the comma-separated string into an array of numbers
      valueToSend = bstValue
        .split(",")
        .map((v) => parseInt(v.trim()))
        .filter((v) => !isNaN(v));
      if (valueToSend.length === 0) {
        toast.warning("🌳 Please enter valid numbers separated by commas", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
        return;
      }
    } catch (error) {
      toast.error("❌ Invalid input format. Please enter numbers separated by commas.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      return;
    }
  }

    // Handle traversal operations
    else if (bstOperation.startsWith("traverse-")) {
    operation = bstOperation;
    valueToSend = null; // No value needed for traversal
    options = { order: bstOperation.replace("traverse-", "") };
  }
  // Handle regular operations - ensure it's a number
  else if (["insert", "search", "delete"].includes(bstOperation)) {
    valueToSend = parseInt(bstValue);
    if (isNaN(valueToSend)) {
      toast.warning("🔢 Please enter a valid number", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      return;
    }
  }
  response = await axios.post(`${BASE_URL}/bst/${operation}`, {
    value: valueToSend,
    treeState: bstTree,
    options: options,
  });
  setBstTree(response.data.tree);
  
  // Success toast for tree operations
  if (bstOperation === "bulk-insert") {
    toast.success(`🌳 Successfully inserted ${valueToSend.length} values`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  } else if (bstOperation.startsWith("traverse-")) {
    toast.info(`🔄 ${getBstOperationDisplayName(bstOperation)} completed`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  } else {
    toast.success(`✅ ${getBstOperationDisplayName(bstOperation)} operation successful`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  }
  
} else if (category === "graphs") {
  response = await axios.post(`${BASE_URL}/graph/${selectedAlgorithm}`, {
    graph,
    start: graphStartNode,
  });
  
  // Success toast for graph algorithms
  toast.success(`📊 ${selectedAlgorithm.replace(/-/g, ' ')} executed successfully`, {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });
  
} else if (category === "linked-list") {
  // For bulk insert, we need to handle it differently
  if (listOperation === "bulk-insert") {
    // This will be handled by handleListOperation directly
    return;
  }

  // For other operations, use the normal flow
  response = await axios.post(`${BASE_URL}/linkedList/${listOperation}`, {
    value: listOperation !== "traverse" ? parseInt(listValue) : null,
    listState: linkedList,
  });
  setLinkedList(response.data.list);
  
  // Success toast for linked list operations
  if (listOperation === "traverse") {
    toast.info("🔗 Linked list traversal completed", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  } else {
    toast.success(`✅ ${listOperation} operation successful`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  }
  
} else if (category === "heap") {
  response = await axios.post(`${BASE_URL}/heap/${heapOperation}`, {
    value: parseInt(heapValue),
    heapState: heap,
  });
  setHeap(response.data.heap);
  
  toast.success(`📚 Heap ${heapOperation} operation successful`, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });
  
} else if (category === "trie") {
  response = await axios.post(`${BASE_URL}/trie/${trieOperation}`, {
    word: trieWord,
    trieState: trie,
  });
  setTrie(response.data.trie);
  
  toast.success(`🔤 Trie ${trieOperation} operation successful`, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });
  
} else if (category === "stack") {
  response = await axios.post(`${BASE_URL}/stack/${stackOperation}`, {
    value: stackOperation === "pushMultiple" ? stackValues : stackValue,
    stackState: stack,
  });
  setStack(response.data.stack);
  
  toast.success(`📚 Stack ${stackOperation} operation successful`, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });
  
} else if (category === "queue") {
  response = await axios.post(`${BASE_URL}/queue/${queueOperation}`, {
    value: queueValue,
    queueState: queue,
  });
  setQueue(response.data.queue);
  
  toast.success(`📥 Queue ${queueOperation} operation successful`, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });
  
} else if (category === "backtracking") {
  if (selectedAlgorithm === "n-queens") {
    response = await axios.post(`${BASE_URL}/backtracking/n-queens`, {
      n: nQueensSize,
    });
    toast.success(`♕ N-Queens solution found for ${nQueensSize}x${nQueensSize} board`, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  } else if (selectedAlgorithm === "sudoku-solver") {
    response = await axios.post(
      `${BASE_URL}/backtracking/sudoku-solver`,
      {
        grid: sudokuGrid,
      }
    );
    toast.success("🧩 Sudoku puzzle solved successfully", {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  }
} else if (category === "greedy") {
  if (selectedAlgorithm === "activity-selection") {
    response = await axios.post(`${BASE_URL}/greedy/activity-selection`, {
      activities,
    });
    toast.success("📅 Activity selection optimized", {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  } else if (selectedAlgorithm === "fractional-knapsack") {
    response = await axios.post(
      `${BASE_URL}/greedy/fractional-knapsack`,
      {
        items: knapsackItems,
        capacity: knapsackCapacity,
      }
    );
    toast.success("🎒 Fractional knapsack solution found", {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  }
} else if (category === "dynamic-programming") {
  if (selectedAlgorithm === "fibonacci") {
    response = await axios.post(`${BASE_URL}/dp/fibonacci`, {
      n: fibonacciN,
    });
    toast.success(`🔢 Fibonacci sequence calculated for n=${fibonacciN}`, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  } else if (selectedAlgorithm === "knapsack-dp") {
    response = await axios.post(`${BASE_URL}/dp/knapsack-dp`, {
      items: dpKnapsackItems,
      capacity: dpKnapsackCapacity,
    });
    toast.success("💼 0/1 Knapsack DP solution found", {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  }
}

setAlgorithmData(response.data);
setCurrentStep(0);
setIsPlaying(false);
    } catch (error) {
      console.error("Error fetching algorithm steps:", error);
      setAlgorithmData({ steps: [], pseudocode: [], explanations: [] });
      setAiExplanation(
        error.response?.data?.error ||
          "Error loading algorithm steps. Please check inputs."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Graph operations
  const addGraphNode = () => {
  if (!graphNode) {
    toast.warning("⚠️ Please enter a node name", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
    return;
  }
  if (graph[graphNode]) {
    toast.warning("⚠️ Node already exists", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
    return;
  }
  setGraph((prev) => ({ ...prev, [graphNode]: {} }));
  setGraphNode("");
  toast.success(`✅ Node '${graphNode}' added successfully`, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });
};

  const addGraphEdge = () => {
  if (
    !graphEdgeFrom ||
    !graphEdgeTo ||
    !graphEdgeWeight ||
    isNaN(parseInt(graphEdgeWeight))
  ) {
    toast.error("❌ Please enter valid from node, to node, and weight", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
    return;
  }
  if (!graph[graphEdgeFrom] || !graph[graphEdgeTo]) {
    toast.error("❌ One or both nodes do not exist", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
    return;
  }
  setGraph((prev) => ({
    ...prev,
    [graphEdgeFrom]: {
      ...prev[graphEdgeFrom],
      [graphEdgeTo]: parseInt(graphEdgeWeight),
    },
    [graphEdgeTo]: {
      ...prev[graphEdgeTo],
      [graphEdgeFrom]: parseInt(graphEdgeWeight),
    },
  }));
  setGraphEdgeFrom("");
  setGraphEdgeTo("");
  setGraphEdgeWeight("");
  toast.success(`✅ Edge ${graphEdgeFrom} ↔ ${graphEdgeTo} (weight: ${graphEdgeWeight}) added`, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });
};
  const fetchAlgorithmStepsWithValues = async (customValues = null) => {
  setIsLoading(true);
  try {
    let valueToSend = customValues;

    // If no custom values provided, use the state values
    if (!valueToSend) {
      if (listOperation !== "traverse") {
        valueToSend = parseInt(listValue);
      }
    }

    const response = await axios.post(
      `${BASE_URL}/linkedList/${listOperation}`,
      {
        value: valueToSend,
        listState: linkedList,
      }
    );

    setLinkedList(response.data.list);
    setAlgorithmData(response.data);
    setCurrentStep(0);
    setIsPlaying(false);
    
    // Success toast for bulk operations
    if (Array.isArray(customValues)) {
      toast.success(`✅ Successfully inserted ${customValues.length} values`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    }
    
  } catch (error) {
    console.error("Error fetching linked list steps:", error);
    setAlgorithmData({ steps: [], pseudocode: [], explanations: [] });
    setAiExplanation(
      error.response?.data?.error ||
      "Error loading linked list steps. Please check inputs."
    );
    toast.error("❌ Error performing linked list operation", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  } finally {
    setIsLoading(false);
  }
};


  // Animation control
  useEffect(() => {
    if (isPlaying && currentStep < algorithmData.steps.length - 1) {
      animationInterval.current = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= algorithmData.steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    } else if (animationInterval.current) {
      clearInterval(animationInterval.current);
    }

    return () => {
      if (animationInterval.current) {
        clearInterval(animationInterval.current);
      }
    };
  }, [isPlaying, currentStep, speed, algorithmData.steps.length]);

  // Step explanation
  useEffect(() => {
    if (algorithmData.steps.length > 0) {
      const step = algorithmData.steps[currentStep];
      const explanation =
        algorithmData.explanations && algorithmData.explanations[currentStep]
          ? algorithmData.explanations[currentStep]
          : `Step ${currentStep + 1}: ${step.action || "Processing..."}`;
      setAiExplanation(explanation);
    } else {
      setAiExplanation('Click "Run Algorithm" to start visualization.');
    }
  }, [currentStep, algorithmData]);

  const countListNodes = (head) => {
    let count = 0;
    let current = head;
    while (current) {
      count++;
      current = current.next;
    }
    return count;
  };

  // Control functions
  const handleStepForward = () => {
    if (currentStep < algorithmData.steps.length - 1)
      setCurrentStep(currentStep + 1);
  };

  const handleStepBackward = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handlePlayPause = () => setIsPlaying(!isPlaying);

  const resetAnimation = () => {
    setIsPlaying(false);
    setCurrentStep(0);
  };

  const generateRandomArray = () => {
    const newArray = Array.from(
      { length: 10 },
      () => Math.floor(Math.random() * 20) + 1
    );
    setArray(newArray);
    resetAnimation();
    setAlgorithmData({ steps: [], pseudocode: [], explanations: [] });
  };

  const handleCustomArray = (newArray) => {
    try {
      const parsedArray = newArray.split(",").map(Number);
      if (parsedArray.some(isNaN)) {
        toast.error("Please enter valid numbers separated by commas", {
          position: "top-right",
          autoClose: 5000,
        });
        return;
      }
      setArray(parsedArray);
      resetAnimation();
      setAlgorithmData({ steps: [], pseudocode: [], explanations: [] });
    } catch (error) {
      toast.error(
        "Invalid input. Please enter numbers separated by commas.",
        {
          position: "top-right",
          autoClose: 5000,
        },
        error
      );
    }
  };

  // Operation handlers
  const handleArrayOperation = () => {
    if (
      (selectedAlgorithm === "insert" || selectedAlgorithm === "update") &&
      arrayPosition === ""
    ) {
      toast.error("Please enter a position for the array operation", {
        position: "top-right",
        autoClose: 5000,
      });
      return;
    }
    if (
      (selectedAlgorithm === "insert" ||
        selectedAlgorithm === "push" ||
        selectedAlgorithm === "update") &&
      arrayValue === ""
    ) {
      toast.error("Please enter a value for the array operation", {
        position: "top-right",
        autoClose: 5000,
      });
      return;
    }
    if (selectedAlgorithm === "search" && arrayValue === "") {
      toast.error("Please enter a value to search for", {
        position: "top-right",
        autoClose: 5000,
      });
      return;
    }
    fetchAlgorithmSteps();
  };

  // Add these helper functions in AlgorithmPage.jsx
  // Helper function to count nodes in tree
  const countNodes = (node) => {
    if (!node) return 0;
    return 1 + countNodes(node.left) + countNodes(node.right);
  };

  // Helper function to get display name for BST operations
  const getBstOperationDisplayName = (operation) => {
    const names = {
      insert: "Insert",
      "bulk-insert": "Bulk Insert",
      search: "Search",
      delete: "Delete",
      "traverse-inorder": "Inorder Traversal",
      "traverse-preorder": "Preorder Traversal",
      "traverse-postorder": "Postorder Traversal",
      avlInsert: "AVL Insert",
    };
    return names[operation] || operation;
  };

  // Update the handleBstOperation function
  const handleBstOperation = () => {
    if (bstOperation.includes("traverse")) {
      // No value needed for traversal
      fetchAlgorithmSteps();
      return;
    }

    if (bstOperation === "bulk-insert") {
      if (!bstValue.trim()) {
        toast.error("Please enter values for bulk insertion", {
          position: "top-right",
          autoClose: 5000,
        });
        return;
      }
      try {
        const values = bstValue
          .split(",")
          .map((v) => parseInt(v.trim()))
          .filter((v) => !isNaN(v));
        if (values.length === 0) {
          toast.error("Please enter valid numbers separated by commas", {
            position: "top-right",
            autoClose: 5000,
          });
          return;
        }
        fetchAlgorithmSteps();
      } catch (error) {
        toast.error(
          "Invalid input format. Please enter numbers separated by commas.",
          {
            position: "top-right",
            autoClose: 5000,
          },
          error
        );
      }
    } else {
      if (bstValue === "" && bstOperation !== "traverse") {
        toast.warning("Please enter a value for the BST operation", {
          position: "top-right",
          autoClose: 5000,
        });
        return;
      }
      // Validate numeric input for insert, search, delete
      if (["insert", "search", "delete"].includes(bstOperation)) {
        const numValue = parseInt(bstValue);
        if (isNaN(numValue)) {
          toast.error("Please enter a valid number", {
            position: "top-right",
            autoClose: 5000,
          });
          return;
        }
      }
      fetchAlgorithmSteps();
    }
  };

  // In AlgorithmPage.jsx, update the handleGraphOperation function:
  const handleGraphOperation = () => {
  if (selectedAlgorithm === "kruskals-algorithm") {
    // Kruskal's doesn't need a start node, just check if graph exists
    if (!graph || Object.keys(graph).length === 0) {
      toast.error("❌ Please create a graph first for Kruskal's algorithm", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      return;
    }
    // Set a dummy start node for the API call (it will be ignored by Kruskal's)
    setGraphStartNode(Object.keys(graph)[0]);
  } else {
    // Other algorithms need start node
    if (!graphStartNode || !graph[graphStartNode]) {
      toast.error(`❌ Start node '${graphStartNode}' not found in graph`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      return;
    }
  }
  fetchAlgorithmSteps();
};


  const handleListOperation = () => {
  if (listOperation === "bulk-insert") {
    // For bulk insert, listValue is a string that needs to be parsed
    if (!listValue || typeof listValue !== "string" || !listValue.trim()) {
      toast.error("❌ Please enter values for bulk insertion", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      return;
    }

    try {
      // Parse comma-separated values into array
      const values = listValue
        .split(",")
        .map((v) => parseInt(v.trim()))
        .filter((v) => !isNaN(v));

      if (values.length === 0) {
        toast.error("❌ Please enter valid numbers separated by commas", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
        return;
      }

      // Call the API with the array directly
      fetchAlgorithmStepsWithValues(values);
    } catch (error) {
      toast.error("❌ Invalid input format. Please enter numbers separated by commas.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    }
  } else {
    // For single operations
    if (listOperation !== "traverse" && (!listValue || listValue === "")) {
      toast.warning("⚠️ Please enter a value for the Linked List operation", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      return;
    }


      // For single insert/delete, convert to number
       let valueToSend = listValue;
    if (listOperation !== "traverse") {
      const numValue = parseInt(listValue);
      if (isNaN(numValue)) {
        toast.error("❌ Please enter a valid number", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
        return;
      }
      valueToSend = numValue;
    }

    fetchAlgorithmSteps();
  }
};

  const handleHeapOperation = () => {
  if (heapOperation !== "heapify" && heapValue === "") {
    toast.warning("📚 Please enter a value for the Heap operation", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
    return;
  }
  fetchAlgorithmSteps();
};

const handleTrieOperation = () => {
  if (!trieWord) {
    toast.warning("🔤 Please enter a word for the Trie operation", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
    return;
  }
  fetchAlgorithmSteps();
};

const handleStackOperation = () => {
  if (
    (stackOperation === "push" || stackOperation === "pushMultiple") &&
    !stackValue
  ) {
    toast.warning("📚 Please enter a value for the stack operation", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
    return;
  }
  fetchAlgorithmSteps();
};

const handleQueueOperation = () => {
  if (queueOperation === "enqueue" && !queueValue) {
    toast.warning("📥 Please enter a value for the queue operation", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
    return;
  }
  fetchAlgorithmSteps();
};

const handleBacktrackingOperation = () => {
  // Validate N-Queens size
  if (selectedAlgorithm === "n-queens" && (!nQueensSize || nQueensSize < 1)) {
    toast.warning("♕ Please enter a valid board size for N-Queens", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
    return;
  }
  
  // Validate Sudoku grid
  if (selectedAlgorithm === "sudoku-solver") {
    if (!sudokuGrid || sudokuGrid.length === 0) {
      toast.warning("🧩 Please provide a Sudoku grid to solve", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      return;
    }
  }
  
  fetchAlgorithmSteps();
};

const handleGreedyOperation = () => {
  // Validate Activity Selection
  if (selectedAlgorithm === "activity-selection") {
    if (!activities || activities.length === 0) {
      toast.warning("📅 Please add activities for Activity Selection", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      return;
    }
  }
  
  // Validate Fractional Knapsack
  if (selectedAlgorithm === "fractional-knapsack") {
    if (!knapsackItems || knapsackItems.length === 0) {
      toast.warning("🎒 Please add items for Fractional Knapsack", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      return;
    }
    if (!knapsackCapacity || knapsackCapacity <= 0) {
      toast.warning("⚖️ Please enter a valid capacity for Knapsack", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      return;
    }
  }
  
  fetchAlgorithmSteps();
};

const handleDynamicProgrammingOperation = () => {
  // Validate Fibonacci input
  if (selectedAlgorithm === "fibonacci") {
    if (!fibonacciN || fibonacciN < 0) {
      toast.warning("🔢 Please enter a valid non-negative number for Fibonacci", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      return;
    }
  }
  
  // Validate Knapsack DP
  if (selectedAlgorithm === "knapsack-dp") {
    if (!dpKnapsackItems || dpKnapsackItems.length === 0) {
      toast.warning("💼 Please add items for 0/1 Knapsack", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      return;
    }
    if (!dpKnapsackCapacity || dpKnapsackCapacity <= 0) {
      toast.warning("⚖️ Please enter a valid capacity for 0/1 Knapsack", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      return;
    }
  }
  
  fetchAlgorithmSteps();
};

const handleBulkListInsert = () => {
  if (!listValue.trim()) {
    toast.warning("🔗 Please enter values for bulk insertion", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
    return;
  }

  try {
    const values = listValue
      .split(",")
      .map((v) => parseInt(v.trim()))
      .filter((v) => !isNaN(v));

    if (values.length === 0) {
      toast.warning("🔢 Please enter valid numbers separated by commas", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      return;
    }

    // Show loading toast for bulk operation
    const loadingToast = toast.loading(`🔄 Inserting ${values.length} values...`, {
      position: "top-right",
    });

    // Insert values one by one with delays to show the process
    values.forEach((value, index) => {
      setTimeout(() => {
        setListValue(value.toString());
        fetchAlgorithmSteps();
        
        // Update toast on each insertion
        if (index === values.length - 1) {
          toast.update(loadingToast, {
            render: `✅ Successfully inserted ${values.length} values!`,
            type: "success",
            isLoading: false,
            autoClose: 3000,
            hideProgressBar: false,
          });
        } else {
          toast.update(loadingToast, {
            render: `🔄 Inserting ${index + 1}/${values.length} values...`,
          });
        }
      }, index * 1000); // 1 second delay between inserts
    });
  } catch (error) {
    toast.error("❌ Invalid input format. Please enter numbers separated by commas.", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  }
};

const handleCreateGraphFromMatrix = (matrixString) => {
  try {
    const lines = matrixString.trim().split("\n");
    const matrix = lines.map((line) =>
      line.split(",").map((val) => parseInt(val.trim()))
    );

    // Validate matrix
    const size = matrix.length;
    if (matrix.some((row) => row.length !== size)) {
      toast.warning("📊 Matrix must be square (same number of rows and columns)", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      return;
    }

    // Validate matrix has at least 2 nodes
    if (size < 2) {
      toast.warning("📊 Graph must have at least 2 nodes", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      return;
    }

    // Generate node labels (A, B, C, ...)
    const nodes = Array.from({ length: size }, (_, i) =>
      String.fromCharCode(65 + i)
    );

    // Create new graph from matrix
    const newGraph = {};

    // Initialize nodes
    nodes.forEach((node) => {
      newGraph[node] = {};
    });

    // Add edges based on matrix
    matrix.forEach((row, i) => {
      row.forEach((weight, j) => {
        if (weight > 0 && i !== j) {
          const fromNode = nodes[i];
          const toNode = nodes[j];
          newGraph[fromNode][toNode] = weight;
          // For undirected graph, add reverse edge
          newGraph[toNode][fromNode] = weight;
        }
      });
    });

    setGraph(newGraph);
    setShowMatrixInput(false);
    setMatrixInput("");
    
    // Count total edges
    const totalEdges = Object.values(newGraph).reduce((count, edges) => {
      return count + Object.keys(edges).length;
    }, 0) / 2; // Divide by 2 for undirected graph
    
    toast.success(`✅ Graph created successfully with ${size} nodes and ${totalEdges} edges!`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  } catch (error) {
    toast.error("❌ Invalid matrix format. Please check your input.", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  }
};

  // Get visualization component
  const getVisualizationComponent = () => {
    const normalizedCategory =
      category === "arrays" ? "array-operations" : category;
    const currentStepData = algorithmData.steps[currentStep] || {
      array: array,
      currentIndex: -1,
    };

    switch (normalizedCategory) {
      case "array-operations":
        return (
          <ArrayVisualizer
            step={currentStepData}
            operation={selectedAlgorithm}
          />
        );

      case "sorting":
        return (
          <div className="sorting-visualization">
            <AnimationArea
              step={currentStepData}
              algorithm={selectedAlgorithm}
            />
            <LineChart array={currentStepData.array || array} />
          </div>
        );

      case "trees":
        return (
          <BSTViewer step={currentStepData} algorithm={selectedAlgorithm} />
        );

      case "graphs":
        return (
          <GraphViewer step={currentStepData} algorithm={selectedAlgorithm} />
        );

      case "linked-list":
        return <LinkedListViewer step={currentStepData} />;

      case "heap":
        return <HeapViewer step={currentStepData} />;

      case "trie":
        return <TrieViewer step={currentStepData} />;

      case "stack":
        return <StackVisualizer step={currentStepData} />;

      case "queue":
        return <QueueVisualizer step={currentStepData} />;

      case "backtracking":
        return (
          <BacktrackingViewer
            step={currentStepData}
            algorithm={selectedAlgorithm}
          />
        );

      case "greedy":
        return (
          <GreedyViewer step={currentStepData} algorithm={selectedAlgorithm} />
        );

      case "dynamic-programming":
        return (
          <DynamicProgrammingViewer
            step={currentStepData}
            algorithm={selectedAlgorithm}
          />
        );

      default:
        return <div>Select an algorithm to visualize</div>;
    }
  };

  const handleRunAlgorithm = () => {
    const normalizedCategory =
      category === "arrays" ? "array-operations" : category;

    switch (normalizedCategory) {
      case "array-operations":
        handleArrayOperation();
        break;
      case "stack":
        handleStackOperation();
        break;
      case "queue":
        handleQueueOperation();
        break;
      case "trees":
        handleBstOperation();
        break;
      case "graphs":
        handleGraphOperation();
        break;
      case "linked-list":
        handleListOperation();
        break;
      case "heap":
        handleHeapOperation();
        break;
      case "trie":
        handleTrieOperation();
        break;
      case "backtracking":
        handleBacktrackingOperation();
        break;
      case "greedy":
        handleGreedyOperation();
        break;
      case "dynamic-programming":
        handleDynamicProgrammingOperation();
        break;
      case "sorting":
      default:
        fetchAlgorithmSteps();
        break;
    }
  };

  // Render category-specific controls
  const renderCategoryControls = () => {
    const normalizedCategory =
      category === "arrays" ? "array-operations" : category;

    switch (normalizedCategory) {
      case "array-operations":
        return (
          <>
            <select
              value={selectedAlgorithm}
              onChange={(e) => setSelectedAlgorithm(e.target.value)}
            >
              <option value="traverse">Traverse</option>
              <option value="search">Search</option>
              <option value="insert">Insert</option>
              <option value="push">Push</option>
              <option value="pop">Pop</option>
              <option value="delete">Delete</option>
              <option value="update">Update</option>
              <option value="rotate">Rotate</option>
              <option value="reverse">Reverse</option>
            </select>

            {(selectedAlgorithm === "insert" ||
              selectedAlgorithm === "update") && (
              <input
                type="number"
                value={arrayPosition}
                onChange={(e) => setArrayPosition(e.target.value)}
                placeholder="Position"
                min="0"
              />
            )}

            {(selectedAlgorithm === "insert" ||
              selectedAlgorithm === "push" ||
              selectedAlgorithm === "update" ||
              selectedAlgorithm === "search") && (
              <input
                type="number"
                value={arrayValue}
                onChange={(e) => setArrayValue(e.target.value)}
                placeholder="Value"
              />
            )}

            {selectedAlgorithm === "rotate" && (
              <>
                <select
                  value={arrayDirection}
                  onChange={(e) => setArrayDirection(e.target.value)}
                >
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                </select>
                <input
                  type="number"
                  value={arrayPositions}
                  onChange={(e) => setArrayPositions(e.target.value)}
                  placeholder="Positions"
                  min="1"
                />
              </>
            )}

            <button onClick={generateRandomArray} disabled={isLoading}>
              Generate Random Array
            </button>

            {/* ADD THE RUN BUTTON */}
            <button onClick={handleRunAlgorithm} disabled={isLoading}>
              Run {selectedAlgorithm.replace(/-/g, " ")}
            </button>
          </>
        );

      case "sorting":
        return (
          <>
            <select
              value={selectedAlgorithm}
              onChange={(e) => setSelectedAlgorithm(e.target.value)}
            >
              <option value="bubble-sort">Bubble Sort</option>
              <option value="selection-sort">Selection Sort</option>
              <option value="insertion-sort">Insertion Sort</option>
              <option value="merge-sort">Merge Sort</option>
              <option value="quick-sort">Quick Sort</option>
              <option value="heap-sort">Heap Sort</option>
            </select>
            <button onClick={generateRandomArray} disabled={isLoading}>
              Generate Random Array
            </button>
            <button onClick={fetchAlgorithmSteps} disabled={isLoading}>
              Run Algorithm
            </button>
          </>
        );

      case "trees":
        return (
          <>
            <select
              value={selectedAlgorithm}
              onChange={(e) => setSelectedAlgorithm(e.target.value)}
            >
              <option value="binary-search-tree">Binary Search Tree</option>
              <option value="avl-tree">AVL Tree</option>
            </select>

            <select
              value={bstOperation}
              onChange={(e) => setBstOperation(e.target.value)}
              disabled={selectedAlgorithm === "avl-tree"}
            >
              <option value="insert">Insert</option>
              <option value="bulk-insert">Bulk Insert</option>
              <option value="search">Search</option>
              <option value="delete">Delete</option>
              <option value="traverse-inorder">Inorder Traverse</option>
              <option value="traverse-preorder">Preorder Traverse</option>
              <option value="traverse-postorder">Postorder Traverse</option>
            </select>

            {bstOperation === "bulk-insert" ? (
              <input
                type="text"
                value={bstValue}
                onChange={(e) => setBstValue(e.target.value)}
                placeholder="Enter values (comma separated: 5,3,7,2,4)"
                style={{ flex: 1 }}
              />
            ) : bstOperation.includes("traverse") ? (
              <div
                style={{
                  color: "white",
                  fontSize: "14px",
                  padding: "8px 12px",
                  background: "#2d3748",
                  borderRadius: "5px",
                  textAlign: "center",
                }}
              >
                Will perform {bstOperation.replace("traverse-", "")} traversal
              </div>
            ) : (
              <input
                type="number"
                value={bstValue}
                onChange={(e) => setBstValue(e.target.value)}
                placeholder={`Enter value to ${bstOperation}`}
                style={{ flex: 1 }}
              />
            )}

            <button onClick={handleBstOperation} disabled={isLoading}>
              {isLoading
                ? "Running..."
                : `Run ${getBstOperationDisplayName(bstOperation)}`}
            </button>

            {/* Show current tree info */}
            {bstTree && (
              <div
                style={{
                  color: "#cbd5e0",
                  fontSize: "12px",
                  marginTop: "10px",
                  padding: "8px",
                  background: "#2d3748",
                  borderRadius: "5px",
                }}
              >
                Tree has {countNodes(bstTree)} nodes
              </div>
            )}
          </>
        );

      case "graphs":
        return (
          <>
            <select
              value={selectedAlgorithm}
              onChange={(e) => setSelectedAlgorithm(e.target.value)}
            >
              <option value="breadth-first-search">BFS</option>
              <option value="depth-first-search">DFS</option>
              <option value="dijkstra">Dijkstra</option>
              <option value="prims-algorithm">Prim's</option>
              <option value="kruskals-algorithm">Kruskal's</option>
            </select>

            <div className="graph-editor">
              <input
                type="text"
                value={graphNode}
                onChange={(e) => setGraphNode(e.target.value.toUpperCase())}
                placeholder="New node"
              />
              <button onClick={addGraphNode}>Add Node</button>
              <input
                type="text"
                value={graphEdgeFrom}
                onChange={(e) => setGraphEdgeFrom(e.target.value.toUpperCase())}
                placeholder="From node"
              />
              <input
                type="text"
                value={graphEdgeTo}
                onChange={(e) => setGraphEdgeTo(e.target.value.toUpperCase())}
                placeholder="To node"
              />
              <input
                type="number"
                value={graphEdgeWeight}
                onChange={(e) => setGraphEdgeWeight(e.target.value)}
                placeholder="Weight"
              />
              <button onClick={addGraphEdge}>Add Edge</button>

              {/* Matrix Input Button */}
              <button
                onClick={() => setShowMatrixInput(!showMatrixInput)}
                className="matrix-input-btn"
              >
                {showMatrixInput
                  ? "Hide Matrix Input"
                  : "Create Graph from Matrix"}
              </button>
            </div>

            {/* Matrix Input Section */}
            {showMatrixInput && (
              <div className="matrix-input-container">
                <h5>Enter Adjacency Matrix</h5>
                <p className="matrix-help">
                  Format: Use comma-separated values. Each row on a new line.
                  <br />
                  Example for 3 nodes:
                  <br />
                  0,1,1
                  <br />
                  1,0,0
                  <br />
                  1,0,0
                </p>
                <textarea
                  value={matrixInput}
                  onChange={(e) => setMatrixInput(e.target.value)}
                  placeholder="Enter adjacency matrix..."
                  rows={5}
                  className="matrix-textarea"
                />
                <button
                  className="create-graph-btn"
                  onClick={() => handleCreateGraphFromMatrix(matrixInput)}
                  disabled={!matrixInput.trim()}
                >
                  Create Graph
                </button>
              </div>
            )}

            <input
              type="text"
              value={graphStartNode}
              onChange={(e) => setGraphStartNode(e.target.value.toUpperCase())}
              placeholder="Start node"
            />
            <button onClick={handleGraphOperation} disabled={isLoading}>
              Run {selectedAlgorithm.toUpperCase()}
            </button>
          </>
        );

      case "linked-list":
        return (
          <>
            <select
              value={selectedAlgorithm}
              onChange={(e) => setSelectedAlgorithm(e.target.value)}
            >
              <option value="singly-linked-list">Singly Linked List</option>
              <option value="doubly-linked-list">Doubly Linked List</option>
            </select>
            <select
              value={listOperation}
              onChange={(e) => {
                setListOperation(e.target.value);
                // Reset listValue when switching operations
                setListValue("");
              }}
            >
              <option value="insert">Insert Single</option>
              <option value="bulk-insert">Bulk Insert</option>
              <option value="delete">Delete</option>
              <option value="search">Search</option>
              <option value="traverse">Traverse</option>
            </select>

            {listOperation === "bulk-insert" ? (
              <input
                type="text"
                value={listValue}
                onChange={(e) => setListValue(e.target.value)}
                placeholder="Enter values (comma separated: 5,3,7,2,4)"
                style={{ flex: 1 }}
              />
            ) : listOperation !== "traverse" ? (
              <input
                type="number"
                value={listValue}
                onChange={(e) => setListValue(e.target.value)}
                placeholder="Enter value"
              />
            ) : null}

            <button onClick={handleListOperation} disabled={isLoading}>
              {isLoading
                ? "Running..."
                : `Run ${listOperation.replace("-", " ")}`}
            </button>

            {/* Show current list info */}
            {linkedList && (
              <div
                style={{
                  color: "#cbd5e0",
                  fontSize: "12px",
                  marginTop: "10px",
                  padding: "8px",
                  background: "#2d3748",
                  borderRadius: "5px",
                }}
              >
                List has {countListNodes(linkedList)} nodes
              </div>
            )}
          </>
        );

      case "heap":
        return (
          <>
            <select
              value={selectedAlgorithm}
              onChange={(e) => setSelectedAlgorithm(e.target.value)}
            >
              <option value="min-heap">Min Heap</option>
              <option value="max-heap">Max Heap</option>
            </select>
            <select
              value={heapOperation}
              onChange={(e) => setHeapOperation(e.target.value)}
            >
              <option value="insert">Insert</option>
              <option value="extract">Extract</option>
              <option value="heapify">Heapify</option>
            </select>
            <input
              type="number"
              value={heapValue}
              onChange={(e) => setHeapValue(e.target.value)}
              placeholder="Enter value"
              disabled={heapOperation === "heapify"}
            />
            <button onClick={handleHeapOperation} disabled={isLoading}>
              Run Operation
            </button>
          </>
        );

      case "trie":
        return (
          <>
            <select
              value={trieOperation}
              onChange={(e) => setTrieOperation(e.target.value)}
            >
              <option value="insert">Insert</option>
              <option value="search">Search</option>
              <option value="prefix">Prefix Search</option>
            </select>
            <input
              type="text"
              value={trieWord}
              onChange={(e) => setTrieWord(e.target.value.toLowerCase())}
              placeholder="Enter word"
            />
            <button onClick={handleTrieOperation} disabled={isLoading}>
              Run Operation
            </button>
          </>
        );

      case "stacks":
        return (
          <>
            <select
              value={selectedAlgorithm}
              onChange={(e) => setSelectedAlgorithm(e.target.value)}
            >
              <option value="stack-operations">Basic Operations</option>
              <option value="push-operation">Push Operation</option>
              <option value="pop-operation">Pop Operation</option>
              <option value="peek-operation">Peek Operation</option>
              <option value="stack-traversal">Stack Traversal</option>
            </select>

            {(selectedAlgorithm === "push-operation" ||
              selectedAlgorithm === "stack-operations") && (
              <>
                <select
                  value={stackOperation}
                  onChange={(e) => setStackOperation(e.target.value)}
                >
                  <option value="push">Push</option>
                  <option value="pop">Pop</option>
                  <option value="peek">Peek</option>
                  <option value="isEmpty">Is Empty</option>
                  <option value="size">Size</option>
                  <option value="pushMultiple">Push Multiple</option>
                </select>

                {(stackOperation === "push" ||
                  stackOperation === "pushMultiple") && (
                  <input
                    type="text"
                    value={
                      stackOperation === "pushMultiple"
                        ? stackValues
                        : stackValue
                    }
                    onChange={(e) => {
                      if (stackOperation === "pushMultiple") {
                        setStackValues(e.target.value);
                      } else {
                        setStackValue(e.target.value);
                      }
                    }}
                    placeholder={
                      stackOperation === "pushMultiple"
                        ? "Values (comma separated)"
                        : "Enter value"
                    }
                  />
                )}
              </>
            )}

            <button onClick={handleRunAlgorithm} disabled={isLoading}>
              Run{" "}
              {selectedAlgorithm === "stack-operations"
                ? stackOperation
                : selectedAlgorithm.replace(/-/g, " ")}
            </button>
          </>
        );

      case "queues":
        return (
          <>
            <select
              value={selectedAlgorithm}
              onChange={(e) => setSelectedAlgorithm(e.target.value)}
            >
              <option value="queue-operations">Basic Operations</option>
              <option value="enqueue-operation">Enqueue Operation</option>
              <option value="dequeue-operation">Dequeue Operation</option>
            </select>

            {(selectedAlgorithm === "enqueue-operation" ||
              selectedAlgorithm === "queue-operations") && (
              <>
                <select
                  value={queueOperation}
                  onChange={(e) => setQueueOperation(e.target.value)}
                >
                  <option value="enqueue">Enqueue</option>
                  <option value="dequeue">Dequeue</option>
                  <option value="peek">Peek</option>
                  <option value="isEmpty">Is Empty</option>
                </select>

                {queueOperation === "enqueue" && (
                  <input
                    type="text"
                    value={queueValue}
                    onChange={(e) => setQueueValue(e.target.value)}
                    placeholder="Enter value"
                  />
                )}
              </>
            )}

            <button onClick={handleRunAlgorithm} disabled={isLoading}>
              Run{" "}
              {selectedAlgorithm === "queue-operations"
                ? queueOperation
                : selectedAlgorithm.replace(/-/g, " ")}
            </button>
          </>
        );

      case "backtracking":
        return (
          <>
            <select
              value={selectedAlgorithm}
              onChange={(e) => setSelectedAlgorithm(e.target.value)}
            >
              <option value="n-queens">N-Queens</option>
              <option value="sudoku-solver">Sudoku Solver</option>
              <option value="rat-in-maze">Rat in Maze</option>
              <option value="knights-tour">Knight's Tour</option>
              <option value="word-search">Word Search</option>
            </select>

            {selectedAlgorithm === "n-queens" && (
              <input
                type="number"
                value={nQueensSize}
                onChange={(e) => setNQueensSize(parseInt(e.target.value))}
                placeholder="Board size"
                min="1"
                max="12"
              />
            )}

            {selectedAlgorithm === "word-search" && (
              <input
                type="text"
                value={searchWord}
                onChange={(e) => setSearchWord(e.target.value)}
                placeholder="Word to search"
              />
            )}

            <button onClick={handleBacktrackingOperation} disabled={isLoading}>
              Run {selectedAlgorithm.replace(/-/g, " ")}
            </button>
          </>
        );

      case "greedy":
        return (
          <>
            <select
              value={selectedAlgorithm}
              onChange={(e) => setSelectedAlgorithm(e.target.value)}
            >
              <option value="activity-selection">Activity Selection</option>
              <option value="fractional-knapsack">Fractional Knapsack</option>
              <option value="job-scheduling">Job Scheduling</option>
              <option value="huffman-encoding">Huffman Encoding</option>
              <option value="coin-change-greedy">Coin Change</option>
            </select>

            {selectedAlgorithm === "fractional-knapsack" && (
              <input
                type="number"
                value={knapsackCapacity}
                onChange={(e) => setKnapsackCapacity(parseInt(e.target.value))}
                placeholder="Knapsack capacity"
              />
            )}

            {selectedAlgorithm === "coin-change-greedy" && (
              <input
                type="number"
                value={coinAmount}
                onChange={(e) => setCoinAmount(parseInt(e.target.value))}
                placeholder="Amount to make"
              />
            )}

            <button onClick={handleGreedyOperation} disabled={isLoading}>
              Run {selectedAlgorithm.replace(/-/g, " ")}
            </button>
          </>
        );

      case "dynamic-programming":
        return (
          <>
            <select
              value={selectedAlgorithm}
              onChange={(e) => setSelectedAlgorithm(e.target.value)}
            >
              <option value="fibonacci">Fibonacci</option>
              <option value="knapsack-dp">0/1 Knapsack</option>
              <option value="longest-common-subsequence">LCS</option>
              <option value="coin-change-dp">Coin Change</option>
              <option value="edit-distance">Edit Distance</option>
            </select>

            {selectedAlgorithm === "fibonacci" && (
              <input
                type="number"
                value={fibonacciN}
                onChange={(e) => setFibonacciN(parseInt(e.target.value))}
                placeholder="Fibonacci number"
                min="0"
                max="20"
              />
            )}

            {selectedAlgorithm === "knapsack-dp" && (
              <input
                type="number"
                value={dpKnapsackCapacity}
                onChange={(e) =>
                  setDpKnapsackCapacity(parseInt(e.target.value))
                }
                placeholder="Knapsack capacity"
              />
            )}

            {selectedAlgorithm === "coin-change-dp" && (
              <input
                type="number"
                value={dpCoinAmount}
                onChange={(e) => setDpCoinAmount(parseInt(e.target.value))}
                placeholder="Amount to make"
              />
            )}

            {selectedAlgorithm === "longest-common-subsequence" && (
              <div className="string-inputs">
                <input
                  type="text"
                  value={lcsStr1}
                  onChange={(e) => setLcsStr1(e.target.value)}
                  placeholder="First string"
                />
                <input
                  type="text"
                  value={lcsStr2}
                  onChange={(e) => setLcsStr2(e.target.value)}
                  placeholder="Second string"
                />
              </div>
            )}

            {selectedAlgorithm === "edit-distance" && (
              <div className="string-inputs">
                <input
                  type="text"
                  value={editStr1}
                  onChange={(e) => setEditStr1(e.target.value)}
                  placeholder="First string"
                />
                <input
                  type="text"
                  value={editStr2}
                  onChange={(e) => setEditStr2(e.target.value)}
                  placeholder="Second string"
                />
              </div>
            )}

            <button
              onClick={handleDynamicProgrammingOperation}
              disabled={isLoading}
            >
              Run {selectedAlgorithm.replace(/-/g, " ")}
            </button>
          </>
        );

      default:
        return <div>Select a category to see controls</div>;
    }
  };

 return (
  <>
    {category === "algorithm-compare" ? (
      <div className="algorithm-compare-page">
        <AlgorithmCompare />
      </div>
    ) : category === "complexity-analysis" ? (
      <ComplexityAnalysis />
    ) : (
      <div className="algorithm-page">
        {/* Improved Header Section */}
        <div className="algorithm-header">
          <div className="header-left">
            {/* <button 
              onClick={toggleSidebar}
              className="sidebar-toggle"
              aria-label="Toggle sidebar"
            >
              {isSidebarOpen ? '✕' : '☰'}
            </button> */}
            <h2>{selectedAlgorithm.replace(/-/g, ' ').toUpperCase()} Visualization</h2>
          </div>
          <div className="header-right">
            <Link to="/home" className="nav-button">
              ← Back to Home
            </Link>
            <ThemeToggle />
          </div>
        </div>

        <div className="algorithm-layout">
          {/* <Sidebar
            category={category}
            selectedAlgorithm={selectedAlgorithm}
            onSelectAlgorithm={handleSelectAlgorithm}
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
          /> */}

          <div className="visualization-area">
            {/* TOP ROW: Controls and Explanation Side by Side */}
            <div className="top-content-area">
              {/* Controls Panel */}
              <div className="controls-panel">
                <h3>Algorithm Controls</h3>
                <div className="control-group">
                  {renderCategoryControls()}

                  {/* Common Controls */}
                  <button
                    onClick={handlePlayPause}
                    disabled={algorithmData.steps.length === 0 || isLoading}
                    className="play-pause-btn"
                  >
                    {isPlaying ? "⏸️ Pause" : "▶️ Play"}
                  </button>
                  <button onClick={resetAnimation} className="reset-btn">
                    🔄 Reset
                  </button>
                </div>
              </div>

              {/* Explanation Panel */}
              <div className="explanation-panel">
                <h3>Step Explanation</h3>
                <div className="explanation-content">
                  {aiExplanation ||
                    'Click "Run Algorithm" to start visualization.'}
                </div>
              </div>
            </div>

            {/* MIDDLE ROW: Visualization and Pseudocode Side by Side */}
            <div className="main-content-area">
              {/* Visualization Panel */}
              <div className="visualization-panel">
                <h3>Visualization</h3>
                <div className="visualization-container">
                  {getVisualizationComponent()}
                </div>
              </div>

              {/* Pseudocode Panel */}
              <div className="pseudocode-panel">
                <h3>Pseudo Code</h3>
                <SortingViewer
                  code={algorithmData.pseudocode}
                  currentLine={
                    algorithmData.steps[currentStep]?.currentLine || -1
                  }
                  algorithm={selectedAlgorithm}
                />
              </div>
            </div>

            {/* BOTTOM: Control Buttons and Custom Input */}
            <div className="bottom-content-area">
              {/* Control Buttons */}
              {algorithmData.steps.length > 0 && (
                <ControlButtons
                  onStepBackward={handleStepBackward}
                  onStepForward={handleStepForward}
                  currentStep={currentStep}
                  totalSteps={algorithmData.steps.length}
                  setCurrentStep={setCurrentStep}
                />
              )}

              {/* Custom Array Input for Sorting/Array Operations */}
              {(category === "sorting" ||
                category === "array-operations") && (
                <CustomArrayInput onSubmit={handleCustomArray} />
              )}
            </div>
          </div>
        </div>

        {/* React Toastify Container for Beautiful Notifications */}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          style={{
            fontSize: '14px',
            zIndex: 9999,
          }}
          toastStyle={{
            borderRadius: '8px',
            fontWeight: '500',
          }}
        />
      </div>
    )}
  </>
);
};

export default AlgorithmPage;
