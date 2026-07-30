// Nuxt imports
import {
  computed,
  createError,
  ref,
  unref,
  useNuxtApp,
  useScript,
  type MaybeRef,
} from "#imports";
import { warn } from "vue";

// Cookiebot common imports
import type { ICookiebotOptions } from "@ambitiondev/cookiebot-common";

// Module imports
import { cookiebotId, culture as cultureFromOptions } from "#cookiebot-options";

// utils
import { buildScriptOptionsForLocale } from "../utils/script";

export function useCookiebot(settings?: Partial<ICookiebotOptions>) {
  const { $i18n } = useNuxtApp();
  const { culture: cultureOverride } = settings || {};

  const isCookieDeclarationProcessing = ref<boolean>(false);

  const culture = computed<string | undefined>(
    () =>
      cultureOverride ||
      cultureFromOptions ||
      // @ts-expect-error - cannot determine if i18n is installed
      ($i18n?.locale?.value as string | undefined) ||
      undefined,
  );

  const { load: loadConsentBannerScript, remove: removeConsentBannerScript } =
    useScript(buildScriptOptionsForLocale(culture.value), {
      trigger: "manual",
    });

  async function cookieDeclaration(wrapper: MaybeRef<HTMLElement | null>) {
    const _element = unref(wrapper);

    if (isCookieDeclarationProcessing.value) {
      return warn("Cookie declaration is already in progress.");
    }

    isCookieDeclarationProcessing.value = true;

    if (!_element || !cookiebotId) {
      throw createError({
        statusCode: 400,
        message: `Cookie declaration requires the following missing properties: ${!_element ? "wrapper element" : ""}${!_element && !cookiebotId ? ", " : ""}${!cookiebotId ? "cookiebotId" : ""}`,
      });
    }
  }

  async function consentBanner() {
    await loadConsentBannerScript();

    if (
      typeof window?.Cookiebot?.runScripts === "function" &&
      window?.Cookiebot?.consented === true
    ) {
      window?.Cookiebot?.runScripts();
    }
  }

  async function destroyConsentBanner() {
    window.Cookiebot = undefined;
    window.CookieConsent = undefined;
    window.CookieConsentDialog = undefined;
    removeConsentBannerScript();
  }

  return {
    culture,
    consentBanner,
    cookieDeclaration,
    destroyConsentBanner,
  };
}
