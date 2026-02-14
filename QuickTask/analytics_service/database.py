from pymongo import MongoClient
from config import MONGODB_URI

class Database:
    _instance = None
    _client = None
    _db = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(Database, cls).__new__(cls)
        return cls._instance

    def connect(self):
        if self._client is None:
            try:
                self._client = MongoClient(MONGODB_URI, serverSelectionTimeoutMS=5000)
                # Test connection
                self._client.admin.command('ping')
                # Get database name from URI or use default
                db_name = MONGODB_URI.split('/')[-1].split('?')[0] if '/' in MONGODB_URI else 'quicktask'
                self._db = self._client[db_name] if db_name else self._client.get_database()
                print(f"✓ Connected to MongoDB: {MONGODB_URI}")
            except Exception as e:
                print(f"✗ Error connecting to MongoDB: {e}")
                print(f"  Please check your MONGODB_URI in .env file: {MONGODB_URI}")
                raise
        return self._db

    def get_db(self):
        if self._db is None:
            return self.connect()
        return self._db

    def close(self):
        if self._client:
            self._client.close()
            self._client = None
            self._db = None

# Global database instance
db_instance = Database()
