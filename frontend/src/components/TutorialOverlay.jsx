// components/TutorialOverlay.jsx
import { motion } from 'framer-motion';
import '../styles/TutorialOverlay.css';

const TutorialOverlay = ({ tutorialStep, onNext, onPrevious, onQuizAnswer, onExit }) => {
  const { type, content} = tutorialStep;

  return (
    <motion.div
      className="tutorial-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="tutorial-content">
        <button className="exit-button" onClick={onExit}>X</button>
        {type === 'explanation' && (
          <>
            <h3>Tutorial Step</h3>
            <p>{content}</p>
            <div className="tutorial-buttons">
              <button onClick={onPrevious} disabled={tutorialStep.index === 0}>
                Previous
              </button>
              <button onClick={onNext}>Next</button>
            </div>
          </>
        )}
        {type === 'quiz' && (
          <>
            <h3>Quiz</h3>
            <p>{content.question}</p>
            {content.options.map((option, i) => (
              <button key={i} onClick={() => onQuizAnswer(option.correct)}>
                {option.text}
              </button>
            ))}
          </>
        )}
      </div>
    </motion.div>
  );
};

export default TutorialOverlay;