const express = require('express');
const multer = require('multer');
const path = require('path');
const Product = require('../models/product');
const auth = require('../middleware/auth');
const router = express.Router();

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/products/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Get all products for seller
router.get('/', auth, async (req, res) => {
  try {
    const { search, category, sortBy = 'createdAt', order = 'desc' } = req.query;
    const query = { sellerId: req.user.id, isActive: true };
    
    if (search) {
      query.$text = { $search: search };
    }
    
    if (category && category !== 'all') {
      query.category = category;
    }
    
    const products = await Product.find(query)
      .sort({ [sortBy]: order === 'desc' ? -1 : 1 })
      .exec();
    
    res.json({
      success: true,
      products,
      total: products.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching products',
      error: error.message
    });
  }
});

// Get single product
router.get('/:id', auth, async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      sellerId: req.user.id
    });
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    res.json({
      success: true,
      product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching product',
      error: error.message
    });
  }
});

// Create new product
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const { name, price, quantity, category, description, lowStockThreshold } = req.body;
    
    // Validation
    if (!name || !price || quantity === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Name, price, and quantity are required'
      });
    }
    
    const productData = {
      name,
      price: parseFloat(price),
      quantity: parseInt(quantity),
      category: category || 'General',
      description: description || '',
      lowStockThreshold: parseInt(lowStockThreshold) || 10,
      sellerId: req.user.id
    };
    
    if (req.file) {
      productData.image = `/uploads/products/${req.file.filename}`;
    }
    
    const product = new Product(productData);
    await product.save();
    
    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating product',
      error: error.message
    });
  }
});

// Update product
router.put('/:id', auth, upload.single('image'), async (req, res) => {
  try {
    const { name, price, quantity, category, description, lowStockThreshold } = req.body;
    
    const updateData = {
      name,
      price: parseFloat(price),
      quantity: parseInt(quantity),
      category,
      description,
      lowStockThreshold: parseInt(lowStockThreshold)
    };
    
    if (req.file) {
      updateData.image = `/uploads/products/${req.file.filename}`;
    }
    
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, sellerId: req.user.id },
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Product updated successfully',
      product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating product',
      error: error.message
    });
  }
});

// Delete product (soft delete)
router.delete('/:id', auth, async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, sellerId: req.user.id },
      { isActive: false },
      { new: true }
    );
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting product',
      error: error.message
    });
  }
});

// Get low stock products
router.get('/alerts/low-stock', auth, async (req, res) => {
  try {
    const products = await Product.find({
      sellerId: req.user.id,
      isActive: true,
      $expr: { $lte: ['$quantity', '$lowStockThreshold'] }
    }).sort({ quantity: 1 });
    
    res.json({
      success: true,
      products,
      count: products.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching low stock products',
      error: error.message
    });
  }
});

module.exports = router;
