const mongoose = require('mongoose');

const ShopkeeperSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: { type: String, required: true },
});

module.exports = mongoose.model('Shopkeeper', ShopkeeperSchema);