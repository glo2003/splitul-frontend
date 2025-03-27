"use client";
import { UserContext } from "@/contexts/user-context";
import { useState, useEffect, ReactNode } from "react";

export function UserProvider({ children }: { children: ReactNode }) {
  const [userName, setUserName] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("userName") || "";
    }
    return "";
  });

  useEffect(() => {
    if (userName) {
      localStorage.setItem("userName", userName);
    }
  }, [userName]);

  return (
    <UserContext.Provider value={{ userName, setUserName }}>
      {children}
    </UserContext.Provider>
  );
}
