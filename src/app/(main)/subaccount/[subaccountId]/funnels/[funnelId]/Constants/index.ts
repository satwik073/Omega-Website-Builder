
import { v4 as CrypticRecord } from "uuid"
import { uniqueId } from "lodash"
import { StatusConfig, TableHeaderSetting } from "../../structure"
import { StyleSheetConfigs } from "./utils";
import { VISIBILITY } from "@/lib/structures";


export const TableHeaderConfig = {
    _Live: {
        _id: CrypticRecord(),
        key_salutation: uniqueId("_id_column_live_"),
        labelContent: TableHeaderSetting._Live,
        className: StyleSheetConfigs(TableHeaderSetting?._Live, StatusConfig?.DEFAULT, '_Live'),
        metadata: {
            sortable: VISIBILITY?.SHOW,
            visibility: VISIBILITY?.SHOW,
        },
        conditionalStyles: {
            active: StyleSheetConfigs(TableHeaderSetting?._Live, StatusConfig?.ACTIVE, '_Live'),
            inactive: StyleSheetConfigs(TableHeaderSetting?._Live, StatusConfig?.IN_ACTIVE, '_Live'),
        },
    },
    _DIMENSION: {
        _id: CrypticRecord(),
        key_salutation: uniqueId("_id_column_image_"),
        labelContent: TableHeaderSetting._DIMENSION,
        className: StyleSheetConfigs(TableHeaderSetting?._DIMENSION, StatusConfig?.DEFAULT, '_DIMENSION'),
        metadata: {
            sortable: VISIBILITY?.HIDE,
            visibility: VISIBILITY?.SHOW,
        },
        conditionalStyles: {
            active: StyleSheetConfigs(TableHeaderSetting?._DIMENSION, StatusConfig?.ACTIVE, '_DIMENSION'),
            inactive: StyleSheetConfigs(TableHeaderSetting?._DIMENSION, StatusConfig?.IN_ACTIVE, '_DIMENSION'),
        },
    },
    DETAIL: {
        _id: CrypticRecord(),
        key_salutation: uniqueId("_id_column_detail_"),
        labelContent: TableHeaderSetting.DETAIL,
        className: StyleSheetConfigs(TableHeaderSetting?.DETAIL, StatusConfig?.DEFAULT, 'DETAIL'),
        metadata: {
            sortable: VISIBILITY?.SHOW,
            visibility: VISIBILITY?.SHOW,
        },
        conditionalStyles: {
            active: StyleSheetConfigs(TableHeaderSetting?.DETAIL, StatusConfig?.ACTIVE, 'DETAIL'),
            inactive: StyleSheetConfigs(TableHeaderSetting?.DETAIL, StatusConfig?.IN_ACTIVE, 'DETAIL'),
        },
    },
    TM_RANGE: {
        _id: CrypticRecord(),
        key_salutation: uniqueId("_id_column_interval_"),
        labelContent: TableHeaderSetting.TM_RANGE,
        className: StyleSheetConfigs(TableHeaderSetting?.TM_RANGE, StatusConfig?.DEFAULT, 'TM_RANGE'),
        metadata: {
            sortable: VISIBILITY?.SHOW,
            visibility: VISIBILITY?.SHOW,
        },
        conditionalStyles: {
            active: StyleSheetConfigs(TableHeaderSetting?.TM_RANGE, StatusConfig?.ACTIVE, 'TM_RANGE'),
            inactive: StyleSheetConfigs(TableHeaderSetting?.TM_RANGE, StatusConfig?.IN_ACTIVE, 'TM_RANGE'),
        },
    },
    PRICE: {
        _id: CrypticRecord(),
        key_salutation: uniqueId("_id_column_price_"),
        labelContent: TableHeaderSetting.PRICE,
        className: StyleSheetConfigs(TableHeaderSetting?.PRICE, StatusConfig?.DEFAULT, 'PRICE'),
        metadata: {
            sortable: VISIBILITY?.SHOW,
            visibility: VISIBILITY?.SHOW,
        },
        conditionalStyles: {
            active: StyleSheetConfigs(TableHeaderSetting?.PRICE, StatusConfig?.ACTIVE, 'PRICE'),
            inactive: StyleSheetConfigs(TableHeaderSetting?.PRICE, StatusConfig?.IN_ACTIVE, 'PRICE'),
        },
    },
};