import genericCa from "i18n-js/json/ca.json";
import genericDE from "i18n-js/json/de.json";
import genericEn from "i18n-js/json/en.json";
import customCa from './translations/ca.json';
import customDe from './translations/de.json';
import customEn from './translations/en.json';
import customEs from './translations/es.json';
import genericEs from './translations/genericsEs.json';

export const translations = {
  es: {
    ...customEs,
    ...genericEs,
  },
  en: {
    ...genericEn.en,
    ...customEn,
  },
  ca: {
    ...customCa,
    ...genericCa.ca,
  },
  de: {
    ...customDe,
    ...genericDE.de,
  }
} 
