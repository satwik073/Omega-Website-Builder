import { uniqueId } from "lodash";
import { TableHeaderClasses, TableHeaderSetting } from "../../structure";
import { v4 as CrypticRecord } from "uuid";
import { VISIBILITY } from "@/lib/structures";

export const TableHeaderConfig = {
  _Live: {
    _id: CrypticRecord(),
    key_salutation: uniqueId("_id_column_live_"),
    labelContent: TableHeaderSetting._Live,
    className: TableHeaderClasses._Live,
    metadata: {
      sortable: VISIBILITY.SHOW,
      visibility: VISIBILITY.SHOW,
    },
    conditionalStyles: {
      active: `${TableHeaderClasses._Live} text-green-600`,
      inactive: `${TableHeaderClasses._Live} text-gray-400`,
    },
  },
  _DIMENSION: {
    _id: CrypticRecord(),
    key_salutation: uniqueId("_id_column_image_"),
    labelContent: TableHeaderSetting._DIMENSION,
    className: TableHeaderClasses._DIMENSION,
    metadata: {
      sortable: VISIBILITY.HIDE,
      visibility: VISIBILITY.SHOW,
    },
    conditionalStyles: {
      active: `${TableHeaderClasses._DIMENSION} border-blue-400`,
      inactive: `${TableHeaderClasses._DIMENSION} border-gray-200`,
    },
  },
  DETAIL: {
    _id: CrypticRecord(),
    key_salutation: uniqueId("_id_column_detail_"),
    labelContent: TableHeaderSetting.DETAIL,
    className: TableHeaderClasses.DETAIL,
    metadata: {
      sortable: VISIBILITY.SHOW,
      visibility: VISIBILITY.SHOW,
    },
    conditionalStyles: {
      active: `${TableHeaderClasses.DETAIL} font-bold`,
      inactive: `${TableHeaderClasses.DETAIL} font-normal`,
    },
  },
  TM_RANGE: {
    _id: CrypticRecord(),
    key_salutation: uniqueId("_id_column_interval_"),
    labelContent: TableHeaderSetting.TM_RANGE,
    className: TableHeaderClasses.TM_RANGE,
    metadata: {
      sortable: VISIBILITY.SHOW,
      visibility: VISIBILITY.SHOW,
    },
    conditionalStyles: {
      active: `${TableHeaderClasses.TM_RANGE} text-orange-600`,
      inactive: `${TableHeaderClasses.TM_RANGE} text-gray-300`,
    },
  },
  PRICE: {
    _id: CrypticRecord(),
    key_salutation: uniqueId("_id_column_price_"),
    labelContent: TableHeaderSetting.PRICE,
    className: TableHeaderClasses.PRICE,
    metadata: {
      sortable: VISIBILITY.SHOW,
      visibility: VISIBILITY.SHOW,
    },
    conditionalStyles: {
      active: `${TableHeaderClasses.PRICE} text-red-600`,
      inactive: `${TableHeaderClasses.PRICE} text-gray-500`,
    },
  },
};
