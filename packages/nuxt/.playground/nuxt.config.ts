export default defineNuxtConfig({
  modules: ["../src/module", "@nuxtjs/i18n"],
  cookiebot: {
    cookiebotId: import.meta.env.NUXT_PUBLIC_COOKIEBOT_ID,
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
