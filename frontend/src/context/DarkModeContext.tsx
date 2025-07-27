import React, { createContext, useContext, useEffect, useState } from "react";

interface DarkModeContextProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  theme: "light" | "dark";
}

const DarkModeContext = createContext<DarkModeContextProps | undefined>(undefined);

export const DarkModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const storedPreference = localStorage.getItem("theme");
    if (storedPreference === "dark") return true;
    if (storedPreference === "light") return false;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      root.style.backgroundColor = "#0F172A"; 
      document.body.style.backgroundColor = "#0F172A";
      console.log("🌙 Dark mode activated");
    } else {
      root.classList.remove("dark");
      root.style.backgroundColor = "#F9FAFB";
      document.body.style.backgroundColor = "#F9FAFB";
      console.log("☀️ Light mode activated");
    }
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    console.log("🌓 Theme Toggle Clicked!");
    console.log("Previous mode:", isDarkMode ? "Dark" : "Light");
    setIsDarkMode((prev) => {
      const next = !prev;
      console.log("New mode:", next ? "Dark" : "Light");
      console.log("✅ Theme toggle successful!");
      return next;
    });
  };

  const theme = isDarkMode ? "dark" : "light";

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode, theme }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  }
  return context;
};
