import genericEn from "i18n-js/json/en.json";
import genericEs from "i18n-js/json/es.json";
import customEn from './translations/en.json';
import customEs from './translations/es.json';

export const translations = {
  es: {
    ...customEs,
    ...genericEs.es,
  },
  en: {
    ...genericEn.en,
    ...customEn,
  }
} 
