import { getLocales } from "expo-localization";
import { I18n } from "i18n-js";
import { TranslationKeys } from './i18n-types';
import { translations } from './translations';

const i18n = new I18n(translations);

// i18n.locale = "es";
i18n.locale = getLocales()[0].languageCode ?? "en";
i18n.enableFallback = true;
i18n.defaultLocale = "en";
export default i18n




/**
 * Translate function
 * This function is a wrapper around i18n.t to provide type safety and convenience.
 * It allows you to pass a key and options for translation.
 * @param key - The translation key to look up.
 * @param options - Optional parameters to pass to the translation function.
 * @returns The translated string.
 */
export const t = (key: TranslationKeys, options?: Record<string, unknown>) =>
  i18n.t(key, options)

