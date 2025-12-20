import { describe, it, expect } from 'vitest'
import { formatDate } from '../utils/format'

describe('formatDate', () => {
  it('formats a date string', () => {
    expect(formatDate('2020-01-01')).toBe(new Date('2020-01-01').toLocaleDateString())
  })
})
