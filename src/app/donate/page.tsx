"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Heart, Coffee, Wallet, DollarSign } from "lucide-react";
import Footer from "@/components/Footer";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

export default function Donate() {
  const [lang, setLang] = useState<"en" | "fr">("en");
  const [isEmbedded, setIsEmbedded] = useState(false);

  useEffect(() => {
    // Check if the page is embedded in an iframe
    if (window.top !== window.self) {
      // Force French language when embedded in an iframe
      setLang("fr");
      localStorage.setItem("lang", "fr");
      setIsEmbedded(true);
    } else {
      // Not in an iframe, use stored language preference if available
      const storedLang = localStorage.getItem("lang");
      if (storedLang) {
        setLang(storedLang as "en" | "fr");
      }
      setIsEmbedded(false);
    }
  }, []);

  const translations = {
    en: {
      heading: "Support My Work",
      description: "Your support helps me create more tutorials and improve the platform for everyone. Any contribution, big or small, is greatly appreciated.",
      cryptoTitle: "Cryptocurrency",
      cryptoDesc: "Support with Ethereum",
      walletAddress: "Wallet Address",
      copyAddress: "Copy Address",
      copied: "Address copied!",
      paypalTitle: "PayPal",
      paypalDesc: "Quick and easy support",
      paypalButton: "Support via PayPal",
      thanksTitle: "Thank You",
      thanksDesc: "Your support enables me to continue creating quality about Rematch technique tutorials and improving this platform.",
      tipCoffee: "Buy me a coffee",
      tipTraining: "Support a training session",
      tipEquipment: "Help with new equipment",
    },
    fr: {
      heading: "Soutiens Mon Travail",
      description: "Votre soutien me permet de créer davantage de tutoriels et d'améliorer la plateforme pour tous. Toute contribution, grande ou petite, est grandement appréciée.",
      cryptoTitle: "Cryptomonnaie",
      cryptoDesc: "Soutenez avec Ethereum",
      walletAddress: "Adresse de Portefeuille",
      copyAddress: "Copier l'Adresse",
      copied: "Adresse copiée !",
      paypalTitle: "PayPal",
      paypalDesc: "Soutien rapide et facile",
      paypalButton: "Soutenir via PayPal",
      thanksTitle: "Merci",
      thanksDesc: "Votre soutien me permet de continuer à créer des tutoriels de technique sur Rematch de qualité et à améliorer cette plateforme.",
      tipCoffee: "Offrez-moi un café",
      tipTraining: "Soutenez une séance d'entraînement",
      tipEquipment: "Aidez pour du nouvel équipement",
    },
  };

  const t = translations[lang];

  // Determine gradient based on embedded status
  const gradientClasses = isEmbedded 
    ? "bg-gradient-to-b from-[#2E3192] to-white dark:from-[#2E3192] dark:to-background" 
    : "bg-gradient-to-b from-green-50 to-white dark:from-green-950 dark:to-background";
  
  // Button styling for better visibility
  const buttonClasses = isEmbedded
    ? "bg-[#2E3192] hover:bg-blue-600 text-white font-medium"
    : "bg-green-600 hover:bg-green-700 text-white";

  const cryptoAddress = "0x4E21D5a369455F2af1E8B5ffB368370E3943EEA6";
  const paypalLink = "https://paypal.me/RSole442";

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: t.copied,
        action: <ToastAction altText="OK">OK</ToastAction>,
      });
    });
  };

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
              <div className="inline-flex items-center justify-center">
                <Heart className="h-8 w-8 text-red-500 animate-pulse" />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
              {/* Crypto Section */}
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <Wallet className="h-12 w-12 text-blue-500" />
                <h2 className="text-2xl font-bold">{t.cryptoTitle}</h2>
                <p className="text-gray-500 text-center">{t.cryptoDesc}</p>
                
                <div className="w-full space-y-2">
                  <p className="font-medium">{t.walletAddress}</p>
                  <div className="flex items-center rounded-md border p-2 bg-gray-50 dark:bg-gray-800">
                    <code className="flex-1 text-sm break-all">{cryptoAddress}</code>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => copyToClipboard(cryptoAddress)}
                      aria-label="Copy wallet address"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex flex-col w-full gap-2">
                  <Button 
                    className={buttonClasses}
                    onClick={() => copyToClipboard(cryptoAddress)}
                  >
                    <Copy className="mr-2 h-4 w-4" /> {t.copyAddress}
                  </Button>
                </div>
              </div>

              {/* PayPal Section */}
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <DollarSign className="h-12 w-12 text-blue-500" />
                <h2 className="text-2xl font-bold">{t.paypalTitle}</h2>
                <p className="text-gray-500 text-center">{t.paypalDesc}</p>
                
                <div className="flex flex-col w-full gap-4 mt-4">
                  <Button 
                    className={buttonClasses}
                    onClick={() => window.open(paypalLink, "_blank")}
                  >
                    {t.paypalButton}
                  </Button>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 w-full">
                    <Button 
                      variant="outline" 
                      onClick={() => window.open(`${paypalLink}/3`, "_blank")}
                    >
                      <Coffee className="mr-2 h-4 w-4" />
                      {t.tipCoffee}
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => window.open(`${paypalLink}/10`, "_blank")}
                    >
                      <Heart className="mr-2 h-4 w-4" />
                      {t.tipTraining}
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => window.open(`${paypalLink}/25`, "_blank")}
                    >
                      <Wallet className="mr-2 h-4 w-4" />
                      {t.tipEquipment}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16 text-center">
              <h2 className="text-2xl font-bold mb-4">{t.thanksTitle}</h2>
              <p className="mx-auto max-w-[600px] text-gray-500">{t.thanksDesc}</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}