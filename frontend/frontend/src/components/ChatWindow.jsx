import { useState } from 'react';
import UserInput from './UserInput';
import MessageList from './MessageList';

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [conversationId, setConversationId] = useState(null);

  const handleSend = async ({ email, message }) => {
    // Add user message to local chat view
    setMessages((prev) => [...prev, { sender: 'user', text: message }]);

    try {
      const res = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, message, conversation_id: conversationId }),
      });

      const data = await res.json();

      if (data.messages) {
        setMessages((prev) => [...prev, data.messages[1]]); // AI response
        setConversationId(data.conversation_id);
      } else {
        setMessages((prev) => [...prev, { sender: 'ai', text: 'Error getting response.' }]);
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [...prev, { sender: 'ai', text: 'Something went wrong.' }]);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 border rounded shadow">
      <MessageList messages={messages} />
      <UserInput onSend={handleSend} />
    </div>
  );
};

export default ChatWindow;
