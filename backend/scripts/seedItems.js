const mongoose = require('mongoose');
const Item = require('../models/Item');

// Connect to MongoDB
mongoose
  .connect('mongodb://localhost:27017/shop_inventory', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the script if connection fails
  });
// Seed data
const seedItems = async () => {
  try {
    console.log('Connecting to database...');
    await mongoose.connection; // Ensure connection is established
    console.log('Connected to database. Clearing items...');
    await Item.deleteMany(); // Clear existing data
    console.log('Items cleared. Inserting new data...');
    await Item.insertMany([
      { name: 'Item 1', price: 100, quantity: 10, shopId: new mongoose.Types.ObjectId() },
      { name: 'Item 2', price: 200, quantity: 5, shopId: new mongoose.Types.ObjectId() },
      { name: 'Item 3', price: 150, quantity: 0, shopId: new mongoose.Types.ObjectId() },
    ]);
    console.log('Database seeded successfully');
    process.exit();
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};

// Execute the seed function
seedItems();