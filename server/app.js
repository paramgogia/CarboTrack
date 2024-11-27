const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/user.routes');
const scrapeAmazonProducts = require('./scrape');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/eco_tracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);

// Route to trigger scraping
app.get('/api/scrape', async (req, res) => {
  try {
    const url = 'https://www.amazon.in/s?k=sustainable+products&crid=34ZNNP5D9AQEF&sprefix=sustainable+%2Caps%2C213&ref=nb_sb_ss_ts-doa-p_1_12';
    const products = await scrapeAmazonProducts(url);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Failed to scrape products', error });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 500;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});