import { cn } from '#/lib/utils'

export const FooterStyles = {
  Root: cn(
    'mt-20 border-t border-border px-4 pb-14 pt-10 text-muted-foreground',
  ),
  Inner: cn(
    'mx-auto flex w-[min(1080px,calc(100%-2rem))] flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left',
  ),
  Copyright: cn('m-0 text-sm'),
  Kicker: cn('m-0 text-xs font-bold uppercase tracking-widest text-primary'),
  Socials: cn('mt-4 flex justify-center gap-4'),
  SocialLink: cn(
    'rounded-xl p-2 text-muted-foreground transition hover:bg-accent hover:text-accent-foreground',
  ),
} as const
