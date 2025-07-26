import MessageList from './MessageList';
import UserInput from './UserInput';

const ChatWindow = () => {
  return (
    <div className="max-w-xl mx-auto p-4 border rounded shadow">
      <MessageList />
      <UserInput />
    </div>
  );
};

export default ChatWindow;
