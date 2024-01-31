import { MaybeRef } from 'vue';

declare global {
	interface Window {
		Cookiebot: unknown;
		CookieConsent: unknown;
		CookieConsentDialog: unknown;
	}
}

type BlockingMode = 'auto' | 'none';

type Level = 'implied' | 'strict';

type ConsentDialogType =
	| 'optin'
	| 'optout'
	| 'optinout'
	| 'leveloptin'
	| 'inlineoptin'
	| 'optionaloptin';

interface CookiebotOptions {
	blockingMode: BlockingMode;
	consentmode: boolean;
	culture: string;
	level: Level;
	type: ConsentDialogType;
}

interface PluginOptions extends Partial<CookiebotOptions> {
	cookieBotId: string;
}

interface CookiebotComposable {
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

export { CookiebotComposable, CookiebotOptions, PluginOptions };
