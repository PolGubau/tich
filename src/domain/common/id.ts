


export class Id {
  constructor(readonly value: number) {
    if (value == null) throw new Error(`Id cannot be empty (${value} provided)`)
  }

  /**
   * Compares this Id with another one.
   * @param other The other Id to compare with.
   * @returns Whether both IDs are equal.
   */
  equals(other: Id): boolean {
    return this.value === other.value
  }

  equalsValue(value: number): boolean {
    return this.value === value
  }

  /**
   * Converts the Id to string.
   * @returns The string representation of the Id.
   */
  toString(): string {
    return this.value.toString();
  }

}
