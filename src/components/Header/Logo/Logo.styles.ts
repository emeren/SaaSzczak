import { cn } from '#/lib/utils'

export const LogoStyles = {
  LogoHeading: cn('m-0 flex-shrink-0 text-base font-semibold tracking-tight'),
  LogoLink: cn(
    'inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-sm text-foreground no-underline shadow-sm sm:px-4 sm:py-2',
  ),
  LogoDot: cn('h-2 w-2 rounded-full bg-primary'),
} as const
