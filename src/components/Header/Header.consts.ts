import { HeaderStyles } from './Header.styles'
import type { HeaderDemoLink } from './Header.types'

export const DEMO_LINKS: Array<HeaderDemoLink> = [
  { href: '/demo/drizzle', label: 'Drizzle' },
  { href: '/demo/better-auth', label: 'Better Auth' },
  { href: '/demo/posthog', label: 'PostHog' },
  { href: '/demo/sentry/testing', label: 'Sentry' },
]

export const NAV_LINK_ACTIVE_PROPS = { className: HeaderStyles.NavLinkActive }
