const mongoose = require('mongoose');

const chatUserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const ChatUser = mongoose.model('ChatUser', chatUserSchema);

module.exports = ChatUser;