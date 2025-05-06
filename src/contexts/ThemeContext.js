import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

const themes = {
  zerodha: 'zerodha-theme',
  motilal: 'mo-theme',
};

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(themes.zerodha);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.body.classList.remove(themes.zerodha, themes.motilal, 'dark-theme');
    document.body.classList.add(theme);
    if (isDark) {
      document.body.classList.add('dark-theme');
    }
  }, [theme, isDark]);

  const toggleTheme = () => {
    setTheme((prev) =>
      prev === themes.zerodha ? themes.motilal : themes.zerodha
    );
  };

  const toggleDarkMode = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
} 