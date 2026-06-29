'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'

export type Theme = 'default' | 'escuro' | 'claro' | 'azul' | 'verde' | 'roxo'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('default')

  useEffect(() => {
    // Load theme from localStorage on client side mount
    const savedTheme = localStorage.getItem('theme') as Theme
    console.log('ThemeProvider: loaded theme from localStorage:', savedTheme)
    if (savedTheme) {
      setThemeState(savedTheme)
      if (savedTheme === 'default') {
        document.documentElement.removeAttribute('data-theme')
        document.body.removeAttribute('data-theme')
      } else {
        document.documentElement.setAttribute('data-theme', savedTheme)
        document.body.setAttribute('data-theme', savedTheme)
      }
    }
  }, [])

  const setTheme = (newTheme: Theme) => {
    console.log('ThemeProvider: setting new theme:', newTheme)
    setThemeState(newTheme)
    localStorage.setItem('theme', newTheme)
    if (newTheme === 'default') {
      document.documentElement.removeAttribute('data-theme')
      document.body.removeAttribute('data-theme')
    } else {
      document.documentElement.setAttribute('data-theme', newTheme)
      document.body.setAttribute('data-theme', newTheme)
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
