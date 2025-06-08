// App.jsx
import { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import AnimationArea from './components/AnimationArea.jsx';
import ControlButtons from './components/ControlButtons.jsx';
import CodeViewer from './components/CodeViewer.jsx';
import ExplanationBox from './components/ExplanationBox.jsx';
import ArrayButtons from './components/ArrayButtons.jsx';
import LineChart from './components/LineChart.jsx';
import CustomArrayInput from './components/CustomArrayInput.jsx';
import BSTViewer from './components/BSTViewer.jsx';
import GraphViewer from './components/GraphViewer.jsx';
import LinkedListViewer from './components/LinkedListViewer.jsx';
import HeapViewer from './components/HeapViewer.jsx';
import TrieViewer from './components/TrieViewer.jsx';
import './styles/App.css';
import axios from 'axios';

const App = () => {
  const [array, setArray] = useState([5, 2, 8, 1, 4, 3, 6, 7]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('selectionSort');
  const [algorithmType, setAlgorithmType] = useState('sorting');
  const [algorithmData, setAlgorithmData] = useState({ steps: [], pseudocode: [], explanations: [] });
  const [aiExplanation, setAiExplanation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [bstTree, setBstTree] = useState(null);
  const [bstValue, setBstValue] = useState('');
  const [bstOperation, setBstOperation] = useState('insert');
  const [graph, setGraph] = useState({
    A: { B: 1, C: 4 },
    B: { A: 1, D: 2 },
    C: { A: 4, D: 5 },
    D: { B: 2, C: 5 },
  });
  const [graphStartNode, setGraphStartNode] = useState('A');
  const [linkedList, setLinkedList] = useState(null);
  const [listValue, setListValue] = useState('');
  const [listOperation, setListOperation] = useState('insert');
  const [heap, setHeap] = useState(null);
  const [heapValue, setHeapValue] = useState('');
  const [heapOperation, setHeapOperation] = useState('insert');
  const [trie, setTrie] = useState(null);
  const [trieWord, setTrieWord] = useState('');
  const [trieOperation, setTrieOperation] = useState('insert');
  const [theme, setTheme] = useState('light');
  const [comparisonResults, setComparisonResults] = useState([]);
  const [graphNode, setGraphNode] = useState('');
  const [graphEdgeFrom, setGraphEdgeFrom] = useState('');
  const [graphEdgeTo, setGraphEdgeTo] = useState('');
  const [graphEdgeWeight, setGraphEdgeWeight] = useState('');

  const [zoomScale, setZoomScale] = useState(1);

  const resetZoom = () => setZoomScale(1);

  

  const fetchAlgorithmSteps = async () => {
    setIsLoading(true);
    try {
      let response;
      if (algorithmType === 'sorting') {
        if (!array || !Array.isArray(array)) throw new Error('Invalid array input');
        response = await axios.post(`http://localhost:5000/api/sort/${selectedAlgorithm}`, { array });
        setAlgorithmData(response.data);
      } else if (algorithmType === 'bst') {
        if (!bstValue || isNaN(parseInt(bstValue))) throw new Error('Invalid BST value');
        const operation = selectedAlgorithm === 'avl' ? 'avlInsert' : bstOperation;
        response = await axios.post(`http://localhost:5000/api/bst/${operation}`, {
          value: parseInt(bstValue),
          treeState: bstTree,
        });
        setAlgorithmData(response.data);
        setBstTree(response.data.tree);
      } else if (algorithmType === 'graph') {
        if (!graph || !graphStartNode || !graph[graphStartNode]) throw new Error('Invalid graph or start node');
        response = await axios.post(`http://localhost:5000/api/graph/${selectedAlgorithm}`, {
          graph,
          start: graphStartNode,
        });
        setAlgorithmData(response.data);
      } else if (algorithmType === 'linkedList') {
        if (listOperation !== 'traverse' && (!listValue || isNaN(parseInt(listValue))))
          throw new Error('Invalid linked list value');
        response = await axios.post(`http://localhost:5000/api/linkedList/${listOperation}`, {
          value: parseInt(listValue),
          listState: linkedList,
        });
        setAlgorithmData(response.data);
        setLinkedList(response.data.list);
      } else if (algorithmType === 'heap') {
        if (heapOperation !== 'heapify' && (!heapValue || isNaN(parseInt(heapValue))))
          throw new Error('Invalid heap value');
        response = await axios.post(`http://localhost:5000/api/heap/${heapOperation}`, {
          value: parseInt(heapValue),
          heapState: heap,
        });
        setAlgorithmData(response.data);
        setHeap(response.data.heap);
      } else if (algorithmType === 'trie') {
        if (!trieWord) throw new Error('Invalid trie word');
        response = await axios.post(`http://localhost:5000/api/trie/${trieOperation}`, {
          word: trieWord,
          trieState: trie,
        });
        setAlgorithmData(response.data);
        setTrie(response.data.trie);
      }
      setCurrentStep(0);
      setIsPlaying(false);
    } catch (error) {
      console.error('Error fetching algorithm steps:', error);
      setAlgorithmData({ steps: [], pseudocode: [], explanations: [] });
      setAiExplanation(error.response?.data?.error || 'Error loading algorithm steps. Please check inputs.');
    } finally {
      setIsLoading(false);
    }
  };

  const compareSortingAlgorithms = async () => {
    setIsLoading(true);
    try {
      const algorithms = ['bubbleSort', 'selectionSort', 'insertionSort', 'mergeSort', 'quickSort', 'heapSort'];
      const results = [];
      for (const algo of algorithms) {
        const startTime = performance.now();
        const response = await axios.post(`http://localhost:5000/api/sort/${algo}`, { array });
        const endTime = performance.now();
        results.push({ algorithm: algo, time: (endTime - startTime).toFixed(2) });
      }
      setComparisonResults(results);
    } catch (error) {
      console.error('Error comparing algorithms:', error);
      setAiExplanation('Error comparing algorithms.');
    } finally {
      setIsLoading(false);
    }
  };

  const addGraphNode = () => {
    if (!graphNode) {
      alert('Please enter a node name');
      return;
    }
    if (graph[graphNode]) {
      alert('Node already exists');
      return;
    }
    setGraph((prev) => ({ ...prev, [graphNode]: {} }));
    setGraphNode('');
  };

  const addGraphEdge = () => {
    if (!graphEdgeFrom || !graphEdgeTo || !graphEdgeWeight || isNaN(parseInt(graphEdgeWeight))) {
      alert('Please enter valid from node, to node, and weight');
      return;
    }
    if (!graph[graphEdgeFrom] || !graph[graphEdgeTo]) {
      alert('One or both nodes do not exist');
      return;
    }
    setGraph((prev) => ({
      ...prev,
      [graphEdgeFrom]: { ...prev[graphEdgeFrom], [graphEdgeTo]: parseInt(graphEdgeWeight) },
      [graphEdgeTo]: { ...prev[graphEdgeTo], [graphEdgeFrom]: parseInt(graphEdgeWeight) },
    }));
    setGraphEdgeFrom('');
    setGraphEdgeTo('');
    setGraphEdgeWeight('');
  };

  useEffect(() => {
    if (algorithmData.steps.length > 0) {
      const step = algorithmData.steps[currentStep];
      const explanation = algorithmData.explanations && algorithmData.explanations[currentStep]
        ? algorithmData.explanations[currentStep]
        : `Step ${currentStep + 1}: ${step.action || 'Processing...'}`;
      setAiExplanation(explanation);
    } else {
      setAiExplanation('Click Run to start visualization.');
    }
  }, [currentStep, algorithmData]);

  useEffect(() => {
    let interval = null;
    if (isPlaying && currentStep < algorithmData.steps.length - 1) {
      interval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= algorithmData.steps.length - 1) {
            setIsPlaying(false);
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    }
    return () => interval && clearInterval(interval);
  }, [isPlaying, currentStep, speed, algorithmData.steps.length]);

  const handleStepForward = () => {
    if (currentStep < algorithmData.steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const handleStepBackward = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handlePlayPause = () => setIsPlaying(!isPlaying);

  const handleSpeedChange = (newSpeed) => setSpeed(newSpeed);

  const handleAlgorithmChange = (algorithm, type) => {
    setSelectedAlgorithm(algorithm);
    setAlgorithmType(type);
    setCurrentStep(0);
    setIsPlaying(false);
    setAlgorithmData({ steps: [], pseudocode: [], explanations: [] });
    setAiExplanation('Click Run to start visualization.');
  };

  const handleCustomArray = (newArray) => {
    try {
      const parsedArray = newArray.split(',').map(Number);
      if (parsedArray.some(isNaN)) {
        alert('Please enter valid numbers separated by commas');
        return;
      }
      setArray(parsedArray);
      setCurrentStep(0);
      setAlgorithmData({ steps: [], pseudocode: [], explanations: [] });
    } catch (error) {
      alert('Invalid input. Please enter numbers separated by commas.');
      console.error('Error parsing custom array:', error);
    }
  };

  const handleBstOperation = () => {
    if (bstValue === '') {
      alert('Please enter a value for the BST operation');
      return;
    }
    fetchAlgorithmSteps();
  };

  const handleGraphOperation = () => {
    if (!graphStartNode || !graph[graphStartNode]) {
      alert(`Start node ${graphStartNode} not found in graph`);
      return;
    }
    fetchAlgorithmSteps();
  };

  const handleListOperation = () => {
    if (listOperation !== 'traverse' && listValue === '') {
      alert('Please enter a value for the Linked List operation');
      return;
    }
    fetchAlgorithmSteps();
  };

  const handleHeapOperation = () => {
    if (heapOperation !== 'heapify' && heapValue === '') {
      alert('Please enter a value for the Heap operation');
      return;
    }
    fetchAlgorithmSteps();
  };

  const handleTrieOperation = () => {
    if (!trieWord) {
      alert('Please enter a word for the Trie operation');
      return;
    }
    fetchAlgorithmSteps();
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const currentStepData = algorithmData.steps[currentStep] || { array: array, currentIndex: -1 };

  return (
    <div className="app" data-theme={theme}>
      <Header
        speed={speed}
        onSpeedChange={handleSpeedChange}
        onAlgorithmChange={handleAlgorithmChange}
        selectedAlgorithm={selectedAlgorithm}
        algorithmType={algorithmType}
        toggleTheme={toggleTheme}
        theme={theme}
      />
      <div className="main-content">
        <div className="left-panel">
          {algorithmType === 'sorting' && (
            <>
              <button className="visual-animation-btn" onClick={() => fetchAlgorithmSteps()}>
                Run Sorting Algorithm
              </button>
              <button className="visual-animation-btn" onClick={compareSortingAlgorithms}>
                Compare Sorting Algorithms
              </button>
              {comparisonResults.length > 0 && (
                <div className="comparison-results">
                  <h3>Comparison Results (ms)</h3>
                  <ul>
                    {comparisonResults.map((result) => (
                      <li key={result.algorithm}>
                        {result.algorithm}: {result.time} ms
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <button className="visual-animation-btn" onClick={handlePlayPause}>
                {isPlaying ? 'Pause' : 'Play'} Animation
              </button>
              <div className="visualization-container">
                <AnimationArea
                  step={currentStepData}
                  algorithm={selectedAlgorithm}
                />
                <ArrayButtons
                  array={array}
                  step={currentStepData}
                  algorithm={selectedAlgorithm}
                />
                <LineChart array={currentStepData.array || array} />
              </div>
            </>
          )}
          {algorithmType === 'bst' && (
            <div className="bst-controls">
              <select
                value={bstOperation}
                onChange={(e) => setBstOperation(e.target.value)}
                disabled={selectedAlgorithm === 'avl'}
              >
                <option value="insert">Insert</option>
                <option value="search">Search</option>
              </select>
              <input
                type="number"
                value={bstValue}
                onChange={(e) => setBstValue(e.target.value)}
                placeholder="Enter value"
              />
              <button onClick={handleBstOperation}>Run {selectedAlgorithm === 'avl' ? 'AVL Insert' : 'BST Operation'}</button>
              <button onClick={handlePlayPause}>
                {isPlaying ? 'Pause' : 'Play'} Animation
              </button>
              <BSTViewer step={currentStepData} />
            </div>
          )}
          {algorithmType === 'graph' && (
            <div className="graph-controls">
              <div className="graph-editor">
                <h3>Graph Editor</h3>
                <input
                  type="text"
                  value={graphNode}
                  onChange={(e) => setGraphNode(e.target.value.toUpperCase())}
                  placeholder="New node (e.g., E)"
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
              </div>
              <input
                type="text"
                value={graphStartNode}
                onChange={(e) => setGraphStartNode(e.target.value.toUpperCase())}
                placeholder="Start node (e.g., A)"
              />
              <button onClick={handleGraphOperation}>Run {selectedAlgorithm.toUpperCase()}</button>
              <button onClick={handlePlayPause}>
                {isPlaying ? 'Pause' : 'Play'} Animation
              </button>
              <GraphViewer step={currentStepData} />
            </div>
          )}
          {algorithmType === 'linkedList' && (
            <div className="linked-list-controls">
              <select
                value={listOperation}
                onChange={(e) => setListOperation(e.target.value)}
              >
                <option value="insert">Insert</option>
                <option value="delete">Delete</option>
                <option value="traverse">Traverse</option>
              </select>
              <input
                type="number"
                value={listValue}
                onChange={(e) => setListValue(e.target.value)}
                placeholder="Enter value"
                disabled={listOperation === 'traverse'}
              />
              <button onClick={handleListOperation}>Run Linked List Operation</button>
              <button onClick={handlePlayPause}>
                {isPlaying ? 'Pause' : 'Play'} Animation
              </button>
              <LinkedListViewer step={currentStepData} />
            </div>
          )}
          {algorithmType === 'heap' && (
            <div className="heap-controls">
              <select
                value={heapOperation}
                onChange={(e) => setHeapOperation(e.target.value)}
              >
                <option value="insert">Insert</option>
                <option value="extractMax">Extract Max</option>
                <option value="heapify">Heapify</option>
              </select>
              <input
                type="number"
                value={heapValue}
                onChange={(e) => setHeapValue(e.target.value)}
                placeholder="Enter value"
                disabled={heapOperation === 'heapify'}
              />
              <button onClick={handleHeapOperation}>Run Heap Operation</button>
              <button onClick={handlePlayPause}>
                {isPlaying ? 'Pause' : 'Play'} Animation
              </button>
              <HeapViewer step={currentStepData} />
            </div>
          )}
          {algorithmType === 'trie' && (
            <div className="trie-controls">
              <select
                value={trieOperation}
                onChange={(e) => setTrieOperation(e.target.value)}
              >
                <option value="insert">Insert</option>
                <option value="search">Search</option>
                <option value="prefixSearch">Prefix Search</option>
              </select>
              <input
                type="text"
                value={trieWord}
                onChange={(e) => setTrieWord(e.target.value.toLowerCase())}
                placeholder="Enter word"
              />
              <button onClick={handleTrieOperation}>Run Trie Operation</button>
              <button onClick={handlePlayPause}>
                {isPlaying ? 'Pause' : 'Play'} Animation
              </button>
              <div className="zoom-controls">
                <label>Zoom: {zoomScale.toFixed(1)}x</label>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={zoomScale}
                  onChange={(e) => setZoomScale(parseFloat(e.target.value))}
                />
                <button onClick={resetZoom}>Reset Zoom</button>
              </div>
              <TrieViewer step={currentStepData} zoomScale={zoomScale} />
            </div>
          )}
          <ControlButtons
            onStepBackward={handleStepBackward}
            onStepForward={handleStepForward}
            currentStep={currentStep}
            totalSteps={algorithmData.steps.length}
            setCurrentStep={setCurrentStep}
          />
        </div>
        <div className="right-panel">
          <CodeViewer
            code={algorithmData.pseudocode}
            currentLine={currentStepData.currentLine || -1}
            algorithm={selectedAlgorithm}
          />
          <ExplanationBox explanation={aiExplanation} />
        </div>
      </div>
      {algorithmType === 'sorting' && <CustomArrayInput onSubmit={handleCustomArray} />}
    </div>
  );
};

export default App;