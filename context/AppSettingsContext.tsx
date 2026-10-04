"use client";

import React, { createContext, useContext, useState } from "react";

type Theme = "dark" | "light";
type FontSize = "sm" | "base" | "lg";
type Language = "th" | "en";

type AppSettingsContextType = {
  theme: Theme;
  fontSize: FontSize;
  lang: Language;
  toggleTheme: () => void;
  setFontSize: (size: FontSize) => void;
  setLang: (lang: Language) => void;
};

const AppSettingsContext = createContext<AppSettingsContextType | undefined>(undefined);

export function AppSettingsProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [fontSize, setFontSize] = useState<FontSize>("base");
  const [lang, setLang] = useState<Language>("th");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // กำหนดขนาดฟอนต์แบบ pixel โดยตรงเพื่อความแม่นยำ
  const fontSizePx = fontSize === "sm" ? "14px" : fontSize === "lg" ? "20px" : "16px";

  return (
    <AppSettingsContext.Provider
      value={{
        theme,
        fontSize,
        lang,
        toggleTheme,
        setFontSize,
        setLang,
      }}
    >
      <div
        style={{
          fontSize: fontSizePx,
          backgroundColor: theme === "dark" ? "#020617" : "#f1f5f9",
          color: theme === "dark" ? "#f8fafc" : "#0f172a",
          minHeight: "100vh",
          transition: "all 0.2s ease",
        }}
      >
        {children}
      </div>
    </AppSettingsContext.Provider>
  );
}

export function useAppSettings() {
  const context = useContext(AppSettingsContext);
  if (!context) {
    throw new Error("useAppSettings must be used within an AppSettingsProvider");
  }
  return context;
}