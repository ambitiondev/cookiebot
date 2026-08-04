// Types
import type { UseScriptInput } from "@unhead/vue";
import type { ICookiebotOptions } from "@ambitiondev/cookiebot-common";

// Module imports
import { cookiebotId } from "#cookiebot-options";

// utils
import { CONSENT_BANNER_URL } from "@ambitiondev/cookiebot-common";

export type BuildConsentBannerScriptOptions = UseScriptInput & {
  [key: string]: string | null | undefined;
};

type CookiebotConsentBannerDataOptions = Partial<
  Pick<
    ICookiebotOptions,
    "type" | "level" | "culture" | "blockingMode" | "consentmode"
  >
>;

export const buildConsentBannerScriptOptions = (
  options: CookiebotConsentBannerDataOptions = {},
): BuildConsentBannerScriptOptions => ({
  src: CONSENT_BANNER_URL,
  "data-cbid": cookiebotId,
  "data-type": options.type,
  "data-level": options.level,
  "data-culture": options.culture,
  "data-blockingmode": options.blockingMode,
  "data-consentmode":
    options.consentmode === false ||
    (typeof options.consentmode === "string" &&
      options.consentmode === "disabled")
      ? "disabled"
      : options.consentmode === true
        ? "true"
        : undefined,
  crossorigin: undefined,
  fetchpriority: "high",
  referrerpolicy: undefined,
});
