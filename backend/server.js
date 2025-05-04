const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect('mongodb://localhost:27017/shop_inventory', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Models (for example purposes)
const Item = mongoose.model('Item', new mongoose.Schema({ name: String }));
const Order = mongoose.model('Order', new mongoose.Schema({ shopkeeperId: String }));

// API Routes
app.get('/api/items', async (req, res) => {
  try {
    // Fetch items from the database
    const items = await Item.find(); // Ensure the "Item" model is defined
    res.json(items); // Return items as JSON response
  } catch (err) {
    console.error('Error fetching items:', err);
    res.status(500).json({ error: 'Failed to fetch items' }); // Catch and log errors
  }
});

app.get('/api/orders/shopkeeper/:shopkeeperId', async (req, res) => {
  try {
    const shopkeeperId = req.params.shopkeeperId;
    const orders = await Order.find({ shopkeeperId });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Serve React Frontend (Handle "/")
const frontendPath = path.join(__dirname, '../frontend/build');
app.use(express.static(frontendPath));

// Catch-All Route for React
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Server Start
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));