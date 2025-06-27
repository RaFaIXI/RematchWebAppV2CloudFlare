"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Search, Target, Users, Trophy, Clock, Timer, Shield, Footprints, HandMetal, Lightbulb } from "lucide-react";
import Footer from "@/components/Footer";

interface PlayerStats {
  nickname: string;
  goals: string;
  assists: string;
  passes: string;
  dribbles: string;
  saves: string;
  interceptions: string;
  shotsOnTarget: string;
  rank: number;
  matchesPlayed: number;
  winRate: string;
}

export default function TrackerPage() {
  const [lang, setLang] = useState<"en" | "fr">("en");
  const [isEmbedded, setIsEmbedded] = useState(false);
  const [isEmbeddedRematchFrance, setIsEmbeddedRematchFrance] = useState(false);
  const [nickname, setNickname] = useState("");
  const [playerStats, setPlayerStats] = useState<PlayerStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
        
        // Check if the embedder is specifically rematchfrance.fr
        if (embedderURL && embedderURL.includes("rematchfrance.fr")) {
          console.log("Embedded specifically on rematchfrance.fr");
          setIsEmbeddedRematchFrance(true);
        } else {
          setIsEmbeddedRematchFrance(false);
        }
      } catch (error) {
        // If we can't access parent information due to same-origin policy
        console.log("Page is embedded in an iframe but cannot determine embedder due to security restrictions");
        setIsEmbeddedRematchFrance(false);
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
      heading: "Player Tracker",
      description: "Track your performance and compare with elite players who dominate the arena.",
      searchPlaceholder: "Enter your nickname...",
      searchButton: "Search Player",
      topPlayersTitle: "TOP PLAYERS",
      topPlayersDescription: "Meet the elite players who dominate the arena with their exceptional skills and tactics",
      globalStatsTitle: "Global Statistics",
      goals: "Goals",
      assists: "Assists",
      passes: "Passes",
      dribbles: "Dribbles",
      gkSaves: "GK Saves",
      interceptions: "Interceptions",
      shotsOnTarget: "Shots on Target",
      activePlayers: "Active Players",
      matchesPlayed: "Matches Played",
      avgMatchDuration: "Avg Match Duration",
      avgOvertime: "Avg Overtime",
      playerNotFound: "Player not found. Please check the nickname and try again.",
      rank: "Rank",
      winRate: "Win Rate",
      matches: "Matches",
      loading: "Searching...",
      elo: "ELO",
    },
    fr: {
      heading: "Tracker de Joueur",
      description: "Suivez vos performances et comparez-vous aux joueurs d'élite qui dominent l'arène.",
      searchPlaceholder: "Entrez votre pseudo...",
      searchButton: "Rechercher Joueur",
      topPlayersTitle: "MEILLEURS JOUEURS",
      topPlayersDescription: "Rencontrez les joueurs d'élite qui dominent l'arène avec leurs compétences et tactiques exceptionnelles",
      globalStatsTitle: "Statistiques Globales",
      goals: "Buts",
      assists: "Passes décisives",
      passes: "Passes",
      dribbles: "Dribbles",
      gkSaves: "Arrêts GB",
      interceptions: "Interceptions",
      shotsOnTarget: "Tirs cadrés",
      activePlayers: "Joueurs Actifs",
      matchesPlayed: "Matchs Joués",
      avgMatchDuration: "Durée Moy. Match",
      avgOvertime: "Prolongations Moy.",
      playerNotFound: "Joueur non trouvé. Veuillez vérifier le pseudo et réessayer.",
      rank: "Rang",
      winRate: "Taux de Victoire",
      matches: "Matchs",
      loading: "Recherche...",
      elo: "ELO",
    },
  };

  const t = translations[lang];

  // Determine gradient and button colors based on embedded status
  const gradientClasses = isEmbeddedRematchFrance 
    ? "bg-gradient-to-b from-[#2E3192] to-white dark:from-[#2E3192] dark:to-background" 
    : "bg-gradient-to-b from-green-50 to-white dark:from-green-950 dark:to-background";
  
  const buttonClasses = isEmbeddedRematchFrance
    ? "bg-[#2E3192] hover:bg-blue-600 text-white font-medium"
    : "bg-green-600 hover:bg-green-700 text-white";

  const searchPlayer = async () => {
    if (!nickname.trim()) return;
    
    setLoading(true);
    setError("");
    
    try {
      // Simulate API call - replace with actual API endpoint
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock player data - replace with actual API response
      const mockData: PlayerStats = {
        nickname: nickname,
        goals: "1,234",
        assists: "856",
        passes: "5,678",
        dribbles: "2,341",
        saves: "789",
        interceptions: "1,567",
        shotsOnTarget: "967",
        rank: Math.floor(Math.random() * 10000) + 1,
        matchesPlayed: Math.floor(Math.random() * 500) + 50,
        winRate: (Math.random() * 40 + 50).toFixed(1) + "%",
      };
      
      setPlayerStats(mockData);
    } catch (err) {
      setError(t.playerNotFound);
    } finally {
      setLoading(false);
    }
  };

  const globalStats = [
    { label: t.goals, value: "7.9M", icon: <Target className="h-6 w-6" /> },
    { label: t.assists, value: "74.9M", icon: <Users className="h-6 w-6" /> },
    { label: t.passes, value: "18.7M", icon: <Lightbulb className="h-6 w-6" /> },
    { label: t.dribbles, value: "16.2M", icon: <Footprints className="h-6 w-6" /> },
    { label: t.gkSaves, value: "76.8M", icon: <HandMetal className="h-6 w-6" /> },
    { label: t.interceptions, value: "45.9M", icon: <Shield className="h-6 w-6" /> },
  ];

  const platformStats = [
    { label: t.activePlayers, value: "60K", icon: <Users className="h-6 w-6" /> },
    { label: t.matchesPlayed, value: "2.8M", icon: <Trophy className="h-6 w-6" /> },
    { label: t.avgMatchDuration, value: "7m 42s", icon: <Clock className="h-6 w-6" /> },
    { label: t.avgOvertime, value: "3m 29s", icon: <Timer className="h-6 w-6" /> },
  ];

  const topPlayers = [
    { rank: 1, name: "ProPlayer_1", elo: "2847", winRate: "89.2%" },
    { rank: 2, name: "EliteShooter", elo: "2789", winRate: "87.8%" },
    { rank: 3, name: "MasterTactician", elo: "2734", winRate: "86.4%" },
    { rank: 4, name: "SkillfulDribbler", elo: "2698", winRate: "85.1%" },
    { rank: 5, name: "DefenseKing", elo: "2656", winRate: "84.7%" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className={`w-full py-12 md:py-24 lg:py-32 ${gradientClasses}`}>
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-8 text-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  {t.heading}
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  {t.description}
                </p>
              </div>
              
              {/* Player Search */}
              <div className="w-full max-w-md space-y-4">
                <div className="flex space-x-2">
                  <Input
                    type="text"
                    placeholder={t.searchPlaceholder}
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && searchPlayer()}
                    className="flex-1"
                  />
                  <Button 
                    onClick={searchPlayer} 
                    disabled={loading || !nickname.trim()}
                    className={buttonClasses}
                  >
                    <Search className="h-4 w-4 mr-2" />
                    {loading ? t.loading : t.searchButton}
                  </Button>
                </div>
                
                {error && (
                  <p className="text-red-500 text-sm">{error}</p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Player Stats Section */}
        {playerStats && (
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    {playerStats.nickname}
                  </h2>
                  <div className="flex justify-center items-center space-x-4 mt-4">
                    <Badge variant="outline" className="text-lg px-4 py-2">
                      {t.rank} #{playerStats.rank}
                    </Badge>
                    <Badge variant="outline" className="text-lg px-4 py-2">
                      {t.winRate}: {playerStats.winRate}
                    </Badge>
                    <Badge variant="outline" className="text-lg px-4 py-2">
                      {playerStats.matchesPlayed} {t.matches}
                    </Badge>
                  </div>
                </div>
                
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  <StatCard label={t.goals} value={playerStats.goals} icon={<Target className="h-6 w-6" />} />
                  <StatCard label={t.assists} value={playerStats.assists} icon={<Users className="h-6 w-6" />} />
                  <StatCard label={t.passes} value={playerStats.passes} icon={<Lightbulb className="h-6 w-6" />} />
                  <StatCard label={t.dribbles} value={playerStats.dribbles} icon={<Footprints className="h-6 w-6" />} />
                  <StatCard label={t.gkSaves} value={playerStats.saves} icon={<HandMetal className="h-6 w-6" />} />
                  <StatCard label={t.interceptions} value={playerStats.interceptions} icon={<Shield className="h-6 w-6" />} />
                  <StatCard label={t.shotsOnTarget} value={playerStats.shotsOnTarget} icon={<Target className="h-6 w-6" />} />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Top Players Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-8 text-center">
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-2">
                  <Star className="h-6 w-6 text-yellow-500" />
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    {t.topPlayersTitle}
                  </h2>
                  <Star className="h-6 w-6 text-yellow-500" />
                </div>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  {t.topPlayersDescription}
                </p>
              </div>
              
              <div className="w-full max-w-4xl space-y-4">
                {topPlayers.map((player) => (
                  <Card key={player.rank} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Badge variant={player.rank <= 3 ? "default" : "outline"} className="text-lg px-3 py-1">
                          #{player.rank}
                        </Badge>
                        <div className="text-left">
                          <h3 className="text-lg font-bold">{player.name}</h3>
                          <p className="text-sm text-gray-500">{player.elo} {t.elo}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold">{player.winRate}</p>
                        <p className="text-sm text-gray-500">{t.winRate}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Global Statistics Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="space-y-12">
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  {t.globalStatsTitle}
                </h2>
              </div>
              
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                {globalStats.map((stat, index) => (
                  <StatCard key={index} label={stat.label} value={stat.value} icon={stat.icon} />
                ))}
              </div>
              
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-12">
                {platformStats.map((stat, index) => (
                  <StatCard key={index} label={stat.label} value={stat.value} icon={stat.icon} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function StatCard({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <Card className="text-center">
      <CardHeader className="pb-2">
        <div className="flex justify-center mb-2">
          {icon}
        </div>
        <CardTitle className="text-2xl font-bold">{value}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm">{label}</CardDescription>
      </CardContent>
    </Card>
  );
}
