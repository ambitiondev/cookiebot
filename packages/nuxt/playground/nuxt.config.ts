export default defineNuxtConfig({
    modules: ['../src/module', '@nuxtjs/i18n'],
    cookiebot: {
        cookieBotId: import.meta.env.VITE_COOKIEBOT_ID,
    },
    devtools: { enabled: true },
    i18n: {
        vueI18n: './i18n.config.ts',
    },
});
