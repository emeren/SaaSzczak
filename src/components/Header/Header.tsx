import { memo } from 'react'
import { BetterAuthHeader } from '#/integrations/better-auth/BetterAuthHeader/BetterAuthHeader'
import { ThemeToggle } from '#/components/ThemeToggle/ThemeToggle'
import { HeaderStyles as styles } from './Header.styles'
import type { HeaderProps } from './Header.types'
import { Logo } from './Logo/Logo'
import { Navigation } from './Navigation/Navigation'

export const Header = memo<HeaderProps>(() => {
  return (
    <header className={styles.Root}>
      <nav className={styles.Nav}>
        <Logo />

        <Navigation />

        <div className={styles.Actions}>
          <BetterAuthHeader />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
})

Header.displayName = 'Header'
