import { useRef, useEffect } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import './DataTable.css';

function DataTable({ data, columns, totalRows, totalPages, currentPage, pageSize, onPageChange }) {
  const tableContainerRef = useRef(null);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: totalPages,
  });

  const { rows } = table.getRowModel();

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => 35,
    overscan: 10,
  });

  const columnVirtualizer = useVirtualizer({
    horizontal: true,
    count: columns.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => 150,
    overscan: 5,
  });

  useEffect(() => {
    if (tableContainerRef.current) {
      tableContainerRef.current.scrollTop = 0;
      tableContainerRef.current.scrollLeft = 0;
    }
  }, [currentPage]);

  return (
    <div className="data-table-wrapper">
      <div className="table-info">
        <span>
          Showing {currentPage * pageSize + 1} to{' '}
          {Math.min((currentPage + 1) * pageSize, totalRows)}{' '}
          of {totalRows} rows
        </span>
      </div>

      <div ref={tableContainerRef} className="table-container">
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: `${columnVirtualizer.getTotalSize()}px`,
            position: 'relative',
          }}
        >
          {/* Header */}
          <div className="table-header" style={{ display: 'flex', position: 'sticky', top: 0, zIndex: 2 }}>
            {columnVirtualizer.getVirtualItems().map((virtualColumn) => {
              const header = table.getFlatHeaders()[virtualColumn.index];
              return (
                <div
                  key={header.id}
                  className="table-header-cell"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: `${virtualColumn.size}px`,
                    transform: `translateX(${virtualColumn.start}px)`,
                  }}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </div>
              );
            })}
          </div>

          {/* Body */}
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const row = rows[virtualRow.index];
            return (
              <div
                key={row.id}
                className="table-row"
                style={{
                  display: 'flex',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start + 40}px)`,
                }}
              >
                {columnVirtualizer.getVirtualItems().map((virtualColumn) => {
                  const cell = row.getVisibleCells()[virtualColumn.index];
                  return (
                    <div
                      key={cell.id}
                      className="table-cell"
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: `${virtualColumn.size}px`,
                        transform: `translateX(${virtualColumn.start}px)`,
                      }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      <div className="pagination-controls">
        <button
          onClick={() => onPageChange(0, pageSize)}
          disabled={currentPage === 0}
          className="pagination-btn"
        >
          {'<<'}
        </button>
        <button
          onClick={() => onPageChange(currentPage - 1, pageSize)}
          disabled={currentPage === 0}
          className="pagination-btn"
        >
          {'<'}
        </button>
        <span className="page-info">
          Page {currentPage + 1} of {totalPages}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1, pageSize)}
          disabled={currentPage >= totalPages - 1}
          className="pagination-btn"
        >
          {'>'}
        </button>
        <button
          onClick={() => onPageChange(totalPages - 1, pageSize)}
          disabled={currentPage >= totalPages - 1}
          className="pagination-btn"
        >
          {'>>'}
        </button>
        <select
          value={pageSize}
          onChange={(e) => {
            onPageChange(0, Number(e.target.value));
          }}
          className="page-size-select"
        >
          {[10, 20, 30, 50, 100].map((size) => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default DataTable;
