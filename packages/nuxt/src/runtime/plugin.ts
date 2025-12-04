// App imports
import { defineNuxtPlugin } from "#app";
import { useScript } from "#imports";

// Module imports
import {
  autoConsentBanner,
  cookiebotId,
  culture as cultureFromOptions,
} from "#cookiebot-options";

// utils
import { CONSENT_BANNER_URL } from "@ambitiondev/cookiebot-common/constants";

export default defineNuxtPlugin(async (nuxtApp) => {
  const { $i18n } = nuxtApp;

  if (autoConsentBanner) {
    useScript({
      src: CONSENT_BANNER_URL,
      "data-cbid": cookiebotId,
      // @ts-expect-error - cannot determine if i18n is installed
      "data-culture": cultureFromOptions || $i18n.locale.value,
      crossorigin: undefined,
      fetchpriority: "high",
      referrerpolicy: undefined,
    });
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
