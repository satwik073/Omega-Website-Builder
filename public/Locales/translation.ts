import i18n from "../../i18n";

// Load translations for server-side use
export const getTranslations = async (language: string) => {
  await i18n.changeLanguage(language); // Set the desired language
  return {
    "HeaderAlignment.Value": i18n.t("HeaderAlignment.Value"),
  };
};
