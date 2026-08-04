// Vendor
import {
  CONSENT_BANNER_URL,
  COOKIE_DECLARATION_URL,
  createScriptWithOptions,
  removeScript,
  isScriptAttribute,
  type ICookiebotPluginOptions,
  type ICookiebotOptions,
} from "@ambitiondev/cookiebot-common";
import { inject, ref, unref, warn, type MaybeRef } from "vue";

const CB_NAME = "AppCookiebotConsentBanner";
const CD_NAME = "AppCookiebotCookieDeclaration";

function normalizeConsentModeAttribute(
  consentmode: ICookiebotPluginOptions["consentmode"] | undefined,
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
  const pluginOptions = inject<Partial<ICookiebotPluginOptions>>(
    "cookieBotOptions",
    {},
  );
  const _options = {
    ...pluginOptions,
    ...settings,
  };

  if (typeof _options.cookiebotId === "undefined") {
    warn(
      "No settings have been found. Did you forget to instantiate the plugin in your app definition (app.use(...))?",
    );
  }

  // Refs
  const processingCB = ref<boolean>(false);
  const processingCD = ref<boolean>(false);

  async function consentBanner() {
    if (processingCB.value) {
      return warn("Processing request. Aborting...");
    }

    processingCB.value = true;

    if (document.getElementById(CB_NAME) !== null) {
      processingCB.value = false;
      return warn("Consent banner already initialized. Skipping...");
    }

    const additionalSettings = [
      {
        name: "data-type",
        value: _options.type,
      },
      {
        name: "data-level",
        value: _options.level,
      },
      {
        name: "data-culture",
        value: _options.culture,
      },
      {
        name: "data-blockingmode",
        value: _options.blockingMode,
      },
      {
        name: "data-consentmode",
        value: normalizeConsentModeAttribute(_options.consentmode),
      },
    ].filter((value) => isScriptAttribute(value));

    const script = await createScriptWithOptions(
      [
        {
          name: "id",
          value: CB_NAME,
        },
        {
          name: "data-cbid",
          value: _options.cookiebotId ?? "",
        },
        ...additionalSettings,
      ],
      CONSENT_BANNER_URL,
    );

    await document.body.appendChild(script);

    processingCB.value = false;
  }

  async function cookieDeclaration(ref: MaybeRef<HTMLElement | null>) {
    const _ref = unref(ref);

    if (processingCD.value) {
      return warn("Processing request. Aborting...");
    }

    processingCD.value = true;

    if (!_ref) {
      processingCD.value = false;
      return warn(
        "No HTML element or element ref is given to inject cookie declaration script. Skipping...",
      );
    }

    if (!_options.cookiebotId) {
      processingCD.value = false;
      return warn("No Cookiebot ID found. Please set a valid ID");
    }

    if (
      document.getElementById(CD_NAME) !== null ||
      document.querySelector(`[data-cp-id=${CD_NAME}]`) !== null
    ) {
      processingCD.value = false;
      return warn("Consent page already initialized. Skipping...");
    }

    const _settings = [
      {
        name: "data-cp-id",
        value: CD_NAME,
      },
      {
        name: "data-type",
        value: _options.type,
      },
      {
        name: "data-level",
        value: _options.level,
      },
      {
        name: "data-culture",
        value: _options.culture,
      },
      {
        name: "data-blockingmode",
        value: _options.blockingMode,
      },
      {
        name: "data-consentmode",
        value: normalizeConsentModeAttribute(_options.consentmode),
      },
    ].filter((value) => value && isScriptAttribute(value));

    const script = await createScriptWithOptions(
      _settings,
      COOKIE_DECLARATION_URL(_options.cookiebotId),
      true,
    );

    await _ref.appendChild(script);

    processingCD.value = false;
  }

  async function destroyConsentBanner() {
    await removeScript(document.body, CB_NAME);
  }

  async function destroyCookieDeclaration(ref: MaybeRef<HTMLElement | null>) {
    const _ref = unref(ref);

    if (!_ref) {
      return warn("No HTML element or element ref is given. Aborting...");
    }

    const scriptEl = document.getElementById(CD_NAME);
    const createdScriptEl = document.querySelector<HTMLScriptElement>(
      `[data-cp-id=${CD_NAME}]`,
    );

    if (scriptEl) {
      await removeScript(_ref, CD_NAME);
    }

    if (createdScriptEl) {
      await removeScript(_ref, createdScriptEl);
    }

    _ref.innerHTML = "";
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
    consentBanner,
    cookieDeclaration,
    destroyConsentBanner,
    destroyCookieDeclaration,
    renew,
    resetConsentBanner,
  };
}
