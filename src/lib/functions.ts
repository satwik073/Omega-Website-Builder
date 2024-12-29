import { ThemeProviderOptions } from "./structures";

export const ThemeSettings = (
  customizationNeeded: boolean,
  isWhiteEnabled: boolean | string
): string => {
  return (
    process.env.NEXT_STYLUS_CONTROLLER === ThemeProviderOptions?.LI_TH
      ? `controller-stylus-dark ${
          customizationNeeded
            ? `!border-none ${isWhiteEnabled ? "!text-white" : "!text-black"}`
            : `${isWhiteEnabled ? "!text-white" : "!text-black"}`
        }`
      : process.env.NEXT_STYLUS_CONTROLLER === ThemeProviderOptions?.DARK_TH
      ? `controller-stylus-light ${
          customizationNeeded
            ? `!border-none ${isWhiteEnabled ? "!text-white" : "!text-black"}`
            : `${isWhiteEnabled ? "!text-white" : "!text-black"}`
        }`
      : `controller-stylus-default ${
          customizationNeeded
            ? `!border-none ${isWhiteEnabled ? "!text-white" : "!text-black"}`
            : `${isWhiteEnabled ? "!text-white" : "!text-black"}`
        }`
  );
};
