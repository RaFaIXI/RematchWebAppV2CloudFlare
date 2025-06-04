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
  en: {
    pageTitle: "Game Strategies",
    pageDescription: "Discover various strategies and tactics to improve your team's gameplay.",
    filterTitle: "Filters",
    difficultyLabel: "Difficulty",
    utilityLabel: "Utility",
    resetFilters: "Reset Filters",
    noResults: "No strategies match your filters. Try adjusting your criteria.",
    showFilters: "Show Filters",
    hideFilters: "Hide Filters",
    activeFilters: "Active Filters",
    searchPlaceholder: "Search strategies...",
    techniques: [
      {
        title: "BackBoard",
        description: "Bounce the ball off the wall to center it",
        fullDescription:
          "The BackBoard technique involves using the wall to bounce the ball and create an accurate cross. It helps surprise the opposing defense and create scoring chances. To perform this technique, position yourself at the right distance from the wall, hit the ball precisely so it rebounds and reaches a teammate in the shooting zone. Spin can help control the ball's landing.",
      },
      {
        title: "Buffer",
        description: "Use input buffering to create chances",
        fullDescription:
          "Buffering is a system that records button presses just before they're needed (about 1.5 seconds early) and executes them at the right time. Press 'shoot' just before the ball arrives:\n→ The game saves your input for a short time.\n→ Once your player is able to shoot, the input is executed. Buffering is 'spammable', meaning you can press the button multiple times before it triggers, and the game will use it when possible. This isn't the case in other games—if you press too early, the input fails. This adds difficulty and requires precision.",
      },
      {
        title: "Pyramid Formation",
        description: "Offensive formation to create chances",
        fullDescription:
          "The pyramid formation is an offensive strategy to create scoring chances by exploiting defensive gaps. By positioning your players in a pyramid shape, you maximize passing and shooting options. It's especially effective at breaking down compact defenses and creating openings.",
      },
      {
        title: "Tiki Taka",
        description: "a style of play involving highly accurate short passing and an emphasis on retaining possession of the ball.",
        fullDescription:
          "You need to do mostly one touch passes, and you need to be able to predict where your teammates will be. → This is a very difficult technique to master, but it can lead to some amazing plays. → It requires a lot of practice and communication with your teammates.",
      },
    ],
  },
  fr: {
    pageTitle: "Stratégies de Jeu",
    pageDescription: "Découvrez différentes stratégies et tactiques pour améliorer le jeu collectif de votre équipe.",
    filterTitle: "Filtres",
    difficultyLabel: "Difficulté",
    utilityLabel: "Utilité",
    resetFilters: "Réinitialiser les filtres",
    noResults: "Aucune stratégie ne correspond à vos filtres. Essayez d'ajuster vos critères.",
    showFilters: "Afficher les filtres",
    hideFilters: "Masquer les filtres",
    activeFilters: "Filtres actifs",
    searchPlaceholder: "Rechercher des stratégies...",
    techniques: [
      {
        title: "BackBoard",
        description: "Faire rebondir le ballon sur le mur pour centrer",
        fullDescription:
          "La technique du BackBoard consiste à utiliser le mur pour faire rebondir le ballon et créer un centre précis. Cela permet de surprendre la défense adverse et de créer des occasions de but. Pour exécuter cette technique, placez-vous à une distance appropriée du mur, frappez le ballon avec précision pour qu'il rebondisse sur le mur et arrive à un coéquipier dans la zone de tir. Les effets permettent de contrôler l'atterrissage de la balle.",
      },
      {
        title: "Buffer",
        description: "Exploiter le buffer pour créer des occasions",
        fullDescription:
          "Le buffer, c'est une sorte de système qui enregistre les boutons sur lesquels tu appuies un tout petit peu avant qu'ils soient vraiment utilisés (environ 1,5 seconde), pour les exécuter au bon moment. \nTu appuies sur « tir » juste avant que le ballon arrive. \n→ Le jeu garde ton appui en mémoire pendant un court instant. \n→ Dès que le joueur peut effectivement tirer, le jeu exécute ton tir. Le buffer est « spammable », ce qui signifie que tu peux appuyer plusieurs fois sur le bouton avant que l'action ne se déclenche, et le jeu va l'exécuter lorsque c'est possible. Ce n'est pas le cas dans d'autres jeux, où si tu appuies sur un bouton pour faire une technique avant que le jeu ne commence à « buffer » l'action, il ne prendra pas en compte ton appui. Si tu cliques trop tôt, tu rates la technique, ce qui ajoute une certaine difficulté au jeu et demande plus de précision.",
      },
      {
        title: "Formation en pyramide",
        description: "Formation offensive pour créer des occasions",
        fullDescription:
          "La formation en pyramide est une stratégie offensive qui permet de créer des occasions de but en exploitant les espaces laissés par la défense adverse. En plaçant vos joueurs en forme de pyramide, vous pouvez maximiser les options de passe et de tir. Cette formation est particulièrement efficace pour déstabiliser les défenses compactes et créer des ouvertures.",
      },
      {
        title: "Tiki Taka",
        description: "un style de jeu basé sur des passes courtes très précises et une forte importance accordée à la conservation du ballon.",
        fullDescription:
          "Vous devez principalement faire des passes en une touche, et vous devez être capable de prédire où se trouveront vos coéquipiers. → C’est une technique très difficile à maîtriser, mais elle peut mener à des actions spectaculaires. → Elle demande beaucoup d'entraînement et de communication avec vos coéquipiers.",
      },
    ],
  },
}

export default function StrategiePage() {
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

  // Define technique meta data
  const techniqueMeta = [
    {
      id: 1,
      videoUrl: "https://www.youtube.com/watch?v=Z6ht02tLXjk",
      videoType: "youtubemuted" as const,
      difficulty: 2,
      utility: 5,
    },
    {
      id: 2,
      videoUrl: "https://www.youtube.com/watch?v=uPyEDk2iJ-E",
      videoType: "youtubemuted" as const,
      difficulty: 2,
      utility: 3,
    },
    {
      id: 3,
      videoUrl: "https://www.youtube.com/watch?v=Fm5-jA8R5dY",
      videoType: "youtube" as const,
      difficulty: 5,
      utility: 3,
    },
    {
      id: 4,
      videoUrl: "https://youtu.be/Z1RAmsUveC8",
      videoType: "youtubemuted" as const,
      difficulty: 4,
      utility: 5,
    },
  ]

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
                    {/* Visual indicator for utility */}
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