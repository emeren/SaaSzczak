import { cn } from '#/lib/utils'

export const BetterAuthHeaderStyles = {
  AvatarPlaceholder: cn('h-8 w-8 animate-pulse bg-muted'),
  AuthedWrap: cn('flex items-center gap-2'),
  AvatarImage: cn('h-8 w-8'),
  AvatarFallback: cn('flex h-8 w-8 items-center justify-center bg-muted'),
  AvatarInitial: cn('text-xs font-medium text-muted-foreground'),
  SignOutButton: cn(
    'h-9 flex-1 border border-border bg-card px-4 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground',
  ),
  SignInLink: cn(
    'inline-flex h-9 items-center border border-border bg-card px-4 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground',
  ),
} as const
