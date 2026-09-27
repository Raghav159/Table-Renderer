import { useState, useCallback } from 'react';
import DataTable from './components/DataTable';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { useDataFetch } from './hooks/useDataFetch';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [currentPageSize, setCurrentPageSize] = useState(50);
  
  const { data, columns, loading, error, totalRows, totalPages, refetch } = 
    useDataFetch(currentPage, currentPageSize);

  const handlePageChange = useCallback((pageIndex, pageSize) => {
    setCurrentPage(pageIndex);
    setCurrentPageSize(pageSize);
  }, []);

  const handleRetry = useCallback(() => {
    refetch(currentPage, currentPageSize);
  }, [currentPage, currentPageSize, refetch]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Large Data Table Renderer</h1>
        <p>Powered by TanStack Table & React Virtual</p>
      </header>

      <main className="app-main">
        {loading && data.length === 0 && (
          <div className="full-screen-loader">
            <LoadingSpinner />
          </div>
        )}
        
        {error && <ErrorMessage error={error} onRetry={handleRetry} />}
        
        {!error && data.length > 0 && (
          <DataTable 
            data={data} 
            columns={columns}
            totalRows={totalRows}
            totalPages={totalPages}
            currentPage={currentPage}
            pageSize={currentPageSize}
            onPageChange={handlePageChange}
          />
        )}
      </main>

      <footer className="app-footer">
        <p>© 2025 Table Renderer</p>
      </footer>

      {/* Full page loading overlay for page changes */}
      {loading && data.length > 0 && (
        <div className="page-loading-overlay">
          <div className="page-spinner"></div>
        </div>
      )}
    </div>
  );
}

export default App;
