"use client"

import { useEffect, useState } from "react"
import { TechniqueCard } from "@/components/technique-card"
import Footer from "@/components/Footer"

const translations = {
  en: {
    pageTitle: "Goalkeeper Techniques",
    pageDescription:
      "Discover essential techniques to become an effective and reliable goalkeeper.",
    techniques: [
      {
        title: "Ball Sound",
        description: "Learn to recognize the sound cues of the ball",
        fullDescription:
          "The ball makes different sounds depending on its speed, power, and spin. Learning to recognize these can help anticipate its behavior. Note: You can’t distinguish between left and right spin by sound.",
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
    techniques: [
      {
        title: "Son de la balle",
        description: "Apprends à reconnaître les sons de la balle",
        fullDescription:
          "La balle émet différents sons selon sa vitesse, sa puissance et son effet. Apprendre à les reconnaître permet d’anticiper son comportement. Remarque : on ne peut pas différencier l'effet gauche ou droit uniquement par le son.",
      },
      {
        title: "Relance mur",
        description: "Fais rebondir la balle sur le mur pour passer sur une aile",
        fullDescription:
          "Fais rebondir la balle sur le mur pour effectuer une passe vers une aile. Ajouter de l’effet modifie l’endroit où la balle atterrit.",
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

  useEffect(() => {
    const storedLang = localStorage.getItem("lang")
    if (storedLang) {
      setLang(storedLang as "en" | "fr")
    }
  }, [])

  const t = translations[lang]

  const techniques: Array<{
    id: number
    videoUrl: string
    videoType: "local" | "youtube"
    difficulty: number
    utility: number
    title: string
    description: string
    fullDescription: string
  }> = [
    {
      id: 1,
      videoUrl: "/video/Gardien/SonDesTirs.mp4",
      videoType: "local",
      difficulty: 4,
      utility: 2,
      ...t.techniques[0],
    },
    {
      id: 2,
      videoUrl: "/video/Gardien/relancemur.mp4",
      videoType: "local",
      difficulty: 1,
      utility: 2,
      ...t.techniques[1],
    },
    {
      id: 3,
      videoUrl: "/video/Gardien/GoatGK.mp4",
      videoType: "local",
      difficulty: 5,
      utility: 1,
      ...t.techniques[2],
    },    {
      id: 4,
      videoUrl: "/video/Gardien/arrettir.mp4",
      videoType: "local",
      difficulty:3,
      utility: 4,
      ...t.techniques[3],
    },
    {
      id: 5,
      videoUrl: "/video/Gardien/Arret+dasharret.mp4",
      videoType: "local",
      difficulty: 2,
      utility: 5,
      ...t.techniques[4],
    },
  ]

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
              videoUrl={technique.videoUrl}
              fullDescription={technique.fullDescription}
              difficulty={technique.difficulty}
              utility={technique.utility}
              videoType={technique.videoType}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
