import { Link } from '@tanstack/react-router'
import { memo } from 'react'
import { authClient } from '#/lib/auth-client'
import { BetterAuthHeaderStyles as styles } from './BetterAuthHeader.styles'
import type { BetterAuthHeaderProps } from './BetterAuthHeader.types'

export const BetterAuthHeader = memo<BetterAuthHeaderProps>(() => {
  const { data: session, isPending } = authClient.useSession()

  if (isPending) {
    return <div className={styles.AvatarPlaceholder} />
  }

  if (session?.user) {
    return (
      <div className={styles.AuthedWrap}>
        {session.user.image ? (
          <img src={session.user.image} alt="" className={styles.AvatarImage} />
        ) : (
          <div className={styles.AvatarFallback}>
            <span className={styles.AvatarInitial}>
              {session.user.name.charAt(0).toUpperCase() || 'U'}
            </span>
          </div>
        )}
        <button
          onClick={() => {
            void authClient.signOut()
          }}
          className={styles.SignOutButton}
        >
          Sign out
        </button>
      </div>
    )
  }

  return (
    <Link to="/integrations/better-auth" className={styles.SignInLink}>
      Sign in
    </Link>
  )
})

BetterAuthHeader.displayName = 'BetterAuthHeader'
