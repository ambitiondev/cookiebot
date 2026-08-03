// Types
import type { UseScriptInput } from "@unhead/vue";

// Module imports
import { cookiebotId } from "#cookiebot-options";

// utils
import { CONSENT_BANNER_URL } from "@ambitiondev/cookiebot-common";

export type BuildScriptOptionsForLocale = UseScriptInput & {
  [key: string]: string | null | undefined;
};

export const buildScriptOptionsForLocale = (
  locale?: string,
): BuildScriptOptionsForLocale => ({
  src: CONSENT_BANNER_URL,
  "data-cbid": cookiebotId,
  "data-culture": locale,
  crossorigin: undefined,
  fetchpriority: "high",
  referrerpolicy: undefined,
});
