import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext({
  token: null,
  setToken: () => {},
  username: null,
  setUsername: () => {},
});

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);

  const value = {
    token,
    setToken,
    username,
    setUsername,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
