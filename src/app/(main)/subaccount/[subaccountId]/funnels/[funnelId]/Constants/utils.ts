import { StatusConfig, TableHeaderSetting } from "../../structure";


export const HeaderColumnStyles = {
  LIVE_COLUMN: "w-12 text-center",
  IMAGE_COLUMN: "w-24 text-center",
  NAME_COLUMN: "text-left font-semibold",
  INTERVAL_COLUMN: "text-left",
  PRICE_COLUMN: "text-right font-medium",
  DEFAULT_COLUMN: "text-gray-600",
};


export const StyleSheetConfigs = (key: string, status?: StatusConfig.ACTIVE | StatusConfig.IN_ACTIVE | StatusConfig.DEFAULT, typeConfig?: keyof typeof TableHeaderSetting) => {

  const baseStyles = {
    _Live: HeaderColumnStyles.LIVE_COLUMN,
    _DIMENSION: HeaderColumnStyles.IMAGE_COLUMN,
    DETAIL: HeaderColumnStyles.NAME_COLUMN,
    TM_RANGE: HeaderColumnStyles.INTERVAL_COLUMN,
    PRICE: HeaderColumnStyles.PRICE_COLUMN,
  };

  let className = typeConfig && baseStyles[typeConfig]
    ? baseStyles[typeConfig]
    : HeaderColumnStyles.DEFAULT_COLUMN;

  switch (key) {
    case TableHeaderSetting?._Live:
      className += status === StatusConfig.ACTIVE ? " text-green-600" : status === StatusConfig.IN_ACTIVE ? " " : ""; break;

    case TableHeaderSetting?._DIMENSION:
      className += status === StatusConfig.ACTIVE ? " border-blue-400" : status === StatusConfig.IN_ACTIVE ? "" : ""; break;

    case TableHeaderSetting?.DETAIL:
      className += status === StatusConfig.ACTIVE ? " font-bold" : status === StatusConfig.IN_ACTIVE ? " font-normal" : ""; break;

    case TableHeaderSetting?.TM_RANGE:
      className += status === StatusConfig.ACTIVE ? " text-orange-600" : status === StatusConfig.IN_ACTIVE ? "" : ""; break;

    case TableHeaderSetting?.PRICE:
      className += status === StatusConfig.ACTIVE ? " text-red-600" : status === StatusConfig.IN_ACTIVE ? "" : ""; break;

    default:
      className += ""; break;
  }

  return className.trim();
};
