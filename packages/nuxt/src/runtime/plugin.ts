// App imports
import { defineNuxtPlugin } from "#app";
import { useScript } from "#imports";

// Module imports
import {
  autoConsentBanner,
  blockingMode,
  consentmode,
  culture as cultureFromOptions,
  level,
  type,
} from "#cookiebot-options";

// utils
import { buildConsentBannerScriptOptions } from "./script-helper";

export default defineNuxtPlugin(async (nuxtApp) => {
  const { $i18n } = nuxtApp;

  if (autoConsentBanner) {
    useScript(
      buildConsentBannerScriptOptions({
        type,
        level,
        // @ts-expect-error - cannot determine if i18n is installed
        culture: cultureFromOptions || $i18n?.locale?.value,
        blockingMode,
        consentmode,
      }),
    );
  }

  nuxtApp.hook("page:finish", () => {
    if (
      typeof window?.Cookiebot?.runScripts === "function" &&
      window?.Cookiebot?.consented === true
    ) {
      window?.Cookiebot?.runScripts();
    }
  });
});
