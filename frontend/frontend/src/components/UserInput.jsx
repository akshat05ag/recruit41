import { useState } from 'react';

const UserInput = ({ onSend }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !message) return;

    onSend({ email, message });
    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-2 border"
        required
      />
      <input
        type="text"
        placeholder="Type a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="p-2 border"
        required
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        Send
      </button>
    </form>
  );
};

export default UserInput;
