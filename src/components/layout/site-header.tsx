"use client"

import Link from "next/link"
import { Menu, Sun, Moon, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useEffect, useState, useRef } from "react"
import { useTheme } from "next-themes"
import { usePathname } from "next/navigation"

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const [lang, setLang] = useState("en")
  const [mounted, setMounted] = useState(false)
  const [isEmbedded, setIsEmbedded] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  const { theme, setTheme } = useTheme()
  const [isEmbeddedRematchFrance, setIsEmbeddedRematchFrance] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<{
    username: string;
    avatar: string;
    joinDate: string;
    discordId: string;
  } | null>(null);

  // Fetch user data function
  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      const userId = localStorage.getItem("userId");
      if (!userId) return;
      
      const response = await fetch(`https://rematchguidebackend.onrender.com/api/user/data?user_id=${userId}`);
      const data = await response.json() as { user?: { username: string; avatar_url: string; created_at: string; discord_id: string } };
      
      if (data.user) {
        setUserData({
          username: data.user.username,
          avatar: data.user.avatar_url,
          joinDate: data.user.created_at,
          discordId: data.user.discord_id
        });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Check login status function - reusable
  const checkLoginStatus = () => {
    const loginStatus = localStorage.getItem("isLoggedIn")
    const loginTime = localStorage.getItem("loginTime")
    
    // If user has logged in before (loginTime exists)
    if (loginTime && loginStatus === "true") {
      console.log("Login time found:", loginTime)
      console.log("user is logged in")
      
      // Use Date.parse for ISO strings or ensure loginTime is stored as milliseconds
      const loginTimeStamp = Date.parse(loginTime) || parseInt(loginTime)
      const currentTime = Date.now()
      const twoHoursInMs = 24 * 60 * 60 * 1000 // 2 hours in milliseconds
      console.log("Current time:", currentTime)
      console.log("Time difference:", currentTime - loginTimeStamp)
      
      // Check if more than 2 hours have passed since login
      if (currentTime - loginTimeStamp > twoHoursInMs) {
        console.log("Session expired, logging out...")
        // Auto logout if session expired
        localStorage.setItem("isLoggedIn", "false")
        // Reload page to apply logout changes
        window.location.reload()
        return // Exit function early after triggering reload
      }
    }
    
    // Continue with regular login status check
    setIsLoggedIn(loginStatus === "true")
    
    // Fetch user data if logged in
    if (loginStatus === "true") {
      fetchUserData();
    }
  }

  useEffect(() => {
    setMounted(true)

    const storedLang = localStorage.getItem("lang")
    if (storedLang) {
      setLang(storedLang)
    }
    
    // Initial login status check
    checkLoginStatus()

    if (window.top !== window.self) {

      setIsEmbedded(true);
      
      try {
        // Try to get the URL of the parent (embedding) page
        const embedderURL = document.referrer;
        console.log("Page is embedded in an iframe by:", embedderURL);
        
        // Check if the embedder is specifically rematchfrance.fr
        if (embedderURL && embedderURL.includes("rematchfrance.fr")) {
          console.log("Embedded specifically on rematchfrance.fr");
          setIsEmbeddedRematchFrance(true);
        } else {
          setIsEmbeddedRematchFrance(false);
        }
      } catch (error) {
        // If we can't access parent information due to same-origin policy
        console.log("Page is embedded in an iframe but cannot determine embedder due to security restrictions");
        setIsEmbeddedRematchFrance(false);
      }
    } else {
      setIsEmbedded(false);
      setIsEmbeddedRematchFrance(false);
      console.log("Page is not embedded.");
    }

    // Add event listener for clicks outside the dropdown
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !(dropdownRef.current as HTMLElement).contains(event.target as Node)) {
      setDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Add this effect to check login status on route changes
  useEffect(() => {
    // Check login status again when pathname changes
    checkLoginStatus()
  }, [pathname])

  const toggleLang = () => {
    const newLang = lang === "fr" ? "en" : "fr"
    setLang(newLang)
    localStorage.setItem("lang", newLang)
    window.location.reload()
  }

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  // Guide dropdown routes
  const guideRoutes = [
    { href: "/tir", label: lang === "fr" ? "Tir" : "Shoot" },
    { href: "/defense", label: lang === "fr" ? "Défense" : "Defense" },
    { href: "/dribles", label: lang === "fr" ? "Dribles" : "Dribbles" },
    { href: "/gardien", label: lang === "fr" ? "Gardien" : "Goalkeeper" },
    { href: "/strategie", label: lang === "fr" ? "Stratégie" : "Strategy" },
  ]

  // Main routes (excluding the ones in the dropdown)
  const mainRoutes = [
    // Removing Home link as users can click on the title
    { href: "/TacticalBoard", label: lang === "fr" ? "Tableau Tactique" : "Tactical Board" },
  ]
  
  // Add Routines link only if not embedded in RematchFrance
  if (!isEmbeddedRematchFrance) {
    mainRoutes.unshift({ href: "/Routines", label: lang === "fr" ? "Routines" : "Routines" });
  }
  
  // Add Scrim Finder link only if not embedded in RematchFrance
  if (!isEmbeddedRematchFrance) {
    mainRoutes.push({ href: "/scrim", label: lang === "fr" ? "Recherche de Scrims" : "Scrim Finder" });
  }
  
  // Add donate link only if not embedded
  if (!isEmbeddedRematchFrance) {
    mainRoutes.push({ href: "/donate", label: lang === "fr" ? "Soutiens-moi" : "Support me" })
  }

  // Add login link if user is not logged in and site is not embedded in RematchFrance
  if (!isLoggedIn && !isEmbeddedRematchFrance) {
    mainRoutes.push({ href: "/login", label: lang === "fr" ? "Connexion" : "Login" })
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center space-x-2">
          {!isEmbeddedRematchFrance && (
            <img src="/assets/favicon-32x32.png" alt="" />
          )}
          <span className="font-bold">
            {lang === "fr" ? "Maîtrisez Rematch" : "Master Rematch"}
          </span>
        </Link>

        <nav className="hidden md:flex ml-auto items-center space-x-6 text-sm font-medium">

          {/* Guide Dropdown Menu */}
          <div 
            className="relative"
            ref={dropdownRef}
          >
            <button
              onClick={() => !isEmbeddedRematchFrance && (window.location.href = "/tir")}
              onMouseEnter={() => setDropdownOpen(true)}
              className="flex items-center transition-colors hover:text-foreground/80 text-foreground/60 bg-transparent border-none cursor-pointer"
            >
              {lang === "fr" ? "Guide" : "Guide"}
              <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            
            {dropdownOpen && (
              <div 
                className="absolute left-0 top-full mt-2 w-48 rounded-md bg-background shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <div className="py-1">
                  {guideRoutes.map((route) => (
                    <Link
                      key={route.href}
                      href={route.href}
                      className="block px-4 py-2 text-sm hover:bg-accent"
                    >
                      {route.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Render all main routes (no longer need to skip Home) */}
          {mainRoutes.map((route) => (
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

          {!isEmbeddedRematchFrance && mounted && (
            <Button variant="ghost" onClick={toggleLang}>
              {lang === "fr" ? "🇬🇧 English" : "🇫🇷 Français"}
            </Button>
          )}
          
          {/* User Profile Avatar Button */}
          {!isEmbeddedRematchFrance && isLoggedIn && userData && (
            <Link href="/profile">
              <Button 
                variant="ghost" 
                className="p-0 h-8 w-8 rounded-full overflow-hidden"
                aria-label="Profile"
              >
                {userData.avatar ? (
                  <img 
                    src={userData.avatar} 
                    alt={userData.username} 
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full bg-primary/10 flex items-center justify-center text-xs font-medium">
                    {userData.username?.charAt(0).toUpperCase() || 'U'}
                  </div>
                )}
              </Button>
            </Link>
          )}
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
              {/* Removed Home link from mobile menu too */}
              
              {/* Guide section in mobile menu */}
              <div>
                <Link 
                  href="/tir" 
                  className="text-lg font-medium flex items-center justify-between"
                  onClick={() => setIsOpen(false)}
                >
                  {lang === "fr" ? "Guide" : "Guide"}
                </Link>
                <div className="ml-4 mt-2 space-y-2">
                  {guideRoutes.map((route) => (
                    <Link
                      key={route.href}
                      href={route.href}
                      className="block text-sm"
                      onClick={() => setIsOpen(false)}
                    >
                      {route.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Render all main routes (no longer need to skip Home) */}
              {mainRoutes.map((route) => (
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

              {!isEmbeddedRematchFrance && (
                <Button variant="ghost" onClick={toggleLang}>
                  {lang === "fr" ? "🇬🇧 English" : "🇫🇷 Français"}
                </Button>
              )}

              {/* Add user profile link to mobile menu */}
              {!isEmbeddedRematchFrance && isLoggedIn && userData && (
                <Link
                  href="/profile"
                  className="text-lg font-medium flex items-center space-x-2"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="h-6 w-6 rounded-full overflow-hidden">
                    {userData.avatar ? (
                      <img 
                        src={userData.avatar} 
                        alt={userData.username} 
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-primary/10 flex items-center justify-center text-xs font-medium">
                        {userData.username?.charAt(0).toUpperCase() || 'U'}
                      </div>
                    )}
                  </div>
                  <span>{lang === "fr" ? "Profil" : "Profile"}</span>
                </Link>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}