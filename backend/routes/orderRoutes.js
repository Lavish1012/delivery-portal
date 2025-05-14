const express = require('express');
const { createOrder, updateOrderStatus, deleteOrder, getOrderById, listOrders } = require('../controllers/orderController');
const { authenticateUser, authorizeRole } = require('../middleware/authMiddleware');
const Order = require('../models/Order');

const router = express.Router();

// Debug routes must come first since they're specific paths
router.get('/debug-all', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
});

router.get('/debug-populated', async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('customerId', 'name email')
      .populate('shopkeeperId', 'name location')
      .populate('items.itemId', 'name price');

    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching populated orders', error: error.message });
  }
});

// Create a new order (Customer only)
router.post('/', authenticateUser, authorizeRole('customer'), createOrder);

// List all orders (Customer or Shopkeeper)
router.get('/', authenticateUser, listOrders);

// Get order details by ID (Customer or Shopkeeper)
router.get('/:id', authenticateUser, getOrderById);

// Update order status (Shopkeeper only)
router.put('/:id', authenticateUser, authorizeRole('shopkeeper'), updateOrderStatus);

// Delete an order (Shopkeeper only)
router.delete('/:id', authenticateUser, authorizeRole('shopkeeper'), deleteOrder);

module.exports = router;
