"use client"

import { useEffect, useState } from "react"
import { TechniqueCard } from "@/components/technique-card"
import Footer from "@/components/Footer"
import { useTheme } from "next-themes"
import { ChevronDown, ChevronUp, Filter } from "lucide-react"

// Add keyframe animation
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
  fr: {
    pageTitle: "Techniques de Défense",
    pageDescription:
      "Maîtrisez l'art de défendre avec ces techniques essentielles pour protéger votre but et récupérer le ballon.",
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
        title: "Tacle glissé",
        description: "Technique pour récupérer le ballon au sol",
        fullDescription:
          "Le tacle glissé est une technique défensive utilisée pour récupérer le ballon quand l'adversaire en a la possession. Approchez l'adversaire en sprintant à une vitesse suffisante, puis appuyez sur votre touche de tacle. Cette technique doit être utilisée en dernier recours, car elle vous met temporairement hors de position en cas d'échec.",
      },
      {
        title: "Tacle",
        description: "Technique pour récupérer le ballon au sol",
        fullDescription:
          "Le tacle est une technique défensive utilisée pour récupérer le ballon sans s'engager autant que dans un tacle glissé. Approchez l'adversaire sans courir, puis appuyez sur votre touche de tacle. Cette technique peut être contrée par des dribbles rapides, mais elle est efficace contre les joueurs moins agiles.",
      },
      {
        title: "Interception",
        description: "Anticiper et couper les passes et tirs adverses",
        fullDescription:
          "L'interception consiste à anticiper et couper les passes adverses. Observez le jeu et la posture des joueurs adverses pour prédire leurs intentions de passe. Positionnez-vous dans les lignes de passe et de tirs potentielles. Le timing et la lecture du jeu sont essentiels : mettez-vous en posture défensive et laissez la balle vous atteindre. Une bonne interception peut rapidement transformer la défense en attaque.",
      },
      {
        title: "Body Block",
        description: "Utilisez votre corps pour bloquer les adversaires et les ralentir",
        fullDescription:
          "Le body block est une technique défensive/de mouvement qui consiste à utiliser votre corps pour bloquer les adversaires. Positionnez-vous sur le chemin de l'adversaire et utilisez votre corps pour le ralentir. Cette technique est utile pour perturber le mouvement de l'adversaire et créer de l'espace pour vos coéquipiers. Le timing et le positionnement sont cruciaux : anticipez les mouvements de l'adversaire et ajustez votre position en conséquence. Un blocage corporel bien exécuté peut créer des opportunités pour votre équipe.",
      },
    ],
  },
  en: {
    pageTitle: "Defensive Techniques",
    pageDescription:
      "Master the art of defending with these essential techniques to protect your goal and recover the ball.",
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
        title: "Slide Tackle",
        description: "Technique to recover the ball on the ground",
        fullDescription:
          "The slide tackle is a defensive technique used to recover the ball when the opponent has possession. Approach the opponent while sprinting at a sufficient speed, then press your tackle button. This technique should be used as a last resort, as it temporarily takes you out of position if it fails.",
      },
      {
        title: "Tackle",
        description: "Technique to recover the ball on the ground",
        fullDescription:
          "The tackle is a defensive technique used to recover the ball without committing as much as a slide tackle. Approach the opponent without running, then press your tackle button. This technique can be countered by quick dribbles but is effective against less agile players.",
      },
      {
        title: "Interception",
        description: "Anticipate and cut opponent passes and shots",
        fullDescription:
          "Interception involves anticipating and cutting the opponent's passes. Watch the game and the posture of opposing players to predict their passing intentions. Position yourself in potential passing and shooting lanes. Timing and game reading are essential: get into a defensive posture and let the ball come to you. A good interception can quickly turn defense into attack.",
      },
      {
        title: "Body Block",
        description: "Use your body to block opponents, and slow them down",
        fullDescription:
          "The body block is a defensive/mouvement technique that involves using your body to block opponents. Position yourself in the path of the opponent and use your body to slow them down. This technique is useful for disrupting the opponent's movement and creating space for your teammates. Timing and positioning are crucial: anticipate the opponent's movements and adjust your position accordingly. A well-executed body block can create opportunities for your team.",
      }
    ],
  },
}
 
const techniqueMeta: Array<{
  id: number
  videoUrl: string
  videoType: "local" | "youtube" | "youtubemuted" | "youtubeclip"
  difficulty: number
  utility: number
}> = [
  {
    id: 1,
    videoUrl: "https://www.youtube.com/watch?v=ceGhCp49Bhk",
    videoType: "youtubemuted",
    difficulty: 1,
    utility: 4,
  },
  {
    id: 2,
    videoUrl: "https://www.youtube.com/watch?v=CV6vAfubUuI",
    videoType: "youtubemuted",
    difficulty: 1,
    utility: 5,
  },
  {
    id: 3,
    videoUrl: "https://www.youtube.com/watch?v=jCgDsnif1vk",
    videoType: "youtubemuted",
    difficulty: 3,
    utility: 3,
  },
  {
    id: 4,
    videoUrl: "https://www.youtube.com/embed/mjie8ekJ5Yg?si=-aSVKqSNCdGjeyuV&amp;clip=UgkxGgoaT9_bNZghrp4DH_ydlKV-u6py_Vyp&amp;clipt=EI-lDhiNhRA",
    videoType: "youtubeclip",
    difficulty: 4,
    utility: 3,
  },
]

export default function DefensePage() {
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

  // Combine technique data with translations
  const techniques = t.techniques.map((tech, index) => ({
    ...tech,
    ...techniqueMeta[index],
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
                    {/* Visual indicator for utility - using stars */}
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