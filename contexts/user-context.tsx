"use client";
import { createContext } from "react";

interface UserContextType {
  userName: string;
  setUserName: (name: string) => void;
}

const initialState: UserContextType = {
  userName: "",
  setUserName: () => {},
};

export const UserContext = createContext<UserContextType>(initialState);
