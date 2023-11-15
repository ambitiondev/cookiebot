// Vendor
import { computed, ref } from 'vue';
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
	const { info, error, warn } = useLogger('Cookiebot plugin');

	// Computed
	const processingCB = ref<boolean>(false);
	const processingCP = ref<boolean>(false);
	const cbUrlSetings = computed(
		() =>
			`cbid=${id}${settings?.culture ? `&culture=${settings.culture}` : ''}${
				settings?.blockingMode ? `&blockingmode=${settings.blockingMode}` : ''
			}`
	);

	async function consentBanner() {
		if (processingCB.value) {
			return warn('Processing request. Aborting...');
		}

		processingCB.value = true;

		if (document.getElementById(CookiebotConsentBannerId) !== null) {
			return info('Consent banner already initialized. Skipping...');
		}

		const script = await createScriptWithOptions(
			[
				{
					name: 'id',
					value: CookiebotConsentBannerId,
				},
			],
			`https://consent.cookiebot.com/uc.js?${cbUrlSetings.value}`
		);

		await document.body.appendChild(script);

		processingCB.value = false;

		return processingCB.value;
	}

	async function consentPage(ref: HTMLElement) {
		if (processingCP.value) {
			return warn('Processing request. Aborting...');
		}

		processingCP.value = true;

		if (!ref) {
			return error('No HTML element ref is given. Aborting...');
		}

		if (
			document.getElementById(CookiebotConsentPageId) !== null ||
			document.querySelector(`[data-cp-id=${CookiebotConsentPageId}]`) !== null
		) {
			return info('Consent page already initialized. Skipping...');
		}

		const _settings = [
			{
				name: 'data-cp-id',
				value: CookiebotConsentPageId,
			},
		];

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

		await ref.appendChild(script);

		processingCP.value = false;

		return processingCP.value;
	}

	async function destroyConsentBanner() {
		await removeScript(document.body, CookiebotConsentBannerId);

		return true;
	}

	async function destroyConsentPage(ref: HTMLElement) {
		const scriptEl = document.getElementById(CookiebotConsentPageId);
		const createdScriptEl = document.querySelector<HTMLScriptElement>(
			`[data-cp-id=${CookiebotConsentPageId}]`
		);

		if (scriptEl) {
			await removeScript(ref, CookiebotConsentPageId);
		}

		if (createdScriptEl) {
			await removeScript(ref, createdScriptEl);
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
