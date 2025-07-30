const express = require('express');
const Invoice = require('../models/Invoice');
const Product = require('../models/product');
const Sale = require('../models/Sale');
const auth = require('../middleware/auth');
const router = express.Router();

// Create new invoice
router.post('/invoice', auth, async (req, res) => {
  try {
    const { customerName, customerEmail, customerPhone, items, tax, discount, notes } = req.body;
    
    if (!customerName || !items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Customer name and items are required'
      });
    }
    
    let subtotal = 0;
    const processedItems = [];
    
    // Process each item and check stock
    for (const item of items) {
      const product = await Product.findOne({
        _id: item.productId,
        sellerId: req.user.id,
        isActive: true
      });
      
      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product ${item.productId} not found`
        });
      }
      
      if (product.quantity < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${product.name}. Available: ${product.quantity}, Requested: ${item.quantity}`
        });
      }
      
      const itemTotal = product.price * item.quantity;
      subtotal += itemTotal;
      
      processedItems.push({
        productId: product._id,
        productName: product.name,
        quantity: item.quantity,
        unitPrice: product.price,
        totalPrice: itemTotal
      });
    }
    
    const finalTax = tax || 0;
    const finalDiscount = discount || 0;
    const total = subtotal + finalTax - finalDiscount;
    
    const invoice = new Invoice({
      sellerId: req.user.id,
      customerName,
      customerEmail: customerEmail || '',
      customerPhone: customerPhone || '',
      items: processedItems,
      subtotal,
      tax: finalTax,
      discount: finalDiscount,
      total,
      notes: notes || ''
    });
    
    await invoice.save();
    
    res.status(201).json({
      success: true,
      message: 'Invoice created successfully',
      invoice
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating invoice',
      error: error.message
    });
  }
});

// Confirm invoice and update stock
router.post('/invoice/:id/confirm', auth, async (req, res) => {
  try {
    const { paymentMethod = 'cash' } = req.body;
    
    const invoice = await Invoice.findOne({
      _id: req.params.id,
      sellerId: req.user.id,
      status: 'draft'
    });
    
    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: 'Invoice not found or already confirmed'
      });
    }
    
    // Start transaction for stock updates and sales records
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
      // Update stock for each item
      for (const item of invoice.items) {
        const product = await Product.findById(item.productId).session(session);
        
        if (product.quantity < item.quantity) {
          throw new Error(`Insufficient stock for ${product.name}`);
        }
        
        // Update product stock
        await Product.findByIdAndUpdate(
          item.productId,
          { $inc: { quantity: -item.quantity } },
          { session }
        );
        
        // Create sale record
        const sale = new Sale({
          invoiceId: invoice._id,
          sellerId: req.user.id,
          productId: item.productId,
          productName: item.productName,
          quantitySold: item.quantity,
          unitPrice: item.unitPrice,
          totalRevenue: item.totalPrice
        });
        
        await sale.save({ session });
      }
      
      // Update invoice status
      invoice.status = 'paid';
      invoice.paymentMethod = paymentMethod;
      await invoice.save({ session });
      
      await session.commitTransaction();
      
      res.json({
        success: true,
        message: 'Invoice confirmed and stock updated successfully',
        invoice
      });
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error confirming invoice',
      error: error.message
    });
  }
});

// Get all invoices
router.get('/invoices', auth, async (req, res) => {
  try {
    const { status, startDate, endDate, page = 1, limit = 10 } = req.query;
    const query = { sellerId: req.user.id };
    
    if (status && status !== 'all') {
      query.status = status;
    }
    
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }
    
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { createdAt: -1 },
      populate: {
        path: 'items.productId',
        select: 'name category'
      }
    };
    
    const invoices = await Invoice.paginate(query, options);
    
    res.json({
      success: true,
      invoices: invoices.docs,
      pagination: {
        total: invoices.totalDocs,
        pages: invoices.totalPages,
        page: invoices.page,
        limit: invoices.limit
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching invoices',
      error: error.message
    });
  }
});

// Get single invoice
router.get('/invoice/:id', auth, async (req, res) => {
  try {
    const invoice = await Invoice.findOne({
      _id: req.params.id,
      sellerId: req.user.id
    }).populate('items.productId', 'name category');
    
    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: 'Invoice not found'
      });
    }
    
    res.json({
      success: true,
      invoice
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching invoice',
      error: error.message
    });
  }
});

module.exports = router;
