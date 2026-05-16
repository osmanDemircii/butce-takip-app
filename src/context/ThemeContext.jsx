import { createContext, useContext, useEffect, useState } from "react";

export const THEMES = [
  {
    id: "dark",
    name: "Gece",
    emoji: "🌙",
    preview: ["#0f0f0f", "#1a1a2e", "#00c896"],
  },
  {
    id: "light",
    name: "Gündüz",
    emoji: "☀️",
    preview: ["#f0f2f5", "#ffffff", "#00a878"],
  },
  {
    id: "ocean",
    name: "Okyanus",
    emoji: "🌊",
    preview: ["#0a1628", "#0d2137", "#00d4ff"],
  },
  {
    id: "sunset",
    name: "Gün Batımı",
    emoji: "🌅",
    preview: ["#1a0a0f", "#2d1020", "#ff6b35"],
  },
  {
    id: "forest",
    name: "Orman",
    emoji: "🌿",
    preview: ["#0a1a0f", "#0f2d1a", "#4caf50"],
  },
  {
    id: "purple",
    name: "Galaksi",
    emoji: "🔮",
    preview: ["#0d0a1a", "#1a1030", "#9c27b0"],
  },
];

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("butce-theme") || "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("butce-theme", theme);
  }, [theme]);

  const changeTheme = (themeId) => {
    setTheme(themeId);
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme, THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);