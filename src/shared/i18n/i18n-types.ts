import genericEn from 'i18n-js/json/en.json'
import customEn from './translations/en.json'

const allTranslations = {
  ...genericEn.en,
  ...customEn,
} as const

export type TranslationKeys = keyof typeof allTranslations
