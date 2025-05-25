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
    pageTitle: "Shooting Techniques",
    pageDescription:
      "Discover various shooting techniques to score more goals and improve your efficiency in front of the goal.",
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
        title: "Shot Degrees",
        description: "The 3 different shot speeds",
        fullDescription:
          "The 3 degrees of shooting are: ball on the player, ball within reach, and airborne ball. Each is more powerful than the last.",
      },
      {
        title: "Redirect Shot",
        description: "Fake the keeper with a deflected shot",
        fullDescription:
          "Your teammate shoots and you deflect the ball in the opposite direction of the keeper at the last second.",
      },
      {
        title: "Multi Headers",
        description: "Fake the keeper with several backboard headers",
        fullDescription:
          "Catch or lift the ball and make lob passes with backboard headers, then shoot.",
      },
      {
        title: "Instant Shot",
        description: "A shot that instantly charges at full power",
        fullDescription:
          "Push the ball or perform a controlled touch, then shoot immediately while holding the shoot button beforehand (see buffer).",
      },
      {
        title: "Headers",
        description: "Shoot with the head",
        fullDescription:
          "A powerful shot that can be very effective if you're well-positioned. Aim carefully and shoot strong. Only works if the ball is high enough.",
      },
      {
        title: "Header Feint",
        description: "Fake with the head and control",
        fullDescription:
          "Fake a header using a ball control move.",
      },
      {
        title: "Solo Side Backboard",
        description: "Fake a shot using a backboard pass along the wall",
        fullDescription:
          "Fake a shot by passing the ball on the side wall backboard.",
      },
      {
        title: "Short Lob Pass - Shot",
        description: "Fake a shot with a short lob pass",
        fullDescription:
          "Fake a shot with a short lob pass, then shoot.",
      },
      {
        title: "Side Shot",
        description: "Shoot from the corner post with spin",
        fullDescription:
          "Apply spin towards the goal while aiming outside to make the ball curl inside thanks to the spin.",
      },
      {
        title: "Wall Rebound Shot",
        description:
          "Shoot from the corner post with a wall bounce and spin",
        fullDescription:
          "Aim at the post with spin toward goal, shoot with power so the ball rebounds off the wall and into the net. Very effective fake.",
      },
      {
        title: "Rainbow - Header Backboard",
        description:
          "Continue the ball from the rainbow into the wall with spin",
        fullDescription:
          "Continue the ball directly from the rainbow and aim it on the wall with spin to fake the keeper.",
      },
      {
        title: "Backheel",
        description: "Look center and shoot backward into the goal",
        fullDescription:
          "Turn your character toward the field center, aim for the goal, or do a backheel pass.",
      },
      {
        title: "Downspin",
        description: "Spin down to lob the keeper",
        fullDescription:
          "Spin downward so the ball lobs over or bounces before the keeper.",
      },
      {
        title: "Wall Bicycle Kick",
        description: "Blind solo bicycle kick from the wall",
        fullDescription:
          "Pass with medium or low power depending on distance, turn toward the wall, aim top corner and shoot.",
      },
      {
        title: "Small Lob Pass Sprint Shot",
        description: "Small Lob Pass - Blue Sprint - Shot",
        fullDescription:
          "Make a small lob pass by pressing the pass button, the modifier, and the push ball button at the same time, then immediately do the blue sprint and shoot as soon as possible. If done correctly, your character will perform an aerial shot."
      },
      {
        title: "Shot Power",
        description: "The Uses of Shot Power",
        fullDescription:
          "If you press the shot button for a shorter time, you'll make a weaker shot but with more spin, which can confuse the goalkeeper. If you press the shot button longer, you'll make a more powerful shot but with less spin."
      },
      {
        title: "Movements and Shots Effects",
        description: "Moving changes shot Effects",
        fullDescription:
          "Every movement changes the shot trajectory. Pay attention to the ball's direction and speed for accurate shots. Also, consider the player's position: in the air or on the ground, it affects the shot trajectory. Practice not only while stationary but also while moving.",
      },
      {
        title: "Header Feint 2",
        description: "Fake with the head and control but dont shoot after",
        fullDescription:
          "Fake with the head and control but dont shoot after",
      },
      {
        title: "RainbowFlick - Pass Lob- Shoot",
        description: "Quick Side Rainbowflick then do a Small Lob Pass then blue Sprint Shot",
        fullDescription:
          "Quick Side Rainbowflick then do a Small Lob Pass then blue Sprint then do an instant Shot. You can do it but toward other sides",
      },
    ],
  },
  fr: {
    pageTitle: "Techniques de Tir",
    pageDescription:
      "Découvrez différentes techniques de tir pour marquer plus de buts et améliorer votre efficacité devant le but.",
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
        title: "Degrés de tir",
        description: "Les 3 différentes vitesses de tir",
        fullDescription:
          "Les 3 degrés de tir sont : la balle sur le joueur, balle à portée du joueur, et balle à portée du joueur en l'air. Chacun a plus de puissance et de vitesse que le précédent.",
      },
      {
        title: "Tir dévié",
        description: "Feinte le gardien avec un tir dévié",
        fullDescription:
          "Votre équipier tire et vous déviez le ballon à l'opposé du gardien à la dernière seconde.",
      },
      {
        title: "Multi-têtes",
        description: "Feinte le gardien avec plusieurs têtes backboard",
        fullDescription:
          "Réceptionnez le ballon ou mettez-le en hauteur et faites des passes lobées de la tête backboard, puis tirez.",
      },
      {
        title: "Tir instantané",
        description: "Tir qui se charge instantanément à pleine puissance",
        fullDescription:
          "Poussez la balle ou faites un contrôle orienté et tirez instantanément sans temps de charge en maintenant le bouton de tir avant de faire le tir (voir buffer).",
      },
      {
        title: "Têtes",
        description: "Tir de la tête",
        fullDescription:
          "Le tir de la tête est un tir très puissant qui peut être très efficace si vous êtes bien placé. Il faut bien viser et ne pas hésiter à tirer fort. Il se fait si la balle est assez haute.",
      },
      {
        title: "Feinte de tête",
        description: "Feinte de tête avec le contrôle",
        fullDescription:
          "Feinte de tête avec le contrôle.",
      },
      {
        title: "Solo Side Backboard",
        description: "Feinte de tir avec le backboard et une passe sur le mur",
        fullDescription:
          "Feinte de tir avec le backboard et une passe sur le mur.",
      },
      {
        title: "Petite passe - Tir",
        description: "Feinte un tir avec une petite passe lobée",
        fullDescription:
          "Feinte un tir avec une petite passe lobée courte, puis tir.",
      },
      {
        title: "Tir latéral",
        description: "Tir depuis le poteau de corner avec un effet",
        fullDescription:
          "Il faut mettre un effet vers le but tout en décalant son curseur vers l'extérieur du but pour que le ballon parte vers l'intérieur grâce à l'effet.",
      },
      {
        title: "Tir rebond mur latéral",
        description: "Tir depuis le poteau de corner avec un effet qui rebondit sur le mur",
        fullDescription:
          "Il faut viser le poteau avec un effet vers le but, être précis selon la distance et mettre la force au maximum pour que le ballon rebondisse sur le mur et aille dans le but. Ce tir feinte très bien le gardien.",
      },
      {
        title: "Arc-en-ciel - Tête Backboard",
        description: "Reprend la balle depuis l'arc-en-ciel et vise sur le mur avec un effet",
        fullDescription:
          "Reprenez la balle directement depuis l'arc-en-ciel et visez sur le mur avec un effet pour feinter le gardien.",
      },
      {
        title: "Talonade",
        description: "Regardez vers le centre du terrain et tirez dans le but",
        fullDescription:
          "Retournez votre personnage vers le centre du terrain, visez les cages ou faites une touche arrière et faites une passe vers l'arrière.",
      },
      {
        title: "Effet - bas",
        description: "Effet vers le bas qui lobe le gardien",
        fullDescription:
          "Effet vers le bas qui lobe le gardien. Il faut bien viser et mettre un effet vers le bas pour que le ballon passe au-dessus du gardien ou rebondisse juste avant le but.",
      },
      {
        title: "Wall retournée",
        description: "Retournée seule à l'aveugle",
        fullDescription:
          "Faites une passe de puissance moyenne ou faible sur le mur selon la distance, retournez le personnage vers le mur, visez la lucarne puis tirez.",
      },
      {
        title: "Petite Pass Sprint Tir",
        description: "Petite Pass Lobée - Sprint Bleu - Tir",
        fullDescription:
          "fait une petite passe lobée en appuyant sur le bouton de passe, le modifier et le bouton pousser la balle en même temps puis dirrectement fait le Sprint bleu et tir le plus tot possible si bien réalisé ton personnage va faire un tir en l'air",
      },
      {
        title: "Puissance des tirs",
        description: "Les utilités des puissances de tir",
        fullDescription:
          "si tu appuie moins longtemps sur le bouton de tir, tu vas faire un tir plus faible mais avec un effet plus prononcé. ce qui permet des effets qui embrouille le gardien. si tu appuie plus longtemps sur le bouton de tir, tu vas faire un tir plus puissant mais avec moins d'effet.",
      },
      {
        title: "Mouvements et Effets de Tirs",
        description: "bouger change les effets de tir",
        fullDescription:
          "Chaque mouvement change la trajectoire de tirs, il faut bien faire attention à la direction de la balle et de la vitesse de la balle pour bien tirer. Il faut aussi faire attention à la position du joueur, si le joueur est en l'air ou au sol, cela change aussi la trajectoire du tir. et s'entrainer pas uniquement sans bouger mais aussi en bougeant.",
      },
      {
        title: "Feinte de tête 2",
        description: "Feinte de tête avec le contrôle mais ne tir pas après",
        fullDescription:
          "Feinte de tête avec le contrôle mais ne tir pas après.",
      },
      {
        title: "Arc en ciel - Passe Lobée - Tir",
        description: "Arc en ciel latéral rapide puis petite passe lobée suivie d'un tir en sprint bleu",
        fullDescription: "Arc en ciel latéral rapide puis petite passe lobée suivie d'un tir en sprint blue. Tu peut faire cette technique dans différente dirrections"

      }
    ],
  },
}

