import { cn } from '#/lib/utils'

export const ThemeToggleStyles = {
  Button: cn(
    'rounded-full border border-border bg-card px-3 py-1.5 text-sm font-semibold text-foreground shadow-sm transition hover:-translate-y-0.5',
  ),
} as const
