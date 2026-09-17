import React, { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()
const THEME_KEY = 'snitch-theme'

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Priority 1: Explicit Snitch preference in localStorage
    try {
      const saved = localStorage.getItem(THEME_KEY) || localStorage.getItem('snitch_theme')
      if (saved === 'dark' || saved === 'light') return saved
    } catch (e) {}

    // Priority 2: System preference
    if (typeof window !== 'undefined' && window.matchMedia) {
      try {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          return 'dark'
        }
      } catch (e) {}
    }

    // Priority 3: Light mode fallback
    return 'light'
  })

  // Synchronize <html> class and localStorage
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    try {
      localStorage.setItem(THEME_KEY, theme)
    } catch (e) {}
  }, [theme])

  // Listen to system preference changes if user hasn't explicitly set a preference
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e) => {
      // Only switch automatically if no explicit user preference is saved
      const saved = localStorage.getItem(THEME_KEY) || localStorage.getItem('snitch_theme')
      if (!saved) {
        setTheme(e.matches ? 'dark' : 'light')
      }
    }

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange)
      return () => mediaQuery.removeListener(handleChange)
    }
  }, [])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  return (
    <ThemeContext.Provider value={{ theme, isDark: theme === 'dark', toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
