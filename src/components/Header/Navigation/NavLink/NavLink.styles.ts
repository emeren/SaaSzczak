import { cn } from '#/lib/utils'

export const NavLinkStyles = {
  Link: cn(
    'border-b-2 border-transparent pb-0.5 text-muted-foreground no-underline transition-colors hover:text-foreground',
  ),
  LinkActive: cn(
    'border-b-2 border-primary pb-0.5 text-foreground no-underline transition-colors',
  ),
} as const
