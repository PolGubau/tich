import { ClassPrimitive, CurrencyCode } from "~/domain/class/types"
import i18n, { t } from "~/shared/i18n/i18n"

export type LocaleClassData = {
  createdDaysAgo: string
  updatedDaysAgo: string
  price: string
  displayDate: string
  duration: string
}
const MS_IN_DAY = 1000 * 60 * 60 * 24;

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
const getDaysAgo = (date: Date): string => {
  const to = new Date();
  const from = date
  return i18n.timeAgoInWords(from, to);
};
const getRelativeTimeString = (date: Date): string => {
  const isPast = date.getTime() < Date.now();
  const count = getDaysAgo(date); // Ej: "3 days", "2 días", "1 Tag"
  const key = isPast ? 'relative_time_past' : 'relative_time';
  return t(key, { count });
}

const isWithinLast30Days = (date: Date): boolean => {
  const now = Date.now();
  const diff = now - date.getTime();
  return diff >= 0 && diff <= 30 * MS_IN_DAY;
}

const isWithinNext30Days = (date: Date): boolean => {
  const now = Date.now();
  const diff = date.getTime() - now;
  return diff > 0 && diff <= 30 * MS_IN_DAY;
}

const isDateNearerThanAMonth = (date: Date | null): boolean => {
  if (!date) return false;
  return isWithinLast30Days(date) || isWithinNext30Days(date);

}

export function getLocaleClassData(classData: ClassPrimitive | null): LocaleClassData {



  const createdDaysAgo = classData?.createdAt ? getRelativeTimeString(classData.createdAt) : i18n.t('unknown')


  const updatedDaysAgo = classData?.updatedAt ? getRelativeTimeString(classData.updatedAt) : i18n.t('unknown')



  const formattedPrice = classData?.price?.value ? getMoneyFormat(classData.price.value, classData.price.currency) : "Desconocido";

  const minutes = classData?.durationMinutes ?? 0;
  const formattedDuration = i18n.t("minutes", { count: minutes });


  const date = !classData ? null : new Date(classData?.date);
  const parsedDate = date && date.toLocaleDateString(i18n.locale)




  // if the class date is less than a month, we display the timeAgo format, otherwise we display the parsedDate

  const isDateLessThanAMonth = date && isDateNearerThanAMonth(date);


  const dateInFormat = isDateLessThanAMonth ? getRelativeTimeString(date) : parsedDate;

  const displayDate: string = dateInFormat ?? t('unknown');

  return {
    createdDaysAgo,
    updatedDaysAgo,
    displayDate,
    price: formattedPrice,
    duration: formattedDuration
  }
}