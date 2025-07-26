import React from 'react';
import ChatWindow from './components/ChatWindow';

const App = () => {
  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', display: 'flex', flexDirection: 'column', height: '80vh' }}>
      <ChatWindow />
    </div>
  );
};

export default App;

