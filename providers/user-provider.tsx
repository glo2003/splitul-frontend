"use client";
import { UserContext } from "@/contexts/user-context";
import { useState, ReactNode } from "react";

export function UserProvider({ children }: { children: ReactNode }) {
  const [userName, setUserName] = useState("");

  return (
    <UserContext.Provider value={{ userName, setUserName }}>
      {children}
    </UserContext.Provider>
  );
}
