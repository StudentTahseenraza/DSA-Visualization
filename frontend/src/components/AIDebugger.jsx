// frontend/src/components/AIDebugger.jsx
import { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import '../styles/AIDebugger.css';

const AIDebugger = () => {
  const [code, setCode] = useState('');
  const [algorithmType, setAlgorithmType] = useState('bubble-sort');
  const [isLoading, setIsLoading] = useState(false);
  const [debugResult, setDebugResult] = useState(null);
  const [activeTab, setActiveTab] = useState('errors');

//   const BASE_URL = "https://dsa-visualization-j0uo.onrender.com/api";
const BASE_URL = "http://localhost:5000/api";

  const algorithmExamples = {
    'bubble-sort': `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            # Bug: Using > instead of <
            if arr[j] < arr[j+1]:  # This will sort in descending order
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr`,
    
    'binary-search': `def binary_search(arr, target):
    left = 0
    right = len(arr)  # Bug: Should be len(arr) - 1
    while left < right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid  # Bug: Should be mid - 1
    return -1`,
    
    'fibonacci': `def fibonacci(n):
    if n <= 1:
        return n
    # Bug: Missing memoization, will be very slow
    return fibonacci(n-1) + fibonacci(n-2)`
  };

  const handleDebug = async () => {
    if (!code.trim()) {
      toast.warning("📝 Please paste your code first");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/debug/algorithm`, {
        code,
        algorithmType,
        testCases: generateTestCases(algorithmType)
      });

      setDebugResult(response.data);
      if (response.data.hasError) {
        toast.error(`🔍 Found ${response.data.errors.length} error(s)`);
      } else {
        toast.success("✅ No errors found! Your code looks good.");
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Debugging failed");
    } finally {
      setIsLoading(false);
    }
  };

  const generateTestCases = (type) => {
    const testCases = {
      'bubble-sort': [{ input: [5, 2, 8, 1, 4] }, { input: [3, 0, -1, 7, 2] }],
      'selection-sort': [{ input: [5, 2, 8, 1, 4] }],
      'binary-search': [{ input: { arr: [1,3,5,7,9], target: 5 } }],
      'fibonacci': [{ input: 5 }, { input: 8 }]
    };
    return testCases[type] || [{ input: [5, 2, 8, 1, 4] }];
  };

  const loadExample = (type) => {
    setCode(algorithmExamples[type]);
    setAlgorithmType(type);
  };

  const applyFix = (error) => {
    if (error.fixedCode) {
      setCode(error.fixedCode);
      toast.success("✅ Fix applied! You can debug again to verify.");
    }
  };

  return (
    <div className="ai-debugger-page">
      <div className="debugger-header">
        <div className="header-left">
          <Link to="/home" className="back-btn">← Back to Home</Link>
          <h1>🐛 AI Algorithm Debugger</h1>
        </div>
        <ThemeToggle />
      </div>

      <div className="unique-badge debug-badge">
        ⭐ First AI Debugger for Algorithms - Finds logical errors automatically!
      </div>

      <div className="debugger-layout">
        <div className="input-panel">
          <div className="panel-header">
            <h3>Paste Your Algorithm</h3>
            <select 
              value={algorithmType}
              onChange={(e) => setAlgorithmType(e.target.value)}
              className="algorithm-select"
            >
              <option value="bubble-sort">Bubble Sort</option>
              <option value="selection-sort">Selection Sort</option>
              <option value="binary-search">Binary Search</option>
              <option value="fibonacci">Fibonacci</option>
            </select>
          </div>

          <div className="example-buttons">
            <button onClick={() => loadExample('bubble-sort')}>Load Buggy Bubble Sort</button>
            <button onClick={() => loadExample('binary-search')}>Load Buggy Binary Search</button>
            <button onClick={() => loadExample('fibonacci')}>Load Buggy Fibonacci</button>
          </div>

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="# Paste your algorithm here..."
            rows={15}
            className="debug-textarea"
          />

          <button 
            onClick={handleDebug}
            disabled={isLoading}
            className="debug-action-btn"
          >
            {isLoading ? '🔍 AI is Debugging...' : '🔍 Debug This Algorithm'}
          </button>
        </div>

        {debugResult && (
          <div className="results-panel">
            <div className="results-tabs">
              <button 
                className={activeTab === 'errors' ? 'active' : ''}
                onClick={() => setActiveTab('errors')}
              >
                Errors ({debugResult.errors?.length || 0})
              </button>
              <button 
                className={activeTab === 'trace' ? 'active' : ''}
                onClick={() => setActiveTab('trace')}
              >
                Execution Trace
              </button>
              <button 
                className={activeTab === 'fix' ? 'active' : ''}
                onClick={() => setActiveTab('fix')}
              >
                Suggested Fixes
              </button>
            </div>

            <div className="results-content">
              {activeTab === 'errors' && (
                <div className="errors-list">
                  {debugResult.hasError ? (
                    debugResult.errors.map((error, idx) => (
                      <div key={idx} className="error-card">
                        <div className="error-header">
                          <span className="error-line">Line {error.line}</span>
                          <span className={`error-type ${error.type}`}>{error.type}</span>
                        </div>
                        <div className="error-explanation">
                          {error.explanation}
                        </div>
                        <div className="error-context">
                          <strong>What happened:</strong> {error.actual}
                        </div>
                        <div className="error-expected">
                          <strong>Expected:</strong> {error.expected}
                        </div>
                        {error.fixedCode && (
                          <button 
                            className="apply-fix-btn"
                            onClick={() => applyFix(error)}
                          >
                            Apply Fix
                          </button>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="no-errors">
                      <div className="success-icon">✅</div>
                      <h4>No Errors Found!</h4>
                      <p>Your algorithm looks correct. Great job!</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'trace' && debugResult.stepByStepDebug && (
                <div className="trace-list">
                  {debugResult.stepByStepDebug.map((step, idx) => (
                    <div key={idx} className="trace-step">
                      <div className="step-number">Step {step.step}</div>
                      <div className="step-line">Line {step.line}</div>
                      <div className="step-variables">
                        <pre>{JSON.stringify(step.variables, null, 2)}</pre>
                      </div>
                      {step.actual !== step.expected && (
                        <div className="step-mismatch">
                          <div className="mismatch-actual">❌ Actual: {step.actual}</div>
                          <div className="mismatch-expected">✅ Expected: {step.expected}</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'fix' && debugResult.errors && (
                <div className="fix-suggestions">
                  {debugResult.errors.map((error, idx) => (
                    <div key={idx} className="fix-card">
                      <h4>Fix for Line {error.line}</h4>
                      <div className="original-code">
                        <strong>Original:</strong>
                        <pre>{code.split('\n')[error.line - 1]}</pre>
                      </div>
                      <div className="suggested-fix">
                        <strong>Suggested Fix:</strong>
                        <pre>{error.fix}</pre>
                      </div>
                      {error.fixedCode && (
                        <button 
                          className="apply-fix-btn large"
                          onClick={() => applyFix(error)}
                        >
                          Apply This Fix
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="debug-summary">
              <h4>Debug Summary</h4>
              <p>{debugResult.summary}</p>
            </div>
          </div>
        )}
      </div>

      <ToastContainer theme="colored" position="top-right" />
    </div>
  );
};

export default AIDebugger;