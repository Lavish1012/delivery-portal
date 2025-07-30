/* =========================================================================
 *  backend/routes/analytics.js   –  FULL FILE
 * ========================================================================= */
const express  = require('express');
const mongoose = require('mongoose');
const Sale     = require('../models/Sale');
const Product  = require('../models/product');   // keep your existing path / case
const Invoice  = require('../models/Invoice');
const auth     = require('../middleware/auth');

const router = express.Router();

/* ------------------------------------------------------------------ */
/* 1. DASHBOARD OVERVIEW                                              */
/* ------------------------------------------------------------------ */
router.get('/overview', auth, async (req, res) => {
  try {
    const sellerId  = req.user.id;
    const today     = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay   = new Date(today.setHours(23, 59, 59, 999));

    const dailySales = await Sale.aggregate([
      { $match: {
          sellerId : mongoose.Types.ObjectId(sellerId),
          saleDate : { $gte: startOfDay, $lte: endOfDay }
        }},
      { $group: {
          _id           : null,
          totalRevenue  : { $sum: '$totalRevenue' },
          totalQuantity : { $sum: '$quantitySold' },
          totalOrders   : { $sum: 1 }
        }}
    ]);

    const todayStats = dailySales[0] || {
      totalRevenue : 0,
      totalQuantity: 0,
      totalOrders  : 0
    };

    const totalProducts = await Product.countDocuments({
      sellerId,
      isActive: true
    });

    const lowStockProducts = await Product.countDocuments({
      sellerId,
      isActive: true,
      $expr : { $lte: [ '$quantity', '$lowStockThreshold' ] }
    });

    const monthlyRevenue = await Sale.aggregate([
      { $match: {
          sellerId : mongoose.Types.ObjectId(sellerId),
          saleDate : { $gte: new Date(new Date().setMonth(new Date().getMonth() - 11)) }
        }},
      { $group: {
          _id: { year: { $year: '$saleDate' }, month: { $month: '$saleDate' } },
          revenue: { $sum: '$totalRevenue' },
          orders : { $sum: 1 }
        }},
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    res.json({
      success : true,
      overview: { today: todayStats, totalProducts, lowStockProducts, monthlyRevenue }
    });
  } catch (err) {
    res.status(500).json({ success:false, message:'Error fetching overview', error:err.message });
  }
});

/* ------------------------------------------------------------------ */
/* 2. BEST-SELLING ITEMS                                              */
/* ------------------------------------------------------------------ */
router.get('/best-selling', auth, async (req, res) => {
  try {
    const { period = '30' } = req.query;
    const sellerId = req.user.id;
    const daysAgo  = new Date();
    daysAgo.setDate(daysAgo.getDate() - parseInt(period, 10));

    const bestSelling = await Sale.aggregate([
      { $match: {
          sellerId : mongoose.Types.ObjectId(sellerId),
          saleDate : { $gte: daysAgo }
        }},
      { $group: {
          _id               : '$productId',
          productName       : { $first: '$productName' },
          totalQuantitySold : { $sum : '$quantitySold' },
          totalRevenue      : { $sum : '$totalRevenue' },
          averagePrice      : { $avg : '$unitPrice' }
        }},
      { $sort : { totalQuantitySold: -1 } },
      { $limit: 10 }
    ]);

    res.json({ success:true, bestSelling, period: `${period} days` });
  } catch (err) {
    res.status(500).json({ success:false, message:'Error fetching best selling products', error:err.message });
  }
});

/* ------------------------------------------------------------------ */
/* 3. SALES TRENDS                                                    */
/* ------------------------------------------------------------------ */
router.get('/sales-trends', auth, async (req, res) => {
  try {
    const { period = 'week' } = req.query;
    const sellerId = req.user.id;

    let groupBy;
    const startDate = new Date();

    switch (period) {
      case 'week':
        startDate.setDate(startDate.getDate() - 7);
        groupBy = { year:{ $year:'$saleDate' }, month:{ $month:'$saleDate' }, day:{ $dayOfMonth:'$saleDate' } };
        break;
      case 'month':
        startDate.setMonth(startDate.getMonth() - 1);
        groupBy = { year:{ $year:'$saleDate' }, month:{ $month:'$saleDate' }, day:{ $dayOfMonth:'$saleDate' } };
        break;
      case 'year':
        startDate.setFullYear(startDate.getFullYear() - 1);
        groupBy = { year:{ $year:'$saleDate' }, month:{ $month:'$saleDate' } };
        break;
      default:
        startDate.setDate(startDate.getDate() - 7);
        groupBy = { year:{ $year:'$saleDate' }, month:{ $month:'$saleDate' }, day:{ $dayOfMonth:'$saleDate' } };
    }

    const salesTrends = await Sale.aggregate([
      { $match: {
          sellerId : mongoose.Types.ObjectId(sellerId),
          saleDate : { $gte: startDate }
        }},
      { $group: {
          _id          : groupBy,
          totalRevenue : { $sum: '$totalRevenue' },
          totalQuantity: { $sum: '$quantitySold' },
          orderCount   : { $sum: 1 }
        }},
      { $sort: { '_id.year':1, '_id.month':1, '_id.day':1 } }
    ]);

    res.json({ success:true, salesTrends, period });
  } catch (err) {
    res.status(500).json({ success:false, message:'Error fetching sales trends', error:err.message });
  }
});

/* ------------------------------------------------------------------ */
/* 4. LOW-STOCK ALERTS                                                */
/* ------------------------------------------------------------------ */
router.get('/low-stock-alerts', auth, async (req, res) => {
  try {
    const lowStockProducts = await Product.find({
      sellerId: req.user.id,
      isActive: true,
      $expr   : { $lte: ['$quantity', '$lowStockThreshold'] }
    }).sort({ quantity: 1 }).select('name quantity lowStockThreshold category');

    res.json({ success:true, alerts:lowStockProducts, count:lowStockProducts.length });
  } catch (err) {
    res.status(500).json({ success:false, message:'Error fetching low stock alerts', error:err.message });
  }
});

/* ------------------------------------------------------------------ */
/* 5. EXPORT  (CSV / PDF)                                             */
/* ------------------------------------------------------------------ */
const { Parser }  = require('json2csv');   //  npm i json2csv
const PDFDocument = require('pdfkit');     //  npm i pdfkit
const tmp         = require('tmp');        //  npm i tmp
const fs          = require('fs');

router.get('/export', auth, async (req, res) => {
  try {
    const { period = 'month', type = 'csv' } = req.query;
    const sellerId = req.user.id;

    // pull analytics data
    const [trends, bestSelling, lowStock] = await Promise.all([
      fetchTrends(sellerId, period),
      fetchBestSelling(sellerId, period),
      Product.find({
        sellerId,
        isActive: true,
        $expr : { $lte: ['$quantity', '$lowStockThreshold'] }
      }).sort({ quantity: 1 }).select('name quantity lowStockThreshold')
    ]);

    /* -------- CSV -------- */
    if (type === 'csv') {
      const rows = [];
      trends.forEach(t => rows.push({ section:'Trend', label:t.label, revenue:t.revenue, orders:t.orderCount }));
      bestSelling.forEach(b => rows.push({ section:'BestSelling', label:b.productName, revenue:b.totalRevenue, orders:b.totalQuantitySold }));
      lowStock.forEach(l => rows.push({ section:'LowStock', label:l.name, quantity:l.quantity }));

      const csv = new Parser().parse(rows);
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename=sales-${period}.csv`);
      return res.send(csv);
    }

    /* -------- PDF -------- */
    const doc  = new PDFDocument({ margin:40 });
    const tmpF = tmp.fileSync({ postfix: '.pdf' });
    doc.pipe(fs.createWriteStream(tmpF.name));

    doc.fontSize(18).text('Sales Analytics', { align:'center' });
    doc.moveDown().fontSize(12)
       .text(`Period   : ${period}`)
       .text(`Generated: ${new Date().toLocaleString()}`)
       .moveDown();

    doc.fontSize(14).text('Revenue Trends');
    trends.forEach(t => doc.text(`${t.label}  ₹${t.revenue.toLocaleString()} (${t.orderCount} orders)`));
    doc.moveDown();

    doc.fontSize(14).text('Best-selling Items');
    bestSelling.forEach(b => doc.text(`${b.productName}  →  ₹${b.totalRevenue.toLocaleString()} / ${b.totalQuantitySold} pcs`));
    doc.moveDown();

    doc.fontSize(14).text('Low-stock Alerts');
    lowStock.forEach(l => doc.text(`${l.name}  –  ${l.quantity} left (threshold ${l.lowStockThreshold})`));

    doc.end();
    doc.on('finish', () => {
      res.download(tmpF.name, `sales-${period}.pdf`, () => tmpF.removeCallback());
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success:false, message:'Export failed', error:err.message });
  }
});

/* ---------- helpers ------------------------------------------------ */
async function fetchBestSelling(sellerId, period) {
  const days = period === 'week' ? 7 : period === 'year' ? 365 : 30;
  const from = new Date(); from.setDate(from.getDate() - days);

  return Sale.aggregate([
    { $match: { sellerId: mongoose.Types.ObjectId(sellerId), saleDate: { $gte: from } } },
    { $group: {
        _id               : '$productId',
        productName       : { $first: '$productName' },
        totalQuantitySold : { $sum : '$quantitySold' },
        totalRevenue      : { $sum : '$totalRevenue' }
    }},
    { $sort : { totalQuantitySold: -1 } },
    { $limit: 10 }
  ]);
}

async function fetchTrends(sellerId, period) {
  const start = new Date();
  if (period === 'week')  start.setDate(start.getDate()  - 6);
  if (period === 'month') start.setMonth(start.getMonth() - 1);
  if (period === 'year')  start.setFullYear(start.getFullYear() - 1);

  const groupBy = period === 'year'
    ? { year:{ $year:'$saleDate' }, month:{ $month:'$saleDate' } }
    : { year:{ $year:'$saleDate' }, month:{ $month:'$saleDate' }, day:{ $dayOfMonth:'$saleDate' } };

  const raw = await Sale.aggregate([
    { $match: { sellerId: mongoose.Types.ObjectId(sellerId), saleDate: { $gte: start } } },
    { $group: {
        _id        : groupBy,
        revenue    : { $sum: '$totalRevenue' },
        orderCount : { $sum: 1 }
    }},
    { $sort: { '_id.year':1, '_id.month':1, '_id.day':1 } }
  ]);

  return raw.map(r => ({
    label      : period === 'year' ? `${r._id.month}/${r._id.year}` : `${r._id.day}/${r._id.month}`,
    revenue    : r.revenue,
    orderCount : r.orderCount
  }));
}
/* ------------------------------------------------------------------ */

module.exports = router;
