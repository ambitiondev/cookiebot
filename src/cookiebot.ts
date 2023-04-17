// Vendor
import { computed } from 'vue';
import { useLogger } from '@netvlies/utility-collection';

// Types
import type { CookiebotOptions } from './@types/cookiebot';

// Composable
import { useScriptHelper } from './script';

export function useCookiebot(id: string, settings?: Partial<CookiebotOptions>) {
	const CookiebotConsentBannerId = 'AppCookiebotConsentBanner';
	const CookiebotConsentPageId = 'AppCookiebotConsentPage';

	// Composable
	const { createScriptWithOptions, removeScript } = useScriptHelper();
	const { error } = useLogger('Cookiebot plugin');

	// Computed
	const cbUrlSetings = computed(
		() =>
			`cbid=${id}${settings?.culture ? `&culture=${settings.culture}` : ''}${
				settings?.blockingMode ? `&blockingmode=${settings.blockingMode}` : ''
			}`
	);

	async function consentBanner() {
		const script = await createScriptWithOptions(
			[
				{
					name: 'id',
					value: CookiebotConsentBannerId,
				},
			],
			`https://consent.cookiebot.com/uc.js?${cbUrlSetings.value}`
		);

		document.body.appendChild(script);
	}

	async function consentPage(ref: HTMLElement) {
		if (!ref) {
			return error('No HTML element ref is given. Aborting...');
		}

		const _settings = [];

		if (settings?.culture) {
			_settings.push({
				name: 'data-culture',
				value: settings.culture,
			});
		}

		const script = await createScriptWithOptions(
			_settings,
			`https://consent.cookiebot.com/${id}/cd.js`,
			true
		);

		ref.appendChild(script);
	}

	async function destroyConsentBanner() {
		await removeScript(document.body, CookiebotConsentBannerId);

		return true;
	}

	async function destroyConsentPage(ref: HTMLElement) {
		const scriptEl = document.getElementById(CookiebotConsentPageId);

		if (scriptEl) {
			await removeScript(ref, CookiebotConsentPageId);
		}
	}

	async function resetConsentBanner() {
		await destroyConsentBanner();

		consentBanner();
	}

	return {
		consentBanner,
		destroyConsentBanner,
		resetConsentBanner,
		consentPage,
		destroyConsentPage,
	};
}
