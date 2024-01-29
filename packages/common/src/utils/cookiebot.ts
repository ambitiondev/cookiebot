import { type PluginOptions } from '..';

export const consentBannerURL = (options: PluginOptions) =>
	`https://consent.cookiebot.com/uc.js?cbid=${options.cookieBotId}${
		options?.culture ? `&culture=${options.culture}` : ''
	}${options?.blockingMode ? `&blockingmode=${options.blockingMode}` : ''}`;

export const cookieDeclarationURL = (cookieBotId: string) =>
	`https://consent.cookiebot.com/${cookieBotId}/cd.js`;
