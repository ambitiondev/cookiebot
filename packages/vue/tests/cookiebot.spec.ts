// Vendor
import { CB_NAME, CD_NAME } from '@ambitiondev/cookiebot-common';
import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { defineComponent, ref } from 'vue';

// Local
import { cookieBot, useCookiebot } from '../src';

const CookiebotComponent = defineComponent({
    template: '<div ref="cdElement"></div>',
    name: 'CookiebotComponent',
    expose: [
        'consentBanner',
        'cookieDeclaration',
        'cdElement',
        'destroyConsentBanner',
        'destroyCookieDeclaration',
        'renew',
    ],
    setup() {
        const cdElement = ref<HTMLDivElement | null>(null);

        const {
            destroyConsentBanner,
            destroyCookieDeclaration,
            consentBanner,
            cookieDeclaration,
            renew,
        } = useCookiebot();

        function handleCookieDeclaration() {
            if (cdElement.value) {
                cookieDeclaration(cdElement.value);
            }
        }

        function handleDestroyCookieDeclaration() {
            if (cdElement.value) {
                destroyCookieDeclaration(cdElement.value);
            }
        }

        return {
            consentBanner,
            cookieDeclaration: handleCookieDeclaration,
            cdElement,
            destroyConsentBanner,
            destroyCookieDeclaration: handleDestroyCookieDeclaration,
            renew,
        };
    },
});

describe('Cookiebot - composable', () => {
    beforeEach(() => {
        const cbEl = document.getElementById(CB_NAME);

        if (cbEl) {
            cbEl.remove();
        }
    });

    it('Injects consent banner accordingly', async () => {
        const wrapper = await mount(CookiebotComponent, {
            global: {
                plugins: [
                    [
                        cookieBot,
                        {
                            cookieBotId: import.meta.env.VITE_COOKIEBOT_ID,
                        },
                    ],
                ],
            },
        });

        await wrapper.vm.consentBanner();

        await wrapper.vm.$nextTick();
        await wrapper.vm.$nextTick();

        const cbScriptTag = document.getElementById(CB_NAME) as HTMLScriptElement | null;

        expect(cbScriptTag?.src).toContain(import.meta.env.VITE_COOKIEBOT_ID);
    });

    it('Injects cookiedeclaration accordingly', async () => {
        const wrapper = await mount(CookiebotComponent, {
            global: {
                plugins: [
                    [
                        cookieBot,
                        {
                            cookieBotId: import.meta.env.VITE_COOKIEBOT_ID,
                        },
                    ],
                ],
            },
        });

        await wrapper.vm.cookieDeclaration();

        await wrapper.vm.$nextTick();
        await wrapper.vm.$nextTick();

        const cdScriptTag = wrapper.find('[data-cp-id]');

        expect(cdScriptTag.attributes('src')).toContain(import.meta.env.VITE_COOKIEBOT_ID);
        expect(cdScriptTag.attributes('data-cp-id')).toContain(CD_NAME);
    });

    it('Destroys consent banner', async () => {
        const wrapper = await mount(CookiebotComponent, {
            global: {
                plugins: [
                    [
                        cookieBot,
                        {
                            cookieBotId: import.meta.env.VITE_COOKIEBOT_ID,
                        },
                    ],
                ],
            },
        });

        await wrapper.vm.consentBanner();

        await wrapper.vm.$nextTick();
        await wrapper.vm.$nextTick();

        expect(document.getElementById(CB_NAME)?.id).toBeDefined();

        await wrapper.vm.destroyConsentBanner();

        expect(document.getElementById(CB_NAME)?.id).toBeUndefined();
    });

    it('Destroys cookiedeclaration and empties context', async () => {
        const wrapper = await mount(CookiebotComponent, {
            global: {
                plugins: [
                    [
                        cookieBot,
                        {
                            cookieBotId: import.meta.env.VITE_COOKIEBOT_ID,
                        },
                    ],
                ],
            },
        });

        await wrapper.vm.cookieDeclaration();

        await wrapper.vm.$nextTick();
        await wrapper.vm.$nextTick();

        expect(wrapper.find('[data-cp-id]').exists()).toBeTruthy();

        await wrapper.vm.destroyCookieDeclaration();

        expect(wrapper.find('[data-cp-id]').exists()).toBeFalsy();

        expect(wrapper.html()).toEqual('<div></div>');
    });

    it('Triggers an error when no cookiebot id is given', async () => {
        const spy = vi.spyOn(console, 'error');

        const wrapper = await mount(CookiebotComponent, {
            global: {
                plugins: [[cookieBot]],
            },
        });

        expect(spy).toHaveBeenCalledWith(expect.stringContaining('Cookiebot plugin error:'));
    });

    it('Triggers a notice when consent banner is already present', async () => {
        const spy = vi.spyOn(console, 'info');

        const wrapper = await mount(CookiebotComponent, {
            global: {
                plugins: [
                    [
                        cookieBot,
                        {
                            cookieBotId: import.meta.env.VITE_COOKIEBOT_ID,
                        },
                    ],
                ],
            },
        });

        await wrapper.vm.consentBanner();

        await wrapper.vm.$nextTick();
        await wrapper.vm.$nextTick();

        await wrapper.vm.consentBanner();

        expect(spy).toHaveBeenCalledWith(
            expect.stringContaining('Consent banner already initialized')
        );
    });

    it('Triggers an error when Cookiebot cannot renew', async () => {
        const spy = vi.spyOn(console, 'error');

        const wrapper = await mount(CookiebotComponent, {
            global: {
                plugins: [[cookieBot]],
            },
        });

        await wrapper.vm.$nextTick();
        await wrapper.vm.$nextTick();

        await wrapper.vm.renew();

        expect(spy).toHaveBeenNthCalledWith(2, expect.stringContaining('Not able to renew'));
    });

    it('Does not execute scripts double when processing', async () => {
        const spy = vi.spyOn(console, 'warn');

        const wrapper = await mount(CookiebotComponent, {
            global: {
                plugins: [
                    [
                        cookieBot,
                        {
                            cookieBotId: import.meta.env.VITE_COOKIEBOT_ID,
                        },
                    ],
                ],
            },
        });

        await wrapper.vm.$nextTick();
        await wrapper.vm.$nextTick();

        await wrapper.vm.consentBanner();
        await wrapper.vm.consentBanner();
        await wrapper.vm.consentBanner();

        await wrapper.vm.cookieDeclaration();
        await wrapper.vm.cookieDeclaration();
        await wrapper.vm.cookieDeclaration();

        expect(spy.mock.calls.length).toBeGreaterThanOrEqual(2);
    });
});
