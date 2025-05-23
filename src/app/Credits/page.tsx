"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, Video, Youtube, Globe, MessageSquare, ExternalLink, DollarSign } from "lucide-react";
 
export default function CreditsPage() {
  const [lang, setLang] = useState<"en" | "fr">("en");
  const [isEmbedded, setIsEmbedded] = useState(false);
  
  useEffect(() => {
    // Check if the page is embedded in an iframe
    if (window.top !== window.self) {
      setIsEmbedded(true);
      // Force French language when embedded in an iframe
      setLang("fr");
      localStorage.setItem("lang", "fr");
    } else {
      setIsEmbedded(false);
      // Not in an iframe, use stored language preference if available
      const storedLang = localStorage.getItem("lang");
      if (storedLang === "en" || storedLang === "fr") {
        setLang(storedLang);
      }
    }
  }, []);

  const translations = {
    en: {
      title: "Credits",
      reddit: "Join our Reddit Community",
      subtitle: "The amazing people behind this project",
      contributors: "Contributors",
      contributorsDescription: "This project was made possible by a passionate team of developers, designers, and contributors.",
      contentCreators: "Content Creators",
      specialThanks: "Special thanks to our amazing content creators:",
      team: "Celleste Team",
      teamDescription: "This project has been made by the Celleste Team, led by Captain RaFa.",
      joinUs: "Join our community",
      discordInvite: "Join our team on Discord",
      youtube: "YouTube Channel",
      languageToggle: "Switch to French",
      backToHome: "Back to Home",
      supportMe: "Support This Project"
    },
    fr: {
      title: "Crédits",
      reddit: "Rejoignez notre communauté Reddit",
      subtitle: "Les personnes incroyables derrière ce projet",
      contributors: "Contributeurs",
      contributorsDescription: "Ce projet a été rendu possible grâce à une équipe passionnée de développeurs, designers et contributeurs.",
      contentCreators: "Créateurs de Contenu",
      specialThanks: "Remerciements spéciaux à nos créateurs de contenu:",
      team: "L'équipe Celleste",
      teamDescription: "Ce projet a été réalisé par l'équipe Celleste, dirigée par le capitaine RaFa.",
      joinUs: "Rejoignez notre communauté",
      discordInvite: "Rejoignez notre équipe sur Discord",
      youtube: "Chaîne YouTube",
      languageToggle: "Passer en Anglais",
      backToHome: "Retour à l'Accueil",
      supportMe: "Soutenir Ce Projet"
    }
  };

  const t = translations[lang];
  
  const contributors = [
    { name: "@askii_78", role: lang === "en" ? "Clip Provider" : "Clippeur"},
    { name: "@exzya", role: lang === "en" ? "Clip Provider" : "Clippeur"},
    { name: "@rurer", role: lang === "en" ? "Labber" : "Labbeur"},
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white">{t.title}</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mt-2">{t.subtitle}</p>
          </div>
          <div className="flex space-x-4">
            <Link 
              href="/"
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 transition-colors duration-200"
            >
              <span>{t.backToHome}</span>
            </Link>
            

          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <div className="flex items-center space-x-2 mb-4">
              <Heart size={24} className="text-red-500" />
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{t.contributors}</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6">{t.contributorsDescription}</p>
            
            <div className="space-y-4">
              {contributors.map((contributor, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-white">{contributor.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{contributor.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Content Creators Section */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <div className="flex items-center space-x-2 mb-4">
              <Video size={24} className="text-purple-500" />
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{t.contentCreators}</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6">{t.specialThanks}</p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <Youtube size={24} className="text-red-600" />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800 dark:text-white">@mrfluffyy</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {lang === "en" ? "For providing awesome clips!" : "Pour les super extraits fournis !"}
                  </p>
                </div>
                <Link 
                  href="https://youtube.com/@mrfluffyy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-8 h-8 bg-red-100 dark:bg-red-900 rounded-full hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                >
                  <ExternalLink size={16} className="text-red-600 dark:text-red-300" />
                </Link>
                
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <Globe size={24} className="text-blue-600" />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800 dark:text-white">prematch.gg</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {lang === "en" ? "Tactical board idea" : "Idée du tableau tactique"}
                  </p>
                </div>
                <Link 
                  href="https://prematch.gg" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                >
                  <ExternalLink size={16} className="text-blue-600 dark:text-blue-300" />
                </Link>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <Youtube size={24} className="text-red-600" />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800 dark:text-white">@Pix3lViking</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {lang === "en" ? "For providing awesome clips!" : "Pour les super extraits fournis !"}
                  </p>
                </div>
                <Link 
                  href="https://youtube.com/@PixelVikingGames" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-8 h-8 bg-red-100 dark:bg-red-900 rounded-full hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                >
                  <ExternalLink size={16} className="text-red-600 dark:text-red-300" />
                </Link>
                
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <div className="flex items-center space-x-2 mb-4">
              <MessageSquare size={24} className="text-blue-500" />
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{t.team}</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6">{t.teamDescription}</p>
            
            <div className="space-y-4">
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h3 className="font-medium text-gray-800 dark:text-white text-lg mb-4">{t.joinUs}</h3>
                
                <Link 
                  href="https://discord.gg/ua8D567NAp" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-lg mb-3 hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors"
                >
                  <span>{t.discordInvite}</span>
                  <ExternalLink size={16} />
                </Link>
                 
                <Link 
                  href="https://www.reddit.com/r/Rematch/comments/1kgd5b5/just_launched_a_free_site_to_master_rematch_5v5/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded-lg mb-3 hover:bg-orange-200 dark:hover:bg-orange-800 transition-colors"
                >
                  <span>{t.reddit}</span>
                  <ExternalLink size={16} />
                </Link>
                
                <Link 
                  href="https://www.youtube.com/@rafassbm" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                >
                  <span>{t.youtube}</span>
                  <ExternalLink size={16} />
                </Link>
                
                {/* Donation link inside the community section when not embedded */}
                {!isEmbedded && (
                  <Link 
                    href="/donate" 
                    className="flex items-center justify-between p-3 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg mt-3 hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
                  >
                    <span>{t.supportMe}</span>
                    <ExternalLink size={16} />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} Celleste Team</p>
        </div>
      </div>
    </div>
  );
}