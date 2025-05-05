"use client";

import { useEffect, useState } from "react";

export function ClientLanguageHandler() {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    // Get stored language preference
    const storedLang = localStorage.getItem("lang");
    if (storedLang) {
      setLang(storedLang);
      document.documentElement.lang = storedLang;
      
      // Only update the title and description if the language is French
      // This won't affect link previews which use the server-rendered content
      if (storedLang === "fr") {
        document.title = "Maîtrisez Rematch - Tutoriels des techniques de Rematch";
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
          metaDesc.setAttribute(
            "content",
            "Apprenez les techniques essentielles pour améliorer votre jeu avec nos tutoriels vidéo détaillés."
          );
        }
      }
    }
  }, []);

  return null; // This component doesn't render anything
}