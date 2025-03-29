"use client";
import { UserContext } from "@/contexts/user-context";
import { useState, useEffect, ReactNode } from "react";

export function UserProvider({ children }: { children: ReactNode }) {
  const [userName, setUserName] = useState("");
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName") || "";
    setUserName(storedUserName);
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (userName && isHydrated) {
      localStorage.setItem("userName", userName);
    }
  }, [userName, isHydrated]);

  if (!isHydrated) {
    return null; // or a loading spinner
  }

  return (
    <UserContext.Provider value={{ userName, setUserName }}>
      {children}
    </UserContext.Provider>
  );
}
