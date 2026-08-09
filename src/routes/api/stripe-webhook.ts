import { createFileRoute } from '@tanstack/react-router'
import { eq } from 'drizzle-orm'
import type Stripe from 'stripe'
import { db } from '#/db/index'
import { subscriptions } from '#/db/schema'
import { stripe } from '#/lib/stripe'
import { buildSubscriptionValues } from '#/lib/stripe-subscription'

async function upsertSubscription(sub: Stripe.Subscription) {
  if (!sub.metadata.userId) return

  const existing = await db.query.subscriptions.findFirst({
    where: eq(subscriptions.stripeSubscriptionId, sub.id),
  })

  const values = buildSubscriptionValues(sub)

  if (existing) {
    await db
      .update(subscriptions)
      .set(values)
      .where(eq(subscriptions.stripeSubscriptionId, sub.id))
  } else {
    await db.insert(subscriptions).values(values)
  }
}

export const Route = createFileRoute('/api/stripe-webhook')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = await request.text()
        const signature = request.headers.get('stripe-signature')

        if (!signature) {
          return new Response('Missing stripe-signature header', { status: 400 })
        }

        let event: Stripe.Event
        try {
          event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!,
          )
        } catch (err) {
          console.error('Stripe webhook signature verification failed:', err)
          return new Response('Invalid signature', { status: 400 })
        }

        switch (event.type) {
          case 'checkout.session.completed': {
            const session = event.data.object
            if (session.subscription) {
              const sub = await stripe.subscriptions.retrieve(
                session.subscription as string,
              )
              await upsertSubscription(sub)
            }
            break
          }
          case 'customer.subscription.updated':
          case 'customer.subscription.deleted': {
            const sub = event.data.object
            await upsertSubscription(sub)
            break
          }
        }

        return new Response(JSON.stringify({ received: true }), {
          status: 200,
        })
      },
    },
  },
})
