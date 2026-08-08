import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { authClient } from '#/lib/auth-client'
import { Button } from '#/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '#/components/ui/card'
import { Input } from '#/components/ui/input'
import { Label } from '#/components/ui/label'
import { Alert, AlertDescription } from '#/components/ui/alert'

export const Route = createFileRoute('/demo/better-auth')({
  component: BetterAuthDemo,
})

function BetterAuthDemo() {
  const { data: session, isPending } = authClient.useSession()
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (isPending) {
    return (
      <main className="mx-auto flex min-h-[70vh] w-[min(1080px,calc(100%-2rem))] items-center justify-center px-4">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-border border-t-primary" />
      </main>
    )
  }

  if (session?.user) {
    return (
      <main className="mx-auto w-[min(1080px,calc(100%-2rem))] flex min-h-[70vh] items-center justify-center px-4 py-14">
        <Card className="w-full max-w-md rounded-2xl">
          <CardHeader>
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-primary">
              Better Auth
            </p>
            <CardTitle className="font-serif text-2xl">Welcome back</CardTitle>
            <CardDescription>
              You're signed in as {session.user.email}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-3">
              {session.user.image ? (
                <img
                  src={session.user.image}
                  alt=""
                  className="h-10 w-10 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                  <span className="text-sm font-medium text-secondary-foreground">
                    {session.user.name.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">
                  {session.user.name}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {session.user.email}
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                void authClient.signOut()
              }}
            >
              Sign out
            </Button>
          </CardContent>
          <CardFooter className="justify-center">
            <p className="text-center text-xs text-muted-foreground">
              Built with{' '}
              <a
                href="https://better-auth.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary underline underline-offset-2 hover:text-primary/80"
              >
                BETTER-AUTH
              </a>
              .
            </p>
          </CardFooter>
        </Card>
      </main>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (isSignUp) {
        const result = await authClient.signUp.email({
          email,
          password,
          name,
        })
        if (result.error) {
          setError(result.error.message || 'Sign up failed')
        }
      } else {
        const result = await authClient.signIn.email({
          email,
          password,
        })
        if (result.error) {
          setError(result.error.message || 'Sign in failed')
        }
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="mx-auto w-[min(1080px,calc(100%-2rem))] flex min-h-[70vh] items-center justify-center px-4 py-14">
      <Card className="w-full max-w-md rounded-2xl">
        <CardHeader>
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-primary">
            Better Auth
          </p>
          <CardTitle className="font-serif text-2xl">
            {isSignUp ? 'Create an account' : 'Sign in'}
          </CardTitle>
          <CardDescription>
            {isSignUp
              ? 'Enter your information to create an account'
              : 'Enter your email below to login to your account'}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            {isSignUp && (
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  <span>Please wait</span>
                </span>
              ) : isSignUp ? (
                'Create account'
              ) : (
                'Sign in'
              )}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <Button
              type="button"
              variant="link"
              size="sm"
              onClick={() => {
                setIsSignUp(!isSignUp)
                setError('')
              }}
            >
              {isSignUp
                ? 'Already have an account? Sign in'
                : "Don't have an account? Sign up"}
            </Button>
          </div>
        </CardContent>

        <CardFooter className="justify-center">
          <p className="text-center text-xs text-muted-foreground">
            Built with{' '}
            <a
              href="https://better-auth.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium"
            >
              BETTER-AUTH
            </a>
            .
          </p>
        </CardFooter>
      </Card>
    </main>
  )
}
