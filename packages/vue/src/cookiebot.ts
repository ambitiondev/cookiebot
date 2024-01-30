// Vendor
import { computed, inject, ref } from 'vue';
import {
	type CookiebotOptions,
	type PluginOptions,
	useLogger,
	consentBannerURL,
	cookieDeclarationURL,
	CB_NAME,
	CD_NAME,
} from '@ambitiondev/cookiebot-common';

// Composable
import { useScriptHelper } from './script';

export function useCookiebot(settings?: Partial<CookiebotOptions>) {
	// Composable
	const { createScriptWithOptions, removeScript } = useScriptHelper();
	const { info, error, warn } = useLogger();

	const pluginOptions = inject<Partial<PluginOptions>>('cookieBotOptions', {});
	const _options = {
		...pluginOptions,
		...settings,
	};

	if (typeof _options.cookieBotId === 'undefined') {
		error(
			'No settings have been found. Did you forget to instantiate the plugin in your app definition (app.use(...))?'
		);
	}

	// Computed
	const processingCB = ref<boolean>(false);
	const processingCP = ref<boolean>(false);
	const cbUrlSettings = computed(() =>
		consentBannerURL({
			..._options,
			cookieBotId: _options.cookieBotId || '',
		})
	);

	async function consentBanner() {
		if (processingCB.value) {
			return warn('Processing request. Aborting...');
		}

		processingCB.value = true;

		if (document.getElementById(CB_NAME) !== null) {
			return info('Consent banner already initialized. Skipping...');
		}

		const script = await createScriptWithOptions(
			[
				{
					name: 'id',
					value: CB_NAME,
				},
			],
			cbUrlSettings.value
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

		if (!_options.cookieBotId) {
			return error('No Cookiebot ID found. Please set a valid ID');
		}

		if (
			document.getElementById(CD_NAME) !== null ||
			document.querySelector(`[data-cp-id=${CD_NAME}]`) !== null
		) {
			return info('Consent page already initialized. Skipping...');
		}

		const _settings = [
			{
				name: 'data-cp-id',
				value: CD_NAME,
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
			cookieDeclarationURL(_options.cookieBotId),
			true
		);

		await ref.appendChild(script);

		processingCP.value = false;

		return processingCP.value;
	}

	async function destroyConsentBanner() {
		await removeScript(document.body, CB_NAME);

		return true;
	}

	async function destroyConsentPage(ref: HTMLElement) {
		const scriptEl = document.getElementById(CD_NAME);
		const createdScriptEl = document.querySelector<HTMLScriptElement>(
			`[data-cp-id=${CD_NAME}]`
		);

		if (scriptEl) {
			await removeScript(ref, CD_NAME);
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
