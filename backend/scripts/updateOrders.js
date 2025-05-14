const mongoose = require('mongoose');
const Order = require('../models/Order');
const Shopkeeper = require('../models/Shopkeeper');
const Customer = require('../models/Customer');

// Helper function to check if a string is a valid ObjectId
const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

// Helper function to create a default shopkeeper if none exists
const getOrCreateShopkeeper = async () => {
  let shopkeepers = await Shopkeeper.find();
  
  if (shopkeepers.length === 0) {
    console.log('No shopkeepers found. Creating a default shopkeeper...');
    const defaultShopkeeper = new Shopkeeper({
      name: 'Default Shopkeeper',
      email: 'default.shopkeeper@example.com',
      phone: '1234567890',
      address: 'Default Address',
      password: 'Secure@Password123' // Adding required password field
    });
    
    await defaultShopkeeper.save();
    shopkeepers = [defaultShopkeeper];
  }
  
  return shopkeepers[0]._id;
};

// Helper function to create a default customer if none exists
const getOrCreateCustomer = async () => {
  let customers = await Customer.find();
  
  if (customers.length === 0) {
    console.log('No customers found. Creating a default customer...');
    const defaultCustomer = new Customer({
      name: 'Default Customer',
      email: 'default.customer@example.com',
      phone: '0987654321',
      address: 'Default Customer Address',
      password: 'Secure@Password123' // Adding required password field
    });
    
    await defaultCustomer.save();
    customers = [defaultCustomer];
  }
  
  return customers[0]._id;
};

const updateOrders = async () => {
  let connection;
  
  try {
    connection = await mongoose.connect('mongodb://localhost:27017/shop_inventory', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    // Get or create valid shopkeeper and customer IDs
    const validShopkeeperId = await getOrCreateShopkeeper();
    const validCustomerId = await getOrCreateCustomer();
    
    console.log('Using shopkeeper ID:', validShopkeeperId);
    console.log('Using customer ID:', validCustomerId);
    
    const orders = await Order.find();
    console.log(`Found ${orders.length} orders to update`);
    
    for (const order of orders) {
      let modified = false;
      
      // Fix shopkeeperId if invalid or a string
      if (!order.shopkeeperId || 
          (typeof order.shopkeeperId === 'string' && !isValidObjectId(order.shopkeeperId))) {
        order.shopkeeperId = validShopkeeperId;
        modified = true;
        console.log(`Fixed invalid shopkeeperId for order ${order._id}`);
      }
      
      // Set default totalAmount if missing
      if (!order.totalAmount) {
        order.totalAmount = 100; // Default value
        modified = true;
        console.log(`Set default totalAmount for order ${order._id}`);
      }
      
      // Set default customerId if missing or invalid
      if (!order.customerId || 
          (typeof order.customerId === 'string' && !isValidObjectId(order.customerId))) {
        order.customerId = validCustomerId;
        modified = true;
        console.log(`Fixed invalid customerId for order ${order._id}`);
      }
      
      if (modified) {
        await order.save();
        console.log(`Order ${order._id} updated successfully`);
      }
    }
    
    console.log('All orders updated successfully');
  } catch (error) {
    console.error('Error updating orders:', error);
    
    // Check if there's a specific validation error and log more details
    if (error.name === 'ValidationError') {
      for (let field in error.errors) {
        console.error(`Field "${field}" error: ${error.errors[field].message}`);
      }
    }
  } finally {
    if (connection) {
      await mongoose.connection.close();
      console.log('Database connection closed');
    }
  }
};

updateOrders();
