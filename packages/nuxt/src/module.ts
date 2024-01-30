// Vendor
import { useLogger, type PluginOptions } from '@ambitiondev/cookiebot-common';
import { addPlugin, addTemplate, createResolver, defineNuxtModule, isNuxt2 } from '@nuxt/kit';

// Package
import { name, version } from '../package.json';

export interface ModuleOptions extends PluginOptions {
	autoConsentBanner: boolean;
}

export default defineNuxtModule<ModuleOptions>({
	meta: {
		name,
		version,
		configKey: 'cookiebot',
		compatibility: {
			nuxt: '^3.0.0',
		},
	},
	// Default configuration options of the Nuxt module
	defaults: {
		autoConsentBanner: true,
		cookieBotId: '',
	},
	setup(options, nuxt) {
		const { error } = useLogger();
		const resolver = createResolver(import.meta.url);

		// Inject options via virtual template
		nuxt.options.alias['#cookiebot-options'] = addTemplate({
			filename: 'cookiebot-options.mjs',
			getContents: () =>
				Object.entries(options)
					.map(
						([key, value]) =>
							`export const ${key} = ${JSON.stringify(value, null, 2)}
      `
					)
					.join('\n'),
		}).dst;

		if (isNuxt2()) {
			return error('Nuxt 2 is not supported. Aborting...');
		}

		addPlugin({
			src: resolver.resolve('./runtime/plugin'),
		});
	},
});
