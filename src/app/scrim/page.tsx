"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Loader2, Users, MessageSquare } from "lucide-react";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation"; // Add this import

interface Team {
  teamname: string;
  Team_Description: string;
  Team_Image_Url: string;
  captain_discordId: string;
  other_players_discordIds_list: string;
  Creation_date: string | null;
}

interface CaptainInfo {
  username: string;
  avatar: string;
  joinDate: string;
  discordId: string;
  loading: boolean;
  error: boolean;
}

export default function ScrimPage() {
  const router = useRouter(); // Add router
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [lang, setLang] = useState<"en" | "fr">("en");
  const [captainsInfo, setCaptainsInfo] = useState<Record<string, CaptainInfo>>({});
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Add login state

  useEffect(() => {
    // Check login status first
    checkLoginStatus();
    
    // Check stored language preference
    const storedLang = localStorage.getItem("lang");
    if (storedLang === "en" || storedLang === "fr") {
      setLang(storedLang);
    }

    const fetchTeams = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("https://rematchguidebackend.onrender.com/api/teams");
        
        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status}`);
        }
        
        const data = await response.json() as { teams?: Team[] };
        
        if (data.teams) {
          setTeams(data.teams);
          // Initialize captain info fetching for each team
          const captainIds = data.teams.map((team: Team) => team.captain_discordId);
          fetchCaptainsInfo(captainIds);
        } else {
          setError("No teams data available");
        }
      } catch (error) {
        console.error("Error fetching teams:", error);
        setError("Failed to load teams. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeams();
  }, [router]); // Add router to dependencies

  // Add login check function
  const checkLoginStatus = () => {
    const loginStatus = localStorage.getItem("isLoggedIn");
    const loginTime = localStorage.getItem("loginTime");
    
    // If user has logged in before (loginTime exists)
    if (loginTime && loginStatus === "true") {
      // Use Date.parse for ISO strings or ensure loginTime is stored as milliseconds
      const loginTimeStamp = Date.parse(loginTime) || parseInt(loginTime);
      const currentTime = Date.now();
      const twoHoursInMs = 2 * 60 * 60 * 1000; // 2 hours in milliseconds
      
      // Check if more than 2 hours have passed since login
      if (currentTime - loginTimeStamp > twoHoursInMs) {
        // Auto logout if session expired
        localStorage.setItem("isLoggedIn", "false");
        setIsLoggedIn(false);
        router.push("/login");
        return;
      }
      
      setIsLoggedIn(true);
    } else {
      // Not logged in, redirect to login page
      setIsLoggedIn(false);
      router.push("/login");
    }
  };

  const fetchCaptainsInfo = async (captainIds: string[]) => {
    // Initialize all captains with loading state
    const initialCaptainsInfo: Record<string, CaptainInfo> = {};
    captainIds.forEach(id => {
      initialCaptainsInfo[id] = {
        username: '',
        avatar: '',
        joinDate: '',
        discordId: id,
        loading: true,
        error: false
      };
    });
    setCaptainsInfo(initialCaptainsInfo);

    // Fetch info for each captain
    captainIds.forEach(async (captainId) => {
      try {
        // Remove any # part if present (older Discord format)
        const cleanUserId = captainId.split('#')[0];
        
        const response = await fetch(`https://rematchguidebackend.onrender.com/api/user/data?user_id=${cleanUserId}`);
        
        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status}`);
        }
        
        const data = await response.json() as { user?: { username: string; avatar_url: string; created_at: string; discord_id: string } };
        
        if (data.user && typeof data.user === "object") {
          setCaptainsInfo(prev => ({
            ...prev,
            [captainId]: {
              username: data.user?.username ?? "",
              avatar: data.user?.avatar_url ?? "",
              joinDate: data.user?.created_at ?? "",
              discordId: data.user?.discord_id ?? captainId,
              loading: false,
              error: false
            }
          }));
        } else {
          throw new Error("User data not found");
        }
      } catch (error) {
        console.error(`Error fetching captain info for ${captainId}:`, error);
        setCaptainsInfo(prev => ({
          ...prev,
          [captainId]: {
            ...prev[captainId],
            loading: false,
            error: true
          }
        }));
      }
    });
  };

  const translations = {
    en: {
      title: "Available Teams for Scrims",
      subtitle: "All teams here. DM the captain on Discord to get a scrim with a team",
      loading: "Loading teams...",
      noTeams: "No teams available at the moment.",
      error: "Error loading teams",
      teamInfo: "Team Info",
      description: "Description",
      captain: "Captain",
      captainId: "Captain ID",
      members: "Members",
      contactOnDiscord: "Contact on Discord",
      copy: "Copy ID",
      copyName: "Copy Discord Name", // Add this new translation
      copied: "Copied!",
      players: "players"
    },
    fr: {
      title: "Équipes Disponibles pour Scrims",
      subtitle: "Toutes les équipes ici. Envoyez un DM au capitaine sur Discord pour organiser un scrim avec une équipe",
      loading: "Chargement des équipes...",
      noTeams: "Aucune équipe disponible pour le moment.",
      error: "Erreur lors du chargement des équipes",
      teamInfo: "Info d'Équipe",
      description: "Description",
      captain: "Capitaine",
      captainId: "ID du Capitaine",
      members: "Membres",
      contactOnDiscord: "Contacter sur Discord",
      copy: "Copier l'ID",
      copyName: "Copier le Nom Discord", // Add this new translation
      copied: "Copié!",
      players: "joueurs"
    }
  };

  const t = translations[lang];

  const handleCopyDiscordId = (discordId: string) => {
    navigator.clipboard.writeText(discordId);
    // You could add a temporary "Copied!" notification here
  };

  // Add new handler for copying username
  const handleCopyDiscordName = (username: string) => {
    navigator.clipboard.writeText(username);
    // You could add a temporary "Copied!" notification here
  };

  const countTeamMembers = (team: Team) => {
    // Count captain + other players
    const otherPlayers = team.other_players_discordIds_list ? 
      team.other_players_discordIds_list.split(',').length : 0;
    return otherPlayers + 1; // +1 for captain
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-10">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">{t.title}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mt-2 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-64">
            <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
            <p className="mt-4 text-gray-500">{t.loading}</p>
          </div>
        ) : error ? (
          <div className="text-center p-8 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </div>
        ) : teams.length === 0 ? (
          <div className="text-center p-8 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400">{t.noTeams}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams.map((team) => (
              <div 
                key={team.teamname}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
              >
                <div className="p-5">
                  <div className="flex items-center mb-4">
                    <div className="h-16 w-16 flex-shrink-0 mr-4">
                      <Image
                        src={team.Team_Image_Url || "/assets/logo-placeholder-image.png"}
                        alt={team.teamname}
                        width={64}
                        height={64}
                        className="rounded-lg object-cover"
                      />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-800 dark:text-white">{team.teamname}</h2>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                        <Users size={14} className="mr-1" />
                        <span>{countTeamMembers(team)} {t.players}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-5">
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">{t.description}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                        {team.Team_Description || "No description provided."}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">{t.captain}</h3>
                      <div className="flex flex-col space-y-2 mt-1">

                        
                        {/* Captain name/username with copy button */}
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                            <span className="font-medium mr-2">Name:</span>
                            {captainsInfo[team.captain_discordId]?.loading ? (
                              <span className="text-gray-400 flex items-center">
                                <Loader2 size={12} className="animate-spin mr-1" />
                                Loading...
                              </span>
                            ) : captainsInfo[team.captain_discordId]?.error ? (
                              <span>{team.captain_discordId.split('#')[0] || team.captain_discordId}</span>
                            ) : (
                              <span>{captainsInfo[team.captain_discordId]?.username || team.captain_discordId.split('#')[0]}</span>
                            )}
                          </div>
                          {/* Only show copy name button when username is loaded */}
                          {!captainsInfo[team.captain_discordId]?.loading && !captainsInfo[team.captain_discordId]?.error && captainsInfo[team.captain_discordId]?.username && (
                            <button
                              onClick={() => handleCopyDiscordName(captainsInfo[team.captain_discordId].username)}
                              className="flex items-center text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-1 rounded hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
                            >
                              <MessageSquare size={12} className="mr-1" />
                              {t.copyName}
                            </button>
                          )}
                        </div>

                        {/* Captain Discord ID with copy button */}
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            <span className="font-medium mr-2">{t.captainId}:</span>
                            <span className="font-mono">{team.captain_discordId}</span>
                          </div>
                          <button
                            onClick={() => handleCopyDiscordId(String(team.captain_discordId))}
                            className="flex items-center text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                          >
                            <MessageSquare size={12} className="mr-1" />
                            {t.copy}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  

                </div>
              </div>
            ))}
          </div>
        )}
        
        <Footer />
      </div>
    </div>
  );
}