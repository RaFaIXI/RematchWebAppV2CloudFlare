"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Globe, Loader2, User } from "lucide-react";

export default function DiscordAuthPage() {
  const [lang, setLang] = useState<"en" | "fr">("en");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    // Check if already authenticated
    const token = localStorage.getItem("auth_token");
    if (token) {
      router.push("/dashboard");
    }
    


    // Check if this is a redirect from Discord OAuth
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    if (code) {
      handleDiscordCallback(code);
    }
  }, [router]);

  const handleDiscordCallback = async (code: string) => {
    setIsLoading(true);
    try {
      // Exchange the code for a token (would be handled by your backend)
      // This is a placeholder - in a real app you'd make an API call
      console.log("Exchanging code:", code);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store the token in localStorage
      localStorage.setItem("auth_token", "sample_token_" + Date.now());
      
      // Redirect to dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("Authentication error:", error);
      setIsLoading(false);
    }
  };

  const handleLoginWithDiscord = () => {
    setIsLoading(true);
    
    // Redirect to Discord OAuth
    // Replace these values with your actual Discord application details
    const CLIENT_ID = "YOUR_DISCORD_CLIENT_ID";
    const REDIRECT_URI = encodeURIComponent(window.location.origin + "/login");
    const SCOPE = encodeURIComponent("identify email");
    
    window.location.href = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${SCOPE}`;
  };

  const toggleLanguage = () => {
    const newLang = lang === "en" ? "fr" : "en";
    setLang(newLang);
    localStorage.setItem("lang", newLang);
  };

  const translations = {
    en: {
      title: "Login",
      subtitle: "Connect to your account",
      loginWithDiscord: "Login with Discord",
      or: "or",
      continueAsGuest: "Continue as guest",
      languageToggle: "Switch to French",
      backToHome: "Back to Home",
      loading: "Logging in...",
      disclaimer: "By logging in, you agree to our Terms of Service and Privacy Policy."
    },
    fr: {
      title: "Connexion",
      subtitle: "Connectez-vous à votre compte",
      loginWithDiscord: "Se connecter avec Discord",
      or: "ou",
      continueAsGuest: "Continuer en tant qu'invité",
      languageToggle: "Passer en Anglais",
      backToHome: "Retour à l'Accueil",
      loading: "Connexion en cours...",
      disclaimer: "En vous connectant, vous acceptez nos Conditions d'utilisation et notre Politique de confidentialité."
    }
  };

  const t = translations[lang];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{t.title}</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">{t.subtitle}</p>
          </div>
          
          <div className="space-y-4">
            <button
              onClick={handleLoginWithDiscord}
              disabled={isLoading}
              className="w-full flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
            >
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  <span>{t.loading}</span>
                </>
              ) : (
                <>
                  <User size={20} />
                  <span>{t.loginWithDiscord}</span>
                </>
              )}
            </button>
            

            
          </div>
          
          <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>{t.disclaimer}</p>
          </div>
        </div>
        
        <div className="mt-6 flex justify-between items-center">
          <Link 
            href="/"
            className="text-blue-600 dark:text-blue-400 hover:underline flex items-center space-x-1"
          >
            <span>{t.backToHome}</span>
          </Link>
          
          <button
            onClick={toggleLanguage}
            className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <Globe size={16} />
            <span>{t.languageToggle}</span>
          </button>
        </div>
      </div>
    </div>
  );
}