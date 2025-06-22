export class Id {
  constructor(readonly value: string) {
    if (!value?.trim()) throw new Error("Id cannot be empty")
  }

  equals(other: Id): boolean {
    return this.value === other.value
  }
}