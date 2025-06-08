import '../styles/ControlButtons.css';

const ControlButtons = ({
  onStepBackward,
  onStepForward,
  currentStep,
  totalSteps,
  setCurrentStep
}) => {
  return (
    <div className="control-buttons">
      <button
        onClick={() => setCurrentStep(0)}
        disabled={currentStep === 0}
      >
        {'<<'}
      </button>
      <button
        onClick={onStepBackward}
        disabled={currentStep === 0}
      >
        {'<'}
      </button>
      <button
        onClick={onStepForward}
        disabled={currentStep === totalSteps - 1}
      >
        {'>'}
      </button>
      <button
        onClick={() => setCurrentStep(totalSteps - 1)}
        disabled={currentStep === totalSteps - 1}
      >
        {'>>'}
      </button>
    </div>
  );
};

export default ControlButtons;