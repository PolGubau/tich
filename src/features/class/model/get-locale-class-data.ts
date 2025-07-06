import { ClassPrimitive, CurrencyCode } from "~/domain/class/types"
import i18n from "~/shared/i18n/i18n"

export type LocaleClassData = {
  createdDaysAgo: string
  updatedDaysAgo: string
  price: string
  duration: string
}

export function getLocaleClassData(classData: ClassPrimitive | null): LocaleClassData {

  const getDaysAgo = (date: Date): string => {
    const to = new Date();
    const from = date
    return i18n.timeAgoInWords(from, to);
  };

  const createdDaysAgo = classData?.createdAt ? getDaysAgo(classData.createdAt) : i18n.t('unknown')


  const updatedDaysAgo = classData?.updatedAt ? getDaysAgo(classData.updatedAt) : i18n.t('unknown')

  const getMoneyFormat = (value = 0, currencyCode: CurrencyCode): string => {
    const getCurrencySymbol = (code: CurrencyCode): string => {
      switch (code) {
        case "EUR":
          return "€";
        default:
          return "$"; // Default to dollar if no match
      }
    };
    return i18n.numberToCurrency(value, { unit: getCurrencySymbol(currencyCode), format: "%n%u" });
  };

  const formattedPrice = classData?.price?.value ? getMoneyFormat(classData.price.value, classData.price.currency) : "Desconocido";

  const minutes = classData?.durationMinutes ?? 0;
  const formattedDuration = i18n.t("minutes", { count: minutes });


  return {
    createdDaysAgo,
    updatedDaysAgo,
    price: formattedPrice,
    duration: formattedDuration
  }
}