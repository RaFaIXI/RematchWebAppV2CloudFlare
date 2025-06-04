"use client"

import { TechniqueCard } from "@/components/technique-card"
import Footer from "@/components/Footer" 
import { useEffect, useState } from "react"
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
    pageTitle: "Techniques de Dribble",
    pageDescription:
      "Maîtrisez l'art du dribble avec ces techniques pour éliminer vos adversaires et créer des occasions.",
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
        title: "Arc-en-ciel",
        description: "Faire un arc-en-ciel pour passer au-dessus de l'adversaire",
        fullDescription:
          "Fais ta touche pour pousser la balle et appuie sur le bouton modifier pour faire un arc-en-ciel. C'est un dribble puissant qui permet de passer des joueurs qui taclent ou débutants, mais un joueur aguerri saura le contrer avec un contrôle ou un tir . Tu peux modifier la distance de l'arc-en-ciel, si tu cours il ira plus loin que si tu ne cours pas en le faisant.",
      },
      {
        title: "Contrôle",
        description: "Contrôle qui pousse la balle",
        fullDescription:
          "Fais ta touche pour pousser la balle et appuie sur le bouton pousser la balle quand elle atterrit proche de toi pour faire un contrôle. pour battre les joueurs qui spamme les têtes il suffit juste de faire un controle",
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
          "Contrôle qui pousse la balle en hauteur pour éviter l'adversaire. Pour le faire, il faut faire la même combinaison que l'arc-en-ciel, mais avant de toucher la balle et en étant bien positionné.",
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
//      {
//        title: "Dribble tête",
//        description: "Mets la balle sur ta tête et parcours le terrain",
//        fullDescription:
//          "Tu peux parcourir tout le terrain en jonglant avec ta tête si tu fais le contrôle tête en boucle tout en bougeant.",
//      },
      {
        title: "Pousser la balle",
        description: "Pousser la balle est un outil indispensable",
        fullDescription:
          "Pousser la balle à l'opposé permet de feinter un adversaire. Aussi, en poussant la balle puis en courant, on va plus vite qu'en l'ayant dans les pieds. Faire le sprint bleu permet d'instantanément pousser la balle. tu peux choisir la puissance de la poussée, si tu cours la balle ira plus loin que si tu ne cours pas. Donc pour plus de contrôle, tu devrais pousser la balle sans courir puis courir puis re-pousser la balle sans courir.Quand tu pousses le ballon, le défenseur ne peut pas le tacler pendant un court instant (quand le ballon roule mais qu'il n'y a pas le curseur dessus). S'ils essaient de tacler, le ballon passera à travers eux.",
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
          "Fais une passe de puissance moyenne ou faible selon ta distance avec le mur, puis cours pour rattraper la balle à l'atterrissage.",
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
        title: "WaveDash Back",
        description: "Dash sur la balle en regardant dans une autre dirrection",
        fullDescription:
          "Dash sur la balle en regardant dans une autre dirrection pour pouvoir bouger plus vite car tu skip l'annimation où le personnage se retourne. avec le dash  si vous regardez par exemple devant vous et que vous dashé sur une balle, votre personnage attrapera la balle et convertira tous vos mouvements dans la direction de la caméra, c'est un peu délicat à faire, mais c'est de loin la meilleure façon de changer de direction avec la balle",
      },
      {
        title: "Virgule Aérienne",
        description: "Leurre l’adversaire avec une virgule ou un coup de tête en l'air",
        fullDescription: "Mettez le ballon en l’air avec un arc-en-ciel ou une petite passe lobée, puis effectuez la commande de l’arc-en-ciel dans une direction, puis recommencez dans une autre direction. Le joueur réalisera une virgule aérienne."
      },
      {
        title: "Petit Pont en Plongeant",
        description: "Plongez à travers l’adversaire et le ballon pour forcer un petit pont",
        fullDescription: "Lorsque l’Effort Supplémentaire est activé en direction d’un adversaire, le ballon est libéré avec une vitesse qui empêche momentanément le contrôle immédiat. Si le joueur effectue ensuite une plongée à travers l’adversaire pendant cette courte fenêtre, le ballon passe proprement entre ses jambes."
      },
      {
        title: "Petit Pont en Sprint",
        description: "Sprint Bleu à travers l’adversaire et le ballon pour forcer un petit pont",
        fullDescription: "Activer l’Effort Supplémentaire face à un adversaire qui tacle peut forcer le ballon (et vous) à passer à travers lui. Le timing est difficile, et si l’adversaire ne tacle pas, il interceptera probablement le ballon."
      },
      {
        title: "Feinte d'Arc-en-Ciel",
        description: "(Clavier) La feinte d'arc-en-ciel est une technique qui permet à votre joueur d’exécuter l’animation du flick vers l’avant tout en envoyant le ballon dans une direction totalement différente, pour tromper l’adversaire.",
        fullDescription: "Il suffit de lancer un arc-en-ciel vers l’avant et, pendant que l’animation se joue, de bouger rapidement la caméra vers la direction dans laquelle vous voulez réellement envoyer le ballon."
      },
      {
        title: "Jump Dribble",
        description: "Use a header jump to control and dribble the ball.",
        fullDescription: "Master the art of dribbling by using a header jump to keep control of the ball while staying agile in the air.",
      },
      {
        title: "Arc-en-ciel Effort Turn",
        description: "Utilise le sprint bleu pour te retourner instantanément après un flick",
        fullDescription: "Fais un arc-en-ciel sans courir, puis cours vers l’endroit où il atterrit et utilise le sprint bleu dans l’autre direction pour te retourner instantanément avec le ballon."
      },
      {
        title: "Dribble Tacle Glissé",
        description: "Pousse le ballon puis effectue un tacle glissé pour dribbler",
        fullDescription: "Pousse le ballon puis effectue un tacle glissé pour dribbler. Cela fonctionne comme quand on pousse la balle : quand tu tacles, le ballon traverse est non attrapable par le défenseur pendant un court instant.",
      },
      {
        title: "Dribble Tacle",
        description: "Pousse le ballon puis effectue un tacle pour dribbler",
        fullDescription: "Pousse le ballon puis effectue un tacle pour dribbler. Cela fonctionne comme quand on pousse la balle : quand tu tacles, le ballon traverse est non attrapable par le défenseur pendant un court instant.",
      },
      {
        title: "Wavedash Latéral",
        description: "Le wavedash est une excellente technique pour changer de direction avec le ballon",
        fullDescription: "Pour faire un wavedash latéral, tu dois pousser le ballon dans une direction, activer le mode défense, puis dasher dans la direction du ballon tout en regardant ailleurs. Tu peux le faire dans toutes les directions. C’est un peu difficile à réaliser, mais c’est de loin la meilleure façon de changer de direction avec le ballon."
      }



    ],
  },
  en: {
    pageTitle: "Dribble Techniques",
    pageDescription:
      "Master the art of dribbling with these techniques to beat defenders and create chances.",
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
        title: "Rainbow Flick",
        description: "Do a rainbow flick to go over a defender",
        fullDescription:
          "Tap to push the ball and press the modify button to do a rainbow flick. It's a powerful move to beat sliding players or beginners, but advanced players can counter it with a control or a shot. You can modify the distance of the rainbow; if you run it will go further than if you dont run while doing it.",
      },
      {
        title: "Control",
        description: "Control that pushes the ball",
        fullDescription:
          "Tap to push the ball and press the push ball button as it lands near you to control it. to beat players who spam headers, just do a control.",
      },
      {
        title: "Perfect Control",
        description: "Control that doesn't push the ball",
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
          "Press the dribble button to dribble. You can chain 2 dribbles fast, but after that there's lag. (On keyboard/mouse, dribbling diagonally may move you backward due to a bug.)",
      },
      {
        title: "Movement Dribble",
        description: "Dribble using only movement",
        fullDescription:
          "With good movement, you can beat defenders without using the dribble button.",
      },
