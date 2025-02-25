"use client"

import Link from "next/link"
import { useTheme } from "next-themes"
import { Button } from "./ui/button"
import { Moon, Sun, Navigation2 } from "lucide-react"

export default function Header() {
  const { theme, setTheme } = useTheme()

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Navigation2 className="h-8 w-8 text-purple-600 rotate-45" />
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">
            PathFinderAI
          </span>
        </Link>
        <nav className="space-x-4 flex items-center">
          <Link href="/jobs" className="hover:text-purple-600 transition-colors">Jobs</Link>
          <Link href="/courses" className="hover:text-purple-600 transition-colors">Courses</Link>
          <Link href="/skills" className="hover:text-purple-600 transition-colors">Skills</Link>
          <Link href="/progress" className="hover:text-purple-600 transition-colors">Progress</Link>
          <Link href="/mentorship" className="hover:text-purple-600 transition-colors">Mentorship</Link>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="hover:text-purple-600"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Link 
            href="/login" 
            className="ml-4 px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors"
          >
            Login
          </Link>
        </nav>
      </div>
    </header>
  )
}
