// Nuxt imports
import { computed, useNuxtApp } from "#imports";

// Cookiebot common imports
import type { ICookiebotOptions } from "@ambitiondev/cookiebot-common";

// Module imports
import { culture as cultureFromOptions } from "#cookiebot-options";

export function useCookiebot(settings?: Partial<ICookiebotOptions>) {
  const { $i18n } = useNuxtApp();
  const { culture: cultureOverride } = settings || {};

  const culture = computed(
    () =>
      cultureOverride ||
      cultureFromOptions ||
      // @ts-expect-error - cannot determine if i18n is installed
      ($i18n?.locale?.value as string) ||
      undefined
  );

  return {
    culture,
  };
}
