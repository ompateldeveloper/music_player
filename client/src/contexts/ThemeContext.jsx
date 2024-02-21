import { createContext, useContext, useEffect, useState } from "react";

const themeContext = createContext();

export function ThemeContextProvider({ children }) {
  const [theme, setTheme] = useState('dark');
  const [dominantColor, setDominantColor] = useState('transparent');

  useEffect(() => {
    const savedTheme = JSON.parse(localStorage.getItem('theme'));
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(theme));
  }, [theme]);

  return (
    <themeContext.Provider value={{ theme, setTheme }}>
      {children}
    </themeContext.Provider>
  );
}

export const useThemeContext = () => {
  const context = useContext(themeContext);

  if (!context) {
    throw Error('useThemeContext must be used inside a ThemeContextProvider');
  }

  return context;
};
