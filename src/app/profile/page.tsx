"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { User, Users, PlusCircle, ExternalLink, Shield, LogOut, Check, X, Bell, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

// Define types for API responses
interface TeamMember {
  id: string;
  username: string;
  role: string;
  avatar: string;
  joinDate: string;
}

interface Team {
  id: string;
  name: string;
  logo: string;
  role: string;
  memberCount: number;
  description: string;
  createdOn: string;
  members: TeamMember[];
}

interface Invitation {
  id: string;
  teamName: string;
  teamLogo: string;
  memberCount: number;
}

export default function ProfilePage() {
  const [lang, setLang] = useState<"en" | "fr">("en");
  const [isEmbedded, setIsEmbedded] = useState(false);
  const [createTeamOpen, setCreateTeamOpen] = useState(false);
  const [viewTeamOpen, setViewTeamOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [user, setUser] = useState({
    username: "",
    avatar: "",
    joinDate: "",
    discordId: ""
  });
  const [newTeamName, setNewTeamName] = useState("");
  const [newTeamDescription, setNewTeamDescription] = useState("");
  const [newTeamLogo, setNewTeamLogo] = useState("");
  
  // Add states for real data
  const [teams, setTeams] = useState<Team[]>([]);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [isLoading, setIsLoading] = useState({
    user: false,
    teams: false,
    invitations: false,
    createTeam: false,
    leaveTeam: false,
    acceptInvite: false,
    declineInvite: false
  });
  const [error, setError] = useState({
    user: "",
    teams: "",
    invitations: "",
    createTeam: "",
    leaveTeam: "",
    acceptInvite: "",
    declineInvite: ""
  });
  
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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(prev => ({ ...prev, user: true }));
        const userId = localStorage.getItem("userId");
        if (!userId) return;
        
        const response = await fetch(`https://rematchguidebackend.onrender.com/api/user/data?user_id=${userId}`);
        const data = await response.json() as { user?: { username: string; avatar_url: string; created_at: string; discord_id: string } };
        
        if (data.user) {
          setUser({
            username: data.user.username,
            avatar: data.user.avatar_url,
            joinDate: data.user.created_at,
            discordId: data.user.discord_id
          });
          
          // After getting user data, fetch teams and invitations
          fetchUserTeams();
          fetchUserInvitations(data.user.discord_id);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError(prev => ({ ...prev, user: "Failed to load user data" }));
      } finally {
        setIsLoading(prev => ({ ...prev, user: false }));
      }
    };

    fetchUserData();
  }, []);

  const fetchUserTeams = async () => {
    try {
      setIsLoading(prev => ({ ...prev, teams: true }));
      const userId = localStorage.getItem("userId");        
      if (!userId) return;   
      const response = await fetch(`https://rematchguidebackend.onrender.com/api/teams/player?discord_id=${userId}`);
      const data = await response.json() as { teams?: any[] };
      
      if (data.teams) {
        // Transform API response to our Team interface
        const formattedTeams: Team[] = await Promise.all(data.teams.map(async team => {
          // Count members (captain + other players)
          const otherPlayers = team.other_players_discordIds_list ? 
            team.other_players_discordIds_list.split(',') : [];
          const memberCount = otherPlayers.length + 1; // +1 for captain
          
          // For each team, we should get members data
          // This would be a separate API call in a real application
          // Here we're mocking it with basic data
          const members: TeamMember[] = [
            {
              id: team.captain_discordId,
              username: user.username, // For the captain, use current user if matching
              role: "captain",
              avatar: user.avatar,
              joinDate: team.Creation_date || new Date().toISOString()
            }
          ];
          
          // Add other players (in a real app, you'd fetch their details)
          // This is simplified for this implementation
          
          return {
            id: team.teamname, // Using teamname as ID
            name: team.teamname,
            logo: team.Team_Image_Url || "/api/placeholder/50/50",
            role: team.role || "player",
            memberCount,
            description: team.Team_Description || "",
            createdOn: team.Creation_date || new Date().toISOString(),
            members
          };
        }));
        
        setTeams(formattedTeams);
      }
    } catch (error) {
      console.error("Error fetching user teams:", error);
      setError(prev => ({ ...prev, teams: "Failed to load teams" }));
    } finally {
      setIsLoading(prev => ({ ...prev, teams: false }));
    }
  };

  const fetchUserInvitations = async (discordId: string) => {
    try {
      setIsLoading(prev => ({ ...prev, invitations: true }));
      
      // Get all teams to check for invitations
      const response = await fetch(`https://rematchguidebackend.onrender.com/api/teams`);
      const data = await response.json() as { teams?: any[] };
      
      if (data.teams) {
        // Filter teams where the user is in invited_discordIds_list
        const userInvitations = data.teams
          .filter(team => {
            const invitedList = team.invited_discordIds_list ? 
              team.invited_discordIds_list.split(',') : [];
            return invitedList.includes(discordId);
          })
          .map(team => {
            // Count members
            const otherPlayers = team.other_players_discordIds_list ? 
              team.other_players_discordIds_list.split(',') : [];
            const memberCount = otherPlayers.length + 1; // +1 for captain
            
            return {
              id: team.teamname,
              teamName: team.teamname,
              teamLogo: team.Team_Image_Url || "/api/placeholder/50/50",
              memberCount
            };
          });
        
        setInvitations(userInvitations);
      }
    } catch (error) {
      console.error("Error fetching user invitations:", error);
      setError(prev => ({ ...prev, invitations: "Failed to load invitations" }));
    } finally {
      setIsLoading(prev => ({ ...prev, invitations: false }));
    }
  };

  const handleCreateTeam = async () => {
    try {
      if (!newTeamName.trim()) {
        alert(lang === "en" ? "Team name is required" : "Le nom de l'équipe est requis");
        return;
      }
      
      setIsLoading(prev => ({ ...prev, createTeam: true }));
      setError(prev => ({ ...prev, createTeam: "" }));
      const userId = localStorage.getItem("userId");        
      if (!userId) return;                

      // Create team using API
      const response = await fetch("https://rematchguidebackend.onrender.com/api/teams/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          teamname: newTeamName,
          Team_Description: newTeamDescription,
          Team_Image_Url: newTeamLogo,
          captain_discordId: userId,
        }),
      });
      
      const data = await response.json() as { success?: boolean; message?: string };
      
      if (data.success) {
        // Reset form and close dialog
        setNewTeamName("");
        setNewTeamDescription("");
        setNewTeamLogo("");
        setCreateTeamOpen(false);
        
        // Refresh teams
        fetchUserTeams();
        
        alert(lang === "en" ? "Team created successfully!" : "Équipe créée avec succès !");
      } else {
        setError(prev => ({ ...prev, createTeam: data.message || 
          (lang === "en" ? "Failed to create team" : "Échec de la création de l'équipe") }));
        alert(data.message || (lang === "en" ? "Failed to create team" : "Échec de la création de l'équipe"));
      }
    } catch (error) {
      console.error("Error creating team:", error);
      setError(prev => ({ ...prev, createTeam: "An error occurred" }));
      alert(lang === "en" ? "An error occurred" : "Une erreur s'est produite");
    } finally {
      setIsLoading(prev => ({ ...prev, createTeam: false }));
    }
  };


  const handleAcceptInvitation = async (teamName: string) => {
    try {
      setIsLoading(prev => ({ ...prev, acceptInvite: true }));
      
      const response = await fetch("https://rematchguidebackend.onrender.com/api/teams/add_player", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          teamname: teamName,
          discord_id: user.discordId
        }),
      });
      
      const data = await response.json() as { success?: boolean; message?: string };
      
      if (data.success) {
        // Refresh teams and invitations
        fetchUserTeams();
        fetchUserInvitations(user.discordId);
        
        alert(lang === "en" ? "Invitation accepted successfully!" : "Invitation acceptée avec succès !");
      } else {
        setError(prev => ({ ...prev, acceptInvite: data.message || 
          (lang === "en" ? "Failed to accept invitation" : "Échec de l'acceptation de l'invitation") }));
        alert(data.message || (lang === "en" ? "Failed to accept invitation" : "Échec de l'acceptation de l'invitation"));
      }
    } catch (error) {
      console.error("Error accepting invitation:", error);
      setError(prev => ({ ...prev, acceptInvite: "Failed to accept invitation" }));
      alert(lang === "en" ? "Failed to accept invitation" : "Échec de l'acceptation de l'invitation");
    } finally {
      setIsLoading(prev => ({ ...prev, acceptInvite: false }));
    }
  };

  const handleDeclineInvitation = async (teamName: string) => {
    try {
      setIsLoading(prev => ({ ...prev, declineInvite: true }));
      
      // API call to decline invitation would go here
      // This endpoint is not provided in the examples, so we'll simulate it
      
      // Remove the invitation from the list
      setInvitations(invitations.filter(inv => inv.teamName !== teamName));
      
      alert(lang === "en" ? "Invitation declined" : "Invitation refusée");
    } catch (error) {
      console.error("Error declining invitation:", error);
      setError(prev => ({ ...prev, declineInvite: "Failed to decline invitation" }));
      alert(lang === "en" ? "Failed to decline invitation" : "Échec du refus de l'invitation");
    } finally {
      setIsLoading(prev => ({ ...prev, declineInvite: false }));
    }
  };

  const translations = {
    en: {
      title: "Profile",
      subtitle: "Manage your profile and team memberships",
      myTeams: "My Teams",
      noTeams: "You haven't joined any teams yet.",
      joinTeam: "Join a Team",
      createTeam: "Create Team",
      teamActions: "Team Actions",
      editProfile: "Edit Profile",
      logout: "Logout",
      teamRole: "Role",
      captain: "Captain",
      player: "Player",
      viewTeam: "View Team",
      teamMembers: "members",
      invitations: "Team Invitations",
      noInvitations: "You don't have any pending invitations.",
      accept: "Accept",
      decline: "Decline",
      teamName: "Team Name",
      teamDescription: "Team Description",
      createNewTeam: "Create New Team",
      create: "Create",
      cancel: "Cancel",
      teamLogo: "Team Logo URL",
      enterLogoUrl: "Enter logo URL",
      teamDetails: "Team Details",
      members: "Members",
      kickMember: "Remove",
      settings: "Settings",
      teamCreatedOn: "Team created on",
      loading: "Loading...",
      errorLoading: "Error loading data"
    },
    fr: {
      title: "Profil",
      subtitle: "Gérez votre profil et vos équipes",
      myTeams: "Mes Équipes",
      noTeams: "Vous n'avez pas encore rejoint d'équipes.",
      joinTeam: "Rejoindre une Équipe",
      createTeam: "Créer une Équipe",
      teamActions: "Actions d'Équipe",
      editProfile: "Modifier le Profil",
      logout: "Déconnexion",
      teamRole: "Rôle",
      captain: "Capitaine",
      player: "Joueur",
      viewTeam: "Voir l'Équipe",
      teamMembers: "membres",
      invitations: "Invitations d'Équipe",
      noInvitations: "Vous n'avez pas d'invitations en attente.",
      accept: "Accepter",
      decline: "Refuser",
      teamName: "Nom de l'Équipe",
      teamDescription: "Description de l'Équipe",
      createNewTeam: "Créer une Nouvelle Équipe",
      create: "Créer",
      cancel: "Annuler",
      teamLogo: "URL du Logo d'Équipe",
      enterLogoUrl: "Entrez l'URL du logo",
      teamDetails: "Détails de l'Équipe",
      members: "Membres",
      kickMember: "Retirer",
      settings: "Paramètres",
      teamCreatedOn: "Équipe créée le",
      loading: "Chargement...",
      errorLoading: "Erreur lors du chargement des données"
    }
  };

  const t = translations[lang];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-10">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">{t.title}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mt-2">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Section */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            {isLoading.user ? (
              <div className="flex flex-col items-center justify-center h-48">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                <p className="mt-2 text-gray-500">{t.loading}</p>
              </div>
            ) : error.user ? (
              <div className="text-center text-red-500 p-4">
                {error.user}
              </div>
            ) : (
              <>
                <div className="flex flex-col items-center space-y-4 mb-6">
                  <Image 
                    src={user.avatar || "/api/placeholder/100/100"} 
                    alt="Profile Picture" 
                    width={100} 
                    height={100} 
                    className="rounded-full border-4 border-blue-500 dark:border-blue-600"
                  />
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{user.username}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {lang === "en" ? `Member since ${new Date(user.joinDate).toLocaleDateString()}` : 
                      `Membre depuis ${new Date(user.joinDate).toLocaleDateString()}`}
                  </p>
                </div>
                
                <div className="space-y-4 mt-8">
                  <button 
                    className="flex items-center justify-between w-full p-3 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                    onClick={() => {
                      localStorage.setItem("isLoggedIn", "false");
                      // Force a complete page refresh to the login page
                      window.location.replace('/login');
                    }}
                  >
                    <span className="flex items-center">
                      <LogOut size={18} className="mr-2" />
                      {t.logout}
                    </span>
                    <ExternalLink size={16} />
                  </button>
                </div>
              </>
            )}
          </div>

          {/* My Teams Section */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md md:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Users size={24} className="text-blue-500" />
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{t.myTeams}</h2>
              </div>
              <div className="flex space-x-2">
                <Dialog open={createTeamOpen} onOpenChange={setCreateTeamOpen}>
                  <DialogTrigger asChild>
                    <Button className="flex items-center space-x-1 px-3 py-2 bg-green-600 text-white rounded-lg shadow-sm hover:bg-green-700 transition-colors duration-200"
                      disabled={isLoading.createTeam}>
                      {isLoading.createTeam ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-1" />
                      ) : (
                        <PlusCircle size={16} />
                      )}
                      <span>{t.createTeam}</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>{t.createNewTeam}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-6 py-4">
                      <div className="flex flex-col items-center gap-4 mb-2">
                        <div className="relative">
                          <Image 
                            src={newTeamLogo || "/api/placeholder/100/100"}
                            alt="Team Logo" 
                            width={100} 
                            height={100} 
                            className="rounded-lg border-2 border-gray-300 dark:border-gray-600"
                          />
                        </div>
                        <div className="w-full">
                          <label className="block text-sm font-medium mb-1">
                            {t.teamLogo}
                          </label>
                          <input 
                            type="text"
                            value={newTeamLogo}
                            onChange={(e) => setNewTeamLogo(e.target.value)}
                            placeholder={t.enterLogoUrl}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                          />
                        </div>
                      </div>
                      
                      <div className="grid gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            {t.teamName}
                          </label>
                          <input 
                            type="text"
                            value={newTeamName}
                            onChange={(e) => setNewTeamName(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            {t.teamDescription}
                          </label>
                          <textarea 
                            rows={3}
                            value={newTeamDescription}
                            onChange={(e) => setNewTeamDescription(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                          ></textarea>
                        </div>
                      </div>

                      {error.createTeam && (
                        <div className="text-red-500 text-sm">{error.createTeam}</div>
                      )}

                      <div className="flex justify-end gap-3 mt-4">
                        <button 
                          className="px-4 py-2 bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                          onClick={() => {
                            setCreateTeamOpen(false);
                            setNewTeamName("");
                            setNewTeamDescription("");
                            setNewTeamLogo("");
                            setError(prev => ({ ...prev, createTeam: "" }));
                          }}
                          disabled={isLoading.createTeam}
                        >
                          {t.cancel}
                        </button>
                        <button 
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                          onClick={handleCreateTeam}
                          disabled={isLoading.createTeam}
                        >
                          {isLoading.createTeam && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                          {t.create}
                        </button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            
            {isLoading.teams ? (
              <div className="flex flex-col items-center justify-center h-48">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                <p className="mt-2 text-gray-500">{t.loading}</p>
              </div>
            ) : error.teams ? (
              <div className="text-center text-red-500 p-4">
                {error.teams}
              </div>
            ) : teams.length === 0 ? (
              <div className="p-8 text-center border border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
                <p className="text-gray-500 dark:text-gray-400">{t.noTeams}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {teams.map((team) => (
                  <div key={team.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                    <div className="flex items-center space-x-4">
                      <Image 
                        src={team.logo} 
                        alt={team.name} 
                        width={50} 
                        height={50} 
                        className="rounded-lg"
                      />
                      <div>
                        <h3 className="font-medium text-gray-800 dark:text-white">{team.name}</h3>
                        <div className="flex items-center space-x-3 mt-1">
                          <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                            <Users size={14} className="mr-1" /> 
                            {team.memberCount} {t.teamMembers}
                          </span>

                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className={`px-2 py-1 rounded text-xs font-medium mb-2 
                        ${team.role === "captain" ? 
                          "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" : 
                          "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"}`}>
                        {team.role === "captain" ? (
                          <span className="flex items-center">
                            <Shield size={12} className="mr-1" />
                            {t.captain}
                          </span>
                        ) : t.player}
                      </div>
                      <div className="flex space-x-2">
                        <Dialog 
                          open={viewTeamOpen && selectedTeam?.id === team.id} 
                          onOpenChange={(open) => {
                            setViewTeamOpen(open);
                            if (open) setSelectedTeam(team);
                          }}
                        >
                          <DialogTrigger asChild>
                            <button 
                              className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                              onClick={() => {
                                setSelectedTeam(team);
                                setViewTeamOpen(true);
                              }}
                            >
                              {t.viewTeam}
                            </button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[700px]">
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-3">
                                <Image 
                                  src={team.logo} 
                                  alt={team.name} 
                                  width={32} 
                                  height={32} 
                                  className="rounded-lg"
                                />
                                {team.name}
                              </DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-6 py-4">
                              <div className="grid gap-4">
                                <div>
                                  <h3 className="text-lg font-medium mb-2">{t.teamDetails}</h3>
                                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                                    {team.description}
                                  </p>
                                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-3">
                                    <span>{t.teamCreatedOn}: {new Date(team.createdOn).toLocaleDateString()}</span>
                                    <span className="mx-2">•</span>
                                    <span>{t.teamMembers}: {team.memberCount}</span>
                                  </div>
                                </div>
                              </div>
                              
                              <div>
                                <h3 className="text-lg font-medium mb-2">{t.members}</h3>
                                <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                                  {team.members.map((member) => (
                                    <div 
                                      key={member.id} 
                                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                                    >
                                      <div className="flex items-center space-x-3">
                                        <Image 
                                          src={member.avatar} 
                                          alt={member.username} 
                                          width={32} 
                                          height={32} 
                                          className="rounded-full"
                                        />
                                        <div>
                                          <p className="font-medium text-gray-800 dark:text-white">
                                            {member.username}
                                          </p>
                                          <p className="text-xs text-gray-500 dark:text-gray-400">
                                            {member.role === "captain" ? t.captain : t.player}
                                          </p>
                                        </div>
                                      </div>
                                      {team.role === "captain" && member.role !== "captain" && (
                                        <button className="px-2 py-1 text-xs bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200 rounded hover:bg-red-200 dark:hover:bg-red-800 transition-colors">
                                          {t.kickMember}
                                        </button>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                              
                              <div className="flex justify-end gap-3 mt-2">
                                {team.role === "captain" && (
                                  <button 
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                  >
                                    {t.settings}
                                  </button>
                                )}
                                <button 
                                  className="px-4 py-2 bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                                  onClick={() => setViewTeamOpen(false)}
                                >
                                  {t.cancel}
                                </button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>

                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Invitations Section */}
            <div className="mt-8">
              <div className="flex items-center space-x-2 mb-4">
                <Bell size={20} className="text-purple-500" />
                <h3 className="text-lg font-medium text-gray-800 dark:text-white">{t.invitations}</h3>
              </div>
              
              {isLoading.invitations ? (
                <div className="flex flex-col items-center justify-center h-24">
                  <Loader2 className="h-6 w-6 animate-spin text-purple-500" />
                  <p className="mt-2 text-gray-500">{t.loading}</p>
                </div>
              ) : error.invitations ? (
                <div className="text-center text-red-500 p-4">
                  {error.invitations}
                </div>
              ) : invitations.length === 0 ? (
                <div className="p-4 text-center border border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
                  <p className="text-gray-500 dark:text-gray-400">{t.noInvitations}</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {invitations.map((invitation) => (
                    <div key={invitation.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Image 
                            src={invitation.teamLogo} 
                            alt={invitation.teamName} 
                            width={40} 
                            height={40} 
                            className="rounded-lg"
                          />
                          <div>
                            <h4 className="font-medium text-gray-800 dark:text-white">{invitation.teamName}</h4>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 text-xs text-gray-500 dark:text-gray-400">
                              <span className="hidden sm:inline">•</span>
                              <span className="flex items-center">
                                <Users size={12} className="mr-1" /> 
                                {invitation.memberCount} {t.teamMembers}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button 
                            className="flex items-center px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
                            onClick={() => handleAcceptInvitation(invitation.teamName)}
                            disabled={isLoading.acceptInvite}
                          >
                            {isLoading.acceptInvite ? (
                              <Loader2 className="h-3 w-3 animate-spin mr-1" />
                            ) : (
                              <Check size={14} className="mr-1" />
                            )}
                            {t.accept}
                          </button>
                          <button 
                            className="flex items-center px-3 py-1 bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-200 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                            onClick={() => handleDeclineInvitation(invitation.teamName)}
                            disabled={isLoading.declineInvite}
                          >
                            {isLoading.declineInvite ? (
                              <Loader2 className="h-3 w-3 animate-spin mr-1" />
                            ) : (
                              <X size={14} className="mr-1" />
                            )}
                            {t.decline}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <Footer/>
      </div>
    </div>
  );
}