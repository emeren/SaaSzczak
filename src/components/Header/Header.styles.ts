import { cn } from '#/lib/utils'

export const HeaderStyles = {
  Root: cn(
    'sticky top-0 z-50 border-b border-border bg-background/80 px-4 backdrop-blur-lg',
  ),
  Nav: cn(
    'mx-auto flex w-[min(1080px,calc(100%-2rem))] flex-wrap items-center gap-x-3 gap-y-2 py-3 sm:py-4',
  ),
  BrandHeading: cn('m-0 flex-shrink-0 text-base font-semibold tracking-tight'),
  BrandLink: cn(
    'inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-sm text-foreground no-underline shadow-sm sm:px-4 sm:py-2',
  ),
  BrandDot: cn('h-2 w-2 rounded-full bg-primary'),
  NavLinks: cn(
    'order-3 flex w-full flex-wrap items-center gap-x-4 gap-y-1 pb-1 text-sm font-semibold sm:order-none sm:w-auto sm:flex-nowrap sm:pb-0',
  ),
  NavLink: cn(
    'border-b-2 border-transparent pb-0.5 text-muted-foreground no-underline transition-colors hover:text-foreground',
  ),
  NavLinkActive: cn(
    'border-b-2 border-primary pb-0.5 text-foreground no-underline transition-colors',
  ),
  DemosDetails: cn('relative w-full sm:w-auto'),
  DemosSummary: cn(
    'list-none cursor-pointer border-b-2 border-transparent pb-0.5 text-muted-foreground transition-colors hover:text-foreground',
  ),
  DemosMenu: cn(
    'mt-2 min-w-56 rounded-xl border border-border bg-popover p-2 shadow-lg sm:absolute sm:right-0',
  ),
  DemoLink: cn(
    'block rounded-lg px-3 py-2 text-sm text-muted-foreground no-underline transition hover:bg-accent hover:text-accent-foreground',
  ),
  Actions: cn('ml-auto flex items-center gap-1.5 sm:gap-2'),
  IconLink: cn(
    'hidden rounded-xl p-2 text-muted-foreground transition hover:bg-accent hover:text-accent-foreground sm:block',
  ),
} as const
