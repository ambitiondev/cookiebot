/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly COOKIEBOT_ID: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
