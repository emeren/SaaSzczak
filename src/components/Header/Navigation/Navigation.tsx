import { memo } from 'react'
import { IntegrationsMenu } from './IntegrationsMenu/IntegrationsMenu'
import { NAV_LINKS } from './Navigation.consts'
import { NavigationStyles as styles } from './Navigation.styles'
import { NavLink } from './NavLink/NavLink'
import type { NavigationProps } from './Navigation.types'

export const Navigation = memo<NavigationProps>(() => {
  return (
    <div className={styles.Root}>
      {NAV_LINKS.map((link) => (
        <NavLink key={link.to} to={link.to} external={link.external}>
          {link.label}
        </NavLink>
      ))}
      <IntegrationsMenu />
    </div>
  )
})

Navigation.displayName = 'Navigation'
