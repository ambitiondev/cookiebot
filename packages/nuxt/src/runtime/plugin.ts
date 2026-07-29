// Vendor
import { CB_NAME, consentBannerURL, useLogger } from '@ambitiondev/cookiebot-common';

// App imports
import { defineNuxtPlugin, useRouter, useRuntimeConfig } from '#app';
import { useServerHead } from '#imports';

// Module Imports
import * as pluginOptions from '#cookiebot-options';

export default defineNuxtPlugin((nuxt) => {
    const defaultLocale =
        // @ts-expect-error - i18n is not typed in this context
        '$i18n' in nuxt && 'locale' in nuxt.$i18n ? (nuxt.$i18n.locale.value as string) : undefined;
    const router = useRouter();
    const { error } = useLogger();
    const runtimeConfig = useRuntimeConfig();

    const { autoConsentBanner, culture = defaultLocale, ...rest } = pluginOptions;
    const cookieBotId = runtimeConfig.public.cookiebot.id;

    if (!cookieBotId?.length) {
        return error('No Cookiebot ID given. Aborting...');
    }

    if (autoConsentBanner) {
        useServerHead(
            {
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
            },
            {
                tagPosition: 'head',
                tagPriority: 'critical',
            }
        );
    }

    if (import.meta.client) {
        router.afterEach(() => {
            if (window instanceof Window && 'Cookiebot' in window) {
                window.requestAnimationFrame(() => {
                    window.Cookiebot.runScripts();
                });
            }
        });
    }
});
