// Vendor
import { computed, useHead, useNuxtApp, type MaybeRef } from '#imports';
import {
	CB_NAME,
	consentBannerURL,
	useLogger,
	type CookiebotComposable,
	type CookiebotOptions,
	type PluginOptions,
} from '@ambitiondev/cookiebot-common';
import { useCookiebot } from '@ambitiondev/vue-cookiebot';

// Module imports
// @ts-ignore
import * as pluginOptions from '#cookiebot-options';

export function useCookieBot(settings?: Partial<CookiebotOptions>): CookiebotComposable {
	const nuxt = useNuxtApp();
	const { deprecationNotice } = useLogger();
	const _options = {
		...pluginOptions,
		settings,
	} as PluginOptions;

	const culture = computed(() =>
		// @ts-ignore
		'$i18n' in nuxt && 'locale' in nuxt.$i18n ? (nuxt.$i18n.locale.value as string) : undefined
	);

	const vueCookiebot = useCookiebot({
		..._options,
		culture: culture.value,
	});

	async function consentBanner() {
		useHead({
			script: [
				{
					id: CB_NAME,
					src: consentBannerURL({
						culture: culture.value,
						..._options,
					}),
				},
			],
		});
	}

	/** @deprecated */
	async function consentPage(ref: MaybeRef<HTMLElement | null>) {
		deprecationNotice('consentPage', 'cookieDeclaration');

		vueCookiebot.cookieDeclaration(ref);
	}

	async function cookieDeclaration(ref: MaybeRef<HTMLElement | null>) {
		if (document instanceof Document) {
			vueCookiebot.cookieDeclaration(ref);
		}
	}

	async function destroyConsentBanner() {
		if (document instanceof Document) {
			vueCookiebot.destroyConsentBanner();
		}
	}

	/** @deprecated */
	async function destroyConsentPage(ref: MaybeRef<HTMLElement | null>) {
		deprecationNotice('destroyConsentPage', 'destroyCookieDeclaration');

		destroyCookieDeclaration(ref);
	}

	async function destroyCookieDeclaration(ref: MaybeRef<HTMLElement | null>) {
		if (document instanceof Document) {
			vueCookiebot.destroyCookieDeclaration(ref);
		}
	}

	async function resetConsentBanner() {
		await destroyConsentBanner();

		consentBanner();
	}

	return {
		consentBanner,
		consentPage,
		cookieDeclaration,
		destroyConsentBanner,
		destroyConsentPage,
		destroyCookieDeclaration,
		resetConsentBanner,
	};
}
