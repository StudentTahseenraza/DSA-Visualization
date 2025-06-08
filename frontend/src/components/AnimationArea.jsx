import { motion } from 'framer-motion';
import '../styles/AnimationArea.css';

const AnimationArea = ({ step, algorithm }) => {
  if (!step || !step.array) {
    return <div className="animation-area">Loading...</div>;
  }

  const { array, currentIndex, minIndex, action } = step;

  const barVariants = (index) => ({
    initial: { height: 0, backgroundColor: '#3498db' },
    animate: {
      height: `${array[index] * 30}px`,
      backgroundColor:
        index === currentIndex
          ? action === 'compare'
            ? '#e74c3c'
            : '#f1c40f'
          : index === minIndex
          ? '#2ecc71'
          : '#3498db',
      transition: { duration: 0.3, ease: 'easeInOut' },
    },
  });

  return (
    <div className="animation-area">
      {array.map((value, index) => (
        <motion.div
          key={`${algorithm}-bar-${index}`}
          className="bar"
          variants={barVariants(index)}
          initial="initial"
          animate="animate"
        >
          <span className="bar-value">{value}</span>
        </motion.div>
      ))}
    </div>
  );
};

export default AnimationArea;