const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  order_id: String,
  user_id: String,
  status: String,
  gender: String,
  created_at: Date,
  returned_at: Date,
  shipped_at: Date,
  delivered_at: Date,
  num_of_item: Number
});

module.exports = mongoose.model('Order', orderSchema);