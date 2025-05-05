"use client"
import { useState, useRef, useEffect } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface TechniqueCardProps {
  title: string
  description: string
  videoUrl: string
  videoType: "local" | "youtube"
  fullDescription: string
  difficulty: number
  utility: number
}

const translations = {
  en: {
    difficulty: "Difficulty",
    utility: "Utility",
    seeMore: "See more",
    description: "Description",
    unsupported: "Your browser does not support video playback.",
  },
  fr: {
    difficulty: "Difficulté",
    utility: "Utilité",
    seeMore: "Voir plus",
    description: "Description",
    unsupported: "Votre navigateur ne supporte pas la lecture de vidéos.",
  },
}


// Star rating component
const StarRating = ({
  rating,
  label,
}: {
  rating: number
  label: string
}) => {
  const safeRating = Math.min(5, Math.max(1, rating))
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium min-w-[70px]">{label}:</span>
      <div className="flex">
        {Array.from({ length: safeRating }).map((_, i) => (
          <span key={i} role="img" aria-label="star">
            ⭐
          </span>
        ))}
      </div>
    </div>
  )
}

// Extract YouTube video ID
const getYouTubeVideoId = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : null
}
const exeptionTitle = ["Son de la balle","Ball Sound","Mouvements et Tirs","Movements and Shots","Body Block","Sprint"]

export function TechniqueCard({
  title,
  description,
  videoUrl,
  videoType,
  fullDescription,
  difficulty,
  utility,
}: TechniqueCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [lang, setLang] = useState<"en" | "fr">("en")
  const videoRef = useRef<HTMLVideoElement>(null)
  const youtubeId = videoType === "youtube" ? getYouTubeVideoId(videoUrl) : null

  const isException = exeptionTitle.includes(title)

  useEffect(() => {
    const storedLang = localStorage.getItem("lang")
    if (storedLang) {
      setLang(storedLang as "en" | "fr")
    }
  }, [])

  const t = translations[lang]

  useEffect(() => {
    if (videoType !== "local" || !videoRef.current || !isOpen) return

    const video = videoRef.current
    if (!isException) {
      video.muted = true
      video.volume = 0
    }

    const playVideo = async () => {
      try {
        await video.play()
      } catch (error) {
        console.error("Autoplay failed:", error)
      }
    }

    playVideo()

    const enforceMute = () => {
      if (videoRef.current && !isException) {
        videoRef.current.muted = true
        videoRef.current.volume = 0
      }
    }

    video.addEventListener("volumechange", enforceMute)
    video.addEventListener("play", enforceMute)

    return () => {
      video.removeEventListener("volumechange", enforceMute)
      video.removeEventListener("play", enforceMute)
      video.pause()
    }
  }, [isOpen, videoType, isException])

  const renderVideo = () => {
    if (videoType === "youtube" && youtubeId) {
      return (
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=${isOpen ? "1" : "0"}&loop=1&playlist=${youtubeId}&controls=${isException ? "1" : "0"}`}
          title={`YouTube video: ${title}`}
          className="w-full h-full absolute top-0 left-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )
    } else {
      return (
        <video
          ref={videoRef}
          muted={!isException}
          autoPlay={isOpen}
          loop
          playsInline
          controls={isException}
          onVolumeChange={() => {
            if (videoRef.current && !isException) {
              videoRef.current.muted = true
              videoRef.current.volume = 0
            }
          }}
          className="w-full h-full object-cover"
          poster="/placeholder.svg?height=400&width=800"
        >
          <source src={videoUrl} type="video/mp4" />
          {t.unsupported}
        </video>
      )
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1 pt-2 border-t">
              <StarRating rating={difficulty} label={t.difficulty} />
              <StarRating rating={utility} label={t.utility} />
            </div>
            <p className="text-sm text-muted-foreground line-clamp-3">
              {fullDescription}
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="ml-auto">
              {t.seeMore}
            </Button>
          </CardFooter>
        </Card>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="aspect-video w-full bg-muted mb-4 relative">
          {renderVideo()}
        </div>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:gap-6 mb-2">
            <StarRating rating={difficulty} label={t.difficulty} />
            <StarRating rating={utility} label={t.utility} />
          </div>
          <h3 className="text-lg font-medium">{t.description}</h3>
          <p className="text-sm text-muted-foreground">{fullDescription}</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
