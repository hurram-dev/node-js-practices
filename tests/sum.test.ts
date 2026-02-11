import {sum } from './sum'

test('sum of 10 and 5 should be 15', () => {
    const result = sum(10, 5)

    expect(result).toBe(15)
})