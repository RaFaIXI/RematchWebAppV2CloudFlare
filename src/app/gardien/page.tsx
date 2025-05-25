"use client"

import { useEffect, useState } from "react"
import { TechniqueCard } from "@/components/technique-card"
import Footer from "@/components/Footer"
import { useTheme } from "next-themes"
import { ChevronDown, ChevronUp, Filter } from "lucide-react"

// Add this keyframe animation
import { keyframes } from "@emotion/react"

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const translations = {
  en: {
    pageTitle: "Goalkeeper Techniques",
    pageDescription: "Discover essential techniques to become an effective and reliable goalkeeper.",
    filterTitle: "Filters",
    difficultyLabel: "Difficulty",
    utilityLabel: "Utility",
    resetFilters: "Reset Filters",
    noResults: "No techniques match your filters. Try adjusting your criteria.",
    showFilters: "Show Filters",
    hideFilters: "Hide Filters",
    activeFilters: "Active Filters",

    searchPlaceholder: "Search techniques...",
    techniques: [
      {
        title: "Ball Sound",
        description: "Learn to recognize the sound cues of the ball",
        fullDescription:
          "The ball makes different sounds depending on its speed, power, and spin. Learning to recognize these can help anticipate its behavior. Note: You can't distinguish between left and right spin by sound.",
      },
      {
        title: "Wall Pass",
        description: "Bounce the ball off the wall to pass to a wing",
        fullDescription:
          "Bounce the ball off the wall to make a pass to a wing. Adding spin can affect where the ball lands.",
      },
      {
        title: "Simply the Best",
        description: "The GOAT move",
        fullDescription: "Turn around and shoot at the crossbar; the ball will bounce back to the center of the field.",
      },
      {
        title: "Shot Stop",
        description: "Stop a shot by kicking the ball",
        fullDescription:
          "Stop a shot by kicking the ball. This allows for an immediate pass to a teammate and a quick counterattack.",
      },
      {
        title: "Basic Save",
        description: "Basic saving technique",
        fullDescription: "Note: You can dash before diving to increase speed.",
      },
      {
        title: "Anti Cheese Pass",
        description: "its a no look pass for goalkeepers",
        fullDescription: "you need to look somewhere and passing with moving key on the other side",
      },
      {
        title: "Dash Dive",
        description: "Dash befor diving to increase speed and distance of the dive",
        fullDescription: "Dash befor diving to increase speed and distance of the dive"
      }
    ],
  },
  fr: {
    pageTitle: "Techniques de Gardien",
    pageDescription: "Découvrez les techniques essentielles pour devenir un gardien de but efficace et fiable.",
    filterTitle: "Filtres",
    difficultyLabel: "Difficulté",
    utilityLabel: "Utilité",
    resetFilters: "Réinitialiser les filtres",
    noResults: "Aucune technique ne correspond à vos filtres. Essayez d'ajuster vos critères.",
    showFilters: "Afficher les filtres",
    hideFilters: "Masquer les filtres",
    activeFilters: "Filtres actifs",
    searchPlaceholder: "Rechercher des techniques...",
    techniques: [
      {
        title: "Son de la balle",
        description: "Apprends à reconnaître les sons de la balle",
        fullDescription:
          "La balle émet différents sons selon sa vitesse, sa puissance et son effet. Apprendre à les reconnaître permet d'anticiper son comportement. Remarque : on ne peut pas différencier l'effet gauche ou droit uniquement par le son.",
      },
      {
        title: "Relance mur",
        description: "Fais rebondir la balle sur le mur pour passer sur une aile",
        fullDescription:
          "Fais rebondir la balle sur le mur pour effectuer une passe vers une aile. Ajouter de l'effet modifie l'endroit où la balle atterrit.",
      },
      {
        title: "Tout simplement le meilleur",
        description: "Le geste du GOAT",
        fullDescription:
          "Retourne-toi et tire sur la barre transversale ; la balle rebondira vers le centre du terrain.",
      },
      {
        title: "Arrêt tir",
        description: "Arrête un tir en frappant la balle",
        fullDescription:
          "Arrête un tir en frappant la balle. Cela permet de faire une passe directe à un coéquipier et de lancer une contre-attaque.",
      },
      {
        title: "Arrêt basique",
        description: "Technique d'arrêt de base",
        fullDescription: "Remarque : tu peux faire un dash avant de plonger pour aller plus vite.",
      },      
      {
        title: "Anti-Cheese Passe",
        description: "C’est une passe sans regarder, utilisée par les gardiens de but",
        fullDescription: "Il faut regarder dans une direction et faire la passe en maintenant la touche de déplacement de l’autre côté."
      },
      {
        title: "Plongeon Sprinté",
        description: "Sprinte avant de plonger pour gagner en vitesse et en distance.",
        fullDescription: "Effectue un sprint juste avant de plonger pour augmenter ta vitesse et la distance parcourue — idéal pour atteindre le ballon plus vite ou réaliser des arrêts spectaculaires.",
      }
    ],
  },
}

