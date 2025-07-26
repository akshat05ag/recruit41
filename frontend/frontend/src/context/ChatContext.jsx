import { createContext, useReducer, useContext, useEffect } from 'react';
import axios from 'axios';

// Initial State
const initialState = {
  messages: [],
  loading: false,
  userInput: {
    email: '',
    message: ''
  },
  conversations: [] // <-- new
};

// Actions
const chatReducer = (state, action) => {
  switch (action.type) {
    case 'SET_INPUT':
      return {
        ...state,
        userInput: {
          ...state.userInput,
          [action.payload.field]: action.payload.value
        }
      };
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload]
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
    case 'CLEAR_MESSAGE_INPUT':
      return {
        ...state,
        userInput: {
          ...state.userInput,
          message: ''
        }
      };
    case 'SET_MESSAGES':
      return {
        ...state,
        messages: action.payload
      };
    case 'SET_CONVERSATIONS':
      return {
        ...state,
        conversations: action.payload
      };
    default:
      return state;
  }
};

// Context
const ChatContext = createContext();
export const useChat = () => useContext(ChatContext);

// Provider
export const ChatProvider = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  // Fetch conversations when email is set
  useEffect(() => {
    if (state.userInput.email) {
      fetchConversations();
    }
  }, [state.userInput.email]);

  const fetchConversations = async () => {
    try {
      const res = await axios.get(`/api/chat/conversations/${state.userInput.email}`);
      dispatch({ type: 'SET_CONVERSATIONS', payload: res.data });
    } catch (err) {
      console.error('Error fetching conversations', err);
    }
  };

  const loadConversation = async (sessionId) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const res = await axios.get(`/api/chat/conversation/${sessionId}`);
      dispatch({ type: 'SET_MESSAGES', payload: res.data });
    } catch (err) {
      console.error('Error loading conversation', err);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  return (
    <ChatContext.Provider
      value={{
        state,
        dispatch,
        fetchConversations,
        loadConversation
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContext;
