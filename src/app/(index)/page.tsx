"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Spline, Shield, Lightbulb, HandMetal, Footprints } from "lucide-react";
import Footer from "@/components/Footer";

export default function Home() {
  const [lang, setLang] = useState<"en" | "fr">("en");
  const [isEmbedded, setIsEmbedded] = useState(false);
  const [isEmbeddedRematchFrance, setIsEmbeddedRematchFrance] = useState(false);

  useEffect(() => {
    // Check if the page is embedded in an iframe
    if (window.top !== window.self) {
      // Force French language when embedded in an iframe
      setLang("fr");
      localStorage.setItem("lang", "fr");
      setIsEmbedded(true);
      
      try {
        // Try to get the URL of the parent (embedding) page
        const embedderURL = document.referrer;
        console.log("Page is embedded in an iframe by:", embedderURL);
        
        // Check if embedder is rematchfrance.fr
        if (embedderURL.includes("https://www.rematchfrance.fr")) {
          setIsEmbeddedRematchFrance(true);
          console.log("Embedded by RematchFrance - applying special styling");
        }
      } catch (error) {
        // If we can't access parent information due to same-origin policy
        console.log("Page is embedded in an iframe but cannot determine embedder due to security restrictions");
      }
    } else {
      // Not in an iframe, use stored language preference if available
      const storedLang = localStorage.getItem("lang");
      if (storedLang) {
        setLang(storedLang as "en" | "fr");
      }
      setIsEmbedded(false);
      setIsEmbeddedRematchFrance(false);
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
      videoAlt: "Football training video",
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
      videoAlt: "Vidéo d'entraînement de football",
    },
  };

  const t = translations[lang];

  // Determine gradient and button colors based on embedded status
  const gradientClasses = isEmbeddedRematchFrance 
    ? "bg-gradient-to-b from-[#2E3192] to-white dark:from-[#2E3192] dark:to-background" 
    : isEmbedded
      ? "bg-gradient-to-b from-blue-100 to-white dark:from-blue-900 dark:to-background"
      : "bg-gradient-to-b from-green-50 to-white dark:from-green-950 dark:to-background";
  
  // Updated button styling for better visibility when embedded
  const buttonClasses = isEmbeddedRematchFrance
    ? "bg-[#2E3192] hover:bg-blue-600 text-white font-medium"
    : isEmbedded
      ? "bg-blue-500 hover:bg-blue-600 text-white font-medium"
      : "bg-green-600 hover:bg-green-700 text-white";

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className={`w-full py-12 md:py-24 lg:py-32 ${gradientClasses}`}>
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
                  <Button className={buttonClasses} aria-label="Start learning football shooting">{t.startButton}</Button>
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
                    <Button className={buttonClasses}>{t.exploreButton}</Button>
                  </Link>
                </div>
              </div>
              <div className="mx-auto aspect-video overflow-hidden rounded-xl sm:w-full lg:order-last">
                {isEmbedded ? (
                  // Show image when embedded
                  <img
                    src="/rematch.png"
                    alt={t.imageAlt}
                    className="w-full h-full object-cover"
                    onClick={() => window.open("https://discord.com/invite/ua8D567NAp", "_blank")}
                    style={{ cursor: "pointer" }}
                  />
                ) : (
                  // Show YouTube video when not embedded
                  <iframe
                    src="https://www.youtube.com/embed/EwN-2enZCh8"
                    title={t.videoAlt}
                    className="w-full h-full object-cover"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                )}
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
              <CategoryCard 
                href="/tir" 
                icon={<Spline />} 
                title={t.shoot} 
                desc={t.shootDesc} 
                color={isEmbeddedRematchFrance ? "blue" : "green"} 
                isEmbedded={isEmbedded}
                isEmbeddedRematchFrance={isEmbeddedRematchFrance}
              />
              <CategoryCard 
                href="/defense" 
                icon={<Shield />} 
                title={t.defense} 
                desc={t.defenseDesc} 
                color="blue" 
                isEmbedded={isEmbedded}
                isEmbeddedRematchFrance={isEmbeddedRematchFrance}
              />
              <CategoryCard 
                href="/strategie" 
                icon={<Lightbulb />} 
                title={t.strategy} 
                desc={t.strategyDesc} 
                color="purple" 
                isEmbedded={isEmbedded}
                isEmbeddedRematchFrance={isEmbeddedRematchFrance}
              />
              <CategoryCard 
                href="/gardien" 
                icon={<HandMetal />} 
                title={t.goalkeeper} 
                desc={t.goalkeeperDesc} 
                color="yellow" 
                isEmbedded={isEmbedded}
                isEmbeddedRematchFrance={isEmbeddedRematchFrance}
              />
              <CategoryCard 
                href="/dribles" 
                icon={<Footprints />} 
                title={t.dribbling} 
                desc={t.dribblingDesc} 
                color="red" 
                isEmbedded={isEmbedded}
                isEmbeddedRematchFrance={isEmbeddedRematchFrance}
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

// Updated CategoryCard component with embedded styling
function CategoryCard({ 
  href, 
  icon, 
  title, 
  desc, 
  color, 
  isEmbedded,
  isEmbeddedRematchFrance
}: { 
  href: string; 
  icon: React.ReactNode; 
  title: string; 
  desc: string; 
  color: string; 
  isEmbedded: boolean;
  isEmbeddedRematchFrance: boolean;
}) {
  // Apply different styling for text and hover effects when embedded from rematchfrance.fr
  const cardClasses = isEmbeddedRematchFrance
    ? "group flex flex-col items-center space-y-2 rounded-lg p-4 transition-all hover:bg-blue-50 dark:hover:bg-blue-900"
    : isEmbedded
      ? "group flex flex-col items-center space-y-2 rounded-lg p-4 transition-all hover:bg-blue-50 dark:hover:bg-blue-900"
      : "group flex flex-col items-center space-y-2 rounded-lg p-4 transition-all hover:bg-white dark:hover:bg-gray-950";
  
  // Make title text more prominent when embedded from rematchfrance.fr
  const titleClasses = isEmbeddedRematchFrance
    ? "text-xl font-bold text-[#2E3192]"
    : isEmbedded
      ? "text-xl font-bold text-blue-600"
      : "text-xl font-bold";

  return (
    <Link href={href} className={cardClasses}>
      <div className={`rounded-full bg-${color}-100 p-4 dark:bg-${color}-900`}>
        {icon}
      </div>
      <h3 className={titleClasses}>{title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 text-center">{desc}</p>
    </Link>
  );
}