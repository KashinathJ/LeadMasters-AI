import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Get MongoDB URI from environment variable
MONGODB_URI = os.getenv('MONGODB_URI')
if not MONGODB_URI:
    print("Warning: MONGODB_URI not found in environment variables. Using default: mongodb://localhost:27017/quicktask")
    MONGODB_URI = 'mongodb://localhost:27017/quicktask'

# Get Analytics Port from environment variable
ANALYTICS_PORT = os.getenv('ANALYTICS_PORT', '8000')
try:
    ANALYTICS_PORT = int(ANALYTICS_PORT)
except ValueError:
    print(f"Warning: Invalid ANALYTICS_PORT value '{ANALYTICS_PORT}'. Using default: 8000")
    ANALYTICS_PORT = 8000
