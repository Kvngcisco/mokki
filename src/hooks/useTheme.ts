import { useEffect, useState } from 'react'

type Theme = 'dark' | 'light'

// Module-level singleton so every component (navbar, hero, footer) sees the
// same theme state and toggles propagate instantly without a page refresh.
let currentTheme: Theme = 'dark'
let initialized = false
const listeners = new Set<(t: Theme) => void>()

function init() {
  if (initialized || typeof window === 'undefined') return
  initialized = true
  const stored = localStorage.getItem('mokki-theme') as Theme | null
  currentTheme = stored ?? (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark')
  apply(currentTheme)
}

function apply(t: Theme) {
  const root = document.documentElement
  root.classList.toggle('dark', t === 'dark')
  root.classList.toggle('light', t === 'light')
}

function setTheme(next: Theme) {
  currentTheme = next
  apply(next)
  localStorage.setItem('mokki-theme', next)
  listeners.forEach(l => l(next))
}

export function useTheme() {
  const [theme, setLocal] = useState<Theme>(currentTheme)

  useEffect(() => {
    init()
    setLocal(currentTheme)
    const l = (t: Theme) => setLocal(t)
    listeners.add(l)
    return () => { listeners.delete(l) }
  }, [])

  const toggle = () => setTheme(theme === 'dark' ? 'light' : 'dark')

  return { theme, toggle }
}
