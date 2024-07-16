// Vendor
import { computed, useServerHead, useNuxtApp, type MaybeRef } from '#imports';
import {
    CB_NAME,
    consentBannerURL,
    useLogger,
    type CookiebotComposable,
    type CookiebotOptions,
    type PluginOptions,
} from '@ambitiondev/cookiebot-common';
import { useCookiebot as useVueCookiebot } from '@ambitiondev/vue-cookiebot';

// Module imports
import * as pluginOptions from '#cookiebot-options';

export function useCookiebot(settings?: Partial<CookiebotOptions>): CookiebotComposable {
    const nuxt = useNuxtApp();
    const { deprecationNotice, error } = useLogger();
    const _options = {
        ...pluginOptions,
        settings,
    } as PluginOptions;

    const culture = computed(() =>
        // @ts-expect-error - i18n is not typed in this context
        '$i18n' in nuxt && 'locale' in nuxt.$i18n ? (nuxt.$i18n.locale.value as string) : undefined
    );

    const vueCookiebot = useVueCookiebot({
        ..._options,
        culture: culture.value || _options.culture,
    });

    async function consentBanner() {
        useServerHead(
            {
                script: [
                    {
                        id: CB_NAME,
                        src: consentBannerURL({
                            culture: culture.value,
                            ..._options,
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

    function renew() {
        import.meta.client && window instanceof Window && 'Cookiebot' in window
            ? window.Cookiebot.renew()
            : error('Not able to renew consent. Cookiebot instance is not defined.');
    }

    return {
        consentBanner,
        consentPage,
        cookieDeclaration,
        destroyConsentBanner,
        destroyConsentPage,
        destroyCookieDeclaration,
        renew,
        resetConsentBanner,
    };
}
