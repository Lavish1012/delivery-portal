const Order = require('../models/Order');

// Create a new order
const createOrder = async (req, res) => {
  try {
    const { items, totalAmount, shopkeeperId } = req.body;

    // Initialize tracking details with an initial status
    const initialStatus = 'pending';
    const trackingDetails = {
      statusUpdates: [{
        status: initialStatus,
        timestamp: new Date(),
        note: 'Order created'
      }]
    };

    const newOrder = await Order.create({
      customerId: req.user ? req.user.id : null,
      shopkeeperId,
      items,
      totalAmount,
      status: initialStatus,
      trackingDetails
    });

    // Populate the response with all relevant fields
    const populatedOrder = await Order.findById(newOrder._id)
      .populate('customerId', 'name email')
      .populate('shopkeeperId', 'name location')
      .populate('items.itemId', 'name price');

    res.status(201).json({
      message: 'Order created successfully',
      order: populatedOrder
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, note } = req.body;

    // First, get the current order to validate status transition
    const order = await Order.findById(id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Validate status transition - same logic as in trackingController
    const currentStatus = order.status;
    
    if (currentStatus !== status) {
      const validTransitions = {
        'pending': ['processing', 'cancelled'],
        'processing': ['out_for_delivery', 'cancelled'],
        'out_for_delivery': ['delivered', 'cancelled'],
        'delivered': [],  // Cannot change from delivered
        'cancelled': []   // Cannot change from cancelled
      };

      if (!validTransitions[currentStatus]?.includes(status)) {
        return res.status(400).json({ 
          message: `Cannot transition from '${currentStatus}' to '${status}'` 
        });
      }
    }

    // Initialize tracking details if needed
    if (!order.trackingDetails) {
      order.trackingDetails = {
        statusUpdates: []
      };
    }

    // Add the new status update to tracking history
    const statusUpdate = {
      status,
      timestamp: new Date(),
      note: note || `Status changed to ${status}`
    };

    // Push the status update to the array
    order.trackingDetails.statusUpdates = 
      [...(order.trackingDetails.statusUpdates || []), statusUpdate];
    
    // Update the main status
    order.status = status;
    
    // Save the updated order
    await order.save();

    // Get the freshly updated order with populated fields
    const updatedOrder = await Order.findById(id)
      .populate('customerId', 'name email')
      .populate('shopkeeperId', 'name location')
      .populate('items.itemId', 'name price');

    res.status(200).json({ message: 'Order status updated', order: updatedOrder });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ message: 'Error updating order status', error: error.message });
  }
};

// Delete an order
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Delete order error:', error);
    res.status(500).json({ message: 'Error deleting order', error: error.message });
  }
};

// Get order by ID
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id)
      .populate('customerId', 'name email')
      .populate('shopkeeperId', 'name location')
      .populate('items.itemId', 'name price');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ order });
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ message: 'Error fetching order details', error: error.message });
  }
};

// List all orders (Customer or Shopkeeper)
const listOrders = async (req, res) => {
  try {
    let filter = {};
    
    // If user exists and has a role, filter by role
    if (req.user && req.user.role) {
      filter = req.user.role === 'customer'
        ? { customerId: req.user.id }
        : { shopkeeperId: req.user.id };
    }

    const orders = await Order.find(filter)
      .populate('customerId', 'name email')
      .populate('shopkeeperId', 'name location')
      .populate('items.itemId', 'name price');

    res.status(200).json({ orders });
  } catch (error) {
    console.error('List orders error:', error);
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
};

module.exports = {
  createOrder,
  updateOrderStatus,
  deleteOrder,
  getOrderById,
  listOrders,
};
