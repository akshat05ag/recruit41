const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: String,
  first_name: String,
  last_name: String,
  email: String,
  age: Number,
  gender: String,
  state: String,
  street_address: String,
  postal_code: String,
  city: String,
  country: String,
  latitude: Number,
  longitude: Number,
  traffic_source: String,
  created_at: Date
});

module.exports = mongoose.model('User', userSchema);