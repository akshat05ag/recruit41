import Sidebar from './Sidebar';
import MessageList from './MessageList';
import UserInput from './UserInput';

const ChatWindow = () => (
  <div className="flex h-screen">
    <Sidebar />
    <div className="flex-1 flex flex-col">
      <MessageList />
      <UserInput />
    </div>
  </div>
);

export default ChatWindow;