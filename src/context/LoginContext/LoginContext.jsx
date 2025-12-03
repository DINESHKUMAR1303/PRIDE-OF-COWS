import React, { createContext, useContext, useState } from "react";

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <LoginContext.Provider value={{ loginOpen, setLoginOpen }}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => useContext(LoginContext);