//      {
//        title: "Header Dribble",
//        description: "Carry the ball on your head across the field",
//        fullDescription:
//          "You can head-dribble across the field by repeating header controls while moving.",
//     },
      {
        title: "Push Ball",
        description: "Push the ball away as a core tool",
        fullDescription:
          "Pushing the ball can fake defenders and helps you run faster. A blue sprint also pushes the ball instantly. You can choose the push power; running makes it go further than walking. so for more control you should push ball without running then run then repush the ball without running, when you push the ball the defender can't tackle it for brief periode of time (when ball is rolling but there is not the cursor on it) if they try to tack the ball will clip through them.",
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
        title: "WaveDash Back",
        description: "Dash on the ball while loooking away",
        fullDescription:
          "Dash on the ball while loooking away to be able to move faster cause you skip the turn annimation. With the dash, if you looking for example infront of you and dash into a loose ball behind you, your character will snatch the ball and convert all your movement into the direction of the camera it is a bit tricky to do, but it is by far the best way to change direction with the ball",
      },
      {
        title: "Air Elastico",
        description: "Bait the opponent with a header or lob elastico in air",
        fullDescription:
          "Put the ball in air wait a rainbow flick or short lob pass then do the rainbow flick input toward a dirrection and redoo it toward another position the player will do an air elastico",
      },
      {
        title: "Diving Nutmeg",
        description: "Dive through the opponent and the ball to force the ball through them",
        fullDescription:
          "When Extra Effort is activated toward an opponent, the ball is released with a speed that briefly prevents immediate control. If the player then performs a dive through the opponent during this narrow window, the ball is forced cleanly through them. ",
      },
      {
        title: "Sprinting Nutmeg",
        description: "Blue Sprint through the opponent and the ball to force the ball through them",
        fullDescription:
          "Activating Extra Effort in front of a tackling opponent can force the ball (and you) through them. The timing is difficult, and if the opponent is not tackling, they will likely stop and steal the ball.",
      },
      {
          title: "fake Rainbow flick",
          description: "(Keyboard) The rainbow flick fake is a tech that allows your character to do the forward flick animation, while flicking the ball in a totally different direction, faking your opponent.",
          fullDescription:
            "You simply start a rainbow flick forward and while the animation is playing, quickly flick your camera in the direction you want the flick to actually go.",
      },
      {
        title: "Jump Dribble",
        description: "you can use header jump to dribble the ball",
        fullDescription:
          "you can use header jump to dribble the ball",
      },
      {
        title: "Flick Effort Turn",
        description: "Use the blue sprint to instantly turn with after flick",
        fullDescription:
          "Do a rainbow flick without running, then run where the flick end and blue sprint toward the other direction to instantly turn with the ball.",
      },
      {
        title: "Slide tackle dribble",
        description: "Push the ball then slide tackle to dribble",
        fullDescription:
          "Push the ball then slide tackle to dribble it work like for push ball, when you tackle the ball, it clip through the defender for a brief time.",
      },
      {
        title: "Tackle dribble",
        description: "Push the ball then tackle to dribble",
        fullDescription:
          "Push the ball then tackle to dribble it work like for push ball, when you tackle the ball, it clip through the defender for a brief time.",
      },
      {
        title: "Wavedash Side",
        description: "Wavedash is great tech for changing direction with the ball",
        fullDescription:
          "To do a side wavedash, you need to push the ball in a direction and then activate defense mode and dash in the direction of the ball while looking away, you can do it toward all dirrections, it is a bit tricky to do, but it is by far the best way to change direction with the ball",
      },
    ],
  },
}

