const mongoose = require('mongoose');

const distributionCenterSchema = new mongoose.Schema({
  id: String,
  name: String,
  latitude: Number,
  longitude: Number
});

module.exports = mongoose.model('DistributionCenter', distributionCenterSchema);
