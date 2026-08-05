"use client";

import { createContext, useContext, useState, useEffect } from "react";
import en from "../messages/en.json";
import fa from "../messages/fa.json";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");
  const [texts, setTexts] = useState(en);

  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved === "fa" || saved === "en") {
      setLang(saved);
      setTexts(saved === "fa" ? fa : en);
    }
  }, []);

  const changeLanguage = (newLang) => {
    setLang(newLang);
    setTexts(newLang === "fa" ? fa : en);
    localStorage.setItem("lang", newLang);
    document.documentElement.dir = newLang === "fa" ? "rtl" : "ltr";
    document.documentElement.lang = newLang;
  };

  return (
    <LanguageContext.Provider value={{ lang, texts, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
