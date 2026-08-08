import { cn } from '#/lib/utils'

export const HeaderStyles = {
  Root: cn(
    'sticky top-0 z-50 border-b border-border bg-background/80 px-4 backdrop-blur-lg',
  ),
  Nav: cn(
    'mx-auto flex w-[min(1080px,calc(100%-2rem))] flex-wrap items-center gap-x-3 gap-y-2 py-3 sm:py-4',
  ),
  Actions: cn('ml-auto flex items-center gap-1.5 sm:gap-2'),
} as const
