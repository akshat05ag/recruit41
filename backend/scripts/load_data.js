const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

// Import models
const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const InventoryItem = require('../models/InventoryItem');
const DistributionCenter = require('../models/DistributionCenter');

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once('open', async () => {
  console.log('MongoDB connected');

  try {
    await Promise.all([
      loadCSV('users.csv', User),
      loadCSV('products.csv', Product),
      loadCSV('orders.csv', Order),
      loadCSV('order_items.csv', OrderItem),
      loadCSV('inventory_items.csv', InventoryItem),
      loadCSV('distribution_centers.csv', DistributionCenter),
    ]);
    console.log('Data loaded successfully');
  } catch (err) {
    console.error('Error loading data:', err);
  } finally {
    mongoose.disconnect();
  }
});

// Helper function to load a CSV file and insert into a collection
function loadCSV(filename, Model) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(path.join(__dirname, '../data', filename))
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        try {
          await Model.deleteMany({});
          await Model.insertMany(results);
          console.log(`Inserted ${results.length} records into ${Model.modelName}`);
          resolve();
        } catch (err) {
          reject(err);
        }
      });
  });
}
