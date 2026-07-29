export default defineNuxtConfig({
    modules: ['../src/module', '@nuxtjs/i18n'],
    cookiebot: {},
    devtools: { enabled: true },
    i18n: {
        vueI18n: './i18n.config.ts',
    },
    runtimeConfig: {
        public: {
            cookiebot: {
                id: '',
            },
        },
    },
});
