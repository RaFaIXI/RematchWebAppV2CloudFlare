"use client"

import { useEffect, useState } from "react"
import { TechniqueCard } from "@/components/technique-card"
import Footer from "@/components/Footer"
import { Slider } from "@/components/ui/slider"
 
const translations = {
  en: {
    pageTitle: "Goalkeeper Techniques",
    pageDescription:
      "Discover essential techniques to become an effective and reliable goalkeeper.",
    filterTitle: "Filters",
    difficultyLabel: "Difficulty",
    utilityLabel: "Utility",
    resetFilters: "Reset Filters",
    noResults: "No techniques match your filters. Try adjusting your criteria.",
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
        fullDescription:
          "Turn around and shoot at the crossbar; the ball will bounce back to the center of the field.",
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
        fullDescription:
          "Note: You can dash before diving to increase speed.",
      },
    ],
  },
  fr: {
    pageTitle: "Techniques de Gardien",
    pageDescription:
      "Découvrez les techniques essentielles pour devenir un gardien de but efficace et fiable.",
    filterTitle: "Filtres",
    difficultyLabel: "Difficulté",
    utilityLabel: "Utilité",
    resetFilters: "Réinitialiser les filtres",
    noResults: "Aucune technique ne correspond à vos filtres. Essayez d'ajuster vos critères.",
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
        fullDescription:
          "Remarque : tu peux faire un dash avant de plonger pour aller plus vite.",
      },
    ],
  },
}


export default function GardienPage() {
  const [lang, setLang] = useState<"en" | "fr">("en")
  const [minDifficulty, setMinDifficulty] = useState(1)
  const [maxDifficulty, setMaxDifficulty] = useState(5)
  const [minUtility, setMinUtility] = useState(1)
  const [maxUtility, setMaxUtility] = useState(5)

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
      videoType: "youtube" as "youtube",
      difficulty: 4,
      utility: 2,
    },
    {
      id: 2,
      videoUrl: "https://www.youtube.com/watch?v=3HE4hB1zub8",
      videoType: "youtubemuted" as "youtubemuted",
      difficulty: 1,
      utility: 2,
    },
    {
      id: 3,
      videoUrl: "https://www.youtube.com/watch?v=nWoPOycva4c",
      videoType: "youtubemuted" as "youtubemuted",
      difficulty: 5,
      utility: 1,
    },
    {
      id: 4,
      videoUrl: "https://www.youtube.com/watch?v=GDYiKktQRSk",
      videoType: "youtubemuted"   as "youtubemuted",
      difficulty: 3,
      utility: 4,
    },
    {
      id: 5,
      videoUrl: "https://www.youtube.com/watch?v=2jZ3VFWOKkw",
      videoType: "youtubemuted" as "youtubemuted",
      difficulty: 2,
      utility: 5,
    },
  ]

  // Combine technique data with translations
  const combinedTechniques = t.techniques.map((tech, index) => ({
    ...tech,
    ...techniquesMeta[index],
  }))

  // Apply filters
  const filteredTechniques = combinedTechniques.filter(
    (technique) => 
      technique.difficulty >= minDifficulty && 
      technique.difficulty <= maxDifficulty &&
      technique.utility >= minUtility &&
      technique.utility <= maxUtility
  )

  // Reset all filters to default values
  const resetFilters = () => {
    setMinDifficulty(1)
    setMaxDifficulty(5)
    setMinUtility(1)
    setMaxUtility(5)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container py-8">
        <div className="space-y-4 mb-8">
          <h1 className="text-3xl font-bold">{t.pageTitle}</h1>
          <p className="text-muted-foreground">{t.pageDescription}</p>
        </div>

        {/* Filter Section */}
        <div className="mb-8 p-6 bg-card rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">{t.filterTitle}</h2>
          
          <div className="space-y-6">
            {/* Difficulty Filter */}
            <div>
              <label className="block mb-2 font-medium">{t.difficultyLabel}: {minDifficulty} - {maxDifficulty}</label>
              <div className="flex gap-4 items-center">
                <span className="text-sm">1</span>
                <div className="flex-grow">
                  <Slider
                    defaultValue={[minDifficulty, maxDifficulty]}
                    min={1}
                    max={5}
                    step={1}
                    value={[minDifficulty, maxDifficulty]}
                    onValueChange={(values) => {
                      setMinDifficulty(values[0])
                      setMaxDifficulty(values[1])
                    }}
                  />
                </div>
                <span className="text-sm">5</span>
              </div>
            </div>
            
            {/* Utility Filter */}
            <div>
              <label className="block mb-2 font-medium">{t.utilityLabel}: {minUtility} - {maxUtility}</label>
              <div className="flex gap-4 items-center">
                <span className="text-sm">1</span>
                <div className="flex-grow">
                  <Slider
                    defaultValue={[minUtility, maxUtility]}
                    min={1}
                    max={5}
                    step={1}
                    value={[minUtility, maxUtility]}
                    onValueChange={(values) => {
                      setMinUtility(values[0])
                      setMaxUtility(values[1])
                    }}
                  />
                </div>
                <span className="text-sm">5</span>
              </div>
            </div>
            
            {/* Reset Button */}
            <div>
              <button 
                onClick={resetFilters}
                className="px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-md transition-colors"
              >
                {t.resetFilters}
              </button>
            </div>
          </div>
        </div>

        {/* Techniques Grid */}
        {filteredTechniques.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTechniques.map((technique) => (
              <TechniqueCard
                key={technique.id}
                title={technique.title}
                description={technique.description}
                fullDescription={technique.fullDescription}
                videoUrl={technique.videoUrl}
                videoType={technique.videoType}
                difficulty={technique.difficulty}
                utility={technique.utility}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            {t.noResults}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}