"use client";

import { createContext, useContext, useState } from "react";

const UserContext = createContext({});


// @ts-ignore
export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  return (
    <UserContext.Provider value={{ user: user, setUser: setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
