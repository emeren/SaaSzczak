import { Link } from '@tanstack/react-router'
import { memo } from 'react'
import { NAV_LINK_ACTIVE_PROPS } from './NavLink.consts'
import { NavLinkStyles as styles } from './NavLink.styles'
import type { NavLinkProps } from './NavLink.types'

export const NavLink = memo<NavLinkProps>(({ to, external, children }) => {
  if (external) {
    return (
      <a href={to} className={styles.Link} target="_blank" rel="noreferrer">
        {children}
      </a>
    )
  }

  return (
    <Link to={to} className={styles.Link} activeProps={NAV_LINK_ACTIVE_PROPS}>
      {children}
    </Link>
  )
})

NavLink.displayName = 'NavLink'
