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

export { CookiebotOptions, PluginOptions };
