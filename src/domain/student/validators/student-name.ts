
export class StudentName {
  constructor(readonly value: string) {
    if (!value.trim()) throw new Error("Name cannot be empty")
  }

  equals(other: StudentName): boolean {
    return this.value === other.value
  }
}
