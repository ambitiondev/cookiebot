export default defineNuxtConfig({
  future: {
    compatibilityVersion: 5,
  },
  compatibilityDate: "2026-07-20",
  modules: ["../src/module", "@nuxtjs/i18n"],
  cookiebot: {
    useRuntimeConfig: true,
  },
  runtimeConfig: {
    public: {
      cookiebotId: "",
    },
  },
  devtools: { enabled: true },
  i18n: {
    locales: [
      { code: "en", iso: "en-US", name: "English" },
      { code: "nl", iso: "nl-NL", name: "Nederlands" },
    ],
    defaultLocale: "en",
    detectBrowserLanguage: false,
  },
});
