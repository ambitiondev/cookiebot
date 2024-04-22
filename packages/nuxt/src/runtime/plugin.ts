// Vendor
import { CB_NAME, consentBannerURL, useLogger } from '@ambitiondev/cookiebot-common';

// App imports
import { defineNuxtPlugin, useRouter } from '#app';
import { useHead } from '#imports';
// @ts-ignore
import * as pluginOptions from '#cookiebot-options';

// Module Imports
import type { ModuleOptions } from '../module';

export default defineNuxtPlugin((nuxt) => {
	const defaultLocale =
		// @ts-ignore
		'$i18n' in nuxt && 'locale' in nuxt.$i18n ? (nuxt.$i18n.locale.value as string) : undefined;
	const router = useRouter();
	const { error } = useLogger();
	const {
		autoConsentBanner,
		cookieBotId,
		culture = defaultLocale,
		...rest
	} = pluginOptions as ModuleOptions;

	if (!cookieBotId?.length) {
		return error('No Cookiebot ID given. Aborting...');
	}

	if (autoConsentBanner) {
		useHead({
			script: [
				{
					id: CB_NAME,
					src: consentBannerURL({
						cookieBotId,
						culture,
						...rest,
					}),
				},
			],
		});
	}

	if (process.client) {
		router.afterEach(() => {
			if (window instanceof Window && 'Cookiebot' in window) {
				window.requestAnimationFrame(() => {
					window.Cookiebot.runScripts();
				});
			}
		});
	}
});
