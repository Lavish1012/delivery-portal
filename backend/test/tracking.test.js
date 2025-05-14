const request = require('supertest');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const app = require('../server');
const Order = require('../models/Order');
const User = require('../models/User');

// Test constants
const MOCK_USER_IDS = {
  customer: new mongoose.Types.ObjectId(),
  shopkeeper: new mongoose.Types.ObjectId(),
  admin: new mongoose.Types.ObjectId()
};

const MOCK_JWT_SECRET = process.env.JWT_SECRET || 'test-jwt-secret';

// Mock users with different roles
const mockUsers = {
  customer: {
    _id: MOCK_USER_IDS.customer,
    name: 'Test Customer',
    email: 'customer@test.com',
    role: 'customer'
  },
  shopkeeper: {
    _id: MOCK_USER_IDS.shopkeeper,
    name: 'Test Shopkeeper',
    email: 'shopkeeper@test.com',
    role: 'shopkeeper'
  },
  admin: {
    _id: MOCK_USER_IDS.admin,
    name: 'Test Admin',
    email: 'admin@test.com',
    role: 'admin'
  }
};

// Generate tokens for each user
const generateToken = (userId, role) => {
  return jwt.sign({ id: userId, role }, MOCK_JWT_SECRET, { expiresIn: '1h' });
};

const tokens = {
  customer: generateToken(MOCK_USER_IDS.customer, 'customer'),
  shopkeeper: generateToken(MOCK_USER_IDS.shopkeeper, 'shopkeeper'),
  admin: generateToken(MOCK_USER_IDS.admin, 'admin')
};

// Test order data
let testOrder;

// Setup and teardown
beforeAll(async () => {
  // Connect to test database if not connected
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_URI_TEST || 'mongodb://localhost:27017/delivery_portal_test');
  }
  
  // Create mock users in the database
  await User.deleteMany({});
  await User.insertMany(Object.values(mockUsers));
});

beforeEach(async () => {
  // Clear orders collection and create a test order
  await Order.deleteMany({});
  
  const orderData = {
    customerId: MOCK_USER_IDS.customer,
    shopkeeperId: MOCK_USER_IDS.shopkeeper.toString(),
    items: [
      {
        itemId: new mongoose.Types.ObjectId(),
        quantity: 2
      }
    ],
    totalAmount: 25.99,
    status: 'pending',
    trackingDetails: {
      statusUpdates: [
        {
          status: 'pending',
          timestamp: new Date(),
          note: 'Order created'
        }
      ]
    }
  };
  
  testOrder = await Order.create(orderData);
});

afterEach(async () => {
  // Clear orders after each test
  await Order.deleteMany({});
});

afterAll(async () => {
  // Disconnect from test database
  await mongoose.connection.close();
});

