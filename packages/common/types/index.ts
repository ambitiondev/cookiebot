declare global {
  interface Window {
    Cookiebot: ICookiebotInstance;
    CookieConsent: unknown;
    CookieConsentDialog: unknown;
  }
}

interface ICookiebotInstance {
  consent: ICookiebotConsentProps;
  consented: boolean;
  declined: boolean;
  hasResponse: boolean;
  doNotTrack: boolean;
  regulations: ICookiebotRegulations;
  show: () => void;
  hide: () => void;
  renew: () => void;
  getScript: (url: string, async: boolean, callback: () => void) => void;
  runScripts: () => void;
  withdraw: () => void;
  submitCustomConsent: (
    optinPreferences: boolean,
    optinStatistics: boolean,
    optinMarketing: boolean
  ) => void;
}

interface ICookiebotRegulations {
  ccpaApplies: boolean;
  gdprApplies: boolean;
  lgpdApplies: boolean;
}

interface ICookiebotConsentProps {
  marketing: boolean;
  method: 'explicit' | 'implied' | null;
  necessary: boolean;
  preferences: boolean;
  stamp: string;
  statistics: boolean;
}

export type TCookiebotBlockingMode = 'auto' | 'none';

export type TCookiebotLevel = 'implied' | 'strict';

export type TCookiebotConsentDialogType =
  | 'optin'
  | 'optout'
  | 'optinout'
  | 'leveloptin'
  | 'inlineoptin'
  | 'optionaloptin';

export interface ICookiebotOptions {
  /**
   * Defines if Cookiebot should automatically block all cookies until a user has consented, value: “auto”.
   * If not, (value: “none”) cookie-setting scripts should manually be marked up as described in our
   * manual implementation guide. If you omit this attribute, behavior will equal value: “none”.
   */
  blockingMode: TCookiebotBlockingMode;
  /**
   * Allows you to disable Google Consent Mode
   */
  consentmode: boolean;
  /**
   * Sets the language for the Cookiebot implementation
   */
  culture: string;
  /**
   * Overrides the default consent method with one of the following values: “implied”, “strict”
   */
  level: TCookiebotLevel;
  /**
   * Overrides the default dialog type with one of the following values:
   * “optin”, “optout”, “optinout”, “leveloptin”, “inlineoptin”, “optionaloptin”
   */
  type: TCookiebotConsentDialogType;
}

export interface ICookiebotPluginOptions extends Partial<ICookiebotOptions> {
  /**
   * Your Cookiebot ID found in the Cookiebot admin interface.
   */
  cookiebotId: string;
}
