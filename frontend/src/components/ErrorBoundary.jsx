// frontend/src/components/ErrorBoundary.jsx
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  const [error, setMessageError] = useState(null);

  const handleError = (errorInfo) => {
    setHasError(true);
    setMessageError(errorInfo.message);
    console.error('ErrorBoundary caught:', errorInfo);
  };

  useEffect(() => {
    const errorHandler = (event) => {
      setHasError(true);
      setMessageError(event.error);
    };
    window.addEventListener('error', errorHandler);
    return () => window.removeEventListener('error', errorHandler);
  }, []);

  if (hasError) {
    return (
      <div className="error-boundary">
        <h2>Something went wrong.</h2>
        <p>{error?.message || 'An unexpected error occurred.'}</p>
        <button onClick={() => window.location.reload()}>Reload Page</button>
      </div>
    );
  }

  return children; // Render children if no errors occur
};

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;