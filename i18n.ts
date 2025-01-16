"use client"
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import translation files
import en from "./public/Locales/ISO_639_EIN.json"
import es from "./public/Locales/ISO_812_FRN.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    es: { translation: es },
  },
  lng: "en", // Default language
  fallbackLng: "en", // Fallback language
  supportedLngs: ["en", "es"], // Supported languages
  interpolation: {
    escapeValue: false, // React already escapes by default
  },
  debug: process.env.NODE_ENV === "development", // Debug in development
});

export default i18n;
