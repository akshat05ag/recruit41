import { useContext } from 'react';
import ChatContext from '/src/context/ChatContext.jsx';

const Sidebar = () => {
  const { state, loadConversation } = useContext(ChatContext);
  const { conversations } = state;

  const isArray = Array.isArray(conversations);

  return (
    <div className="w-1/4 border-r p-4 overflow-y-auto bg-gray-50">
      <h2 className="text-xl font-semibold mb-4">Past Conversations</h2>
      {!isArray || conversations.length === 0 ? (
        <p>No history found</p>
      ) : (
        conversations.map((conv) => (
          <div
            key={conv._id}
            onClick={() => loadConversation(conv._id)}
            className="cursor-pointer p-2 hover:bg-gray-200 rounded"
          >
            {conv.label || new Date(conv.createdAt).toLocaleString()}
          </div>
        ))
      )}
    </div>
  );
};

export default Sidebar;
