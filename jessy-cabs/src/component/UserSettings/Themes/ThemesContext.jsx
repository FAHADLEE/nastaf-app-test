import React, { createContext, useContext, useState } from 'react';

const ThemesContext = createContext();

export const ThemesProvider = ({ children }) => {
  const [selectedTheme, setSelectedTheme] = useState("default");

  return (
    <ThemesContext.Provider value={{ selectedTheme, setSelectedTheme }}>
      {children}
    </ThemesContext.Provider>
  );
};

export const useThemes = () => useContext(ThemesContext);
