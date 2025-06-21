import { isValidEmail } from "~/shared/validators/isValidEmail"

export class StudentEmail {
  constructor(readonly value: string) {
    const isValid = isValidEmail(value)
    if (!isValid) throw new Error("Invalid email format")
  }

  isEqual(other: StudentEmail): boolean {
    return this.value === other.value
  }
}
