import { useChat } from '../context/ChatContext';
import Message from './Message';

const MessageList = () => {
  const { state } = useChat();

  return (
    <div className="flex flex-col gap-2 mb-4 max-h-96 overflow-y-auto">
      {state.messages.map((msg, idx) => (
        <Message key={idx} sender={msg.sender} text={msg.text} />
      ))}
    </div>
  );
};

export default MessageList;
