import React, { createContext, useState } from "react";

interface AuthContextValue {
  accessToken: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  accessToken: null,
  setToken: () => {},
  clearToken: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const setToken = (token: string) => {
    localStorage.setItem("access_token", token);
    setAccessToken(token);
  };

  const clearToken = () => {
    setAccessToken(null);
  };

  return (
    <AuthContext.Provider value={{ accessToken, setToken, clearToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
