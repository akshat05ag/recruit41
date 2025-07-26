const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_API_KEY = process.env.GROQ_API_KEY;

async function callLLM(messages) {
  try {
    const res = await axios.post(
      GROQ_API_URL,
      {
        model: 'llama3-8b-8192',
        messages: messages,
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return res.data.choices[0].message.content.trim();
  } catch (err) {
    console.error('LLM error:', err.response?.data || err.message);
    return "Sorry, I had trouble processing that.";
  }
}

module.exports = { callLLM };
