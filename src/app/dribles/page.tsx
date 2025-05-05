"use client"

import { TechniqueCard } from "@/components/technique-card"
import Footer from "@/components/Footer" 
import { useEffect, useState } from "react"
import { title } from "process"
const translations = {
  fr: {
    pageTitle: "Techniques de Dribble",
    pageDescription:
      "Maîtrisez l'art du dribble avec ces techniques pour éliminer vos adversaires et créer des occasions.",
    techniques: [
      {
        title: "Arc-en-ciel",
        description: "Faire un arc-en-ciel pour passer au-dessus de l'adversaire",
        fullDescription:
          "Fais ta touche pour pousser la balle et appuie sur le bouton modifier pour faire un arc-en-ciel. C’est un dribble puissant qui permet de passer des joueurs qui taclent ou débutants, mais un joueur aguerri saura le contrer avec un contrôle ou un tir . Tu peux modifier la distance de l’arc-en-ciel, si tu cours il ira plus loin que si tu ne cours pas en le faisant.",
      },
      {
        title: "Contrôle",
        description: "Contrôle qui pousse la balle",
        fullDescription:
          "Fais ta touche pour pousser la balle et appuie sur le bouton pousser la balle quand elle atterrit proche de toi pour faire un contrôle.",
      },
      {
        title: "Contrôle parfait",
        description: "Contrôle qui pousse la balle",
        fullDescription:
          "Mets-toi exactement sur le point d'atterrissage de la balle pour faire un contrôle qui ne nécessite pas de pousser la balle. Tu peux directement bouger avec.",
      },
      {
        title: "Contrôle tête",
        description: "Contrôle qui pousse la balle en hauteur pour éviter l'adversaire",
        fullDescription:
          "Contrôle qui pousse la balle en hauteur pour éviter l'adversaire. Pour le faire, il faut faire la même combinaison que l’arc-en-ciel, mais avant de toucher la balle et en étant bien positionné.",
      },
      {
        title: "DashDance",
        description: "Brouille les sens de l'adversaire",
        fullDescription:
          "Appuie sur ta touche du mode dribble et relâche-la plusieurs fois très vite tout en bougeant pour faire ces gestes flous.",
      },
      {
        title: "Dribble Cancel",
        description: "Annule la latence après un dribble",
        fullDescription:
          "Si tu input une action comme pousser la balle, tirer ou passer juste après avoir fait tes deux dribbles, tu peux éviter le lag des dribbles.",
      },
      {
        title: "Dribble",
        description: "Dribbles basiques",
        fullDescription:
          "Avec la touche pousser la balle en mode dribble, tu peux faire un dribble. Tu peux enchaîner un deuxième dribble directement sans latence, mais ensuite tu auras du lag. (Sur clavier-souris, si tu dribbles en diagonale, tu iras à l'opposé à cause d'un bug.)",
      },
      {
        title: "Dribble de mouvement",
        description: "Dribble uniquement par tes mouvements",
        fullDescription:
          "Si tu bouges assez bien, tu peux dribbler et passer un adversaire sans utiliser le \"dribble\".",
      },
      {
        title: "Dribble tête",
        description: "Mets la balle sur ta tête et parcours le terrain",
        fullDescription:
          "Tu peux parcourir tout le terrain en jonglant avec ta tête si tu fais le contrôle tête en boucle tout en bougeant.",
      },
      {
        title: "Pousser la balle",
        description: "Pousser la balle est un outil indispensable",
        fullDescription:
          "Pousser la balle à l'opposé permet de feinter un adversaire. Aussi, en poussant la balle puis en courant, on va plus vite qu’en l’ayant dans les pieds. Faire le sprint bleu permet d’instantanément pousser la balle. tu peux choisir la puissance de la poussée, si tu cours la balle ira plus loin que si tu ne cours pas. Donc pour plus de contrôle, tu devrais pousser la balle sans courir puis courir puis re-pousser la balle sans courir.",
      },
      {
        title: "WallBounce",
        description: "Fais rebondir ton personnage au mur avec la balle",
        fullDescription:
          "Pousse la balle vers le mur en avançant vers lui pour rebondir directement avec la balle.",
      },
      {
        title: "Wall Dribble",
        description: "Fais rebondir la balle sur le mur pour passer un adversaire",
        fullDescription:
          "Fais une passe de puissance moyenne ou faible selon ta distance avec le mur, puis cours pour rattraper la balle à l’atterrissage.",
      },
      {
        title: "Contrôle Dash",
        description: "Fais un dash pile quand tu contrôles la balle",
        fullDescription:
          "Cela permet de dasher quand tu reçois la balle pour être directement en mouvement. Le timing est dur à avoir.",
      },
      {
        title: "Dribble en chaîne",
        description: "Dribbles enchaînés pour éviter le délai après 2 dribbles rapides",
        fullDescription: "Tu dois dribbler puis enchaîner un autre dribble avec le bon timing pour éviter le délai après deux dribbles, combine les dribbles enchaînés avec la poussée de balle pour être un maître des beaux buts.",
      },
      {
        title: "Dash Push",
        description: "Pousse la balle puis fais un dash défensif vers la balle",
        fullDescription:
          "Pousse la balle puis fais un dash défensif vers la balle.",
      },
      {
        title: "Sprint",
        description: "Sprint pour aller plus vite, le sprint change le contrôle de la balle",
        fullDescription:
          "Appuie sur la touche de sprint pour courir plus vite. Le sprint change tout, il modifie la distance de poussée de la balle, la distance de l'arc-en-ciel et même la distance de contrôle de la balle. Le sprint consomme de l'endurance. Le sprint est essentiel pour un gameplay rapide.",
      },
      {
        title: "WaveDash",
        description: "Dash sur la balle en regardant dans une autre dirrection",
        fullDescription:
          "Dash sur la balle en regardant dans une autre dirrection pour pouvoir bouger plus vite car tu skip l'annimation où le personnage se retourne. avec le dash  si vous regardez par exemple devant vous et que vous dashé sur une balle, votre personnage attrapera la balle et convertira tous vos mouvements dans la direction de la caméra, c'est un peu délicat à faire, mais c'est de loin la meilleure façon de changer de direction avec la balle",
      }
      
      
    ],
  },
  en: {
    pageTitle: "Dribble Techniques",
    pageDescription:
      "Master the art of dribbling with these techniques to beat defenders and create chances.",
    techniques: [
      {
        title: "Rainbow Flick",
        description: "Do a rainbow flick to go over a defender",
        fullDescription:
          "Tap to push the ball and press the modify button to do a rainbow flick. It’s a powerful move to beat sliding players or beginners, but advanced players can counter it with a control or a shot. You can modify the distance of the rainbow; if you run it will go further than if you dont run while doing it.",
      },
      {
        title: "Control",
        description: "Control that pushes the ball",
        fullDescription:
          "Tap to push the ball and press the push ball button as it lands near you to control it.",
      },
      {
        title: "Perfect Control",
        description: "Control that doesn’t push the ball",
        fullDescription:
          "Stand exactly where the ball lands to control it perfectly without pushing. You can move immediately after.",
      },
      {
        title: "Header Control",
        description: "Control that lifts the ball to avoid a defender",
        fullDescription:
          "Same input as the rainbow, but do it before touching the ball and be well-positioned.",
      },
      {
        title: "DashDance",
        description: "Confuse the opponent with fast movement",
        fullDescription:
          "Tap and release the dribble button repeatedly while moving to perform blurry moves.",
      },
      {
        title: "Dribble Cancel",
        description: "Cancel the delay after a dribble",
        fullDescription:
          "If you input shoot, pass, or push right after two dribbles, you can skip the lag.",
      },
      {
        title: "Dribble",
        description: "Basic dribbles",
        fullDescription:
          "Press the dribble button to dribble. You can chain 2 dribbles fast, but after that there’s lag. (On keyboard/mouse, dribbling diagonally may move you backward due to a bug.)",
      },
      {
        title: "Movement Dribble",
        description: "Dribble using only movement",
        fullDescription:
          "With good movement, you can beat defenders without using the dribble button.",
      },
      {
        title: "Header Dribble",
        description: "Carry the ball on your head across the field",
        fullDescription:
          "You can head-dribble across the field by repeating header controls while moving.",
      },
      {
        title: "Push Ball",
        description: "Push the ball away as a core tool",
        fullDescription:
          "Pushing the ball can fake defenders and helps you run faster. A blue sprint also pushes the ball instantly. You can choose the push power; running makes it go further than walking. so for more controle you should push ball without running then run then repush the ball without running",
      },
      {
        title: "WallBounce",
        description: "Bounce yourself off the wall with the ball",
        fullDescription:
          "Push the ball toward the wall while running to bounce off together.",
      },
      {
        title: "Wall Dribble",
        description: "Bounce the ball off the wall to beat a defender",
        fullDescription:
          "Make a soft pass to the wall and run to catch the ball when it lands.",
      },
      {
        title: "Dash Control",
        description: "Dash at the exact moment you receive the ball",
        fullDescription:
          "Dash right as you receive the ball to instantly gain movement. Timing is tricky.",
      },
      {
        title: "Chain Dribble",
        description: "Chain dribbles to skip the delay after 2 quick dribbles",
        fullDescription:
          "you have to drible then re drible with the right timing to skip the delay after 2 dribbles, Combine chain dribles with push ball to be a master of beautiful goals",
      },
      {
        title: "Dash Push",
        description: "Push the ball then do the defensive dash toward the ball",
        fullDescription:
          "Push the ball then do the defensive dash toward the ball.",
      },
      {
        title: "Sprint",
        description: "Sprint to move faster, Sprint alter everything",
        fullDescription:
          "Hold the sprint button to run faster. Sprint alter everything, it alter ball push distance, rainbow flick distance, and even the ball control distance. Sprinting use stamina. Sprinting is essential for fast-paced gameplay.",
      },
      {
        title: "WaveDash",
        description: "Dash on the ball while loooking away",
        fullDescription:
          "Dash on the ball while loooking away to be able to move faster cause you skip the turn annimation. With the dash, if you looking for example infront of you and dash into a loose ball behind you, your character will snatch the ball and convert all your movement into the direction of the camera it is a bit tricky to do, but it is by far the best way to change direction with the ball",
      }
    ],
  },
}

