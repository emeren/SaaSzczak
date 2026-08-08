import { memo } from 'react'
import { INTEGRATION_LINKS } from './IntegrationsMenu.consts'
import { useCloseDetailsOnOutsideClick } from './IntegrationsMenu.hooks'
import { IntegrationsMenuStyles as styles } from './IntegrationsMenu.styles'

export const IntegrationsMenu = memo(() => {
  const detailsRef = useCloseDetailsOnOutsideClick()

  return (
    <details ref={detailsRef} className={styles.Details}>
      <summary className={styles.Summary}>Integrations</summary>
      <div className={styles.Menu}>
        {INTEGRATION_LINKS.map((link) => (
          <a key={link.href} href={link.href} className={styles.Link}>
            {link.label}
          </a>
        ))}
      </div>
    </details>
  )
})

IntegrationsMenu.displayName = 'IntegrationsMenu'
