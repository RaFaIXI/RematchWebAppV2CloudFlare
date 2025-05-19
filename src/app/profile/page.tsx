"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { User, Users, PlusCircle, ExternalLink, Shield, LogOut, Check, X, Bell } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";


export default function ProfilePage() {
  const [lang, setLang] = useState<"en" | "fr">("en");
  const [isEmbedded, setIsEmbedded] = useState(false);
  const [createTeamOpen, setCreateTeamOpen] = useState(false);
  const [viewTeamOpen, setViewTeamOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<any>(null);
  
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
      memberSince: "Member since",
      captain: "Captain",
      player: "Player",
      viewTeam: "View Team",
      leaveTeam: "Leave Team",
      teamMembers: "members",
      invitations: "Team Invitations",
      noInvitations: "You don't have any pending invitations.",
      accept: "Accept",
      decline: "Decline",
      invitedBy: "Invited by",
      invitedOn: "Invited on",
      teamName: "Team Name",
      teamDescription: "Team Description",
      createNewTeam: "Create New Team",
      create: "Create",
      cancel: "Cancel",
      teamLogo: "Team Logo",
      uploadLogo: "Upload Logo",
      teamDetails: "Team Details",
      members: "Members",
      kickMember: "Remove",
      settings: "Settings",
      teamCreatedOn: "Team created on"
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
      memberSince: "Membre depuis",
      captain: "Capitaine",
      player: "Joueur",
      viewTeam: "Voir l'Équipe",
      leaveTeam: "Quitter l'Équipe",
      teamMembers: "membres",
      invitations: "Invitations d'Équipe",
      noInvitations: "Vous n'avez pas d'invitations en attente.",
      accept: "Accepter",
      decline: "Refuser",
      invitedBy: "Invité par",
      invitedOn: "Invité le",
      teamName: "Nom de l'Équipe",
      teamDescription: "Description de l'Équipe",
      createNewTeam: "Créer une Nouvelle Équipe",
      create: "Créer",
      cancel: "Annuler",
      teamLogo: "Logo de l'Équipe",
      uploadLogo: "Télécharger un Logo",
      teamDetails: "Détails de l'Équipe",
      members: "Membres",
      kickMember: "Retirer",
      settings: "Paramètres",
      teamCreatedOn: "Équipe créée le"
    }
  };

  const t = translations[lang];
  
  // Mock user data
  const user = {
    username: "RafaGaming",
    avatar: "/api/placeholder/100/100",
    joinDate: "2023-05-15"
  };
  
  // Mock teams data
  const teams = [
    {
      id: 1,
      name: "Celleste Team Alpha",
      logo: "/api/placeholder/50/50",
      role: "captain",
      memberSince: "2023-06-10",
      memberCount: 5,
      description: "Official competitive team for Celleste tournaments and leagues.",
      createdOn: "2023-06-01",
      members: [
        { id: 101, username: "RafaGaming", role: "captain", avatar: "/api/placeholder/40/40", joinDate: "2023-06-01" },
        { id: 102, username: "ProGamer123", role: "player", avatar: "/api/placeholder/40/40", joinDate: "2023-06-05" },
        { id: 103, username: "TacticalWizard", role: "player", avatar: "/api/placeholder/40/40", joinDate: "2023-07-12" },
        { id: 104, username: "SharpShooter", role: "player", avatar: "/api/placeholder/40/40", joinDate: "2023-09-18" },
        { id: 105, username: "StrategyMaster", role: "player", avatar: "/api/placeholder/40/40", joinDate: "2024-01-22" }
      ]
    },
    {
      id: 2,
      name: "Pro Gamers",
      logo: "/api/placeholder/50/50",
      role: "player",
      memberSince: "2024-03-22",
      memberCount: 8,
      description: "Professional gaming team focused on competitive play and streaming.",
      createdOn: "2023-12-15",
      members: [
        { id: 201, username: "GamingLegend", role: "captain", avatar: "/api/placeholder/40/40", joinDate: "2023-12-15" },
        { id: 202, username: "RafaGaming", role: "player", avatar: "/api/placeholder/40/40", joinDate: "2024-03-22" },
        { id: 203, username: "EliteSniper", role: "player", avatar: "/api/placeholder/40/40", joinDate: "2024-01-05" },
        { id: 204, username: "TacticalGenius", role: "player", avatar: "/api/placeholder/40/40", joinDate: "2024-02-17" }
      ]
    }
  ];
  
  // Mock team invitations
  const invitations = [
    {
      id: 101,
      teamName: "Tactical Squad",
      teamLogo: "/api/placeholder/50/50",
      invitedBy: "NovaX",
      invitedOn: "2025-05-15",
      memberCount: 12
    },
    {
      id: 102,
      teamName: "Victory Esports",
      teamLogo: "/api/placeholder/50/50",
      invitedBy: "EliteGamer42",
      invitedOn: "2025-05-17",
      memberCount: 7
    }
  ];

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
            <div className="flex flex-col items-center space-y-4 mb-6">
                              <Image 
                  src={user.avatar} 
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
              >
                <span className="flex items-center">
                  <LogOut size={18} className="mr-2" />
                  {t.logout}
                </span>
                <ExternalLink size={16} />
              </button>
            </div>
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
                    <Button className="flex items-center space-x-1 px-3 py-2 bg-green-600 text-white rounded-lg shadow-sm hover:bg-green-700 transition-colors duration-200">
                      <PlusCircle size={16} />
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
                            src="/api/placeholder/100/100"
                            alt="Team Logo" 
                            width={100} 
                            height={100} 
                            className="rounded-lg border-2 border-gray-300 dark:border-gray-600"
                          />
                          <button className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full">
                            <PlusCircle size={16} />
                          </button>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {t.teamLogo}
                        </span>
                      </div>
                      
                      <div className="grid gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            {t.teamName}
                          </label>
                          <input 
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            {t.teamDescription}
                          </label>
                          <textarea 
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                          ></textarea>
                        </div>
                      </div>

                      <div className="flex justify-end gap-3 mt-4">
                        <button 
                          className="px-4 py-2 bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                          onClick={() => setCreateTeamOpen(false)}
                        >
                          {t.cancel}
                        </button>
                        <button 
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          {t.create}
                        </button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            
            {teams.length === 0 ? (
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
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {t.memberSince}: {new Date(team.memberSince).toLocaleDateString()}
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
                                            {member.role === "captain" ? t.captain : t.player} • {t.memberSince} {new Date(member.joinDate).toLocaleDateString()}
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
                        <button 
                          className="px-3 py-1 bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-200 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                        >
                          {t.leaveTeam}
                        </button>
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
              
              {invitations.length === 0 ? (
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
                              <span>
                                {t.invitedBy}: {invitation.invitedBy}
                              </span>
                              <span className="hidden sm:inline">•</span>
                              <span>
                                {t.invitedOn}: {new Date(invitation.invitedOn).toLocaleDateString()}
                              </span>
                              <span className="hidden sm:inline">•</span>
                              <span className="flex items-center">
                                <Users size={12} className="mr-1" /> 
                                {invitation.memberCount} {t.teamMembers}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="flex items-center px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors">
                            <Check size={14} className="mr-1" />
                            {t.accept}
                          </button>
                          <button className="flex items-center px-3 py-1 bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-200 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors">
                            <X size={14} className="mr-1" />
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