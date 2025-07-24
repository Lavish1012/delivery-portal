require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');
const trackingRoutes = require('./routes/trackingRoutes');

const app = express();

// Middleware
const corsOptions = {
  origin: true, // Reflects the request origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  credentials: true,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  const { method, originalUrl } = req;
  console.log(`${timestamp} - ${method} ${originalUrl}`);
  next();
});

// MongoDB Connection with better error handling
mongoose
  .connect(process.env.MONGO_URI || 'mongodb://localhost:27017/shop_inventory')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// API Routes - All API routes are handled first
const apiRouter = express.Router();

// Test endpoint for API health check
apiRouter.get('/test', (req, res) => {
  console.log('Test endpoint called');
  res.json({ message: 'API is working' });
});

// Mount API route modules
apiRouter.use('/auth', authRoutes);
apiRouter.use('/orders', orderRoutes);
apiRouter.use('/tracking', trackingRoutes);

// API 404 handler - catches any unmatched API routes
apiRouter.use((req, res) => {
  res.status(404).json({ message: 'API endpoint not found' });
});

// Mount the entire API router under /api
app.use('/api', apiRouter);

// Serve static files - comes after API routes but before SPA handler
app.use(express.static(path.join(__dirname, '../frontend/build')));

// SPA handler - serves index.html for all unmatched routes
// This must be the last route handler
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// Error handling middleware - must be last
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ message: 'An unexpected error occurred', error: err.message });
});

// Server Start with explicit localhost binding
const PORT = process.env.PORT || 5000;
const HOST = 'localhost';

const server = app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
  console.log('Try accessing the test endpoint at http://localhost:5000/api/test');
  console.log('Server is working');
}).on('error', (error) => {
  console.error('Server error:', error);
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Please try a different port or kill the process using this port.`);
  }
  process.exit(1);
});

// Increase server timeout
server.timeout = 120000; // Set timeout to 2 minutes

// Check for required environment variables
if (!process.env.JWT_SECRET) {
  console.warn('Warning: JWT_SECRET environment variable is not set. Using a default secret for development.');
  process.env.JWT_SECRET = 'development-secret-key';
}

// Handle server events
server.on('connection', (socket) => {
  const clientAddress = socket.remoteAddress + ':' + socket.remotePort;
  console.log('New connection from ' + clientAddress);
  socket.on('error', (err) => {
    console.error('Socket error from ' + clientAddress + ':', err);
  });
});

process.on('SIGTERM', () => {
  console.log('Received SIGTERM. Performing graceful shutdown...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error);
  server.close(() => {
    process.exit(1);
  });
});

module.exports = app;
