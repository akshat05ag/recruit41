const Message = ({ sender, text }) => {
  const isUser = sender === 'user';
  return (
    <div
      className={`p-2 rounded max-w-xs ${
        isUser ? 'bg-blue-100 self-end' : 'bg-gray-100 self-start'
      }`}
    >
      <p className="text-sm">{text}</p>
    </div>
  );
};

export default Message;
