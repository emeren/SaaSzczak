import { createFileRoute } from '@tanstack/react-router'
import { auth } from '#/lib/auth'
import { stripe } from '#/lib/stripe'

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

        const { priceId } = (await request.json()) as { priceId: string }
        const origin = new URL(request.url).origin

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
      },
    },
  },
})
