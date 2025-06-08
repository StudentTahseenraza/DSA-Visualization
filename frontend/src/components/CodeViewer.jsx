// frontend/src/components/CodeViewer.jsx
import PropTypes from 'prop-types';
import '../styles/CodeViewer.css';

const CodeViewer = ({ code = [], currentLine = -1, algorithm = 'Unknown' }) => {
  // Normalize code to ensure it's an array
  const codeArray = Array.isArray(code)
    ? code
    : typeof code === 'string' && code.trim()
    ? code.split('\n')
    : [];

  return (
    <div className="code-viewer">
      <h3>{algorithm.charAt(0).toUpperCase() + algorithm.slice(1)} Pseudocode</h3>
      {codeArray.length > 0 ? (
        <pre>
          {codeArray.map((line, index) => (
            <div
              key={index}
              className={index === currentLine ? 'highlight' : ''}
            >
              {line || '\u00A0'} {/* Non-breaking space for empty lines */}
            </div>
          ))}
        </pre>
      ) : (
        <p>No pseudocode available for this algorithm.</p>
      )}
    </div>
  );
};

// Define prop types
CodeViewer.propTypes = {
  code: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
  ]),
  currentLine: PropTypes.number,
  algorithm: PropTypes.string,
};

// Default props
CodeViewer.defaultProps = {
  code: [],
  currentLine: -1,
  algorithm: 'Unknown',
};

export default CodeViewer;