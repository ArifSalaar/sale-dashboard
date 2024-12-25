// A simple Node.js project for a sales analytics dashboard using MongoDB and Express

const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/sales_dashboard', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Sales Schema and Model
const saleSchema = new mongoose.Schema({
  product: String,
  category: String,
  amount: Number,
  date: { type: Date, default: Date.now },
});

const Sale = mongoose.model('Sale', saleSchema);

// Routes

// 1. Add a new sale
app.post('/sales', async (req, res) => {
  try {
    const { product, category, amount, date } = req.body;
    const sale = new Sale({ product, category, amount, date });
    await sale.save();
    res.status(200).json({
      success: true,
      message: 'Sale added successfully', 
      data:{
        id: sale._id,
        product: sale.product,
        category: sale.category,
        amount: sale.amount
      } });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add sale', details: error.message });
  }
});

// 2. Get total sales by category
app.get('/analytics/sales-by-category', async (req, res) => {
  try {
    const result = await Sale.aggregate([
      { $group: { _id: "$category", totalSales: { $sum: "$amount" } } },
      { $sort: { totalSales: -1 } },
    ]);
    res.status(200).json({
      success: true,
      data:{
        result
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get sales by category', details: error.message });
  }
});

// 3. Get total sales per month
app.get('/analytics/sales-by-month', async (req, res) => {
  try {
    const result = await Sale.aggregate([
      { $group: {
          _id: { $month: "$date" },
          totalSales: { $sum: "$amount" },
      } },
      { $sort: { _id: 1 } },
    ]);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get sales by month', details: error.message });
  }
});

// 4. Get top-selling products
app.get('/analytics/top-products', async (req, res) => {
  try {
    const result = await Sale.aggregate([
      { $group: { _id: "$product", totalSales: { $sum: "$amount" } } },
      { $sort: { totalSales: -1 } },
      { $limit: 5 },
    ]);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get top products', details: error.message });
  }
});

// 5. Get sales trends over time
app.get('/analytics/sales-trends', async (req, res) => {
  try {
    const result = await Sale.aggregate([
      { $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          totalSales: { $sum: "$amount" },
      } },
      { $sort: { _id: 1 } },
    ]);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get sales trends', details: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
