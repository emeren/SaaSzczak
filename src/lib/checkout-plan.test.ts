import { describe, expect, it } from 'vitest'
import { isPlan, resolvePriceId } from './checkout-plan'

describe('isPlan', () => {
  it('accepts monthly and yearly', () => {
    expect(isPlan('monthly')).toBe(true)
    expect(isPlan('yearly')).toBe(true)
  })

  it('rejects anything that is not an exact known plan', () => {
    expect(isPlan('bogus')).toBe(false)
    expect(isPlan('Monthly')).toBe(false)
    expect(isPlan(undefined)).toBe(false)
    expect(isPlan(null)).toBe(false)
    expect(isPlan(123)).toBe(false)
    expect(isPlan({ toString: () => 'monthly' })).toBe(false)
  })
})

describe('resolvePriceId', () => {
  it('returns a string for each known plan', () => {
    expect(typeof resolvePriceId('monthly')).toBe('string')
    expect(typeof resolvePriceId('yearly')).toBe('string')
  })

  it('returns distinct price ids for monthly and yearly', () => {
    expect(resolvePriceId('monthly')).not.toBe(resolvePriceId('yearly'))
  })
})
