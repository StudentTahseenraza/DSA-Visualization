// frontend/src/components/ArrayButtons.jsx
import PropTypes from 'prop-types';
import '../styles/ArrayButtons.css';

const ArrayButtons = ({ step = {}, onGenerateArray, onSort, isSorting }) => {
  // Safely access currentIndex with default value
  const currentIndex = step.currentIndex ?? -1; // Use nullish coalescing to avoid undefined

  // Optional: Use currentIndex for conditional rendering or styling
  // Example: Highlight button if currentIndex is relevant
  return (
    <div className="array-buttons">
      <button
        onClick={onGenerateArray}
        disabled={isSorting}
        className={currentIndex !== -1 ? 'highlight' : ''}
      >
        Generate Array
      </button>
      <button onClick={onSort} disabled={isSorting}>
        Sort
      </button>
    </div>
  );
};

// Define prop types for clarity and validation
ArrayButtons.propTypes = {
  step: PropTypes.shape({
    currentIndex: PropTypes.number,
  }),
  onGenerateArray: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  isSorting: PropTypes.bool.isRequired,
};

// Default props
ArrayButtons.defaultProps = {
  step: {},
};

export default ArrayButtons;