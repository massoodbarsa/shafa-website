"use client";

import { createContext, useContext, useState, useEffect } from "react";
import enData from "../messages/en.json";
import faData from "../messages/fa.json";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  // 1. Establish standard default language variables safely for server prerendering
  const [lang, setLang] = useState("en");
  const [isMounted, setIsMounted] = useState(false); // Hydration mismatch blocker shield flag

  useEffect(() => {
    // 2. Executing here guarantees execution happens strictly on the client browser window
    if (typeof window !== "undefined") {
      const savedLang = localStorage.getItem("shafa_lang");

      // Look at the current URL parameters as a secondary check
      const currentUrlPath = window.location.pathname.split("/")[1];

      if (currentUrlPath === "fa" || currentUrlPath === "en") {
        setLang(currentUrlPath);
      } else if (savedLang === "fa" || savedLang === "en") {
        setLang(savedLang);
      }

      setIsMounted(true); // Safely unlatches the layout components tree now that hydration is done
    }
  }, []);

  const changeLanguage = (targetLang) => {
    if (targetLang === "en" || targetLang === "fa") {
      setLang(targetLang);
      if (typeof window !== "undefined") {
        localStorage.setItem("shafa_lang", targetLang);
      }
    }
  };

  // Maps the active translation vocabulary context
  const texts = lang === "fa" ? faData : enData;

  // 3. To stop hydration crashes, we return a blank hidden envelope state on the server pass
  if (!isMounted) {
    return (
      <LanguageContext.Provider
        value={{ lang: "en", changeLanguage, texts: enData }}
      >
        <div style={{ visibility: "hidden" }}>{children}</div>
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider value={{ lang, changeLanguage, texts }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error(
      "useLanguage must be wrapped inside a valid LanguageProvider block structure.",
    );
  }
  return context;
}
