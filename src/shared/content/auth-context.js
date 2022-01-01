const { createContext } = require('react');

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  login: () => {},
  logout: () => {},
});
