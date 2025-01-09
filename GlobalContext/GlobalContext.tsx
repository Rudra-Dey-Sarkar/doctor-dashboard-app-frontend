"use client";

import { createContext, useState, useEffect, ReactNode } from "react";

interface GlobalContextType {
  present: boolean;
  setPresent: React.Dispatch<React.SetStateAction<boolean>>;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

const GlobalContextWrapper = ({ children }: { children: ReactNode }) => {
  const [present, setPresent] = useState<boolean>(false); // Initial state is a boolean

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedPresent = localStorage.getItem("present");
      if (savedPresent) {
        setPresent(JSON.parse(savedPresent)); // Parse and set the boolean value
      }
    }
  }, []);

  return (
    <GlobalContext.Provider value={{ present, setPresent }}>
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContextWrapper, GlobalContext };
