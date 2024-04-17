"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

// import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <button
      variant="ghost"
      size="icon"
      className="bg-white"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Sun className="h-[1.5rem] w-[1.3rem] dark:hidden fill-slate-200 dark:fill-slate-900" />
      <Moon className="hidden h-5 w-5 dark:block fill-slate-200 dark:fill-slate-900" />
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}