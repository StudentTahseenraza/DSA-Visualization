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

import DPResultSummary from "./DPResultSummary";
import HeapResultPanel from "./HeapResultPanel"

import StringVisualizer from "./StringVisualizer";
import StringResultPanel from "./StringResultPanel";

import SortingResultPanel from "./SortingResultPanel";
import BSTResultPanel from "./BSTResultPanel";



const AlgorithmPage = () => {
  // Array states
  const [array, setArray] = useState([5, 2, 8, 1, 4, 3, 6, 7]);
  const [algorithmData, setAlgorithmData] = useState({
    steps: [],
    pseudocode: [],
    explanations: [],
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [aiExplanation, setAiExplanation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [comparisonResults, setComparisonResults] = useState([]);

  // Array operation states
  const [arrayOperation, setArrayOperation] = useState("traverse");
  const [arrayValue, setArrayValue] = useState("");
  const [arrayPosition, setArrayPosition] = useState("");
  const [arrayDirection, setArrayDirection] = useState("left");
  const [arrayPositions, setArrayPositions] = useState(1);

  // Add to states (around line 50-60)
  const [stringOperation, setStringOperation] = useState("reverse");
  const [stringInput, setStringInput] = useState("hello");
  const [stringPattern, setStringPattern] = useState("ll");
  const [stringSecondInput, setStringSecondInput] = useState("world");
  const [showResultPanel, setShowResultPanel] = useState(false);
  const [stringResult, setStringResult] = useState(null);
  const [stringComplexity, setStringComplexity] = useState(null);
  const [stringOptimizationTips, setStringOptimizationTips] = useState([]);
  const [stringRealWorldUseCases, setStringRealWorldUseCases] = useState([]);
  const [stringCodeSnippets, setStringCodeSnippets] = useState({});

  // Data structure states
  const [bstTree, setBstTree] = useState(null);
  const [bstValue, setBstValue] = useState("");
  const [bstOperation, setBstOperation] = useState("insert");
  const [showBSTResultPanel, setShowBSTResultPanel] = useState(false);
  const [bstOperationResult, setBstOperationResult] = useState(null);

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
  const [heapBulkValues, setHeapBulkValues] = useState("");

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
  const [dpAnimationSpeed, setDpAnimationSpeed] = useState(800); // Slower default speed (800ms)

  const [showSortingResultPanel, setShowSortingResultPanel] = useState(false);
  const [sortedArray, setSortedArray] = useState(null);


  const { category } = useParams();
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("");
  // const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const animationInterval = useRef(null);

  // const { isDarkMode } = useTheme();


  // const BASE_URL = "http://localhost:5000/api";
  const BASE_URL = "https://dsa-visualization-j0uo.onrender.com/api";


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
  // const handleSelectAlgorithm = (algorithmId) => {
  //   setSelectedAlgorithm(algorithmId);
  //   resetAnimation();
  //   setIsSidebarOpen(false);
  // };

  // Toggle sidebar
  // const toggleSidebar = () => {
  //   setIsSidebarOpen(!isSidebarOpen);
  // };

  // Fetch algorithm steps
  // In AlgorithmPage.jsx, update the fetchAlgorithmSteps function for the trees category:

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
        // Store the final sorted array from the last step
        if (response.data.steps && response.data.steps.length > 0) {
          const lastStep = response.data.steps[response.data.steps.length - 1];
          setSortedArray(lastStep.array);
        }
        setShowSortingResultPanel(false); // Reset result panel visibility
      } else if (category === "trees") {
        let operation = selectedAlgorithm === "avl-tree" ? "avlInsert" : bstOperation;
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
              setIsLoading(false);
              return;
            }

            // Set operation to bulk-insert for the API call
            operation = "bulk-insert";
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
            setIsLoading(false);
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
            setIsLoading(false);
            return;
          }
        }

        console.log(`Sending BST request: operation=${operation}, value=`, valueToSend);

        response = await axios.post(`${BASE_URL}/bst/${operation}`, {
          value: valueToSend,
          treeState: bstTree,
          options: options,
        });

        console.log('BST API Response:', response.data);

        // CRITICAL FIX: Update bstTree with the new tree from response
        setBstTree(response.data.tree);

        // Also update algorithmData with the steps
        setAlgorithmData({
          steps: response.data.steps || [],
          pseudocode: response.data.pseudocode || [],
          explanations: response.data.explanations || []
        });

        // Store result info for BST result panel
        setBstOperationResult({
          operation: bstOperation,
          value: bstOperation === "bulk-insert" ? valueToSend : (valueToSend !== undefined ? valueToSend : null),
          found: response.data.steps?.some(s => s.action === 'found'),
          tree: response.data.tree
        });

        // Reset to first step
        setCurrentStep(0);
        setIsPlaying(false);
        setShowBSTResultPanel(false);

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

        setIsLoading(false);
        return;

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
          setIsLoading(false);
          return;
        }

        // For other operations, use the normal flow
        let valueToSend = null;
        if (listOperation !== "traverse") {
          valueToSend = parseInt(listValue);
          if (isNaN(valueToSend)) {
            toast.error("❌ Please enter a valid number", {
              position: "top-right",
              autoClose: 3000,
            });
            setIsLoading(false);
            return;
          }
        }

        console.log(`Sending ${listOperation} request with value:`, valueToSend);

        response = await axios.post(`${BASE_URL}/linkedList/${listOperation}`, {
          value: valueToSend,
          listState: linkedList,
        });

        console.log('Linked List API Response:', response.data);

        // Update the linked list state
        setLinkedList(response.data.list);

        // Ensure steps array exists
        let steps = Array.isArray(response.data.steps) ? response.data.steps : [];
        const explanations = Array.isArray(response.data.explanations) ? response.data.explanations : [];
        const pseudocode = Array.isArray(response.data.pseudocode) ? response.data.pseudocode :
          ['1. start at head', '2. visit each node until end'];

        // Convert linked list to nodes array for visualization
        const convertToList = (head) => {
          if (!head) return [];
          const result = [];
          let current = head;
          while (current) {
            result.push({
              value: current.value,
              visited: false
            });
            current = current.next;
          }
          return result;
        };

        const nodes = convertToList(response.data.list);

        // If steps is empty but we have a list, create steps
        if (steps.length === 0 && nodes.length > 0) {
          if (listOperation === "traverse") {
            // Create traverse steps
            const path = [];
            for (let i = 0; i < nodes.length; i++) {
              path.push(nodes[i].value);
              steps.push({
                nodes: nodes.map((node, idx) => ({
                  ...node,
                  isCurrent: idx === i,
                  visited: idx <= i
                })),
                currentNode: nodes[i].value,
                path: [...path],
                action: i === 0 ? 'traverse-start' : (i === nodes.length - 1 ? 'traverse-complete' : 'traverse'),
                message: i === 0
                  ? `Step ${i + 1}: Starting traversal from head node with value ${nodes[i].value}`
                  : i === nodes.length - 1
                    ? `Step ${i + 1}: Reached end node with value ${nodes[i].value}`
                    : `Step ${i + 1}: Visiting node ${i} with value ${nodes[i].value}`
              });
            }

            // Add final summary
            steps.push({
              nodes: nodes.map(node => ({ ...node, visited: true })),
              currentNode: null,
              path: path,
              action: 'traverse-complete',
              message: `Traversal complete. Path: ${path.join(' → ')}`
            });

            console.log('Created traverse steps:', steps);
          } else if (listOperation === "delete") {
            // Create delete step
            steps.push({
              nodes: nodes,
              currentNode: null,
              action: 'delete',
              message: `Successfully deleted value ${valueToSend}`
            });
          }
        }

        // Make sure each step has nodes
        steps = steps.map(step => ({
          ...step,
          nodes: step.nodes || nodes
        }));

        console.log('Final processed steps:', steps);

        setAlgorithmData({
          steps: steps,
          explanations: explanations.length > 0 ? explanations : steps.map(s => s.message),
          pseudocode: pseudocode,
          list: response.data.list,
          currentList: response.data.list
        });

        setCurrentStep(0);
        setIsPlaying(false);

        // Success toast for linked list operations
        if (listOperation === "traverse") {
          toast.success(`🔗 Linked list traversal completed - Visited ${nodes.length} nodes`, {
            position: "top-right",
            autoClose: 3000,
          });
        } else if (listOperation === "search") {
          const found = steps.some(step => step.action === 'search-found');
          if (found) {
            toast.success(`✅ Value ${valueToSend} found in the list!`, {
              position: "top-right",
              autoClose: 3000,
            });
          } else {
            toast.warning(`❌ Value ${valueToSend} not found in the list`, {
              position: "top-right",
              autoClose: 3000,
            });
          }
        } else if (listOperation === "delete") {
          toast.success(`✅ Successfully deleted value ${valueToSend}`, {
            position: "top-right",
            autoClose: 3000,
          });
        } else {
          toast.success(`✅ ${listOperation} operation successful`, {
            position: "top-right",
            autoClose: 3000,
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

      } else if (category === "strings") {
        let requestBody = {};

        switch (selectedAlgorithm) {
          case "reverse":
            requestBody = { value: stringInput, stringState: stringInput };
            break;
          case "checkPalindrome":
            requestBody = { value: stringInput, stringState: stringInput };
            break;
          case "kmpSearch":
          case "rabinKarpSearch":
            requestBody = { pattern: stringPattern, stringState: stringInput };
            break;
          case "longestCommonSubstring":
            requestBody = { str2: stringSecondInput, stringState: stringInput };
            break;
          case "checkAnagram":
            requestBody = { str2: stringSecondInput, stringState: stringInput };
            break;
          default:
            requestBody = { value: stringInput, stringState: stringInput };
        }

        const loadingToast = toast.loading(`🔄 Running ${selectedAlgorithm.replace(/-/g, ' ')}...`, {
          position: "top-right",
        });

        response = await axios.post(`${BASE_URL}/string/${selectedAlgorithm}`, requestBody);

        toast.dismiss(loadingToast);

        // CRITICAL FIX: Set steps and reset to step 0
        setAlgorithmData({
          steps: response.data.steps || [],
          pseudocode: response.data.pseudocode || [],
          explanations: response.data.explanations || []
        });

        // Store result data for Result Panel
        setStringResult(response.data.result);
        setStringComplexity(response.data.complexity);
        setStringOptimizationTips(response.data.optimizationTips || []);
        setStringRealWorldUseCases(response.data.realWorldUseCases || []);
        setStringCodeSnippets(response.data.codeSnippets || {});

        // CRITICAL: Reset to first step, NOT the last step
        setCurrentStep(0);
        setIsPlaying(false);  // Don't auto-play
        setShowResultPanel(false);  // Hide result panel until animation completes

        toast.success(`✅ String ${selectedAlgorithm.replace(/-/g, ' ')} loaded! Click Play to start animation.`, {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
      }
      else if (category === "greedy") {
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
        } else if (selectedAlgorithm === "job-scheduling") {
          response = await axios.post(`${BASE_URL}/greedy/job-scheduling`, {
            jobs: jobs,
          });
          toast.success("📋 Job scheduling optimized", {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
          });
        } else if (selectedAlgorithm === "huffman-encoding") {
          response = await axios.post(`${BASE_URL}/greedy/huffman-encoding`, {
            text: huffmanText,
          });
          toast.success("🔤 Huffman encoding completed", {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
          });
        } else if (selectedAlgorithm === "coin-change-greedy") {
          response = await axios.post(`${BASE_URL}/greedy/coin-change`, {
            coins: coins,
            amount: coinAmount,
          });
          toast.success("💰 Coin change greedy solution found", {
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
        // ============================================
        // COMPLETE DYNAMIC PROGRAMMING IMPLEMENTATION
        // ============================================

        let requestBody = {};
        let algorithmDisplayName = "";

        try {
          // Prepare request body based on selected algorithm
          switch (selectedAlgorithm) {
            case "fibonacci":
              if (fibonacciN === undefined || fibonacciN === null || fibonacciN < 0) {
                toast.warning("🔢 Please enter a valid non-negative number for Fibonacci", {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  theme: "colored",
                });
                setIsLoading(false);
                return;
              }
              requestBody = { n: parseInt(fibonacciN) };
              algorithmDisplayName = `Fibonacci (n=${fibonacciN})`;
              break;

            case "knapsack-dp":
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
                setIsLoading(false);
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
                setIsLoading(false);
                return;
              }
              requestBody = {
                items: dpKnapsackItems.map(item => ({
                  name: item.name,
                  value: parseInt(item.value),
                  weight: parseInt(item.weight)
                })),
                capacity: parseInt(dpKnapsackCapacity)
              };
              algorithmDisplayName = `0/1 Knapsack (Capacity=${dpKnapsackCapacity})`;
              break;

            case "longest-common-subsequence":
              if (!lcsStr1 || !lcsStr2) {
                toast.warning("📝 Please enter both strings for LCS", {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  theme: "colored",
                });
                setIsLoading(false);
                return;
              }
              requestBody = {
                str1: lcsStr1,
                str2: lcsStr2
              };
              algorithmDisplayName = `LCS ("${lcsStr1}" vs "${lcsStr2}")`;
              break;

            case "coin-change-dp":
              if (!dpCoins || dpCoins.length === 0) {
                toast.warning("💰 Please enter coin denominations", {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  theme: "colored",
                });
                setIsLoading(false);
                return;
              }
              if (dpCoinAmount === undefined || dpCoinAmount < 0) {
                toast.warning("🎯 Please enter a valid amount for Coin Change", {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  theme: "colored",
                });
                setIsLoading(false);
                return;
              }
              requestBody = {
                coins: dpCoins.map(c => parseInt(c)),
                amount: parseInt(dpCoinAmount)
              };
              algorithmDisplayName = `Coin Change (Amount=${dpCoinAmount})`;
              break;

            case "edit-distance":
              if (!editStr1 || !editStr2) {
                toast.warning("✏️ Please enter both strings for Edit Distance", {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  theme: "colored",
                });
                setIsLoading(false);
                return;
              }
              requestBody = {
                str1: editStr1,
                str2: editStr2
              };
              algorithmDisplayName = `Edit Distance ("${editStr1}" → "${editStr2}")`;
              break;

            case "matrix-chain-multiplication":
              if (!matrixDimensions || matrixDimensions.length < 2) {
                toast.warning("🔢 Please enter valid matrix dimensions", {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  theme: "colored",
                });
                setIsLoading(false);
                return;
              }
              requestBody = {
                dimensions: matrixDimensions.map(d => parseInt(d))
              };
              algorithmDisplayName = `Matrix Chain (${matrixDimensions.length - 1} matrices)`;
              break;

            default:
              toast.warning("❓ Unknown DP algorithm selected", {
                position: "top-right",
                autoClose: 5000,
                theme: "colored",
              });
              setIsLoading(false);
              return;
          }

          // Show loading toast
          const loadingToast = toast.loading(`🧠 Computing ${selectedAlgorithm.replace(/-/g, ' ')}...`, {
            position: "top-right",
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
          });

          // Make API call
          response = await axios.post(`${BASE_URL}/dp/${selectedAlgorithm}`, requestBody);

          // Dismiss loading toast
          toast.dismiss(loadingToast);

          // Validate response
          if (!response.data) {
            throw new Error("No data received from server");
          }

          // Set algorithm data with all DP-specific fields
          setAlgorithmData({
            steps: response.data.steps || [],
            pseudocode: response.data.pseudocode || [],
            explanations: response.data.explanations || [],
            finalResult: response.data.finalResult || null,
            complexity: response.data.complexity || null,
            patternInsight: response.data.patternInsight || null,
            currentStepData: response.data.steps?.[0] || null
          });

          // Reset animation state
          setCurrentStep(0);
          setIsPlaying(false);

          // Success toast with detailed message
          let successMessage = "";
          if (response.data.finalResult) {
            if (selectedAlgorithm === "fibonacci") {
              successMessage = `🎯 fib(${fibonacciN}) = ${response.data.finalResult.value}`;
            } else if (selectedAlgorithm === "knapsack-dp") {
              successMessage = `💼 Maximum value: ${response.data.finalResult.value}`;
            } else if (selectedAlgorithm === "longest-common-subsequence") {
              successMessage = `📝 LCS length: ${response.data.finalResult.length}`;
            } else if (selectedAlgorithm === "coin-change-dp") {
              successMessage = response.data.finalResult.minCoins !== -1
                ? `💰 Minimum coins: ${response.data.finalResult.minCoins}`
                : `💰 Cannot make amount ${dpCoinAmount}`;
            } else if (selectedAlgorithm === "edit-distance") {
              successMessage = `✏️ Edit distance: ${response.data.finalResult.distance}`;
            } else if (selectedAlgorithm === "matrix-chain-multiplication") {
              successMessage = `🔢 Minimum operations: ${response.data.finalResult.minOperations}`;
            } else {
              successMessage = `${selectedAlgorithm.replace(/-/g, ' ')} completed successfully`;
            }
          } else {
            successMessage = `🧠 ${selectedAlgorithm.replace(/-/g, ' ')} executed successfully`;
          }

          toast.success(successMessage, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
          });

          // Log for debugging
          console.log(`DP Algorithm ${selectedAlgorithm} completed:`, {
            stepsCount: response.data.steps?.length || 0,
            hasFinalResult: !!response.data.finalResult,
            hasComplexity: !!response.data.complexity
          });

        } catch (error) {
          console.error("DP Algorithm error:", error);
          toast.dismiss();
          toast.error(`❌ ${error.response?.data?.error || error.message || "Error executing DP algorithm"}`, {
            position: "top-right",
            autoClose: 6000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
          });

          // Set error state
          setAlgorithmData({
            steps: [],
            pseudocode: [],
            explanations: [],
            finalResult: null,
            complexity: null,
            patternInsight: null
          });
          setAiExplanation(error.response?.data?.error || "Error loading algorithm steps. Please check inputs.");
        }

        // For non-tree operations, update algorithm data
        if (category !== "trees") {
          setAlgorithmData(prev => ({
            ...prev,
            steps: response?.data?.steps || prev.steps || [],
            pseudocode: response?.data?.pseudocode || prev.pseudocode || [],
            explanations: response?.data?.explanations || prev.explanations || []
          }));
          setCurrentStep(0);
          setIsPlaying(false);
        }

      } // End of dynamic-programming category

      // For non-tree operations, update algorithm data
      if (category !== "trees" && category !== "dynamic-programming") {
        setAlgorithmData(response.data);
        setCurrentStep(0);
        setIsPlaying(false);
      }

    } catch (error) {
      console.error("Error fetching algorithm steps:", error);
      setAlgorithmData({ steps: [], pseudocode: [], explanations: [] });
      setAiExplanation(
        error.response?.data?.error ||
        "Error loading algorithm steps. Please check inputs."
      );
      toast.error(`❌ ${error.response?.data?.error || "Error performing operation"}`, {
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


  // In AlgorithmPage.jsx, update the animation control useEffect:

  // Animation control with null checks
  useEffect(() => {
    // Clear any existing interval
    if (animationInterval.current) {
      clearInterval(animationInterval.current);
      animationInterval.current = null;
    }

    // Don't animate if no steps or at the end
    if (!algorithmData?.steps ||
      !Array.isArray(algorithmData.steps) ||
      algorithmData.steps.length === 0) {
      return;
    }

    const animationSpeed = speed;

    if (isPlaying) {
      // Check if we're at the last step
      if (currentStep >= algorithmData.steps.length - 1) {
        setIsPlaying(false);
        // Show result panel for sorting when animation completes
        if (category === "sorting") {
          setShowSortingResultPanel(true);
          toast.info("✅ Sorting complete! Check the results below.", {
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
          });
        }
        // Show result panel for strings when animation completes
        if (category === "strings") {
          setShowResultPanel(true);
          toast.info("✅ Animation complete! Check the results below.", {
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
          });
        }

        if (category === "trees") {
          setShowBSTResultPanel(true);
          toast.info("🌳 BST operation complete! Check the results below.", {
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
          });
        }

        return;
      }

      // Set up interval to advance steps
      animationInterval.current = setInterval(() => {
        setCurrentStep(prev => {
          const nextStep = prev + 1;

          // Check if we've reached the end
          if (nextStep >= algorithmData.steps.length) {
            setIsPlaying(false);
            if (category === "sorting") {
              setShowSortingResultPanel(true);
            }
            if (category === "strings") {
              setShowResultPanel(true);
            }
            return prev;
          }

          return nextStep;
        });
      }, animationSpeed);
    }

    // Cleanup interval on unmount or when isPlaying changes
    return () => {
      if (animationInterval.current) {
        clearInterval(animationInterval.current);
        animationInterval.current = null;
      }
    };
  }, [isPlaying, currentStep, speed, algorithmData?.steps?.length, category]);// Remove steps.length from dependencies, use algorithmData instead




  // Step explanation
  // Step explanation with comprehensive null checks
  useEffect(() => {
    if (algorithmData?.steps &&
      Array.isArray(algorithmData.steps) &&
      algorithmData.steps.length > 0 &&
      currentStep >= 0 &&
      currentStep < algorithmData.steps.length) {

      const step = algorithmData.steps[currentStep];
      const explanation = algorithmData.explanations &&
        Array.isArray(algorithmData.explanations) &&
        algorithmData.explanations[currentStep]
        ? algorithmData.explanations[currentStep]
        : step?.message || `Step ${currentStep + 1}: ${step?.action || "Processing..."}`;

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
    if (currentStep < algorithmData.steps.length - 1) {
      setCurrentStep(currentStep + 1);
      // If we reach the end, show result panel
      if (currentStep + 1 === algorithmData.steps.length - 1 && category === "strings") {
        setShowResultPanel(true);
      }
    }
  };

  const handleStepBackward = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      // Hide result panel when going back
      if (category === "strings") {
        setShowResultPanel(false);
      }
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const resetAnimation = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    if (category === "strings") {
      setShowResultPanel(false);
    }
    if (category === "sorting") {
      setShowSortingResultPanel(false);
    }
    if (category === "trees") {
      setShowBSTResultPanel(false);
    }
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


  const handleStringOperation = () => {
    if (!stringInput) {
      toast.warning("📝 Please enter a string", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
      return;
    }

    if ((selectedAlgorithm === "kmpSearch" || selectedAlgorithm === "rabinKarpSearch") && !stringPattern) {
      toast.warning("🔍 Please enter a pattern to search", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
      return;
    }

    if ((selectedAlgorithm === "longestCommonSubstring" || selectedAlgorithm === "checkAnagram") && !stringSecondInput) {
      toast.warning("📝 Please enter a second string", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
      return;
    }

    fetchAlgorithmSteps();
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

  // In AlgorithmPage.jsx - Fix the handleHeapOperation function for heap

  const handleHeapOperation = async () => {
    // Validate based on operation
    if (heapOperation === "insert") {
      if (!heapValue || heapValue === "") {
        toast.warning("📚 Please enter a value to insert", {
          position: "top-right",
          autoClose: 5000,
          theme: "colored",
        });
        return;
      }
      const numValue = parseInt(heapValue);
      if (isNaN(numValue)) {
        toast.error("❌ Please enter a valid number", {
          position: "top-right",
          autoClose: 5000,
          theme: "colored",
        });
        return;
      }
    }

    if (heapOperation === "bulk-insert") {
      // Get the value from either heapBulkValues or heapValue (depending on which input is used)
      let bulkInput = heapBulkValues || heapValue;

      if (!bulkInput || bulkInput.trim() === "") {
        toast.warning("📚 Please enter values for bulk insertion", {
          position: "top-right",
          autoClose: 5000,
          theme: "colored",
        });
        return;
      }

      // Parse comma-separated values - handle different separators
      let values;
      if (bulkInput.includes(',')) {
        values = bulkInput
          .split(",")
          .map(v => {
            const trimmed = v.trim();
            return trimmed === '' ? NaN : parseInt(trimmed);
          })
          .filter(v => !isNaN(v));
      } else {
        // If single value, treat as array with one element
        const num = parseInt(bulkInput);
        values = isNaN(num) ? [] : [num];
      }

      if (values.length === 0) {
        toast.error("❌ Please enter valid numbers separated by commas (e.g., 1,2,3,4,5)", {
          position: "top-right",
          autoClose: 5000,
          theme: "colored",
        });
        return;
      }

      console.log("Bulk insert values:", values);

      setIsLoading(true);
      try {
        const isMinHeap = selectedAlgorithm === "min-heap";
        const response = await axios.post(`${BASE_URL}/heap/bulk-insert`, {
          value: values,
          heapState: heap,
          isMinHeap: isMinHeap,
        });

        console.log("Bulk insert response:", response.data);

        setHeap(response.data.heap);
        setAlgorithmData({
          steps: response.data.steps || [],
          pseudocode: response.data.pseudocode || [],
          explanations: response.data.explanations || [],
          stats: response.data.stats,
          result: response.data.result,
        });
        setCurrentStep(0);
        setIsPlaying(false);

        toast.success(`✅ Successfully inserted ${values.length} values: [${values.join(', ')}] into the ${isMinHeap ? 'min' : 'max'} heap`, {
          position: "top-right",
          autoClose: 4000,
          theme: "colored",
        });

        // Clear input after successful insertion
        setHeapBulkValues("");
        setHeapValue("");

      } catch (error) {
        console.error("Bulk insert error:", error);
        toast.error(`❌ ${error.response?.data?.error || "Error performing bulk insert"}`, {
          position: "top-right",
          autoClose: 5000,
          theme: "colored",
        });
      } finally {
        setIsLoading(false);
      }
      return;
    }

    if (heapOperation === "delete") {
      if (!heapValue || heapValue === "") {
        toast.warning("📚 Please enter a value to delete", {
          position: "top-right",
          autoClose: 5000,
          theme: "colored",
        });
        return;
      }
      const numValue = parseInt(heapValue);
      if (isNaN(numValue)) {
        toast.error("❌ Please enter a valid number", {
          position: "top-right",
          autoClose: 5000,
          theme: "colored",
        });
        return;
      }
    }

    if (heapOperation === "extract" && (!heap || heap.length === 0)) {
      toast.warning("📚 Heap is empty. Nothing to extract.", {
        position: "top-right",
        autoClose: 5000,
        theme: "colored",
      });
      return;
    }

    if (heapOperation === "heapify") {
      let heapifyInput = heapValue;

      if (!heapifyInput || heapifyInput.trim() === "") {
        toast.warning("📚 Please enter an array to heapify", {
          position: "top-right",
          autoClose: 5000,
          theme: "colored",
        });
        return;
      }

      // Parse comma-separated values for heapify
      let values;
      if (heapifyInput.includes(',')) {
        values = heapifyInput
          .split(",")
          .map(v => {
            const trimmed = v.trim();
            return trimmed === '' ? NaN : parseInt(trimmed);
          })
          .filter(v => !isNaN(v));
      } else {
        const num = parseInt(heapifyInput);
        values = isNaN(num) ? [] : [num];
      }

      if (values.length === 0) {
        toast.error("❌ Please enter valid numbers separated by commas (e.g., 5,3,8,1,4)", {
          position: "top-right",
          autoClose: 5000,
          theme: "colored",
        });
        return;
      }

      setIsLoading(true);
      try {
        const isMinHeap = selectedAlgorithm === "min-heap";
        const response = await axios.post(`${BASE_URL}/heap/heapify`, {
          value: values,
          heapState: null,
          isMinHeap: isMinHeap,
        });

        setHeap(response.data.heap);
        setAlgorithmData({
          steps: response.data.steps || [],
          pseudocode: response.data.pseudocode || [],
          explanations: response.data.explanations || [],
          stats: response.data.stats,
          result: response.data.result,
        });
        setCurrentStep(0);
        setIsPlaying(false);

        toast.success(`✅ Successfully heapified array into ${isMinHeap ? 'min' : 'max'} heap`, {
          position: "top-right",
          autoClose: 4000,
          theme: "colored",
        });

        setHeapValue("");

      } catch (error) {
        console.error("Heapify error:", error);
        toast.error(`❌ ${error.response?.data?.error || "Error performing heapify"}`, {
          position: "top-right",
          autoClose: 5000,
          theme: "colored",
        });
      } finally {
        setIsLoading(false);
      }
      return;
    }

    // Regular fetch for other operations (insert, delete, extract)
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
    // Validate based on selected algorithm
    switch (selectedAlgorithm) {
      case "fibonacci":
        if (fibonacciN === undefined || fibonacciN === null || fibonacciN < 0) {
          toast.warning("🔢 Please enter a valid non-negative number for Fibonacci", {
            position: "top-right",
            autoClose: 5000,
            theme: "colored",
          });
          return;
        }
        if (fibonacciN > 40) {
          toast.warning("⚠️ For better performance, please use n ≤ 40", {
            position: "top-right",
            autoClose: 5000,
            theme: "colored",
          });
        }
        break;

      case "knapsack-dp":
        if (!dpKnapsackItems || dpKnapsackItems.length === 0) {
          toast.warning("💼 Please add items for 0/1 Knapsack", {
            position: "top-right",
            autoClose: 5000,
            theme: "colored",
          });
          return;
        }
        if (!dpKnapsackCapacity || dpKnapsackCapacity <= 0) {
          toast.warning("⚖️ Please enter a valid capacity for 0/1 Knapsack", {
            position: "top-right",
            autoClose: 5000,
            theme: "colored",
          });
          return;
        }
        // Validate items have positive values
        for (const item of dpKnapsackItems) {
          if (item.value <= 0 || item.weight <= 0) {
            toast.warning("⚠️ Items must have positive value and weight", {
              position: "top-right",
              autoClose: 5000,
              theme: "colored",
            });
            return;
          }
        }
        break;

      case "longest-common-subsequence":
        if (!lcsStr1 || !lcsStr2) {
          toast.warning("📝 Please enter both strings for LCS", {
            position: "top-right",
            autoClose: 5000,
            theme: "colored",
          });
          return;
        }
        if (lcsStr1.length > 20 || lcsStr2.length > 20) {
          toast.info("📏 For better visualization, keep strings under 20 characters", {
            position: "top-right",
            autoClose: 4000,
            theme: "colored",
          });
        }
        break;

      case "coin-change-dp":
        if (!dpCoins || dpCoins.length === 0) {
          toast.warning("💰 Please enter coin denominations", {
            position: "top-right",
            autoClose: 5000,
            theme: "colored",
          });
          return;
        }
        if (dpCoinAmount === undefined || dpCoinAmount < 0) {
          toast.warning("🎯 Please enter a valid amount for Coin Change", {
            position: "top-right",
            autoClose: 5000,
            theme: "colored",
          });
          return;
        }
        // Validate coins are positive
        for (const coin of dpCoins) {
          if (coin <= 0) {
            toast.warning("💰 Coin denominations must be positive numbers", {
              position: "top-right",
              autoClose: 5000,
              theme: "colored",
            });
            return;
          }
        }
        break;

      case "edit-distance":
        if (!editStr1 || !editStr2) {
          toast.warning("✏️ Please enter both strings for Edit Distance", {
            position: "top-right",
            autoClose: 5000,
            theme: "colored",
          });
          return;
        }
        if (editStr1.length > 15 || editStr2.length > 15) {
          toast.info("📏 For better visualization, keep strings under 15 characters", {
            position: "top-right",
            autoClose: 4000,
            theme: "colored",
          });
        }
        break;

      case "matrix-chain-multiplication":
        if (!matrixDimensions || matrixDimensions.length < 2) {
          toast.warning("🔢 Please enter valid matrix dimensions", {
            position: "top-right",
            autoClose: 5000,
            theme: "colored",
          });
          return;
        }
        if (matrixDimensions.length > 8) {
          toast.info("📊 For better visualization, use up to 6 matrices", {
            position: "top-right",
            autoClose: 4000,
            theme: "colored",
          });
        }
        // Validate dimensions are positive
        for (const dim of matrixDimensions) {
          if (dim <= 0) {
            toast.warning("📐 Matrix dimensions must be positive numbers", {
              position: "top-right",
              autoClose: 5000,
              theme: "colored",
            });
            return;
          }
        }
        break;

      default:
        toast.warning("❓ Please select a valid DP algorithm", {
          position: "top-right",
          autoClose: 5000,
          theme: "colored",
        });
        return;
    }

    // Proceed with algorithm execution
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
  // In AlgorithmPage.jsx, update the getVisualizationComponent function:

  const getVisualizationComponent = () => {
    const normalizedCategory =
      category === "arrays" ? "array-operations" : category;

    // Safely get current step data with multiple null checks
    let currentStepData = { array: array, currentIndex: -1 };

    if (algorithmData?.steps &&
      Array.isArray(algorithmData.steps) &&
      algorithmData.steps.length > 0 &&
      currentStep >= 0 &&
      currentStep < algorithmData.steps.length) {
      currentStepData = algorithmData.steps[currentStep] || currentStepData;

      // For linked list, ensure we have nodes
      if (normalizedCategory === "linked-list") {
        console.log('Linked List step data before processing:', currentStepData);

        // If step doesn't have nodes but we have a list in algorithmData, create nodes
        if (!currentStepData.nodes && algorithmData.list) {
          const convertToList = (head) => {
            const result = [];
            let current = head;
            while (current) {
              result.push({
                value: current.value,
                visited: false
              });
              current = current.next;
            }
            return result;
          };

          const nodes = convertToList(algorithmData.list);
          currentStepData.nodes = nodes;
          console.log('Created nodes from list:', nodes);
        }

        // If step has path but no currentNode, set it from path
        if (currentStepData.path && currentStepData.path.length > 0 && !currentStepData.currentNode) {
          currentStepData.currentNode = currentStepData.path[currentStepData.path.length - 1];
        }
      }
    } else if (normalizedCategory === "linked-list" && algorithmData?.list) {
      // If no steps but we have a list, create a default step
      const convertToList = (head) => {
        const result = [];
        let current = head;
        while (current) {
          result.push({ value: current.value });
          current = current.next;
        }
        return result;
      };

      const nodes = convertToList(algorithmData.list);
      currentStepData = {
        nodes: nodes,
        currentNode: null,
        action: 'idle',
        message: 'List ready for operations'
      };
      console.log('Created default step from list:', currentStepData);
    }

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
            <LineChart
              array={currentStepData?.array || array}
            />
          </div>
        );

      case "trees":
        return (
          <BSTViewer
            step={currentStepData}
            algorithm={selectedAlgorithm}
          />
        );

      case "graphs":
        return (
          <GraphViewer
            step={currentStepData}
            algorithm={selectedAlgorithm}
          />
        );

      case "linked-list":
        console.log('Rendering LinkedListViewer with step:', currentStepData);
        return (
          <LinkedListViewer
            step={currentStepData}
          />
        );

      case "strings":
        return (
          <StringVisualizer
            step={currentStepData}
            operation={selectedAlgorithm}
            initialString={stringInput}
            initialPattern={stringPattern}
          />
        );

      case "heap":
        return (
          <>
            <HeapViewer step={currentStepData} />
            {/* Show results after animation completes */}
            {algorithmData?.steps &&
              Array.isArray(algorithmData.steps) &&
              algorithmData.steps.length > 0 &&
              currentStep === algorithmData.steps.length - 1 &&
              algorithmData.stats && (
                <HeapResultPanel
                  result={algorithmData.result}
                  operation={heapOperation}
                  heap={heap}
                  steps={algorithmData.steps}
                />
              )}
          </>
        );

      case "trie":
        return (
          <TrieViewer
            step={currentStepData}
          />
        );

      case "stack":
        return (
          <StackVisualizer
            step={currentStepData}
          />
        );

      case "queue":
        return (
          <QueueVisualizer
            step={currentStepData}
          />
        );

      case "backtracking":
        return (
          <BacktrackingViewer
            step={currentStepData}
            algorithm={selectedAlgorithm}
          />
        );

      case "greedy":
        return (
          <GreedyViewer
            step={currentStepData}
            algorithm={selectedAlgorithm}
          />
        );

      case "dynamic-programming":
        return (
          <DynamicProgrammingViewer
            step={currentStepData}
            algorithm={selectedAlgorithm}
            onStepChange={setCurrentStep}
            totalSteps={algorithmData?.steps?.length || 0}
            currentStepIndex={currentStep}
          />
        );

      default:
        return <div className="no-algorithm-selected">Select an algorithm to visualize</div>;
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
      case "strings":
        handleStringOperation();
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
          <div className="sorting-controls-wrapper">
            <div className="sorting-controls-row">
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

              {/* Custom Array Input Field - Positioned to the left of Run button */}
              <div className="custom-array-input-sorting">
                <input
                  type="text"
                  id="custom-sorting-array"
                  placeholder="e.g., 5,2,8,1,4"
                  className="custom-array-field"
                />
                <button
                  onClick={() => {
                    const input = document.getElementById('custom-sorting-array');
                    if (input && input.value.trim()) {
                      handleCustomArray(input.value);
                      input.value = ''; // Clear after applying
                    }
                  }}
                  className="apply-array-btn"
                >
                  Apply
                </button>
              </div>

              <button onClick={fetchAlgorithmSteps} disabled={isLoading} className="run-sorting-btn">
                Run Algorithm
              </button>
            </div>
          </div>
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
          <div className="heap-controls">
            <select
              value={selectedAlgorithm}
              onChange={(e) => {
                setSelectedAlgorithm(e.target.value);
                setHeap([]);
                setAlgorithmData({ steps: [], pseudocode: [], explanations: [] });
                setCurrentStep(0);
              }}
              className="heap-select"
            >
              <option value="min-heap">Min Heap</option>
              <option value="max-heap">Max Heap</option>
            </select>

            <select
              value={heapOperation}
              onChange={(e) => {
                setHeapOperation(e.target.value);
                setHeapValue("");
                setHeapBulkValues("");
              }}
              className="heap-operation-select"
            >
              <option value="insert">Insert Single</option>
              <option value="bulk-insert">Bulk Insert (Multiple Values)</option>
              <option value="delete">Delete Value</option>
              <option value="extract">Extract {selectedAlgorithm === 'min-heap' ? 'Min' : 'Max'}</option>
              <option value="heapify">Heapify from Array</option>
            </select>

            {heapOperation === "insert" && (
              <input
                type="number"
                value={heapValue}
                onChange={(e) => setHeapValue(e.target.value)}
                placeholder="Enter value to insert"
                className="heap-input"
              />
            )}

            {heapOperation === "bulk-insert" && (
              <input
                type="text"
                value={heapBulkValues}
                onChange={(e) => setHeapBulkValues(e.target.value)}
                placeholder="Enter values (comma separated: 5,3,8,1,4)"
                className="heap-input bulk-input"
              />
            )}

            {heapOperation === "delete" && (
              <input
                type="number"
                value={heapValue}
                onChange={(e) => setHeapValue(e.target.value)}
                placeholder="Enter value to delete"
                className="heap-input"
              />
            )}

            {heapOperation === "heapify" && (
              <input
                type="text"
                value={heapValue}
                onChange={(e) => setHeapValue(e.target.value)}
                placeholder="Enter array (comma separated: 5,3,8,1,4)"
                className="heap-input heapify-input"
              />
            )}

            {/* BUTTON GROUP - Only one set of buttons */}
            <div className="heap-button-group">
              <button
                onClick={handleHeapOperation}
                disabled={isLoading}
                className="run-algorithm-btn"
              >
                {isLoading ? "⏳ Running..." : `▶️ Run ${heapOperation === 'bulk-insert' ? 'Bulk Insert' : heapOperation}`}
              </button>

              <button
                onClick={() => {
                  setHeap([]);
                  setAlgorithmData({ steps: [], pseudocode: [], explanations: [], stats: null, result: null });
                  setCurrentStep(0);
                  setIsPlaying(false);
                  setHeapValue("");
                  setHeapBulkValues("");
                  toast.info("🔄 Heap has been reset", {
                    position: "top-right",
                    autoClose: 2000,
                    theme: "colored"
                  });
                }}
                className="reset-btn"
              >
                🔄 Reset Heap
              </button>
            </div>

            {/* Example hint for bulk insert */}
            {heapOperation === "bulk-insert" && (
              <div className="heap-hint">
                💡 Example: "1,2,3,4,5,6,7,8" will insert all these values at once
              </div>
            )}

            {heapOperation === "heapify" && (
              <div className="heap-hint">
                💡 Example: "5,3,8,1,4,7,2" will convert this array into a valid heap
              </div>
            )}

            {/* Show current heap info */}
            {heap && heap.length > 0 && (
              <div className="heap-info">
                <span>📊 Size: {heap.length}</span>
                <span>🏷️ Root: {heap[0]}</span>
                <span>📐 Type: {selectedAlgorithm === 'min-heap' ? 'Min Heap' : 'Max Heap'}</span>
                <span>📋 Values: [{heap.slice(0, 8).join(', ')}{heap.length > 8 ? '...' : ''}]</span>
              </div>
            )}
          </div>
        );

      case "strings":
        return (
          <div className="string-controls">
            <select
              value={selectedAlgorithm}
              onChange={(e) => setSelectedAlgorithm(e.target.value)}
              className="string-select"
            >
              <option value="reverse">Reverse String</option>
              <option value="checkPalindrome">Check Palindrome</option>
              <option value="kmpSearch">KMP Pattern Search</option>
              <option value="rabinKarpSearch">Rabin-Karp Search</option>
              <option value="longestCommonSubstring">Longest Common Substring</option>
              <option value="checkAnagram">Check Anagram</option>
            </select>

            <input
              type="text"
              value={stringInput}
              onChange={(e) => setStringInput(e.target.value)}
              placeholder="Enter string"
              className="string-input"
            />

            {(selectedAlgorithm === "kmpSearch" || selectedAlgorithm === "rabinKarpSearch") && (
              <input
                type="text"
                value={stringPattern}
                onChange={(e) => setStringPattern(e.target.value)}
                placeholder="Enter pattern to search"
                className="string-pattern-input"
              />
            )}

            {(selectedAlgorithm === "longestCommonSubstring" || selectedAlgorithm === "checkAnagram") && (
              <input
                type="text"
                value={stringSecondInput}
                onChange={(e) => setStringSecondInput(e.target.value)}
                placeholder="Enter second string"
                className="string-second-input"
              />
            )}

            <button onClick={handleRunAlgorithm} disabled={isLoading} className="run-btn">
              {isLoading ? "⏳ Running..." : "▶️ Run Algorithm"}
            </button>

            {/* Algorithm info */}
            <div className="algorithm-info">
              <small>
                {selectedAlgorithm === "reverse" && "Reverses the order of characters in a string"}
                {selectedAlgorithm === "checkPalindrome" && "Checks if a string reads the same forwards and backwards"}
                {selectedAlgorithm === "kmpSearch" && "Efficient pattern matching using KMP algorithm"}
                {selectedAlgorithm === "rabinKarpSearch" && "Pattern matching using rolling hash"}
                {selectedAlgorithm === "longestCommonSubstring" && "Finds the longest substring common to both strings"}
                {selectedAlgorithm === "checkAnagram" && "Checks if two strings are anagrams of each other"}
              </small>
            </div>
          </div>
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
              <option value="matrix-chain-multiplication">Matrix Chain</option>
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


  // Animation control with proper step iteration
  useEffect(() => {
    // Clear any existing interval
    if (animationInterval.current) {
      clearInterval(animationInterval.current);
      animationInterval.current = null;
    }

    // Don't animate if no steps or at the end
    if (!algorithmData?.steps ||
      !Array.isArray(algorithmData.steps) ||
      algorithmData.steps.length === 0) {
      return;
    }

    // For string operations, use the speed control
    const animationSpeed = speed; // Use your existing speed state (default 700-1000ms)

    if (isPlaying) {
      // Check if we're at the last step
      if (currentStep >= algorithmData.steps.length - 1) {
        setIsPlaying(false);
        // Show result panel when animation completes
        if (category === "strings") {
          setShowResultPanel(true);
          toast.info("✅ Animation complete! Check the results below.", {
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
          });
        }
        return;
      }

      // Set up interval to advance steps
      animationInterval.current = setInterval(() => {
        setCurrentStep(prev => {
          const nextStep = prev + 1;

          // Check if we've reached the end
          if (nextStep >= algorithmData.steps.length) {
            setIsPlaying(false);
            if (category === "strings") {
              setShowResultPanel(true);
            }
            return prev;
          }

          return nextStep;
        });
      }, animationSpeed);
    }

    // Cleanup interval on unmount or when isPlaying changes
    return () => {
      if (animationInterval.current) {
        clearInterval(animationInterval.current);
        animationInterval.current = null;
      }
    };
  }, [isPlaying, currentStep, speed, algorithmData?.steps?.length, category]);

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
                      disabled={!algorithmData?.steps || algorithmData.steps.length === 0 || isLoading}
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

              <div className="main-content-area">
                {/* Visualization Panel */}
                <div className="visualization-panel">
                  <h3>Visualization</h3>
                  <div className="visualization-container">
                    {(algorithmData?.steps &&
                      Array.isArray(algorithmData.steps) &&
                      algorithmData.steps.length > 0) ||
                      (category === "linked-list" && linkedList && linkedList !== null) ? (
                      category === "dynamic-programming" ? (
                        <DynamicProgrammingViewer
                          step={algorithmData.steps[currentStep] || algorithmData.steps[0]}
                          algorithm={selectedAlgorithm}
                          currentStepIndex={currentStep}
                          totalSteps={algorithmData.steps?.length || 0}
                        />
                      ) : (
                        getVisualizationComponent()
                      )
                    ) : (
                      <div className="no-visualization">
                        <p>No visualization data available</p>
                        <small>Select an algorithm and click Run to start</small>
                      </div>
                    )}
                  </div>
                </div>

                {/* Pseudocode Panel */}
                <div className="pseudocode-panel">
                  <h3>Pseudo Code</h3>
                  <SortingViewer
                    code={algorithmData?.pseudocode || []}
                    currentLine={
                      algorithmData?.steps &&
                        Array.isArray(algorithmData.steps) &&
                        algorithmData.steps.length > 0 &&
                        currentStep >= 0 &&
                        currentStep < algorithmData.steps.length &&
                        algorithmData.steps[currentStep] &&
                        algorithmData.steps[currentStep].currentLine !== undefined
                        ? algorithmData.steps[currentStep].currentLine
                        : -1
                    }
                    algorithm={selectedAlgorithm}
                  />
                </div>
              </div>

              {/* DP Results Summary - Shows after animation */}
              {category === "dynamic-programming" && algorithmData?.finalResult && (
                <DPResultSummary
                  result={algorithmData.finalResult}
                  algorithm={selectedAlgorithm}
                  complexity={algorithmData.complexity}
                  complexityBreakdown={algorithmData.complexityBreakdown}
                  complexityGraph={algorithmData.complexityGraph}
                  memoizationInsight={algorithmData.memoizationInsight}
                  operationExplanation={algorithmData.operationExplanation}
                  patternInsight={algorithmData.patternInsight}
                  optimizationTips={algorithmData.optimizationTips}
                />
              )}

              {category === "strings" && showResultPanel && stringResult && (
                <StringResultPanel
                  result={stringResult}
                  complexity={stringComplexity}
                  explanation={algorithmData.explanations?.[algorithmData.explanations.length - 1] || "Algorithm execution complete"}
                  optimizationTips={stringOptimizationTips}
                  realWorldUseCases={stringRealWorldUseCases}
                  codeSnippets={stringCodeSnippets}
                  operation={selectedAlgorithm}
                />
              )}

              {category === "sorting" && showSortingResultPanel && algorithmData?.steps && (
                <SortingResultPanel
                  result={algorithmData.result}
                  algorithm={selectedAlgorithm}
                  steps={algorithmData.steps}
                  sortedArray={sortedArray}
                  array={array}
                />
              )}

              {category === "trees" && showBSTResultPanel && bstOperationResult && (
                <BSTResultPanel
                  result={bstOperationResult}
                  operation={bstOperationResult.operation}
                  tree={bstTree}
                  steps={algorithmData?.steps}
                  value={bstOperationResult.value}
                />
              )}

              {/* BOTTOM: Control Buttons and Custom Input */}
              {/* BOTTOM: Control Buttons and Custom Input */}
              {/* <div className="bottom-content-area">
                {algorithmData?.steps &&
                  Array.isArray(algorithmData.steps) &&
                  algorithmData.steps.length > 0 && (
                    <ControlButtons
                      onStepBackward={handleStepBackward}
                      onStepForward={handleStepForward}
                      currentStep={currentStep}
                      totalSteps={algorithmData.steps.length}
                      setCurrentStep={setCurrentStep}
                    />
                  )}

                {(category === "sorting" || category === "array-operations") && (
                  <CustomArrayInput onSubmit={handleCustomArray} />
                )}
              </div> */}
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
