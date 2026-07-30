import CookiebotModule from "../../../../src/module";

export default defineNuxtConfig({
  modules: [CookiebotModule],
  cookiebot: {
    cookiebotId: import.meta.env.COOKIEBOT_ID as string,
  },
});
