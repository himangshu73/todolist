import React, { createContext, useContext, useState } from "react";

interface AuthContextProps {
  isLoggedIn: boolean;
  userName: string;
  login: (userName: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  const login = (name: string) => {
    setIsLoggedIn(true);
    setUserName(name);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserName("");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
