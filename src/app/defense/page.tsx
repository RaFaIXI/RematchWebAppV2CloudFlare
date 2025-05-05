"use client"

import { TechniqueCard } from "@/components/technique-card"
import Footer from "@/components/Footer"
import { useEffect, useState } from "react"

const translations = {
  fr: {
    pageTitle: "Techniques de Défense",
    pageDescription:
      "Maîtrisez l'art de défendre avec ces techniques essentielles pour protéger votre but et récupérer le ballon.",
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
  videoType: "local" | "youtube"
  difficulty: number
  utility: number
}> = [
  {
    id: 1,
    videoUrl: "/video/Defense/tacleglisse.mp4",
    videoType: "local",
    difficulty: 1,
    utility: 4,
  },
  {
    id: 2,
    videoUrl: "/video/Defense/tacle.mp4",
    videoType: "local",
    difficulty: 1,
    utility: 5,
  },
  {
    id: 3,
    videoUrl: "/video/Defense/block.mp4",
    videoType: "local",
    difficulty: 3,
    utility: 3,
  },
  {
    id: 4,
    videoUrl: "/video/Defense/bodyblock.mp4",
    videoType: "local",
    difficulty: 4,
    utility: 3,
  },

]

export default function DefensePage() {
  const [lang, setLang] = useState<"en" | "fr">("en")

  useEffect(() => {
    const storedLang = localStorage.getItem("lang")
    if (storedLang) {
      setLang(storedLang as "en" | "fr")
    }
  }, [])

  const t = translations[lang]
  const techniques = t.techniques.map((tech, index) => ({
    ...tech,
    ...techniqueMeta[index],
  }))

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container py-8">
        <div className="space-y-4 mb-8">
          <h1 className="text-3xl font-bold">{t.pageTitle}</h1>
          <p className="text-muted-foreground">{t.pageDescription}</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {techniques.map((technique) => (
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
      </main>
      <Footer />
    </div>
  )
}
