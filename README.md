# Large Data Table Renderer

A full-stack application for efficiently rendering and navigating large CSV datasets using TanStack Table and TanStack Virtual.

## Features

- **Backend (Python/Flask)**: Reads CSV data and serves it as JSON API
- **Frontend (React)**: Efficiently renders large tables with:
  - **TanStack Table**: Powerful table management with sorting and pagination
  - **TanStack Virtual**: Virtual scrolling for rows and columns
  - Responsive UI with smooth scrolling
  - Configurable page sizes
  - Column sorting

## Tech Stack

### Backend

- Python 3.x
- Flask
- Flask-CORS
- Pandas

### Frontend

- React 18
- Vite
- TanStack Table v8
- TanStack Virtual v3

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:

   ```cmd
   cd backend
   ```

2. Create a virtual environment (optional but recommended):

   ```cmd
   python -m venv venv
   venv\Scripts\activate
   ```

3. Install dependencies:

   ```cmd
   pip install -r requirements.txt
   ```

4. Run the backend server:

   ```cmd
   python backend.py
   ```

   The backend will start on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:

   ```cmd
   cd frontend
   ```

2. Install dependencies (if not already done):

   ```cmd
   npm install
   ```

3. Run the development server:

   ```cmd
   npm run dev
   ```

   The frontend will start on `http://localhost:5173`

## Usage

1. Start the backend server first (runs on port 5000)
2. Start the frontend development server (runs on port 5173)
3. Open your browser to `http://localhost:5173`
4. The table will load data from `large_data.csv` and display it with:
   - Virtual scrolling for smooth performance
   - Pagination controls
   - Sortable columns (click on column headers)
   - Configurable page size (10, 20, 30, 40, 50 rows)

## API Endpoints

- `GET /api/data` - Returns all data from the CSV file
- `GET /api/columns` - Returns column metadata
- `GET /api/stats` - Returns dataset statistics
- `GET /health` - Health check endpoint

## Performance Optimizations

- **Virtual Scrolling**: Only renders visible rows and columns
- **Client-side Pagination**: Reduces re-fetching overhead
- **React Memoization**: Prevents unnecessary re-renders
- **Efficient Data Structures**: Uses TanStack's optimized table state management

## Data File

Place your CSV file at `backend/large_data.csv`. The application will automatically read and display it.

## Project Structure

### Frontend Architecture

The frontend is organized into modular, reusable components:

```
frontend/src/
├── App.jsx                    # Main application orchestrator
├── App.css                    # Global app styles
├── components/                # UI components
│   ├── DataTable.jsx         # Virtualized table component
│   ├── DataTable.css         # Table styles
│   ├── LoadingSpinner.jsx    # Loading state display
│   ├── LoadingSpinner.css
│   ├── ErrorMessage.jsx      # Error state display
│   ├── ErrorMessage.css
│   ├── StatsPanel.jsx        # Dataset statistics display
│   └── StatsPanel.css
└── hooks/                     # Custom React hooks
    └── useDataFetch.js       # Data fetching logic
```

**Benefits:**

- ✅ Separation of concerns - each file has a single responsibility
- ✅ Reusable components that can be used independently
- ✅ Easy to maintain and test
- ✅ Scalable architecture for future features
- ✅ Clean import structure with co-located styles

