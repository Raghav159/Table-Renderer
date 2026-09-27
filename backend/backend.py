from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the CSV file
CSV_FILE = os.path.join(os.path.dirname(__file__), 'large_data.csv')

def load_data():
    """Load CSV data into pandas DataFrame"""
    try:
        df = pd.read_csv(CSV_FILE)
        # Strip whitespace from column names
        df.columns = df.columns.str.strip()
        return df
    except Exception as e:
        print(f"Error loading CSV: {e}")
        return None

@app.route('/api/data', methods=['GET'])
def get_data():
    """
    Get paginated data from CSV
    Query parameters:
    - page: page number (default: 0)
    - pageSize: number of rows per page (default: 50)
    """
    try:
        df = load_data()
        if df is None:
            return jsonify({'error': 'Failed to load data'}), 500
        
        # Get pagination parameters
        page = int(request.args.get('page', 0))
        page_size = int(request.args.get('pageSize', 50))
        
        # Calculate start and end indices
        start_idx = page * page_size
        end_idx = start_idx + page_size
        
        # Get paginated data
        paginated_df = df.iloc[start_idx:end_idx]
        
        # Convert to list of dictionaries
        data = paginated_df.to_dict('records')
        
        return jsonify({
            'data': data,
            'page': page,
            'pageSize': page_size,
            'totalRows': len(df),
            'totalPages': (len(df) + page_size - 1) // page_size
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy'})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
