import { useState, type ReactNode } from "react";
import { AuthContext } from "./authContext";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  const setSession = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: Boolean(token), setSession, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
