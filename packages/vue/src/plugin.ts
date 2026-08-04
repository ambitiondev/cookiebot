// Vendor
import { App } from "vue";

// Types
import type { ICookiebotPluginOptions } from "@ambitiondev/cookiebot-common";

const cookieBot = {
  install: (app: App, options: ICookiebotPluginOptions) => {
    app.provide("cookieBotOptions", options || {});

    requestAnimationFrame(() => {
      if (typeof app.config.globalProperties.$router === "object") {
        app.config.globalProperties.$router.afterEach(() => {
          if ("Cookiebot" in window) {
            requestAnimationFrame(() => {
              if (typeof window.Cookiebot?.runScripts === "function") {
                window.Cookiebot.runScripts();
              }
            });
          }
        });
      }
    });
  },
};

export { cookieBot };
