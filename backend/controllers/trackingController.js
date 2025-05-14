const Order = require('../models/Order');
const User = require('../models/User');
const mongoose = require('mongoose');

/**
 * Update tracking details for an order
 * Access: Shopkeeper only
 */
const updateTracking = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { 
      currentLocation,
      statusUpdate,
      estimatedDeliveryTime,
      deliveryAgent 
    } = req.body;

    // Validate orderId
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({ message: 'Invalid order ID format' });
    }

    // Find the order
    const order = await Order.findById(orderId);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if the shopkeeper owns this order
    if (order.shopkeeperId.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this order' });
    }

    // Initialize tracking details if it doesn't exist
    if (!order.trackingDetails) {
      order.trackingDetails = {};
    }

    // Update current location if provided
    if (currentLocation) {
      // Validate coordinates if provided
      if (currentLocation.coordinates && 
          (!Array.isArray(currentLocation.coordinates) || 
           currentLocation.coordinates.length !== 2 ||
           currentLocation.coordinates[0] < -90 || currentLocation.coordinates[0] > 90 ||
           currentLocation.coordinates[1] < -180 || currentLocation.coordinates[1] > 180)) {
        return res.status(400).json({ 
          message: 'Invalid coordinates. Must be [latitude, longitude] with valid ranges.' 
        });
      }

      order.trackingDetails.currentLocation = currentLocation;
    }

    // Add status update if provided
    if (statusUpdate) {
      // Validate status
      if (!['pending', 'processing', 'out_for_delivery', 'delivered', 'cancelled'].includes(statusUpdate.status)) {
        return res.status(400).json({ message: 'Invalid status value' });
      }

      // Validate status transitions
      const currentStatus = order.status;
      const newStatus = statusUpdate.status;
      
      // Define valid status transitions
      const validTransitions = {
        'pending': ['processing', 'cancelled'],
        'processing': ['out_for_delivery', 'cancelled'],
        'out_for_delivery': ['delivered', 'cancelled'],
        'delivered': [],  // Cannot change from delivered
        'cancelled': []   // Cannot change from cancelled
      };

      if (!validTransitions[currentStatus].includes(newStatus) && currentStatus !== newStatus) {
        return res.status(400).json({ 
          message: `Cannot transition from '${currentStatus}' to '${newStatus}'` 
        });
      }

      // Initialize statusUpdates array if it doesn't exist
      if (!order.trackingDetails.statusUpdates) {
        order.trackingDetails.statusUpdates = [];
      }

      // Add the new status update with current timestamp
      order.trackingDetails.statusUpdates.push({
        status: statusUpdate.status,
        timestamp: statusUpdate.timestamp || new Date(),
        note: statusUpdate.note
      });
    }

    // Update estimated delivery time if provided
    if (estimatedDeliveryTime) {
      // Validate the date format
      const deliveryDate = new Date(estimatedDeliveryTime);
      if (isNaN(deliveryDate.getTime())) {
        return res.status(400).json({ message: 'Invalid date format for estimated delivery time' });
      }
      
      order.trackingDetails.estimatedDeliveryTime = deliveryDate;
    }

    // Update delivery agent if provided
    if (deliveryAgent) {
      // Validate required fields
      if (!deliveryAgent.name || !deliveryAgent.contact) {
        return res.status(400).json({ 
          message: 'Delivery agent must have name and contact information' 
        });
      }

      // If agent ID is provided, validate it exists
      if (deliveryAgent.id) {
        if (!mongoose.Types.ObjectId.isValid(deliveryAgent.id)) {
          return res.status(400).json({ message: 'Invalid delivery agent ID format' });
        }
        
        const agentExists = await User.findById(deliveryAgent.id);
        if (!agentExists) {
          return res.status(400).json({ message: 'Delivery agent not found' });
        }
      }

      order.trackingDetails.deliveryAgent = deliveryAgent;
    }

    // Save the updated order
    await order.save();

    // Return the updated order with populated fields
    const updatedOrder = await Order.findById(orderId)
      .populate('customerId', 'name email')
      .populate('shopkeeperId', 'name location')
      .populate('items.itemId', 'name price');

    res.status(200).json({
      message: 'Tracking information updated successfully',
      order: updatedOrder
    });
  } catch (error) {
    console.error('Update tracking error:', error);
    res.status(500).json({ 
      message: 'Error updating tracking information', 
      error: error.message 
    });
  }
};

/**
 * Get tracking history for an order
 * Access: Customer who placed the order, Shopkeeper who owns the order
 */
const getTrackingHistory = async (req, res) => {
  try {
    const { orderId } = req.params;

    // Validate orderId
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({ message: 'Invalid order ID format' });
    }

    const order = await Order.findById(orderId)
      .populate('customerId', 'name email')
      .populate('shopkeeperId', 'name location')
      .populate('items.itemId', 'name price');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if user has permission to view this order
    const isCustomer = order.customerId && req.user.id.toString() === order.customerId._id.toString();
    const isShopkeeper = req.user.id.toString() === order.shopkeeperId.toString();

    if (!isCustomer && !isShopkeeper && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to view this order' });
    }

    // Return full tracking history
    if (!order.trackingDetails) {
      return res.status(200).json({
        message: 'No tracking information available for this order',
        orderId: order._id,
        trackingDetails: null
      });
    }

    res.status(200).json({
      orderId: order._id,
      status: order.status,
      trackingDetails: order.trackingDetails,
      customerInfo: order.customerId,
      shopkeeperInfo: order.shopkeeperId,
      createdAt: order.createdAt
    });
  } catch (error) {
    console.error('Get tracking history error:', error);
    res.status(500).json({ 
      message: 'Error retrieving tracking history', 
      error: error.message 
    });
  }
};

/**
 * Get current status for an order (lightweight response)
 * Access: Customer who placed the order, Shopkeeper who owns the order
 */
const getCurrentStatus = async (req, res) => {
  try {
    const { orderId } = req.params;

    // Validate orderId
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({ message: 'Invalid order ID format' });
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if user has permission to view this order
    const isCustomer = order.customerId && req.user.id.toString() === order.customerId.toString();
    const isShopkeeper = req.user.id.toString() === order.shopkeeperId.toString();

    if (!isCustomer && !isShopkeeper && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to view this order' });
    }

    // Create a lightweight response with just the essential tracking information
    const response = {
      orderId: order._id,
      status: order.status,
      currentLocation: order.trackingDetails?.currentLocation || null,
      estimatedDeliveryTime: order.trackingDetails?.estimatedDeliveryTime || null,
      lastUpdated: order.trackingDetails?.statusUpdates?.length > 0 
        ? order.trackingDetails.statusUpdates[order.trackingDetails.statusUpdates.length - 1].timestamp 
        : order.createdAt
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Get current status error:', error);
    res.status(500).json({ 
      message: 'Error retrieving current status', 
      error: error.message 
    });
  }
};

module.exports = {
  updateTracking,
  getTrackingHistory,
  getCurrentStatus
};

