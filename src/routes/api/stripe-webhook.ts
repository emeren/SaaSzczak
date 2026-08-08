import { createFileRoute } from '@tanstack/react-router'
import { eq } from 'drizzle-orm'
import type Stripe from 'stripe'
import { db } from '#/db/index'
import { subscriptions } from '#/db/schema'
import { stripe } from '#/lib/stripe'

async function upsertSubscription(sub: Stripe.Subscription) {
  const userId = sub.metadata.userId
  if (!userId) return

  const existing = await db.query.subscriptions.findFirst({
    where: eq(subscriptions.stripeSubscriptionId, sub.id),
  })

  const values = {
    userId,
    stripeCustomerId: sub.customer as string,
    stripeSubscriptionId: sub.id,
    stripePriceId: sub.items.data[0]?.price.id,
    status: sub.status,
    currentPeriodEnd: sub.items.data[0]?.current_period_end
      ? new Date(sub.items.data[0].current_period_end * 1000)
      : null,
    updatedAt: new Date(),
  }

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

        let event: Stripe.Event
        try {
          event = stripe.webhooks.constructEvent(
            body,
            signature!,
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
