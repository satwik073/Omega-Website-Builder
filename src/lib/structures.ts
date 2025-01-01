export enum RoutesConfiguration {
    DEFAULT_PATH = '/',
    AUTH = '/automation',
    VERIFICATION = '/tenant/verification',
    PRODUCTS = '/products',
    PRICING = '/pricing',
    CLIENTS = '/clients',
    RESOURCES = '/resources',
    LOGIN = '/login',
    REGISTRATION = '/register',
    DOCUMENTATION = '/documentation',
    ENTERPRISE = '/enterprise',
    DASHBOARD = '/dashboard',
    WORKFLOWS = '/workflows',
    SETTINGS = '/settings',
    CONNECTIONS = '/connections',
    BILLINGS = '/billings',
    TEMPLATES = '/templates',
    LOGS = '/logs',
}
export enum AuthFlowIdentifier {
    SIGN_IN = 'Login',
    REGISTER_VAR = 'Register'
}

export enum RolesIdentifier {
    ADMIN = 'admin',
    USER = 'user',
    ENTERPRISE_ADMIN = 'Enterprise Admin',
    SUB_USER_ACCOUNT = 'Subuser',
    SUB_ADMIN = 'Subadmin'
}

export enum DataTypeFormIdentifier {
    ST_G = 'string',
    NU_R = 'number',
    BL_N = 'boolean',
    EM_L = 'email',
    DATE = 'date',
    TIME = 'time',
    TEL = 'tel',
    URL = 'url',
    TEXT = 'text',
    SELECT = 'select',
    OBJ = 'object',
    PS_D = 'password',
    PHN = 'phone'
}

export enum TextTypeIdentifier {
    H1 = 'H1',
    H2 = 'H2',
    H3 = 'H3',
    H6 = 'H6',
    Title = 'Title',
    Subtitle = 'Subtitle',
    Body = 'Body',
    Body2 = 'Body2',
    BodyLarge = 'BodyLarge',
    Caption = 'Caption',
    CaptionBold = 'CaptionBold',
    Micro = 'Micro',
    TitleText = 'TitleText',
    Default = '',
}

export enum BoxTypeIdentifier {
    Div = 'div',
    Nav = 'nav',
    Section = 'section',
    Header = 'header',
    Footer = 'footer',
    Article = 'article',
    Aside = 'aside',
    Main = 'main',
    H1 = 'h1',
    H2 = 'h2',
    H3 = 'h3',
    H4 = 'h4',
    H5 = 'h5',
    H6 = 'h6',
    P = 'p',
    Span = 'span',
    A = 'a',
    Img = 'img',
    Table = 'table',
    Thead = 'thead',
    Tbody = 'tbody',
    Tr = 'tr',
    Td = 'td',
    Th = 'th',
    Ul = 'ul',
    Ol = 'ol',
    Li = 'li',
    Form = 'form',
    Input = 'input',
    Button = 'button',
    Label = 'label',
    Select = 'select',
    Textarea = 'textarea',
    Video = 'video',
    Audio = 'audio',
    Details = 'details',
    Summary = 'summary',
    Dialog = 'dialog',
    Output = 'output',
    Default = 'div',
}

export const ConfigSetting = {
    ENABLE: false,
    DISABLE: true,
    TEXT_CONFIG: {
        WH_: "WHITE_FORMAT",
        BLK_: "DARK_FORMAT"
    }
}


export const __DEFAULT_CLS = {
    ClassName: "text-sm text-center p-1 bg-red-400"
}

export const LanguageModules = {
    ISO_639_ENT: 'en',
    ISO_723_HIN: 'hi',
    ISO_812_FRN: 'fr'
}

export enum ThemeProviderOptions {
    DARK_TH = 'Dark',
    LI_TH = 'Light',
    __DEFAULT = 'System'

}


export enum HostedConfigs {
    LC = 'localhost',
    PREPROD = 'preprod',
    PRODUCTION = 'prod',
    DEV = 'development',
    __DEFAULT = 'localhost',
    PS_LC = 'postlocal',
    EMPTY = 'undefined'
}
export enum ENVS {
    PP = 'preproduction',
    __P = 'production',
    _STAG = 'staging',
    __DEFAULT = 'postlocal'
}

export const ConfigurationSchema = {
    PRODUCT_EXTRACTED_FILE: process.env.NEXT_PRODUCT_CONFIG
}

export const OptionsConfig = {
    _BORDER: {
        ENABLE: ConfigSetting?.ENABLE,
        DISABLE: ConfigSetting?.DISABLE
    },
    _TXTPALLETE: {
        ENABLE: ConfigSetting?.TEXT_CONFIG?.WH_,
        DISABLE: ConfigSetting?.TEXT_CONFIG?.BLK_
    }
}

export const VISIBILITY = {
    SHOW : true,
    HIDE : false,
}


export enum InputTypes {
    CHECKBOX = "checkbox",
    RADIO = "radio",
    TEXT = "text",
    NUMBER = "number",
    EMAIL = "email",
    PASSWORD = "password",
    DATE = "date",
    TIME = "time",
    URL = "url",
    TEL = "tel",
    RANGE = "range",
    FILE = "file",
    COLOR = "color",
    SEARCH = "search",
}


export const _DEFAULT = ''
export enum IntervalsSettings {
    RECURRING = "Recurring",
    ONE_TIME = "One Time",
}

// export const runningEnviornment = {
//     variations: {
//         localTurbulence: typeof window !== HostedConfigs.EMPTY &&
//             window.location.hostname === HostedConfigs.LC && (
//                 import.meta.env.MODE === ENVS.__P ? import.meta.env.VITE_APP_ENV : import.meta.env.MODE === ENVS.PP ? import.meta.env.VITE_APP_ENV : import.meta.env.VITE_APP_ENV === ENVS._STAG ? import.meta.env.VITE_APP_ENV : 'localhost'
//             )
//     },
//     ownerDocument: {
//         document_identifier: {
//             type: 'Owner',
//             _owner: {
//                 __user_name: import.meta.env.VITE_APP_PRODUCT,
//             }
//         }
//     }
// }
