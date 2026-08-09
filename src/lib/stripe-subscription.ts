import type Stripe from 'stripe'

export function buildSubscriptionValues(sub: Stripe.Subscription) {
  const userId = sub.metadata.userId
  if (!userId) {
    throw new Error('Subscription is missing userId in metadata')
  }

  return {
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
}
