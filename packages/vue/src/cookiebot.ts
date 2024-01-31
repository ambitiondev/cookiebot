// Vendor
import {
	CB_NAME,
	CD_NAME,
	consentBannerURL,
	cookieDeclarationURL,
	useLogger,
	type CookiebotComposable,
	type CookiebotOptions,
	type PluginOptions,
} from '@ambitiondev/cookiebot-common';
import { computed, inject, ref, unref, type MaybeRef } from 'vue';

// Composable
import { useScriptHelper } from './script';

export function useCookiebot(settings?: Partial<CookiebotOptions>): CookiebotComposable {
	// Composable
	const { createScriptWithOptions, removeScript } = useScriptHelper();
	const { deprecationNotice, info, error, warn } = useLogger();

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
	const processingCD = ref<boolean>(false);
	const bannerURL = computed(() =>
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
			bannerURL.value
		);

		await document.body.appendChild(script);

		processingCB.value = false;
	}

	/** @deprecated */
	async function consentPage(ref: MaybeRef<HTMLElement | null>) {
		deprecationNotice('consentPage', 'cookieDeclaration');

		cookieDeclaration(ref);
	}

	async function cookieDeclaration(ref: MaybeRef<HTMLElement | null>) {
		const _ref = unref(ref);

		if (processingCD.value) {
			return warn('Processing request. Aborting...');
		}

		processingCD.value = true;

		if (!_ref) {
			return warn(
				'No HTML element or element ref is given to inject cookie declaration script. Skipping...'
			);
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

		await _ref.appendChild(script);

		processingCD.value = false;
	}

	async function destroyConsentBanner() {
		await removeScript(document.body, CB_NAME);
	}

	/** @deprecated */
	async function destroyConsentPage(ref: MaybeRef<HTMLElement | null>) {
		deprecationNotice('destroyConsentPage', 'destroyCookieDeclaration');

		destroyCookieDeclaration(ref);
	}

	async function destroyCookieDeclaration(ref: MaybeRef<HTMLElement | null>) {
		const _ref = unref(ref);

		if (!_ref) {
			return error('No HTML element or element ref is given. Aborting...');
		}

		const scriptEl = document.getElementById(CD_NAME);
		const createdScriptEl = document.querySelector<HTMLScriptElement>(
			`[data-cp-id=${CD_NAME}]`
		);

		if (scriptEl) {
			await removeScript(_ref, CD_NAME);
		}

		if (createdScriptEl) {
			await removeScript(_ref, createdScriptEl);
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
