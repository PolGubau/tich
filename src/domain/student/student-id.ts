export class StudentId {
  constructor(readonly value: string) {
    if (!value?.trim()) throw new Error("StudentId cannot be empty")
  }

  isEqual(other: StudentId): boolean {
    return this.value === other.value
  }
}