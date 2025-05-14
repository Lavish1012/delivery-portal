const express = require('express');
const { updateTracking, getTrackingHistory, getCurrentStatus } = require('../controllers/trackingController');
const { authenticateUser, authorizeRole } = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @route   PUT /api/tracking/orders/:orderId
 * @desc    Update tracking information for an order
 * @access  Private - Shopkeepers only
 */
router.put('/orders/:orderId', 
  authenticateUser, 
  authorizeRole('shopkeeper'), 
  updateTracking
);

/**
 * @route   GET /api/tracking/orders/:orderId
 * @desc    Get full tracking history for an order
 * @access  Private - Customer who placed the order or Shopkeeper who owns the order
 */
router.get('/orders/:orderId', 
  authenticateUser, 
  getTrackingHistory
);

/**
 * @route   GET /api/tracking/orders/:orderId/status
 * @desc    Get current status and location (lightweight response)
 * @access  Private - Customer who placed the order or Shopkeeper who owns the order
 */
router.get('/orders/:orderId/status', 
  authenticateUser, 
  getCurrentStatus
);

module.exports = router;

