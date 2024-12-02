"use client";

import React, { createContext, useState } from "react";

type UserType = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  message?: string;
}

type UserContextType = {
  user: UserType;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
  isUserLoggedIn: boolean;
  setIsUserLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserContext = createContext<UserContextType | null>(null);

function UserContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserType>({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);

  const value: UserContextType = {
    user,
    setUser,
    isUserLoggedIn,
    setIsUserLoggedIn,
  };

  return (
    <UserContext.Provider value={ value }>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;