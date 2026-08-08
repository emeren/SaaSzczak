import { memo, useEffect, useState } from 'react'
import {
  applyThemeMode,
  getInitialMode,
  getNextThemeMode,
  getThemeToggleLabel,
} from './ThemeToggle.utils'
import { ThemeToggleStyles as styles } from './ThemeToggle.styles'
import type { ThemeMode, ThemeToggleProps } from './ThemeToggle.types'

export const ThemeToggle = memo<ThemeToggleProps>(() => {
  const [mode, setMode] = useState<ThemeMode>('auto')

  useEffect(() => {
    const initialMode = getInitialMode()
    setMode(initialMode)
    applyThemeMode(initialMode)
  }, [])

  useEffect(() => {
    if (mode !== 'auto') {
      return
    }

    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => applyThemeMode('auto')

    media.addEventListener('change', onChange)
    return () => {
      media.removeEventListener('change', onChange)
    }
  }, [mode])

  const handleToggle = () => {
    const nextMode = getNextThemeMode(mode)
    setMode(nextMode)
    applyThemeMode(nextMode)
    window.localStorage.setItem('theme', nextMode)
  }

  const label = getThemeToggleLabel(mode)

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={label}
      title={label}
      className={styles.Button}
    >
      {mode === 'auto' ? 'Auto' : mode === 'dark' ? 'Dark' : 'Light'}
    </button>
  )
})

ThemeToggle.displayName = 'ThemeToggle'
