import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { authClient } from '#/lib/auth-client'
import { Button } from '#/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '#/components/ui/card'
import { Alert, AlertDescription } from '#/components/ui/alert'

export const Route = createFileRoute('/integrations/stripe')({
  component: DemoStripe,
})

function DemoStripe() {
  const { data: session } = authClient.useSession()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleCheckout = async () => {
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId: import.meta.env.VITE_STRIPE_PRICE_ID }),
      })
      if (!res.ok) throw new Error(await res.text())
      const { url } = (await res.json()) as { url: string }
      window.location.href = url
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Checkout failed')
      setLoading(false)
    }
  }

  return (
    <main className="mx-auto flex min-h-[70vh] w-[min(1080px,calc(100%-2rem))] items-center justify-center px-4 py-14">
      <Card className="w-full max-w-md rounded-2xl">
        <CardHeader>
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-primary">
            Billing
          </p>
          <CardTitle className="font-serif text-2xl">
            Stripe Checkout Demo
          </CardTitle>
          <CardDescription>
            Set{' '}
            <code className="rounded border border-border bg-muted px-1.5 py-0.5 text-[0.9em]">
              STRIPE_SECRET_KEY
            </code>
            ,{' '}
            <code className="rounded border border-border bg-muted px-1.5 py-0.5 text-[0.9em]">
              STRIPE_WEBHOOK_SECRET
            </code>{' '}
            and{' '}
            <code className="rounded border border-border bg-muted px-1.5 py-0.5 text-[0.9em]">
              VITE_STRIPE_PRICE_ID
            </code>{' '}
            in{' '}
            <code className="rounded border border-border bg-muted px-1.5 py-0.5 text-[0.9em]">
              .env.local
            </code>
            , then run{' '}
            <code className="rounded border border-border bg-muted px-1.5 py-0.5 text-[0.9em]">
              stripe listen --forward-to localhost:3000/api/stripe-webhook
            </code>{' '}
            locally to receive webhook events.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {!session?.user ? (
            <Alert variant="destructive">
              <AlertDescription>
                Sign in first at{' '}
                <code className="rounded border border-border bg-muted px-1.5 py-0.5 text-[0.9em]">
                  /integrations/better-auth
                </code>
                .
              </AlertDescription>
            </Alert>
          ) : (
            <Button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Redirecting...' : 'Subscribe'}
            </Button>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </main>
  )
}
