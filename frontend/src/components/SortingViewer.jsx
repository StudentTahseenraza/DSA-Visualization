// frontend/src/components/CodeViewer.jsx (updated)
import { motion } from 'framer-motion';
import '../styles/SortingViewer.css';

const CodeViewer = ({ code = [], currentLine = -1, algorithm = 'Unknown' }) => {
  const codeArray = Array.isArray(code)
    ? code
    : typeof code === 'string' && code.trim()
    ? code.split('\n')
    : [];

  return (
    <div className="code-viewer">
      <h3>{algorithm.charAt(0).toUpperCase() + algorithm.slice(1)} Pseudocode</h3>
      {codeArray.length > 0 ? (
        <div className="code-container">
          {codeArray.map((line, index) => (
            <motion.div
              key={index}
              className={`code-line ${index === currentLine ? 'highlight' : ''}`}
              initial={false}
              animate={{
                backgroundColor: index === currentLine ? 'rgba(107, 91, 149, 0.3)' : 'transparent',
                transition: { duration: 0.3 }
              }}
            >
              <span className="line-number">{index + 1}</span>
              <span className="line-content">{line || '\u00A0'}</span>
              {index === currentLine && (
                <motion.div 
                  className="execution-pointer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, repeat: Infinity, repeatType: "reverse" }}
                >
                  ▶
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      ) : (
        <p>No pseudocode available for this algorithm.</p>
      )}
    </div>
  );
};

export default CodeViewer;