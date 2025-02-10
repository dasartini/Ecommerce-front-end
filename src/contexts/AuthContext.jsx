import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(() => {
    return sessionStorage.getItem("authToken") || null;
  });

  useEffect(() => {
    if (authToken) {
      sessionStorage.setItem("authToken", authToken);
    } else {
      sessionStorage.removeItem("authToken");
    }
  }, [authToken]);

  const logout = () => {
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ authToken, logout, setAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);