const mongoose = require('mongoose');
const Shopkeeper = require('../models/Shopkeeper');

const seedShopkeepers = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/shop_inventory', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const shopkeepers = [
      { _id: new mongoose.Types.ObjectId(), name: 'Shopkeeper 1', email: 'shop1@example.com', password: 'password1', location: 'Location 1' },
      { _id: new mongoose.Types.ObjectId(), name: 'Shopkeeper 2', email: 'shop2@example.com', password: 'password2', location: 'Location 2' },
    ];

    await Shopkeeper.insertMany(shopkeepers);
    console.log('Shopkeepers seeded successfully');

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding shopkeepers:', error);
    mongoose.connection.close();
  }
};

seedShopkeepers();