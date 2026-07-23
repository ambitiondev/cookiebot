import CookiebotModule from "../../../../src/module";

export default defineNuxtConfig({
  modules: [CookiebotModule],
  cookiebot: {
    cookiebotId: import.meta.env.NUXT_PUBLIC_COOKIEBOT_ID,
  },
});
