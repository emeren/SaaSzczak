import type { ThemeMode } from './ThemeToggle.types'

export const getInitialMode = (): ThemeMode => {
  if (typeof window === 'undefined') {
    return 'auto'
  }

  const stored = window.localStorage.getItem('theme')
  if (stored === 'light' || stored === 'dark' || stored === 'auto') {
    return stored
  }

  return 'auto'
}

export const applyThemeMode = (mode: ThemeMode) => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const resolved = mode === 'auto' ? (prefersDark ? 'dark' : 'light') : mode

  document.documentElement.classList.remove('light', 'dark')
  document.documentElement.classList.add(resolved)

  if (mode === 'auto') {
    document.documentElement.removeAttribute('data-theme')
  } else {
    document.documentElement.setAttribute('data-theme', mode)
  }

  document.documentElement.style.colorScheme = resolved
}

export const getNextThemeMode = (mode: ThemeMode): ThemeMode =>
  mode === 'light' ? 'dark' : mode === 'dark' ? 'auto' : 'light'

export const getThemeToggleLabel = (mode: ThemeMode): string =>
  mode === 'auto'
    ? 'Theme mode: auto (system). Click to switch to light mode.'
    : `Theme mode: ${mode}. Click to switch mode.`
