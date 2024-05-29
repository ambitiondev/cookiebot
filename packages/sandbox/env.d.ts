/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_COOKIEBOT_ID: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
