import React from "react";
import { loginFunc } from "../helpers.js";

export const AuthContext = React.createContext();

export default function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const login = async () => {
    const result = await loginFunc("http://localhost:5000/login");
    setIsAuthenticated(result);
  };

  const logout = () => {
    // Your logout logic here
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
