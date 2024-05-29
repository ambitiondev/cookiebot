// Vendor
import { useLogger, type PluginOptions } from '@ambitiondev/cookiebot-common';
import {
    addImports,
    addPlugin,
    addTemplate,
    createResolver,
    defineNuxtModule,
    isNuxt2,
} from '@nuxt/kit';

// Package
import { name, version } from '../package.json';

export interface ModuleOptions extends PluginOptions {
    /**
     * Configure if the consent banner should be shown automatically. Defaults to `true`.
     * Override this behaviour if you would like to add stateful logic to the consent banner.
     *
     * Locale from `nuxt-i18n` is detected automatically to set culture for your Cookiebot implementation.
     */
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
    async setup(options, nuxt) {
        const { error } = useLogger();
        const { resolve } = createResolver(import.meta.url);
        const runtimeDir = await resolve('./runtime');

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
            src: resolve(runtimeDir, 'plugin'),
        });

        addImports({
            name: 'useCookiebot',
            as: 'useCookiebot',
            from: resolve(runtimeDir, 'composable'),
        });
    },
});
