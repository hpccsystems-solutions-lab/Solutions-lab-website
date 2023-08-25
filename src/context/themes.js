// themes.js
import React, { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);
  const [selectedTutorial, setSelectedTutorial] = useState("/learn-ecl/introduction");
  const [selectedPage, setSelectedPage] = useState(null)

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme, selectedTutorial, setSelectedTutorial, selectedPage, setSelectedPage }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
