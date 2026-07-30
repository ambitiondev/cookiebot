import CookiebotModule from "../../../../src/module";

export default defineNuxtConfig({
  modules: [CookiebotModule],
  cookiebot: {
    useRuntimeConfig: true,
  },
  runtimeConfig: {
    public: {
      cookiebotId: "",
    },
  },
});
