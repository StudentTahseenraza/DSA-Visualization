
import { useState } from 'react';
import '../styles/CustomArrayInput.css';

const CustomArrayInput = ({ onSubmit }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSubmit(input);
      setInput('');
    }
  };

  return (
    <form className="custom-array-input" onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="pseudocode custom array"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CustomArrayInput;