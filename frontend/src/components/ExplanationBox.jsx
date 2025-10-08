// frontend/src/components/ExplanationBox.jsx (updated)
import { motion } from 'react';
import '../styles/ExplanationBox.css';
import { useState } from 'react';

const ExplanationBox = ({ explanation, onAddNote, stepIndex, currentLine, pseudocode = [] }) => {
  const [note, setNote] = useState('');

  const handleNoteSubmit = () => {
    if (note.trim()) {
      onAddNote(stepIndex, note);
      setNote('');
    }
  };

  return (
    <div className="explanation-box">
      <h3>Step Explanation</h3>
      <motion
        className="explanation-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="current-action">
          <div className="action-icon">💡</div>
          <p>{explanation || 'No explanation available.'}</p>
        </div>
        
        {currentLine >= 0 && pseudocode[currentLine] && (
          <div className="pseudocode-context">
            <div className="context-label">Executing:</div>
            <code>{pseudocode[currentLine]}</code>
          </div>
        )}
      </motion>
      
      <div className="notes-section">
        <h4>Add Note</h4>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add your observations for this step..."
          rows="3"
        />
        <button onClick={handleNoteSubmit}>Save Note</button>
      </div>
    </div>
  );
};

export default ExplanationBox;