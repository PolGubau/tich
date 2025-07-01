export const formatCurrency = (value: number, currency: string = "EUR"): string => {
  const formatter = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    currencyDisplay: "symbol",
    useGrouping: true,
    notation: "standard",
    signDisplay: "auto",
    compactDisplay: "short",
    unit: "currency",
    unitDisplay: "short",
    roundingPriority: "morePrecision",
  });
  return formatter.format(value);
}
