// components/ExplanationBox.jsx
import { useState } from 'react';
import '../styles/ExplanationBox.css';

const ExplanationBox = ({ explanation, onAddNote, stepIndex }) => {
  const [note, setNote] = useState('');

  const handleNoteSubmit = () => {
    if (note.trim()) {
      onAddNote(stepIndex, note);
      setNote('');
    }
  };

  return (
    <div className="explanation-box">
      <h3>Explanation</h3>
      <p>{explanation || 'No explanation available.'}</p>
      <div className="notes-section">
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add a note for this step..."
          rows="3"
        />
        <button onClick={handleNoteSubmit}>Add Note</button>
      </div>
    </div>
  );
};

export default ExplanationBox;