// Vendor
import {
  addImports,
  addPlugin,
  addTemplate,
  createResolver,
  defineNuxtModule,
} from "@nuxt/kit";

// Cookiebot
import type { ICookiebotPluginOptions } from "@ambitiondev/cookiebot-common";

// Package
import { name, version } from "../package.json";

export interface ModuleOptions extends ICookiebotPluginOptions {
  /**
   * Configure if the consent banner should be shown automatically. Defaults to `true`.
   * Override this behaviour if you would like to add stateful logic to the consent banner.
   *
   * Locale from `nuxt-i18n` is detected automatically to set culture for your Cookiebot implementation.
   */
  autoConsentBanner: boolean;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    configKey: "cookiebot",
    compatibility: {
      nuxt: "^3.0.0 || ^4.0.0",
    },
  },
  defaults: {
    autoConsentBanner: true,
    blockingMode: "none",
    consentmode: undefined,
    cookiebotId: "",
    culture: undefined,
    level: undefined,
    type: undefined,
  },
  moduleDependencies: {
    "@nuxt/scripts": {
      version: ">=0.8.0",
    },
    "@nuxtjs/i18n": {
      optional: true,
      version: ">=9.0.0 || >=10.0.0",
    },
  },
  async setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url);
    const runtimeDir = await resolve("./runtime");

    // Inject options via virtual template
    nuxt.options.alias["#cookiebot-options"] = addTemplate({
      filename: "cookiebot-options.mjs",
      getContents: () =>
        Object.entries(options)
          .map(
            ([key, value]) =>
              `export const ${key} = ${JSON.stringify(value, null, 2)}`
          )
          .join("\n"),
    }).dst;

    addPlugin({
      src: resolve(runtimeDir, "plugin"),
    });

    addImports({
      name: "useCookiebot",
      as: "useCookiebot",
      from: resolve(runtimeDir, "composable"),
    });
  },
});
