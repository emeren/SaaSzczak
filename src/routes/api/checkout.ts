import { createFileRoute } from '@tanstack/react-router'
import { auth } from '#/lib/auth'
import { stripe } from '#/lib/stripe'

const PRICE_IDS = {
  monthly: process.env.STRIPE_PRICE_ID_MONTHLY,
  yearly: process.env.STRIPE_PRICE_ID_YEARLY,
} as const

type Plan = keyof typeof PRICE_IDS

function isPlan(value: unknown): value is Plan {
  return value === 'monthly' || value === 'yearly'
}

export const Route = createFileRoute('/api/checkout')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const session = await auth.api.getSession({
          headers: request.headers,
        })
        if (!session?.user) {
          return new Response('Unauthorized', { status: 401 })
        }

        const body = (await request.json()) as { plan?: unknown }
        if (!isPlan(body.plan)) {
          return new Response('Invalid plan', { status: 400 })
        }

        const priceId = PRICE_IDS[body.plan]
        if (!priceId) {
          return new Response('Plan not configured', { status: 500 })
        }

        const origin = new URL(request.url).origin

        try {
          const checkoutSession = await stripe.checkout.sessions.create({
            mode: 'subscription',
            line_items: [{ price: priceId, quantity: 1 }],
            success_url: `${origin}/?checkout=success`,
            cancel_url: `${origin}/?checkout=cancelled`,
            customer_email: session.user.email,
            client_reference_id: session.user.id,
            subscription_data: {
              metadata: { userId: session.user.id },
            },
          })

          return new Response(JSON.stringify({ url: checkoutSession.url }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          })
        } catch (err) {
          console.error('Stripe checkout session creation failed:', err)
          return new Response('Checkout failed', { status: 502 })
        }
      },
    },
  },
})
