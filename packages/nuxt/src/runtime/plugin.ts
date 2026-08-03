// App imports
import { defineNuxtPlugin } from "#app";
import { useScript } from "#imports";

// Module imports
import {
  autoConsentBanner,
  culture as cultureFromOptions,
} from "#cookiebot-options";

// utils
import { buildScriptOptionsForLocale } from "./script-helper";

export default defineNuxtPlugin(async (nuxtApp) => {
  const { $i18n } = nuxtApp;

  if (autoConsentBanner) {
    useScript(
      buildScriptOptionsForLocale(
        // @ts-expect-error - cannot determine if i18n is installed
        cultureFromOptions || $i18n?.locale?.value,
      ),
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
