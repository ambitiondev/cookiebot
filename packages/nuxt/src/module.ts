// Vendor
import {
  addImports,
  addPlugin,
  addTemplate,
  createResolver,
  defineNuxtModule,
  useRuntimeConfig,
} from "@nuxt/kit";

// Cookiebot
import type { ICookiebotPluginOptions } from "@ambitiondev/cookiebot-common";

// Package
import { name, version } from "../package.json";

type ModuleOptionsBase = Omit<ICookiebotPluginOptions, "cookiebotId"> & {
  /**
   * Configure if the consent banner should be shown automatically. Defaults to `true`.
   * Override this behaviour if you would like to add stateful logic to the consent banner.
   *
   * Locale from `nuxt-i18n` is detected automatically to set culture for your Cookiebot implementation.
   */
  autoConsentBanner: boolean;
};

type ModuleOptionsWithRuntimeConfig = ModuleOptionsBase & {
  /**
   * Configure if the module should use Nuxt's runtime config.
   */
  useRuntimeConfig: true;
};

type ModuleOptionsWithoutRuntimeConfig = ModuleOptionsBase & {
  /**
   * Configure if the module should use Nuxt's runtime config. Defaults to `false`.
   */
  useRuntimeConfig?: false;
  /**
   * Your Cookiebot ID found in the Cookiebot admin interface.
   */
  cookiebotId: string;
};

export type ModuleOptions =
  | ModuleOptionsWithRuntimeConfig
  | ModuleOptionsWithoutRuntimeConfig;

export type ResolvedModuleOptions = ModuleOptionsBase & {
  /**
   * The resolved Cookiebot ID from either the module options or Nuxt's runtime config.
   */
  cookiebotId: string;
};

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
    useRuntimeConfig: false,
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

    const { public: publicConfig } = useRuntimeConfig();
    const resolvedCookiebotId = options.useRuntimeConfig
      ? publicConfig.cookiebotId
      : options.cookiebotId;

    // Inject options via virtual template
    nuxt.options.alias["#cookiebot-options"] = addTemplate({
      filename: "cookiebot-options.mjs",
      getContents: () =>
        Object.entries({
          ...options,
          cookiebotId: resolvedCookiebotId,
        })
          .map(
            ([key, value]) =>
              `export const ${key} = ${JSON.stringify(value, null, 2)}`,
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