export default function DriblesPage() {
  const [lang, setLang] = useState<"en" | "fr">("en")
    
  useEffect(() => {
    const storedLang = localStorage.getItem("lang")
    if (storedLang) {
      setLang(storedLang as "en" | "fr")
    }
  }, [])
    const techniqueMeta: Array<{
      id: number
      videoUrl: string
      videoType: "local" | "youtube"
      difficulty: number
      utility: number
    }> = [
    { id: 1, videoUrl: "/video/drible/arcenciel.mp4", videoType: "local", difficulty: 1, utility: 4 },
    { id: 2, videoUrl: "/video/drible/controle.mp4", videoType: "local", difficulty: 1, utility: 5 },
    { id: 3, videoUrl: "/video/drible/controleparfait.mp4", videoType: "local", difficulty: 2, utility: 5 },
    { id: 4, videoUrl: "/video/drible/controleTete.mp4", videoType: "local", difficulty: 3, utility: 3 },
    { id: 5, videoUrl: "/video/drible/dashdance.mp4", videoType: "local", difficulty: 2, utility: 1 },
    { id: 6, videoUrl: "/video/drible/DribleCancel.mp4", videoType: "local", difficulty: 1, utility: 5 },
    { id: 7, videoUrl: "/video/drible/dribles+specialpc.mp4", videoType: "local", difficulty: 1, utility: 4 },
    { id: 8, videoUrl: "/video/drible/DriblesMouvementDashDance.mp4", videoType: "local", difficulty: 2, utility: 4 },
    { id: 9, videoUrl: "/video/drible/HeaderRow.mp4", videoType: "local", difficulty: 2, utility: 2 },
    { id: 10, videoUrl: "/video/drible/pushball.mp4", videoType: "local", difficulty: 1, utility: 5 },
    { id: 11, videoUrl: "/video/drible/wallbounce.mp4", videoType: "local", difficulty: 2, utility: 1 },
    { id: 12, videoUrl: "/video/drible/walldrible.mp4", videoType: "local", difficulty: 3, utility: 3 },
    { id: 13, videoUrl: "/video/drible/WALLDASH.mp4", videoType: "local", difficulty: 4, utility: 3 },
    { id: 14, videoUrl: "/video/drible/Dribbles-Chain.mp4", videoType: "local", difficulty: 4, utility: 3 },
    { id: 15, videoUrl: "/video/drible/dashpush.mp4", videoType: "local", difficulty: 2, utility: 2 },
    { id: 16, videoUrl: "/video/drible/sprint.mp4", videoType: "local", difficulty: 1, utility: 5 },
    { id: 17, videoUrl: "/video/drible/WaveDash.mp4", videoType: "local", difficulty: 3, utility: 4 },



    
  ]
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