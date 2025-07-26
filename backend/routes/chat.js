const express = require('express');
const ChatUser = require('../models/chatbot/ChatUser.js');
const { Message, ConversationSession } = require('../models/chatbot/Bothmodels.js');

const mongoose = require('mongoose');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { email, message, conversation_id } = req.body;

    if (!email || !message) {
      return res.status(400).json({ error: 'Email and message are required' });
    }

    // Get or create the user
    let user = await ChatUser.findOne({ email });
    if (!user) {
      user = await ChatUser.create({ email });
    }

    let session;

    // Check if conversation_id is a valid ObjectId
    if (conversation_id && mongoose.Types.ObjectId.isValid(conversation_id)) {
      session = await ConversationSession.findById(conversation_id);
      if (!session) {
        return res.status(404).json({ error: 'Conversation not found' });
      }
    } else {
      // Create a new session if no valid ID is provided
      session = await ConversationSession.create({ user: user._id });
    }

    // Save the message
    const newMessage = await Message.create({
      session: session._id,
      sender: 'user',
      text: message,
    });

    // Respond with session and message info
    res.status(200).json({
      conversation_id: session._id,
      message: newMessage,
    });

  } catch (err) {
    console.error('Error in POST /api/chat:', err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;



