const express = require('express');
const mongoose = require('mongoose');
const ChatUser = require('../models/chatbot/ChatUser.js');
const { Message, ConversationSession } = require('../models/chatbot/Bothmodels.js');
const { callLLM } = require('../services/llm.js');

const router = express.Router();

// Temporary in-memory session history (per session ID)
const sessionHistories = {};

router.get('/conversations/:email', async (req, res) => {
  const { email } = req.params;
  const user = await ChatUser.findOne({ email });

  if (!user) return res.status(404).json({ error: 'User not found' });

  const sessions = await ConversationSession.find({ user: user._id })
    .sort({ createdAt: -1 })
    .select('_id createdAt')
    .lean();

  res.json(sessions);
});

router.get('/conversation/:id', async (req, res) => {
  const session = await ConversationSession.findById(req.params.id).populate('messages');
  if (!session) return res.status(404).json({ error: 'Session not found' });
  res.json(session.messages);
});


router.post('/', async (req, res) => {
  console.log("Received body:", req.body);
  try {
    const { email, message, conversation_id } = req.body;

    if (!email || !message) {
      return res.status(400).json({ error: 'Email and message are required' });
    }

    // Step 1: Get or create user
    let user = await ChatUser.findOne({ email });
    if (!user) {
      user = await ChatUser.create({ email });
    }

    let session;

    // Step 2: Get or create session
    if (conversation_id && mongoose.Types.ObjectId.isValid(conversation_id)) {
      session = await ConversationSession.findById(conversation_id);
      if (!session) {
        return res.status(404).json({ error: 'Conversation not found' });
      }
    } else {
      session = await ConversationSession.create({ user: user._id });
    }

    // Step 3: Save user message
    const userMessage = await Message.create({
      sender: 'user',
      text: message
    });

    session.messages.push(userMessage);
    await session.save();

    // Step 4: Build conversation history for LLM
    if (!sessionHistories[session._id]) {
      sessionHistories[session._id] = [
        {
          role: 'system',
          content: `You are a helpful assistant for an online clothing store. Answer user queries about orders, products, returns, and shipping. Always ask follow-up questions if information is incomplete.`
        }
      ];
    }

    sessionHistories[session._id].push({
      role: 'user',
      content: message
    });

    // Step 5: Get response from LLM
    const llmResponse = await callLLM(sessionHistories[session._id]);

    sessionHistories[session._id].push({
      role: 'assistant',
      content: llmResponse
    });

    // Step 6: Save AI response
    const aiMessage = await Message.create({
      sender: 'ai',
      text: llmResponse
    });

    session.messages.push(aiMessage);
    await session.save();

    // Step 7: Return full result
    res.status(200).json({
      conversation_id: session._id,
      messages: [userMessage, aiMessage]
    });

  } catch (err) {
    console.error('Error in POST /api/chat:', err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;
