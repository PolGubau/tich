import { formatCurrency } from "~/shared/utils/numbers/format-currency";

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
    return formatCurrency(this._value, this._currency);
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