"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { LanguageModules } from "@/lib/structures";

export const useLanguageTranslation = () => {
  const { t, i18n } = useTranslation();

  const [currentLanguage, setCurrentLanguage] = useState<string>(
    typeof window !== "undefined" ? localStorage.getItem("MultiLanguage-Config") || LanguageModules?.ISO_639_ENT : LanguageModules?.ISO_639_ENT
  );

  useEffect(() => {
    const loadTranslations = async () => {
      await i18n.changeLanguage(currentLanguage);
    };

    loadTranslations();
  }, [currentLanguage, i18n]);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setCurrentLanguage(lng);
    localStorage.setItem("MultiLanguage-Config", lng);
  };

  const availableLanguages = [
    { code: LanguageModules.ISO_639_ENT, name: "English" },
    { code: LanguageModules.ISO_723_HIN, name: "हिन्दी" },
    { code: LanguageModules.ISO_812_FRN, name: "Français" },
  ];

  return {
    t,
    currentLanguage,
    changeLanguage,
    availableLanguages,
  };
};
