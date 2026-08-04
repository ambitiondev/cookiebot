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
import {
  COOKIE_DECLARATION_URL,
  createScriptWithOptions,
  removeScript,
  isScriptAttribute,
  type ICookiebotOptions,
} from "@ambitiondev/cookiebot-common";

// Module imports
import {
  blockingMode as blockingModeFromOptions,
  consentmode as consentmodeFromOptions,
  cookiebotId,
  culture as cultureFromOptions,
  level as levelFromOptions,
  type as typeFromOptions,
} from "#cookiebot-options";

// utils
import { buildConsentBannerScriptOptions } from "./script-helper";

function normalizeConsentModeAttribute(
  consentmode:
    | Partial<ICookiebotOptions>["consentmode"]
    | "disabled"
    | undefined,
) {
  if (consentmode === false || consentmode === "disabled") {
    return "disabled";
  }

  if (consentmode === true) {
    return "true";
  }

  return undefined;
}

export function useCookiebot(settings?: Partial<ICookiebotOptions>) {
  const { $i18n } = useNuxtApp();
  const {
    blockingMode: blockingModeOverride,
    consentmode: consentmodeOverride,
    culture: cultureOverride,
    level: levelOverride,
    type: typeOverride,
  } = settings || {};

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
    useScript(
      buildConsentBannerScriptOptions({
        type: typeOverride || typeFromOptions,
        level: levelOverride || levelFromOptions,
        culture: culture.value,
        blockingMode: blockingModeOverride || blockingModeFromOptions,
        consentmode: consentmodeOverride ?? consentmodeFromOptions,
      }),
      {
        trigger: "manual",
      },
    );

  async function cookieDeclaration(wrapper: MaybeRef<HTMLElement | null>) {
    const _element = unref(wrapper);

    if (isCookieDeclarationProcessing.value) {
      return warn("Cookie declaration is already in progress.");
    }

    isCookieDeclarationProcessing.value = true;

    if (!_element || !cookiebotId) {
      isCookieDeclarationProcessing.value = false;

      throw createError({
        statusCode: 400,
        message: `Cookie declaration requires the following missing properties: ${!_element ? "wrapper element" : ""}${!_element && !cookiebotId ? ", " : ""}${!cookiebotId ? "cookiebotId" : ""}`,
      });
    }

    const _settings = [
      {
        name: "data-type",
        value: typeOverride || typeFromOptions,
      },
      {
        name: "data-level",
        value: levelOverride || levelFromOptions,
      },
      {
        name: "data-culture",
        value: culture.value,
      },
      {
        name: "data-blockingmode",
        value: blockingModeOverride || blockingModeFromOptions,
      },
      {
        name: "data-consentmode",
        value: normalizeConsentModeAttribute(
          consentmodeOverride ?? consentmodeFromOptions,
        ),
      },
    ].filter((value) => value && isScriptAttribute(value));

    console.log(
      _settings,
      typeOverride,
      typeFromOptions,
      levelOverride,
      levelFromOptions,
      culture.value,
      blockingModeOverride,
      blockingModeFromOptions,
      consentmodeOverride,
      consentmodeFromOptions,
    );

    const script = await createScriptWithOptions(
      _settings,
      COOKIE_DECLARATION_URL(cookiebotId),
      true,
    );

    await _element.appendChild(script);

    isCookieDeclarationProcessing.value = false;
  }

  async function destroyCookieDeclaration(ref: MaybeRef<HTMLElement | null>) {
    const _element = unref(ref);

    if (!_element) {
      return warn("No HTML element or element ref is given. Aborting...");
    }

    const scriptEl = document.getElementById("CookieDeclaration");

    if (scriptEl) {
      await removeScript(_element, "CookieDeclaration");
    }

    _element.innerHTML = "";
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

  async function resetConsentBanner() {
    await destroyConsentBanner();
    await consentBanner();
  }

  function renew() {
    if (typeof window.Cookiebot?.renew === "function") {
      return window.Cookiebot.renew();
    }

    warn("Not able to renew consent. Cookiebot instance is not defined.");
  }

  return {
    culture,
    consentBanner,
    destroyConsentBanner,
    resetConsentBanner,
    cookieDeclaration,
    destroyCookieDeclaration,
    renew,
  };
}
