const PRICE_IDS = {
  monthly: process.env.STRIPE_PRICE_ID_MONTHLY,
  yearly: process.env.STRIPE_PRICE_ID_YEARLY,
} as const

export type Plan = keyof typeof PRICE_IDS

export function isPlan(value: unknown): value is Plan {
  return value === 'monthly' || value === 'yearly'
}

export function resolvePriceId(plan: Plan): string | undefined {
  return PRICE_IDS[plan]
}
