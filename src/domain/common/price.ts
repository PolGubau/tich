export class Price {
  constructor(
    readonly _value: number,
    readonly _currency: string = "EUR"

  ) {
    if (!_value) throw new Error("Price cannot be empty");
  }

  get value(): number {
    return this._value;
  }
  get currency(): string {
    return this._currency;
  }

  get formattedValue(): string {
    const formatter = new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: this._currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    return formatter.format(this._value);
  }
  
  equals(other: Price): boolean {
    return this._value === other._value && this._currency === other._currency;
  }
  toPrimitive(): { value: number; currency: string } {
    return {
      value: this._value,
      currency: this._currency
    };
  }
}