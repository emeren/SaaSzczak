import { cn } from '#/lib/utils'

export const IntegrationsMenuStyles = {
  Details: cn('relative w-full sm:w-auto'),
  Summary: cn(
    'list-none cursor-pointer border-b-2 border-transparent pb-0.5 text-muted-foreground transition-colors hover:text-foreground',
  ),
  Menu: cn(
    'mt-2 min-w-56 rounded-xl border border-border bg-popover p-2 shadow-lg sm:absolute sm:right-0',
  ),
  Link: cn(
    'block rounded-lg px-3 py-2 text-sm text-muted-foreground no-underline transition hover:bg-accent hover:text-accent-foreground',
  ),
} as const
