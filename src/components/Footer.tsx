"use client"; // This directive tells Next.js that this is a client component
// components/Footer.tsx
import { FaDiscord } from 'react-icons/fa'
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Footer() {
  const [lang, setLang] = useState<"en" | "fr">("en");

  useEffect(() => {
    const storedLang = localStorage.getItem("lang");
    if (storedLang === "en" || storedLang === "fr") {
      setLang(storedLang);
    }
  }, []);

  // Translations based on the selected language
  const translations = {
    en: {
      copyrightText: `© ${new Date().getFullYear()} Master Rematch`,
      discordAriaLabel: "Tech ideas go →",
      credits: "Credits",
      discordText: "Tech ideas go →"
    },
    fr: {
      copyrightText: `© ${new Date().getFullYear()} Maîtrisez Rematch`,
      discordAriaLabel: "Idées de techniques ",
      credits: "Crédits",
      discordText: "Idées de techniques →"
    },
  };

  const t = translations[lang];

  return (
    <footer className="w-full border-t py-4">
      <div className="container flex flex-col items-center justify-between gap-3 md:h-16 md:flex-row">
        <p className="text-center text-sm text-gray-500 md:text-left">
          {t.copyrightText}
        </p>
        <div className="flex items-center gap-4">
          <Link
            href="/Credits"
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            {t.credits}
          </Link>
          <a
            href="https://discord.gg/ua8D567NAp"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors group"
            aria-label={t.discordAriaLabel}
          >
            <span>{t.discordText}</span>
            <FaDiscord className="w-5 h-5 group-hover:text-indigo-500 transition-colors" />
          </a>
        </div>
      </div>
    </footer>
  );
}