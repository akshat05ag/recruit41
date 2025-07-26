const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: { type: String, enum: ['user', 'ai'], required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});


const Message = mongoose.model('Message', messageSchema);



const conversationSessionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'ChatUser', required: true },
  startedAt: { type: Date, default: Date.now },
  messages: [messageSchema]
});

const ConversationSession = mongoose.model('ConversationSession', conversationSessionSchema);


module.exports = {
  Message,
  ConversationSession
};
