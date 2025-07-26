import { createContext, useReducer, useContext } from 'react';

// Initial State
const initialState = {
  messages: [],
  loading: false,
  userInput: {
    email: '',
    message: ''
  },
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
        },
      };
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'CLEAR_MESSAGE_INPUT':
      return {
        ...state,
        userInput: {
          ...state.userInput,
          message: ''
        }
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

  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
