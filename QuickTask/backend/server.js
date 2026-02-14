const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ message: 'QuickTask API is running', status: 'OK' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

// Validate JWT_SECRET
if (!process.env.JWT_SECRET) {
  console.error('✗ Error: JWT_SECRET is not defined in environment variables');
  console.error('  Please create a .env file in the backend directory with JWT_SECRET');
  process.exit(1);
}

app.listen(PORT, () => {
  console.log(`✓ Server running on port ${PORT}`);
  console.log(`✓ API Base URL: http://localhost:${PORT}/api`);
  console.log(`✓ Health Check: http://localhost:${PORT}/api/health`);
});
