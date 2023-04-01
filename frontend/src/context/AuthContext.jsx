import { useReducer, createContext } from 'react';
import authReducer from '../reducers/authReducer';

const initializer = () => {
  const localData = localStorage.getItem('user');
  return localData ? { user: JSON.parse(localData) } : { user: null };
};

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null }, initializer);

  console.log('Auth State: ', state);

  return <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
