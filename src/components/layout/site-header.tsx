"use client"

import Link from "next/link"
import { Menu, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const [lang, setLang] = useState("en")
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)

    const storedLang = localStorage.getItem("lang")
    if (storedLang) {
      setLang(storedLang)
    }
  }, [])

  const toggleLang = () => {
    const newLang = lang === "fr" ? "en" : "fr"
    setLang(newLang)
    localStorage.setItem("lang", newLang)
    window.location.reload()
  }

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  const routes = [
    { href: "/", label: lang === "fr" ? "Accueil" : "Home" },
    { href: "/tir", label: lang === "fr" ? "Tir" : "Shoot" },
    { href: "/defense", label: lang === "fr" ? "Défense" : "Defense" },
    { href: "/dribles", label: lang === "fr" ? "Dribles" : "Dribbles" },
    { href: "/gardien", label: lang === "fr" ? "Gardien" : "Goalkeeper" },
    { href: "/strategie", label: lang === "fr" ? "Stratégie" : "Strategy" },
    { href: "/Routines", label: lang === "fr" ? "Routines" : "Routines" },
    { href: "/TacticalBoard", label: lang === "fr" ? "Tableau Tactique" : "Tactical Board" },


  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center space-x-2">
          <img src="/assets/favicon-32x32.png" alt="" />
          <span className="font-bold">
            {lang === "fr" ? "Maîtrisez Rematch" : "Master Rematch"}
          </span>
        </Link>

        <nav className="hidden md:flex ml-auto items-center space-x-6 text-sm font-medium">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {route.label}
            </Link>
          ))}

          {mounted && (
            <Button variant="ghost" onClick={toggleTheme}>
              {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </Button>
          )}

          <Button variant="ghost" onClick={toggleLang}>
            {lang === "fr" ? "🇬🇧 English" : "🇫🇷 Français"}
          </Button>
        </nav>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden ml-auto">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col space-y-4 mt-8">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className="text-lg font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {route.label}
                </Link>
              ))}

              {mounted && (
                <Button variant="ghost" onClick={toggleTheme}>
                  {theme === "light" ? "🌙 Dark" : "☀️ Light"}
                </Button>
              )}

              <Button variant="ghost" onClick={toggleLang}>
                {lang === "fr" ? "🇬🇧 English" : "🇫🇷 Français"}
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
