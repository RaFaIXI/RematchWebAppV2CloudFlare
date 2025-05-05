"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Spline, Shield, Lightbulb, HandMetal, Footprints } from "lucide-react";
import Footer from "@/components/Footer";

export default function Home() {
  const [lang, setLang] = useState<"en" | "fr">("en");

  useEffect(() => {
    // Check if the page is embedded in an iframe
    if (window.top !== window.self) {
      // Force French language when embedded in an iframe
      setLang("fr");
      localStorage.setItem("lang", "fr");
      console.log("Page is embedded in an iframe. Forcing French language.");
    } else {
      // Not in an iframe, use stored language preference if available
      const storedLang = localStorage.getItem("lang");
      if (storedLang) {
        setLang(storedLang as "en" | "fr");
      }
      console.log("Page is not embedded.");
    }
  }, []);

  const translations = {
    en: {
      heading: "Master Rematch",
      description: "Learn essential techniques to improve your game with our detailed video tutorials.",
      startButton: "Start",
      aboutTitle: "About",
      aboutDescription:
        "Our platform is designed to help players of all levels improve their technical skills. Whether you're a beginner or an experienced player, our tutorials will help you refine your game.",
      exploreButton: "Explore Techniques",
      categoriesTitle: "Techniques Categories",
      categoriesDescription: "Explore our different categories of techniques to improve every aspect of your game.",
      shoot: "Shooting",
      defense: "Defense",
      strategy: "Strategy",
      goalkeeper: "Goalkeeper",
      dribbling: "Dribbling",
      shootDesc: "Perfect your shots and goal scoring",
      defenseDesc: "Learn essential defensive techniques",
      strategyDesc: "Master game tactics and strategies",
      goalkeeperDesc: "Specific techniques for goalkeepers",
      dribblingDesc: "Improve your dribbling and ball control",
      imageAlt: "Football training",
    },
    fr: {
      heading: "Maîtrisez Rematch",
      description:
        "Apprenez les techniques essentielles pour améliorer votre jeu avec nos tutoriels vidéo détaillés.",
      startButton: "Commencer",
      aboutTitle: "À propos",
      aboutDescription:
        "Notre plateforme est conçue pour aider les joueurs de tous niveaux à améliorer leurs compétences techniques. Que vous soyez débutant ou joueur expérimenté, nos tutoriels vous aideront à perfectionner votre jeu.",
      exploreButton: "Explorer les techniques",
      categoriesTitle: "Catégories de Techniques",
      categoriesDescription: "Explorez nos différentes catégories de techniques pour améliorer tous les aspects de votre jeu.",
      shoot: "Tir",
      defense: "Défense",
      strategy: "Stratégie",
      goalkeeper: "Gardien",
      dribbling: "Dribbles",
      shootDesc: "Perfectionnez vos tirs et marquage de buts",
      defenseDesc: "Apprenez les techniques défensives essentielles",
      strategyDesc: "Maîtrisez les tactiques et stratégies de jeu",
      goalkeeperDesc: "Techniques spécifiques pour les gardiens de but",
      dribblingDesc: "Améliorez vos compétences de dribble et contrôle du ballon",
      imageAlt: "Entraînement de football",
    },
  };

  const t = translations[lang];

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-green-50 to-white dark:from-green-950 dark:to-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  {t.heading}
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  {t.description}
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/tir">
                  <Button className="bg-green-600 hover:bg-green-700" aria-label="Start learning football shooting">{t.startButton}</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{t.aboutTitle}</h2>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
                    {t.aboutDescription}
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/tir">
                    <Button className="bg-green-600 hover:bg-green-700">{t.exploreButton}</Button>
                  </Link>
                </div>
              </div>
              <div className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last">
                <img
                  src="/imagen_2024-07-05_181123833.png"
                  alt={t.imageAlt}
                  className="w-full h-full object-cover"
                  onClick={() => window.open("https://discord.com/invite/ua8D567NAp", "_blank")}
                  style={{ cursor: "pointer" }}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  {t.categoriesTitle}
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  {t.categoriesDescription}
                </p>
              </div>
            </div>

            <div className="mx-auto grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 items-start pt-8">
              <CategoryCard href="/tir" icon={<Spline />} title={t.shoot} desc={t.shootDesc} color="green" />
              <CategoryCard href="/defense" icon={<Shield />} title={t.defense} desc={t.defenseDesc} color="blue" />
              <CategoryCard href="/strategie" icon={<Lightbulb />} title={t.strategy} desc={t.strategyDesc} color="purple" />
              <CategoryCard href="/gardien" icon={<HandMetal />} title={t.goalkeeper} desc={t.goalkeeperDesc} color="yellow" />
              <CategoryCard href="/dribles" icon={<Footprints />} title={t.dribbling} desc={t.dribblingDesc} color="red" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

// Reusable CategoryCard component
function CategoryCard({ href, icon, title, desc, color }: { href: string; icon: React.ReactNode; title: string; desc: string; color: string }) {
  return (
    <Link
      href={href}
      className="group flex flex-col items-center space-y-2 rounded-lg p-4 transition-all hover:bg-white dark:hover:bg-gray-950"
    >
      <div className={`rounded-full bg-${color}-100 p-4 dark:bg-${color}-900`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 text-center">{desc}</p>
    </Link>
  );
}