describe('Tracking API', () => {
  describe('Authentication and Authorization', () => {
    test('Should reject requests without a token', async () => {
      const response = await request(app)
        .get(`/api/tracking/orders/${testOrder._id}`);
      
      expect(response.status).toBe(401);
    });
    
    test('Should reject update requests from customers', async () => {
      const response = await request(app)
        .put(`/api/tracking/orders/${testOrder._id}`)
        .set('Authorization', `Bearer ${tokens.customer}`)
        .send({
          statusUpdate: {
            status: 'processing',
            note: 'Processing order'
          }
        });
      
      expect(response.status).toBe(403);
    });
    
    test('Should allow shopkeepers to update their own orders', async () => {
      const response = await request(app)
        .put(`/api/tracking/orders/${testOrder._id}`)
        .set('Authorization', `Bearer ${tokens.shopkeeper}`)
        .send({
          statusUpdate: {
            status: 'processing',
            note: 'Processing order'
          }
        });
      
      expect(response.status).toBe(200);
    });
  });
  
  describe('Update Tracking Information', () => {
    test('Should update location information', async () => {
      const response = await request(app)
        .put(`/api/tracking/orders/${testOrder._id}`)
        .set('Authorization', `Bearer ${tokens.shopkeeper}`)
        .send({
          currentLocation: {
            coordinates: [40.7128, -74.0060],
            description: 'On the way to delivery address'
          }
        });
      
      expect(response.status).toBe(200);
      expect(response.body.order.trackingDetails.currentLocation.coordinates).toEqual([40.7128, -74.0060]);
      expect(response.body.order.trackingDetails.currentLocation.description).toBe('On the way to delivery address');
    });
    
    test('Should reject invalid coordinates', async () => {
      const response = await request(app)
        .put(`/api/tracking/orders/${testOrder._id}`)
        .set('Authorization', `Bearer ${tokens.shopkeeper}`)
        .send({
          currentLocation: {
            coordinates: [200, -74.0060], // Invalid latitude (must be -90 to 90)
            description: 'On the way to delivery address'
          }
        });
      
      expect(response.status).toBe(400);
    });
    
    test('Should update status with a note', async () => {
      const response = await request(app)
        .put(`/api/tracking/orders/${testOrder._id}`)
        .set('Authorization', `Bearer ${tokens.shopkeeper}`)
        .send({
          statusUpdate: {
            status: 'processing',
            note: 'Order is being prepared'
          }
        });
      
      expect(response.status).toBe(200);
      expect(response.body.order.status).toBe('processing');
      
      // Check the status update was added to the history
      const statusUpdates = response.body.order.trackingDetails.statusUpdates;
      const lastUpdate = statusUpdates[statusUpdates.length - 1];
      expect(lastUpdate.status).toBe('processing');
      expect(lastUpdate.note).toBe('Order is being prepared');
    });
    
    test('Should reject invalid status transitions', async () => {
      // First update to processing
      await request(app)
        .put(`/api/tracking/orders/${testOrder._id}`)
        .set('Authorization', `Bearer ${tokens.shopkeeper}`)
        .send({
          statusUpdate: {
            status: 'processing',
            note: 'Order is being prepared'
          }
        });
      
      // Try to update from processing directly to delivered (invalid)
      const response = await request(app)
        .put(`/api/tracking/orders/${testOrder._id}`)
        .set('Authorization', `Bearer ${tokens.shopkeeper}`)
        .send({
          statusUpdate: {
            status: 'delivered',
            note: 'Order delivered'
          }
        });
      
      expect(response.status).toBe(400);
      expect(response.body.message).toMatch(/Cannot transition from/);
    });
    
    test('Should update estimated delivery time', async () => {
      const estimatedTime = new Date();
      estimatedTime.setHours(estimatedTime.getHours() + 1); // 1 hour from now
      
      const response = await request(app)
        .put(`/api/tracking/orders/${testOrder._id}`)
        .set('Authorization', `Bearer ${tokens.shopkeeper}`)
        .send({
          estimatedDeliveryTime: estimatedTime.toISOString()
        });
      
      expect(response.status).toBe(200);
      expect(new Date(response.body.order.trackingDetails.estimatedDeliveryTime)).toBeInstanceOf(Date);
    });
    
    test('Should update delivery agent information', async () => {
      const response = await request(app)
        .put(`/api/tracking/orders/${testOrder._id}`)
        .set('Authorization', `Bearer ${tokens.shopkeeper}`)
        .send({
          deliveryAgent: {
            name: 'John Delivery',
            contact: '+1234567890'
          }
        });
      
      expect(response.status).toBe(200);
      expect(response.body.order.trackingDetails.deliveryAgent.name).toBe('John Delivery');
      expect(response.body.order.trackingDetails.deliveryAgent.contact).toBe('+1234567890');
    });
    
    test('Should reject delivery agent without required fields', async () => {
      const response = await request(app)
        .put(`/api/tracking/orders/${testOrder._id}`)
        .set('Authorization', `Bearer ${tokens.shopkeeper}`)
        .send({
          deliveryAgent: {
            name: 'John Delivery'
            // Missing contact field
          }
        });
      
      expect(response.status).toBe(400);
    });
  });
  
  describe('Get Tracking Information', () => {
    test('Should get full tracking history', async () => {
      // First add some tracking updates
      await request(app)
        .put(`/api/tracking/orders/${testOrder._id}`)
        .set('Authorization', `Bearer ${tokens.shopkeeper}`)
        .send({
          statusUpdate: {
            status: 'processing',
            note: 'Order is being prepared'
          },
          currentLocation: {
            coordinates: [40.7128, -74.0060],
            description: 'At the shop'
          }
        });
      
      const response = await request(app)
        .get(`/api/tracking/orders/${testOrder._id}`)
        .set('Authorization', `Bearer ${tokens.customer}`);
      
      expect(response.status).toBe(200);
      expect(response.body.trackingDetails.statusUpdates.length).toBe(2);
      expect(response.body.trackingDetails.currentLocation).toBeTruthy();
    });
    
    test('Should get current status (lightweight response)', async () => {
      // First add some tracking updates
      await request(app)
        .put(`/api/tracking/orders/${testOrder._id}`)
        .set('Authorization', `Bearer ${tokens.shopkeeper}`)
        .send({
          statusUpdate: {
            status: 'processing',
            note: 'Order is being prepared'
          },
          currentLocation: {
            coordinates: [40.7128, -74.0060],
            description: 'At the shop'
          },
          estimatedDeliveryTime: new Date(Date.now() + 60 * 60 * 1000).toISOString()
        });
      
      const response = await request(app)
        .get(`/api/tracking/orders/${testOrder._id}/status`)
        .set('Authorization', `Bearer ${tokens.customer}`);
      
      expect(response.status).toBe(200);
      expect(response.body.status).toBe('processing');
      expect(response.body.currentLocation).toBeTruthy();
      expect(response.body.estimatedDeliveryTime).toBeTruthy();
      expect(response.body.lastUpdated).toBeTruthy();
      
      // Lightweight response should not include full status history
      expect(response.body.trackingDetails).toBeUndefined();
    });
    
    test('Should reject access to other customers orders', async () => {
      // Create a new order with a different customer
      const otherCustomerId = new mongoose.Types.ObjectId();
      const otherCustomerOrder = await Order.create({
        customerId: otherCustomerId,
        shopkeeperId: MOCK_USER_IDS.shopkeeper.toString(),
        items: [{ itemId: new mongoose.Types.ObjectId(), quantity: 1 }],
        totalAmount: 15.99,
        status: 'pending'
      });
      
      const response = await request(app)
        .get(`/api/tracking/orders/${otherCustomerOrder._id}`)
        .set('Authorization', `Bearer ${tokens.customer}`);
      
      expect(response.status).toBe(403);
    });
  });
  
  describe('Complete Order Lifecycle', () => {
    test('Should handle a complete order lifecycle with tracking updates', async () => {
      // Step 1: Process the order
      let response = await request(app)
        .put(`/api/tracking/orders/${testOrder._id}`)
        .set('Authorization', `Bearer ${tokens.shopkeeper}`)
        .send({
          statusUpdate: {
            status: 'processing',
            note: 'Order is being prepared'
          }
        });
      
      expect(response.status).toBe(200);
      expect(response.body.order.status).toBe('processing');
      
      // Step 2: Assign delivery agent and set estimated time
      const estimatedTime = new Date();
      estimatedTime.setHours(estimatedTime.getHours() + 1);
      
      response = await request(app)
        .put(`/api/tracking/orders/${testOrder._id}`)
        .set('Authorization', `Bearer ${tokens.shopkeeper}`)
        .send({
          deliveryAgent: {
            name: 'Delivery Agent',
            contact: '+1234567890'
          },
          estimatedDeliveryTime: estimatedTime.toISOString()
        });
      
      expect(response.status).toBe(200);
      expect(response.body.order.trackingDetails.deliveryAgent).toBeTruthy();
      
      // Step 3: Mark as out for delivery with location
      response = await request(app)
        .put(`/api/tracking/orders/${testOrder._id}`)
        .set('Authorization', `Bearer ${tokens.shopkeeper}`)
        .send({
          statusUpdate: {
            status: 'out_for_delivery',
            note: 'Order has left the shop'
          },
          currentLocation: {
            coordinates: [40.7128, -74.0060],
            description: 'Delivery vehicle is en route'
          }
        });
      
      expect(response.status).toBe(200);
      expect(response.body.order.status).toBe('out_for_delivery');
      
      // Step 4: Update location during delivery
      response = await request(app)
        .put(`/api/tracking/orders/${testOrder._id}`)
        .set('Authorization', `Bearer ${tokens.shopkeeper}`)
        .send({
          currentLocation: {
            coordinates: [40.7200, -74.0100],
            description: '2 blocks away from delivery address'
          }
        });
      
      expect(response.status).toBe(200);
      
      // Step 5: Mark as delivered
      response = await request(app)
        .put(`/api/tracking/orders/${testOrder._id}`)
        .set('Authorization', `Bearer ${tokens.shopkeeper}`)
        .send({
          statusUpdate: {
            status: 'delivered',
            note: 'Order successfully delivered'
          },
          currentLocation: {
            coordinates: [40.7250, -74.0150],
            description: 'At delivery address'
          }
        });
      
      expect(response.status).toBe(200);
      expect(response.body.order.status).toBe('delivered');
      
      // Check final order state through the full tracking history endpoint
      response = await request(app)
        .get(`/api/tracking/orders/${testOrder._id}`)
        .set('Authorization', `Bearer ${tokens.customer}`);
      
      expect(response.status).toBe(200);
      expect(response.body.status).toBe('delivered');
      expect(response.body.trackingDetails.statusUpdates.length).toBe(4); // pending, processing, out_for_delivery, delivered
      
      // Try to modify a delivered order (should fail)
      response = await request(app)
        .put(`/api/tracking/orders/${testOrder._id}`)
        .set('Authorization', `Bearer ${tokens.shopkeeper}`)
        .send({
          statusUpdate: {
            status: 'processing', // Try to revert status
            note: 'Attempt to modify delivered order'
          }
        });
      
      expect(response.status).toBe(400); // Should reject with bad request
    });
    
    test('Should handle order cancellation at any point', async () => {
      // First set the order to processing
      await request(app)
        .put(`/api/tracking/orders/${testOrder._id}`)
        .set('Authorization', `Bearer ${tokens.shopkeeper}`)
        .send({
          statusUpdate: {
            status: 'processing',
            note: 'Processing order'
          }
        });
      
      // Then cancel the order
      const response = await request(app)
        .put(`/api/tracking/orders/${testOrder._id}`)
        .set('Authorization', `Bearer ${tokens.shopkeeper}`)
        .send({
          statusUpdate: {
            status: 'cancelled',
            note: 'Customer requested cancellation'
          }
        });
      
      expect(response.status).toBe(200);
      expect(response.body.order.status).toBe('cancelled');
      
      // Try to modify a cancelled order (should fail)
      const modifyResponse = await request(app)
        .put(`/api/tracking/orders/${testOrder._id}`)
        .set('Authorization', `Bearer ${tokens.shopkeeper}`)
        .send({
          statusUpdate: {
            status: 'processing', // Try to revert status
            note: 'Attempt to modify cancelled order'
          }
        });
      
      expect(modifyResponse.status).toBe(400); // Should reject with bad request
    });
  });
  
  describe('Edge Cases and Error Handling', () => {
    test('Should handle non-existent order IDs', async () => {
      const nonExistentId = new mongoose.Types.ObjectId();
      
      const response = await request(app)
        .get(`/api/tracking/orders/${nonExistentId}`)
        .set('Authorization', `Bearer ${tokens.customer}`);
      
      expect(response.status).toBe(404);
      expect(response.body.message).toMatch(/not found/i);
    });
    
    test('Should validate order ID format', async () => {
      const invalidId = 'invalid-id-format';
      
      const response = await request(app)
        .get(`/api/tracking/orders/${invalidId}`)
        .set('Authorization', `Bearer ${tokens.customer}`);
      
      expect(response.status).toBe(400);
      expect(response.body.message).toMatch(/invalid.*format/i);
    });
    
    test('Should handle empty update requests', async () => {
      const response = await request(app)
        .put(`/api/tracking/orders/${testOrder._id}`)
        .set('Authorization', `Bearer ${tokens.shopkeeper}`)
        .send({}); // Empty request body
      
      // Should succeed but not change anything
      expect(response.status).toBe(200);
      expect(response.body.order.status).toBe('pending'); // Original status
    });
    
    test('Should validate date formats for estimated delivery time', async () => {
      const response = await request(app)
        .put(`/api/tracking/orders/${testOrder._id}`)
        .set('Authorization', `Bearer ${tokens.shopkeeper}`)
        .send({
          estimatedDeliveryTime: 'not-a-date'
        });
      
      expect(response.status).toBe(400);
      expect(response.body.message).toMatch(/invalid date/i);
    });
    
    test('Should handle multiple status updates in rapid succession', async () => {
      // First update (processing)
      await request(app)
        .put(`/api/tracking/orders/${testOrder._id}`)
        .set('Authorization', `Bearer ${tokens.shopkeeper}`)
        .send({
          statusUpdate: {
            status: 'processing',
            note: 'Processing order'
          }
        });
      
      // Immediate second update (out_for_delivery)
      const response = await request(app)
        .put(`/api/tracking/orders/${testOrder._id}`)
        .set('Authorization', `Bearer ${tokens.shopkeeper}`)
        .send({
          statusUpdate: {
            status: 'out_for_delivery',
            note: 'Order has left the shop'
          }
        });
      
      expect(response.status).toBe(200);
      expect(response.body.order.status).toBe('out_for_delivery');
      
      // Check that both status updates were recorded
      const historyResponse = await request(app)
        .get(`/api/tracking/orders/${testOrder._id}`)
        .set('Authorization', `Bearer ${tokens.shopkeeper}`);
      
      const statusUpdates = historyResponse.body.trackingDetails.statusUpdates;
      expect(statusUpdates.length).toBe(3); // pending + 2 updates
      expect(statusUpdates[1].status).toBe('processing');
      expect(statusUpdates[2].status).toBe('out_for_delivery');
    });
    
    test('Should handle simultaneous tracking detail updates', async () => {
      // Update multiple tracking details simultaneously
      const response = await request(app)
        .put(`/api/tracking/orders/${testOrder._id}`)
        .set('Authorization', `Bearer ${tokens.shopkeeper}`)
        .send({
          statusUpdate: {
            status: 'processing',
            note: 'Processing order'
          },
          currentLocation: {
            coordinates: [40.7128, -74.0060],
            description: 'At the shop'
          },
          estimatedDeliveryTime: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
          deliveryAgent: {
            name: 'John Delivery',
            contact: '+1234567890'
          }
        });
      
      expect(response.status).toBe(200);
      expect(response.body.order.status).toBe('processing');
      expect(response.body.order.trackingDetails.currentLocation).toBeTruthy();
      expect(response.body.order.trackingDetails.estimatedDeliveryTime).toBeTruthy();
      expect(response.body.order.trackingDetails.deliveryAgent).toBeTruthy();
    });
  });
});