export default function TirPage() {
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
      videoUrl: "https://youtu.be/LYhi2Q97CBU",
      videoType: "youtubemuted" as const,
      difficulty: 3,
      utility: 4,
    },
    {
      id: 2,
      videoUrl: "https://youtu.be/V2EQdiGtLGs",
      videoType: "youtubemuted" as const,
      difficulty: 2,
      utility: 5,
    },
    {
      id: 3,
      videoUrl: "https://youtu.be/Bf6LlAEo9rk",
      videoType: "youtubemuted" as const,
      difficulty: 3,
      utility: 2,
    },
    {
      id: 4,
      videoUrl: "https://youtu.be/QFONyFVqhV0",
      videoType: "youtubemuted" as const,
      difficulty: 1,
      utility: 2,
    },
    {
      id: 5,
      videoUrl: "https://youtu.be/RdePX6NVUu8",
      videoType: "youtubemuted" as const,
      difficulty: 2,
      utility: 4,
    },
    {
      id: 6,
      videoUrl: "https://youtu.be/nG9SzIg79ao",
      videoType: "youtubemuted" as const,
      difficulty: 1,
      utility: 3,
    },
    {
      id: 7,
      videoUrl: "https://youtu.be/m8cmU0-Pzx0",
      videoType: "youtubemuted" as const,
      difficulty: 2, 
      utility: 2,
    },
    {
      id: 8,
      videoUrl: "https://youtu.be/t-hZiRB4o9w",
      videoType: "youtubemuted" as const,
      difficulty: 2,
      utility: 3,
    },
    {
      id: 9,
      videoUrl: "https://youtu.be/t6u-DX0qXrQ",
      videoType: "youtubemuted" as const, 
      difficulty: 3,
      utility: 3,
    },
    {
      id: 10,
      videoUrl: "https://youtu.be/vuXV0QRogfg",
      videoType: "youtubemuted" as const,
      difficulty: 4,
      utility: 4,
    },
    {
      id: 11,
      videoUrl: "https://youtu.be/tQixT6PDYtQ",
      videoType: "youtubemuted" as const,
      difficulty: 3,
      utility: 3,
    },
    {
      id: 12,
      videoUrl: "https://youtu.be/43UkuF3_BO4",
      videoType: "youtubemuted" as const,
      difficulty: 3, 
      utility: 2,
    },
    {
      id: 13,
      videoUrl: "https://youtu.be/TTcvlz_H2VE",
      videoType: "youtubemuted" as const,
      difficulty: 2,
      utility: 3,
    },
    {
      id: 14,
      videoUrl: "https://youtu.be/nEBKesoh5ag",
      videoType: "youtubemuted" as const,
      difficulty: 4,
      utility: 3,
    },
    {
      id: 15,
      videoUrl: "https://youtu.be/1jgAlZRo5EU",
      videoType: "youtubemuted" as const,
      difficulty: 3,
      utility: 4,
    },
    {
      id: 16, 
      videoUrl: "https://youtu.be/8NZq5kwAy1E",
      videoType: "youtubemuted" as const,
      difficulty: 2,
      utility: 5,
    },
    {
      id: 17,
      videoUrl: "https://www.youtube.com/embed/mjie8ekJ5Yg?si=VbszIFqXepMa_Ddv&amp;clip=UgkxOw9joVY3AoWMmMQLIupfT69oWCATax9q&amp;clipt=EO2UGBjN6Rs",
      videoType: "youtubeclip" as const,
      difficulty: 1,
      utility: 5,
    },
    {
      id: 18,
      videoUrl: "https://youtu.be/ewrZuE6JE6M",
      videoType: "youtubemuted" as const,
      difficulty: 1,
      utility: 4,
    },
    {
      id: 19,
      videoUrl: "https://youtu.be/GwKe0I-9QBQ",
      videoType: "youtubemuted" as const,
      difficulty: 3,
      utility: 3,
    }
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