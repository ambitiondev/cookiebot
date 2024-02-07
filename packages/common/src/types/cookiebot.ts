import { MaybeRef } from 'vue';

declare global {
	interface Window {
		Cookiebot: unknown;
		CookieConsent: unknown;
		CookieConsentDialog: unknown;
	}
}

export type BlockingMode = 'auto' | 'none';

export type Level = 'implied' | 'strict';

export type ConsentDialogType =
	| 'optin'
	| 'optout'
	| 'optinout'
	| 'leveloptin'
	| 'inlineoptin'
	| 'optionaloptin';

export interface CookiebotOptions {
	/**
	 * Defines if Cookiebot should automatically block all cookies until a user has consented, value: “auto”.
	 * If not, (value: “none”) cookie-setting scripts should manually be marked up as described in our
	 * manual implementation guide. If you omit this attribute, behavior will equal value: “none”.
	 */
	blockingMode: BlockingMode;
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
	level: Level;
	/**
	 * Overrides the default dialog type with one of the following values:
	 * “optin”, “optout”, “optinout”, “leveloptin”, “inlineoptin”, “optionaloptin”
	 */
	type: ConsentDialogType;
}

export interface PluginOptions extends Partial<CookiebotOptions> {
	cookieBotId: string;
}

export interface CookiebotComposable {
	/**
	 * Create script tag for the consent banner and append it to body
	 *
	 * @returns {Promise<void>}
	 */
	consentBanner: () => Promise<void>;

	/**
	 *  Method to append cookie declaration content to a given HTML element
	 *
	 * @param {HTMLElement | Ref<HTMLElement>} ref - HTML element or HTML element ref where the script should be injected
	 * @deprecated Please use `cookieDeclaration` instead
	 * @returns {Promise<void>}
	 */
	consentPage: (ref: MaybeRef<HTMLElement | null>) => Promise<void>;

	/**
	 * Method to append cookie declaration content to a given HTML element
	 *
	 * @param {HTMLElement | Ref<HTMLElement>} ref - HTML element or HTML element ref where the script should be injected
	 * @returns {Promise<void>}
	 */
	cookieDeclaration: (ref: MaybeRef<HTMLElement | null>) => Promise<void>;

	/**
	 * Destroy the consent banner script from the body
	 *
	 * @returns {Promise<void>}
	 */
	destroyConsentBanner: () => Promise<void>;

	/**
	 * Method to destroy script for cookie declaration
	 *
	 * @param {HTMLElement | Ref<HTMLElement>} ref - HTML element or HTML ref where the script has been injected
	 * @deprecated Please use `destroyCookieDeclaration` instead
	 * @returns {Promise<void>}
	 */
	destroyConsentPage: (ref: MaybeRef<HTMLElement | null>) => Promise<void>;

	/**
	 * Method to destroy script for cookie declaration
	 *
	 * @param {HTMLElement | Ref<HTMLElement>} ref - HTML element or HTML ref where the script has been injected
	 * @returns {Promise<void>}
	 */
	destroyCookieDeclaration: (ref: MaybeRef<HTMLElement | null>) => Promise<void>;

	/**
	 * Destroys the consent banner and reinitialises it.
	 *
	 * @returns {Promise<void>}
	 */
	resetConsentBanner: () => Promise<void>;
}
