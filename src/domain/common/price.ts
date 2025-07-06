import { CurrencyCode, PricePrimitive } from "../class/types";

export class Price {
  constructor(
    readonly _value: number,
    readonly _currency: CurrencyCode = "EUR"

  ) {
    if (!_value) throw new Error("Price cannot be empty");
  }

  get value(): number {
    return this._value;
  }
  get currency(): CurrencyCode {
    return this._currency;
  }

  equals(other: Price): boolean {
    return this._value === other._value && this._currency === other._currency;
  }
  toPrimitive(): PricePrimitive {
    return {
      value: this._value,
      currency: this._currency
    };
  }
}