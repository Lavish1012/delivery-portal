import mongoose from 'mongoose';
import Customer from '../models/Customer';
import Shopkeeper from '../models/Shopkeeper';
import Item from '../models/Item';

const insertMockData = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/shop_inventory', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Clear existing data
    await Customer.deleteMany({});
    await Shopkeeper.deleteMany({});
    await Item.deleteMany({});

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
    await Item.insertMany([
      { name: 'Laptop', price: 50000, quantity: 10, shopId: shopkeepers[0]._id },
      { name: 'Smartphone', price: 20000, quantity: 15, shopId: shopkeepers[1]._id },
    ]);

    console.log('Mock data inserted successfully!');
    mongoose.disconnect();
  } catch (error) {
    console.error('Error inserting mock data:', error.message);
  }
};

insertMockData();