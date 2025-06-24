export class Id {
  constructor(readonly value: number) {
    if (!value) throw new Error("Id cannot be empty")
  }

  equals(other: Id): boolean {
    return this.value === other.value
  }
}