"use client"
import { TechniqueCard } from "@/components/technique-card"
import Footer from "@/components/Footer" 
import { useEffect, useState } from "react"
const translations = {
  en: {
    pageTitle: "Shooting Techniques",
    pageDescription:
      "Discover various shooting techniques to score more goals and improve your efficiency in front of the goal.",
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
      /// no problem between the two way to code
      {
        "title": "Small Lob Pass Sprint Shot",
        "description": "Small Lob Pass - Blue Sprint - Shot",
        "fullDescription":
          "Make a small lob pass by pressing the pass button, the modifier, and the push ball button at the same time, then immediately do the blue sprint and shoot as soon as possible. If done correctly, your character will perform an aerial shot."
      },
      {
        "title": "Shot Power",
        "description": "The Uses of Shot Power",
        "fullDescription":
          "If you press the shot button for a shorter time, you’ll make a weaker shot but with more spin, which can confuse the goalkeeper. If you press the shot button longer, you’ll make a more powerful shot but with less spin."
      },
      {
        "title": "Movements and Shots",
        "description": "Moving changes shot trajectories",
        "fullDescription":
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
        title: "Mouvements et Tirs",
        description: "bouger change les trajectoires de tir",
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
        "title": "Arc en ciel - Passe Lobée - Tir",
        "description": "Arc en ciel latéral rapide puis petite passe lobée suivie d’un tir en sprint bleu",
        "fullDescription": "Arc en ciel latéral rapide puis petite passe lobée suivie d’un tir en sprint blue. Tu peut faire cette technique dans différente dirrections"
      }
      
      
    ],
  },
}


export default function TirPage() {
    const [lang, setLang] = useState<"en" | "fr">("en")
  
    useEffect(() => {
      const storedLang = localStorage.getItem("lang")
      if (storedLang) {
        setLang(storedLang as "en" | "fr")
      }
    }, [])
    const t = translations[lang]
    const techniqueMeta: Array<{
      id: number
      videoUrl: string
      videoType: "local" | "youtube"
      difficulty: number
      utility: number
    }> = [
      {
        id: 1,
        videoUrl: "/video/tir/degreetir.mp4",
        videoType: "local",
        difficulty: 3,
        utility: 4,
      },
      {
        id: 2,
        videoUrl: "/video/tir/deviationShot.mp4",
        videoType: "local",
        difficulty: 2,
        utility: 5,
      },
      {
        id: 3,
        videoUrl: "/video/tir/infinitete.mp4",
        videoType: "local",
        difficulty: 3,
        utility: 2,
      },
      {
        id: 4,
        videoUrl: "/video/tir/InstaShoot.mp4",
        videoType: "local",
        difficulty: 1,
        utility: 2,
      },
      {
        id: 5,
        videoUrl: "/video/tir/atetes.mp4",
        videoType: "local",
        difficulty: 2,
        utility: 4,
      },
      {
        id: 6,
        videoUrl: "/video/tir/LobFeint.mp4",
        videoType: "local",
        difficulty: 1,
        utility: 3,
      },
      {
        id: 7,
        videoUrl: "/video/tir/mixuppassecotetir.mp4",
        videoType: "local",
        difficulty: 2,
        utility: 2,
      },
      {
        id: 8,
        videoUrl: "/video/tir/ShortPassShoot.mp4",
        videoType: "local",
        difficulty: 2,
        utility: 3,
      },
      {
        id: 9,
        videoUrl: "/video/tir/SideShot.mp4",
        videoType: "local",
        difficulty: 3,
        utility: 3,
      },
      {
        id: 10,
        videoUrl: "/video/tir/SideWallReboundGoal.mp4",
        videoType: "local",
        difficulty: 4,
        utility: 4,
      },
      {
        id: 11,
        videoUrl: "/video/tir/specialearcencielTeteWallBut.mp4",
        videoType: "local",
        difficulty: 3,
        utility: 3,
      },
      {
        id: 12,
        videoUrl: "/video/tir/talonnade.mp4",
        videoType: "local",
        difficulty: 3,
        utility: 2,
      },
      {
        id: 13,
        videoUrl: "/video/tir/tiranglebas.mp4",
        videoType: "local",
        difficulty: 2,
        utility: 3,
      },
      {
        id: 14,
        videoUrl: "/video/tir/Wallretourne.mp4",
        videoType: "local",
        difficulty: 4,
        utility: 3,
      },
      {
        id: 15,
        videoUrl: "/video/tir/PetitePasseTirSprint.mp4",
        videoType: "local",
        difficulty: 3,
        utility: 4,
      },
      {
        id: 16,
        videoUrl: "/video/tir/PowerOfShots.mp4",
        videoType: "local",
        difficulty: 2,
        utility: 5,
      },
      {
        id: 17,
        videoUrl: "/video/tir/mouvementsAltersShoot.mp4",
        videoType: "local",
        difficulty: 1,
        utility: 5,
      },
      {
        id: 18,
        videoUrl: "/video/tir/headerfeint2.mp4",
        videoType: "local",
        difficulty: 1,
        utility: 4,
      },
      {
        id: 19,
        videoUrl: "/video/tir/RainbowFlick-PassLob-Shoot.mp4",
        videoType: "local",
        difficulty: 3,
        utility: 3,
      }
    ]
    
    const techniques = t.techniques.map((tech, index) => ({
      ...tech,
      ...techniqueMeta[index],
    }))
    

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container py-8">
        <div className="space-y-4 mb-8">
          <h1 className="text-3xl font-bold">{t.pageTitle}</h1>
          <p className="text-muted-foreground">
          {t.pageDescription}
          </p>
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