export default function DriblesPage() {
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

  const techniqueMeta: Array<{
    id: number
    videoUrl: string
    videoType: "local" | "youtube" | "youtubemuted" | "youtubeclip"
    difficulty: number
    utility: number
  }> = [
    { id: 1, videoUrl: "https://youtu.be/D0iMRR1Y93M", videoType: "youtubemuted", difficulty: 1, utility: 4 },
    { id: 2, videoUrl: "https://youtu.be/WQ6SemZPMls", videoType: "youtubemuted", difficulty: 1, utility: 5 },
    { id: 3, videoUrl: "https://youtu.be/-gFidZd4y8A", videoType: "youtubemuted", difficulty: 2, utility: 5 },
    { id: 4, videoUrl: "https://youtu.be/Bvsuu-x6umA", videoType: "youtubemuted", difficulty: 3, utility: 3 },
    { id: 5, videoUrl: "https://youtu.be/rHh9FCiGkyk", videoType: "youtubemuted", difficulty: 2, utility: 1 },
    { id: 6, videoUrl: "https://youtu.be/lE0a3yHPXj4", videoType: "youtubemuted", difficulty: 1, utility: 5 },
    { id: 7, videoUrl: "https://youtu.be/cSmyH4gQRNk", videoType: "youtubemuted", difficulty: 1, utility: 4 },
    { id: 8, videoUrl: "https://youtu.be/coIWvWCnr6w", videoType: "youtubemuted", difficulty: 2, utility: 4 },
    //{ id: 9, videoUrl: "https://youtu.be/d4HhcwXWT7o", videoType: "youtubemuted", difficulty: 2, utility: 2 },
    { id: 10, videoUrl: "https://youtu.be/oBHnJahyxcw", videoType: "youtubemuted", difficulty: 1, utility: 5 },
    { id: 11, videoUrl: "https://youtu.be/-DBdXHjfwwU", videoType: "youtubemuted", difficulty: 2, utility: 1 },
    { id: 12, videoUrl: "https://youtu.be/7xZhLzUH_pY", videoType: "youtubemuted", difficulty: 3, utility: 3 },
    { id: 13, videoUrl: "https://youtu.be/hX5xom1Jg8s", videoType: "youtubemuted", difficulty: 4, utility: 3 },
    { id: 14, videoUrl: "https://youtu.be/T3Zp-4aa8ds", videoType: "youtubemuted", difficulty: 4, utility: 3 },
    { id: 15, videoUrl: "https://youtu.be/bvqvwub7s_c", videoType: "youtubemuted", difficulty: 1, utility: 1 },
    { id: 16, videoUrl: "https://www.youtube.com/embed/mjie8ekJ5Yg?si=jpaif3_u733zHyHa&amp;clip=UgkxCb4_JrFA1w2ZtT5_-IuS2AQH7tPxcoOa&amp;clipt=EM2CAhit1wU", videoType: "youtubeclip", difficulty: 1, utility: 5 },
    { id: 17, videoUrl: "https://youtu.be/jZrw-aZaKOY", videoType: "youtubemuted", difficulty: 3, utility: 4 },
    { id: 18, videoUrl: "https://youtu.be/aPYuLq0PX08", videoType: "youtubemuted", difficulty: 2, utility: 4 },
    { id: 19, videoUrl: "https://youtu.be/un1iAaaMDVA", videoType: "youtubemuted", difficulty: 5, utility: 2 },
    { id: 20, videoUrl: "https://youtu.be/9xGmC0ZJfPk", videoType: "youtubemuted", difficulty: 3, utility: 5 },
    { id: 21, videoUrl: "https://youtu.be/7t31Ej_30VE", videoType: "youtubemuted", difficulty: 5, utility: 3 },
    { id: 22, videoUrl: "https://youtu.be/txopR66-Bw8", videoType: "youtubemuted", difficulty: 4, utility: 2 },
    { id: 23, videoUrl: "https://youtu.be/xkN-aRQpvRY", videoType: "youtubemuted", difficulty: 3, utility: 3 },
    { id: 24, videoUrl: "https://youtu.be/pgwxgjY_WdM", videoType: "youtubemuted", difficulty: 1, utility: 1 },
    { id: 25, videoUrl: "https://youtu.be/XO1mP41WlH4", videoType: "youtubemuted", difficulty: 1, utility: 3 },
    { id: 26, videoUrl: "https://youtu.be/Omy5jQBRMFU", videoType: "youtubemuted", difficulty: 3, utility: 2 },

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