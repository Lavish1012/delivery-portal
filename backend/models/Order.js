const mongoose = require('mongoose');

// Define status update sub-schema
const statusUpdateSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ['pending', 'processing', 'out_for_delivery', 'delivered', 'cancelled'],
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now,
    required: true
  },
  note: {
    type: String,
    maxlength: 500
  }
}, { _id: false });

// Define delivery agent sub-schema
const deliveryAgentSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  contact: {
    type: String,
    required: true,
    trim: true
  }
}, { _id: false });

// Define location sub-schema
const locationSchema = new mongoose.Schema({
  coordinates: {
    type: [Number],
    validate: {
      validator: function(v) {
        // Basic validation for [latitude, longitude]
        return v.length === 2 && 
               v[0] >= -90 && v[0] <= 90 && 
               v[1] >= -180 && v[1] <= 180;
      },
      message: props => `${props.value} is not a valid [latitude, longitude] pair!`
    }
  },
  description: {
    type: String,
    trim: true,
    maxlength: 200
  }
}, { _id: false });

const orderSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false  // Making it optional for simplified testing
  },
  shopkeeperId: {
    type: String,
    required: true
  },
  items: [{
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    }
  }],
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'delivered', 'cancelled'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  trackingDetails: {
    currentLocation: locationSchema,
    statusUpdates: [statusUpdateSchema],
    estimatedDeliveryTime: {
      type: Date
    },
    deliveryAgent: deliveryAgentSchema
  }
});

// Pre-save middleware to ensure the status matches the latest status update
orderSchema.pre('save', function(next) {
  if (this.trackingDetails && this.trackingDetails.statusUpdates && this.trackingDetails.statusUpdates.length > 0) {
    // Get the most recent status update
    const latestStatusUpdate = this.trackingDetails.statusUpdates[this.trackingDetails.statusUpdates.length - 1];
    // Update the order status to match
    this.status = latestStatusUpdate.status;
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema);
