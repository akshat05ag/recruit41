import Message from './Message';

const MessageList = ({ messages }) => {
  return (
    <div className="flex flex-col gap-2 mb-4 max-h-80 overflow-y-auto">
      {messages.map((msg, idx) => (
        <Message key={idx} sender={msg.sender} text={msg.text} />
      ))}
    </div>
  );
};

export default MessageList;
