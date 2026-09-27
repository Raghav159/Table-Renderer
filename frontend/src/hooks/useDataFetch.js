import { useState, useEffect } from 'react';

const API_BASE_URL = 'http://localhost:5000/api';

export function useDataFetch(page = 0, pageSize = 50) {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalRows, setTotalRows] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchData(page, pageSize);
  }, [page, pageSize]);

  const fetchData = async (currentPage, currentPageSize) => {
    setLoading(true);
    setError(null);

    try {
      // Fetch paginated data from API
      const dataResponse = await fetch(
        `${API_BASE_URL}/data?page=${currentPage}&pageSize=${currentPageSize}`
      );

      if (!dataResponse.ok) {
        throw new Error('Failed to fetch data from API');
      }

      const dataJson = await dataResponse.json();

      // Set data
      setData(dataJson.data);
      setTotalRows(dataJson.totalRows);
      setTotalPages(dataJson.totalPages);
      
      // Generate columns from data keys
      if (dataJson.data && dataJson.data.length > 0) {
        const columnKeys = Object.keys(dataJson.data[0]);
        
        // Sort columns naturally (col_1, col_2, col_3... instead of col_1, col_10, col_100...)
        columnKeys.sort((a, b) => {
          // Extract numbers from column names like "col_123"
          const numA = parseInt(a.split('_')[1]) || 0;
          const numB = parseInt(b.split('_')[1]) || 0;
          return numA - numB;
        });
        
        const cols = columnKeys.map(key => ({
          accessorKey: key,
          header: key,
          id: key
        }));
        setColumns(cols);
      }
      
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const refetch = (currentPage, currentPageSize) => {
    fetchData(currentPage, currentPageSize);
  };

  return { data, columns, loading, error, totalRows, totalPages, refetch };
}

