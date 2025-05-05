"use client"

import { useEffect, useState } from "react"
import { TechniqueCard } from "@/components/technique-card"
import Footer from "@/components/Footer"

const translations = {
  en: {
    pageTitle: "Game Strategies",
    pageDescription: "Discover various strategies and tactics to improve your team's gameplay.",
    techniques: [
      {
        title: "BackBoard",
        description: "Bounce the ball off the wall to center it",
        fullDescription:
          "The BackBoard technique involves using the wall to bounce the ball and create an accurate cross. It helps surprise the opposing defense and create scoring chances. To perform this technique, position yourself at the right distance from the wall, hit the ball precisely so it rebounds and reaches a teammate in the shooting zone. Spin can help control the ball’s landing.",
      },
      {
        title: "Buffer",
        description: "Use input buffering to create chances",
        fullDescription:
          "Buffering is a system that records button presses just before they’re needed (about 1.5 seconds early) and executes them at the right time. Press 'shoot' just before the ball arrives:\n→ The game saves your input for a short time.\n→ Once your player is able to shoot, the input is executed. Buffering is 'spammable', meaning you can press the button multiple times before it triggers, and the game will use it when possible. This isn’t the case in other games—if you press too early, the input fails. This adds difficulty and requires precision.",
      },
      {
        title: "Pyramid Formation",
        description: "Offensive formation to create chances",
        fullDescription:
          "The pyramid formation is an offensive strategy to create scoring chances by exploiting defensive gaps. By positioning your players in a pyramid shape, you maximize passing and shooting options. It’s especially effective at breaking down compact defenses and creating openings.",
      },
    ],
  },
  fr: {
    pageTitle: "Stratégies de Jeu",
    pageDescription: "Découvrez différentes stratégies et tactiques pour améliorer le jeu collectif de votre équipe.",
    techniques: [
      {
        title: "BackBoard",
        description: "Faire rebondir le ballon sur le mur pour centrer",
        fullDescription:
          "La technique du BackBoard consiste à utiliser le mur pour faire rebondir le ballon et créer un centre précis. Cela permet de surprendre la défense adverse et de créer des occasions de but. Pour exécuter cette technique, placez-vous à une distance appropriée du mur, frappez le ballon avec précision pour qu'il rebondisse sur le mur et arrive à un coéquipier dans la zone de tir. Les effets permettent de contrôler l’atterrissage de la balle.",
      },
      {
        title: "Buffer",
        description: "Exploiter le buffer pour créer des occasions",
        fullDescription:
          "Le buffer, c’est une sorte de système qui enregistre les boutons sur lesquels tu appuies un tout petit peu avant qu’ils soient vraiment utilisés (environ 1,5 seconde), pour les exécuter au bon moment. \nTu appuies sur « tir » juste avant que le ballon arrive. \n→ Le jeu garde ton appui en mémoire pendant un court instant. \n→ Dès que le joueur peut effectivement tirer, le jeu exécute ton tir. Le buffer est « spammable », ce qui signifie que tu peux appuyer plusieurs fois sur le bouton avant que l'action ne se déclenche, et le jeu va l'exécuter lorsque c'est possible. Ce n'est pas le cas dans d'autres jeux, où si tu appuies sur un bouton pour faire une technique avant que le jeu ne commence à « buffer » l'action, il ne prendra pas en compte ton appui. Si tu cliques trop tôt, tu rates la technique, ce qui ajoute une certaine difficulté au jeu et demande plus de précision.",
      },
      {
        title: "Formation en pyramide",
        description: "Formation offensive pour créer des occasions",
        fullDescription:
          "La formation en pyramide est une stratégie offensive qui permet de créer des occasions de but en exploitant les espaces laissés par la défense adverse. En plaçant vos joueurs en forme de pyramide, vous pouvez maximiser les options de passe et de tir. Cette formation est particulièrement efficace pour déstabiliser les défenses compactes et créer des ouvertures.",
      },
    ],
  },
}

export default function StrategiePage() {
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
      videoUrl: "/video/Strategie/BackBoard.mp4",
      videoType: "local",
      difficulty: 2,
      utility: 5,
      ...t.techniques[0],
    },
    {
      id: 2,
      videoUrl: "/video/Strategie/buffergclickmiddleligneblanche.mp4",
      videoType: "local",
      difficulty: 2,
      utility: 3,
      ...t.techniques[1],
    },
    {
      id: 3,
      videoUrl: "https://www.youtube.com/watch?v=cZAg62oHcpY",
      videoType: "youtube",
      difficulty: 5,
      utility: 3,
      ...t.techniques[2],
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
