import { describe, expect, it } from 'vitest'
import type Stripe from 'stripe'
import { buildSubscriptionValues } from './stripe-subscription'

function makeSubscription(
  items: Stripe.Subscription['items'],
): Stripe.Subscription {
  return {
    id: 'sub_123',
    customer: 'cus_123',
    status: 'active',
    metadata: { userId: 'user_1' },
    items,
  } as unknown as Stripe.Subscription
}

describe('buildSubscriptionValues', () => {
  it('converts current_period_end from unix seconds to a Date', () => {
    const sub = makeSubscription({
      data: [
        {
          price: { id: 'price_1' },
          current_period_end: 1700000000,
        },
      ],
    } as unknown as Stripe.Subscription['items'])

    const values = buildSubscriptionValues(sub)

    expect(values.stripePriceId).toBe('price_1')
    expect(values.currentPeriodEnd).toEqual(new Date(1700000000 * 1000))
  })

  it('falls back to null instead of crashing when items.data is empty', () => {
    const sub = makeSubscription({
      data: [],
    } as unknown as Stripe.Subscription['items'])

    const values = buildSubscriptionValues(sub)

    expect(values.stripePriceId).toBeUndefined()
    expect(values.currentPeriodEnd).toBeNull()
  })

  it('throws when subscription has no userId in metadata', () => {
    const sub = {
      ...makeSubscription({
        data: [{ price: { id: 'price_1' }, current_period_end: 1700000000 }],
      } as unknown as Stripe.Subscription['items']),
      metadata: {},
    } as unknown as Stripe.Subscription

    expect(() => buildSubscriptionValues(sub)).toThrow(
      'Subscription is missing userId in metadata',
    )
  })
})
