import { Link } from '@tanstack/react-router'
import { LogoStyles as styles } from './Logo.styles'
import { memo } from 'react'

export const Logo = memo(() => {
  return (
    <h2 className={styles.LogoHeading}>
      <Link to="/" className={styles.LogoLink}>
        <span className={styles.LogoDot} />
        SaaSzczak
      </Link>
    </h2>
  )
})

Logo.displayName = 'Logo'
