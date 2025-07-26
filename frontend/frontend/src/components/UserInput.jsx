import { useChat } from '../context/ChatContext';

const UserInput = () => {
  const { state, dispatch } = useChat();

  const handleChange = (e) => {
    dispatch({
      type: 'SET_INPUT',
      payload: { field: e.target.name, value: e.target.value },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, message } = state.userInput;
    if (!email || !message) return;

    dispatch({ type: 'ADD_MESSAGE', payload: { sender: 'user', text: message } });
    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      const res = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, message }),
      });

      const data = await res.json();
      if (data.messages && data.messages[1]) {
        dispatch({ type: 'ADD_MESSAGE', payload: data.messages[1] }); // AI response
      } else {
        dispatch({ type: 'ADD_MESSAGE', payload: { sender: 'ai', text: 'Something went wrong' } });
      }
    } catch (err) {
      console.error(err);
      dispatch({ type: 'ADD_MESSAGE', payload: { sender: 'ai', text: 'Server error' } });
    }

    dispatch({ type: 'SET_LOADING', payload: false });
    dispatch({ type: 'CLEAR_MESSAGE_INPUT' });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={state.userInput.email}
        onChange={handleChange}
        className="border p-2"
        required
      />
      <input
        name="message"
        type="text"
        placeholder="Type your message"
        value={state.userInput.message}
        onChange={handleChange}
        className="border p-2"
        required
      />
      <button type="submit" disabled={state.loading} className="bg-blue-500 text-white p-2">
        {state.loading ? 'Sending...' : 'Send'}
      </button>
    </form>
  );
};
export default UserInput;
