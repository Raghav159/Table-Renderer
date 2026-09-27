import './ErrorMessage.css';

function ErrorMessage({ error, onRetry }) {
  return (
    <div className="error-container">
      <div className="error-icon">⚠️</div>
      <h2>Error Loading Data</h2>
      <p className="error-text">{error}</p>
      <p className="error-hint">
        Make sure the backend server is running at <code>http://localhost:5000</code>
      </p>
      {onRetry && (
        <button onClick={onRetry} className="retry-btn">
          Retry
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
