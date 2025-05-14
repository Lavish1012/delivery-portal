import mongoose from 'mongoose';
import Customer from '../models/Customer';
import Shopkeeper from '../models/Shopkeeper';
import Item from '../models/Item';
import Order from '../models/Order';

const insertMockData = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/shop_inventory', {
    });

    // Clear existing data
    await Customer.deleteMany({});
    await Shopkeeper.deleteMany({});
    await Item.deleteMany({});
    await Order.deleteMany({});

    // Add mock shopkeepers
    const shopkeepers = await Shopkeeper.insertMany([
      { name: 'ABC Store', location: 'Mumbai', email: 'abc@store.com', password: 'password123' },
      { name: 'XYZ Mart', location: 'Delhi', email: 'xyz@mart.com', password: 'password123' },
    ]);

    // Add mock customers
    const customers = await Customer.insertMany([
      { name: 'John Doe', email: 'john@doe.com', password: 'password123', address: '123 Street, Mumbai' },
      { name: 'Jane Smith', email: 'jane@smith.com', password: 'password123', address: '456 Avenue, Delhi' },
    ]);

    // Add mock items
    const items = await Item.insertMany([
      { name: 'Laptop', price: 50000, quantity: 10, shopId: shopkeepers[0]._id },
      { name: 'Smartphone', price: 20000, quantity: 15, shopId: shopkeepers[1]._id },
    ]);

    // Add mock orders
    await Order.insertMany([
      {
        customerId: customers[0]._id,
        shopkeeperId: shopkeepers[0]._id,
        items: [{ itemId: items[0]._id, quantity: 1 }],
        totalAmount: 50000,
        status: 'Pending',
      },
      {
        customerId: customers[1]._id,
        shopkeeperId: shopkeepers[1]._id,
        items: [{ itemId: items[1]._id, quantity: 2 }],
        totalAmount: 40000,
        status: 'Processing',
      },
    ]);

    console.log('Mock data inserted successfully!');
    mongoose.disconnect();
  } catch (error) {
    console.error('Error inserting mock data:', error.message);
  }
};

insertMockData();