export const CONSENT_BANNER_URL = "https://consent.cookiebot.com/uc.js";

export const COOKIE_DECLARATION_URL = (cookiebotId: string) =>
  `https://consent.cookiebot.com/${cookiebotId}/cd.js`;
