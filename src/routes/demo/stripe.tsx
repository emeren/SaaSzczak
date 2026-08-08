import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { authClient } from '#/lib/auth-client'

export const Route = createFileRoute('/demo/stripe')({
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
    <main className="demo-page demo-center">
      <section className="demo-panel w-full max-w-md">
        <p className="island-kicker mb-2">Billing</p>
        <h1 className="demo-title">Stripe Checkout Demo</h1>
        <p className="demo-muted mt-2 mb-6 text-sm">
          Set <code>STRIPE_SECRET_KEY</code>, <code>STRIPE_WEBHOOK_SECRET</code>{' '}
          and <code>VITE_STRIPE_PRICE_ID</code> in <code>.env.local</code>, then
          run{' '}
          <code>
            stripe listen --forward-to localhost:3000/api/stripe-webhook
          </code>{' '}
          locally to receive webhook events.
        </p>

        {!session?.user ? (
          <p className="demo-alert demo-alert-danger text-sm">
            Sign in first at <code>/demo/better-auth</code>.
          </p>
        ) : (
          <button
            onClick={handleCheckout}
            disabled={loading}
            className="demo-button w-full"
          >
            {loading ? 'Redirecting...' : 'Subscribe'}
          </button>
        )}

        {error && (
          <div className="demo-alert demo-alert-danger mt-4">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
      </section>
    </main>
  )
}
