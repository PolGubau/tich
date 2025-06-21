export class StudentId {
  constructor(readonly value: string) {
    if (!value?.trim()) throw new Error("StudentId cannot be empty")
  }

  equals(other: StudentId): boolean {
    return this.value === other.value
  }
}