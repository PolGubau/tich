import { isValidEmail } from "./isValidEmail"


describe('isValidEmail', () => {
  it('should return true for valid email', () => {
    expect(isValidEmail('test@example.com')).toBe(true)
  })

  it('should return false for invalid email', () => {
    expect(isValidEmail('invalid-email')).toBe(false)
  })
})