export default function GardienPage() {
  const { theme } = useTheme()
  const [lang, setLang] = useState<"en" | "fr">("en")
  const [minDifficulty, setMinDifficulty] = useState(1)
  const [maxDifficulty, setMaxDifficulty] = useState(5)
  const [minUtility, setMinUtility] = useState(1)
  const [maxUtility, setMaxUtility] = useState(5)
  const [searchQuery, setSearchQuery] = useState("")
  const [filtersExpanded, setFiltersExpanded] = useState(false)

  useEffect(() => {
    const storedLang = localStorage.getItem("lang")
    if (storedLang) {
      setLang(storedLang as "en" | "fr")
    }
  }, [])

  const t = translations[lang]

  // Define technique meta data with difficulty and utility values
  const techniquesMeta = [
    {
      id: 1,
      videoUrl: "https://www.youtube.com/watch?v=i_5q23We3Uc",
      videoType: "youtube" as const,
      difficulty: 4,
      utility: 2,
    },
    {
      id: 2,
      videoUrl: "https://www.youtube.com/watch?v=3HE4hB1zub8",
      videoType: "youtubemuted" as const,
      difficulty: 1,
      utility: 2,
    },
    {
      id: 3,
      videoUrl: "https://www.youtube.com/watch?v=nWoPOycva4c",
      videoType: "youtubemuted" as const,
      difficulty: 5,
      utility: 1,
    },
    {
      id: 4,
      videoUrl: "https://www.youtube.com/watch?v=GDYiKktQRSk",
      videoType: "youtubemuted" as const,
      difficulty: 3,
      utility: 4,
    },
    {
      id: 5,
      videoUrl: "https://www.youtube.com/watch?v=2jZ3VFWOKkw",
      videoType: "youtubemuted" as const,
      difficulty: 2,
      utility: 5,
    },
    {
      id: 6,
      videoUrl: "https://youtu.be/vIeHd7XpNOY",
      videoType: "youtubemuted" as const,
      difficulty: 2,
      utility: 5,
    },
    {
      id: 7,
      videoUrl: "https://youtu.be/UCFsVb29jWM",
      videoType: "youtubemuted" as const,
      difficulty: 2,
      utility: 5,
    },
  ]
  // Combine technique data with translations
  const techniques = t.techniques.map((tech, index) => ({
    ...tech,
    ...techniquesMeta[index],
  }))

  // Filter techniques based on difficulty and utility ranges
  const filteredTechniques = techniques.filter(
    (technique) =>
      technique.difficulty >= minDifficulty &&
      technique.difficulty <= maxDifficulty &&
      technique.utility >= minUtility &&
      technique.utility <= maxUtility &&
      (searchQuery === "" ||
        technique.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        technique.description.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  // Reset all filters to default values
  const resetFilters = () => {
    setMinDifficulty(1)
    setMaxDifficulty(5)
    setMinUtility(1)
    setMaxUtility(5)
    setSearchQuery("")
  }

  // Check if any filters are active
  const hasActiveFilters =
    minDifficulty > 1 ||
    maxDifficulty < 5 ||
    minUtility > 1 ||
    maxUtility < 5 ||
    searchQuery !== ""

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container py-8">
        <div className="space-y-4 mb-8">
          <h1 className="text-3xl font-bold">{t.pageTitle}</h1>
          <p className="text-muted-foreground">{t.pageDescription}</p>
        </div>

        {/* Filter Section */}
        <div className="bg-card border rounded-lg mb-8 shadow-sm overflow-hidden">
          {/* Filter Header with Toggle Button */}
          <div className="p-4 flex items-center justify-between border-b">
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-muted-foreground" />
              <h2 className="text-xl font-semibold">{t.filterTitle}</h2>
              {hasActiveFilters && (
                <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">{t.activeFilters}</span>
              )}
            </div>
            <button
              onClick={() => setFiltersExpanded(!filtersExpanded)}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {filtersExpanded ? (
                <>
                  {t.hideFilters} <ChevronUp size={16} />
                </>
              ) : (
                <>
                  {t.showFilters} <ChevronDown size={16} />
                </>
              )}
            </button>
          </div>

          {/* Collapsible Filter Content */}
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              filtersExpanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="p-6">
              {/* Search Input */}
              <div className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder={t.searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background"
                  />
                  <button
                    className={`absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground ${!searchQuery && "hidden"}`}
                    onClick={() => setSearchQuery("")}
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="space-y-8">
                {/* Difficulty Filter */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium">{t.difficultyLabel}</label>
                    <span className="text-sm font-medium">
                      {minDifficulty} - {maxDifficulty}
                    </span>
                  </div>
                  <div className="px-1 mt-4">
                    <div className="flex space-x-4">
                      <div className="w-1/2">
                        <label className="block text-xs mb-1 text-muted-foreground">Min</label>
                        <input
                          type="range"
                          min="1"
                          max="5"
                          step="1"
                          value={minDifficulty}
                          onChange={(e) => {
                            const newValue = Number.parseInt(e.target.value)
                            setMinDifficulty(Math.min(newValue, maxDifficulty))
                          }}
                          className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                      </div>
                      <div className="w-1/2">
                        <label className="block text-xs mb-1 text-muted-foreground">Max</label>
                        <input
                          type="range"
                          min="1"
                          max="5"
                          step="1"
                          value={maxDifficulty}
                          onChange={(e) => {
                            const newValue = Number.parseInt(e.target.value)
                            setMaxDifficulty(Math.max(newValue, minDifficulty))
                          }}
                          className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                      </div>
                    </div>
                    {/* Visual indicator for difficulty */}
                    <div className="mt-2 flex justify-between">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((value) => (
                          <div
                            key={value}
                            className={`w-5 h-5 flex items-center justify-center text-xs ${
                              value >= minDifficulty && value <= maxDifficulty
                                ? "text-primary"
                                : "text-muted-foreground"
                            }`}
                          >
                            ★
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Utility Filter */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium">{t.utilityLabel}</label>
                    <span className="text-sm font-medium">
                      {minUtility} - {maxUtility}
                    </span>
                  </div>
                  <div className="px-1 mt-4">
                    <div className="flex space-x-4">
                      <div className="w-1/2">
                        <label className="block text-xs mb-1 text-muted-foreground">Min</label>
                        <input
                          type="range"
                          min="1"
                          max="5"
                          step="1"
                          value={minUtility}
                          onChange={(e) => {
                            const newValue = Number.parseInt(e.target.value)
                            setMinUtility(Math.min(newValue, maxUtility))
                          }}
                          className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                      </div>
                      <div className="w-1/2">
                        <label className="block text-xs mb-1 text-muted-foreground">Max</label>
                        <input
                          type="range"
                          min="1"
                          max="5"
                          step="1"
                          value={maxUtility}
                          onChange={(e) => {
                            const newValue = Number.parseInt(e.target.value)
                            setMaxUtility(Math.max(newValue, minUtility))
                          }}
                          className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                      </div>
                    </div>
                    {/* Visual indicator for utility - now using stars instead of bars */}
                    <div className="mt-2 flex justify-between">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((value) => (
                          <div
                            key={value}
                            className={`w-5 h-5 flex items-center justify-center text-xs ${
                              value >= minUtility && value <= maxUtility ? "text-primary" : "text-muted-foreground"
                            }`}
                          >
                            ★
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Reset Button */}
                <button
                  onClick={resetFilters}
                  className="bg-secondary hover:bg-secondary/80 text-secondary-foreground px-4 py-2 rounded text-sm transition-colors"
                >
                  {t.resetFilters}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Display no results message if no techniques match filters */}
        {filteredTechniques.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">{t.noResults}</div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 transition-all duration-300">
            {filteredTechniques.map((technique) => (
              <div key={technique.id} className="animate-fadeIn">
                <TechniqueCard
                  title={technique.title}
                  description={technique.description}
                  videoUrl={technique.videoUrl}
                  fullDescription={technique.fullDescription}
                  difficulty={technique.difficulty}
                  utility={technique.utility}
                  videoType={technique.videoType}
                />
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
