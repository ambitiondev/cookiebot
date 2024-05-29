// Vendor
import { App } from 'vue';

// Types
import type { PluginOptions } from '@ambitiondev/cookiebot-common';

const cookieBot = {
    install: (app: App, options: PluginOptions) => {
        app.provide('cookieBotOptions', options);

        requestAnimationFrame(() => {
            if (typeof app.config.globalProperties.$router === 'object') {
                app.config.globalProperties.$router.afterEach(() => {
                    if ('Cookiebot' in window) {
                        requestAnimationFrame(() => {
                            window.Cookiebot.runScripts();
                        });
                    }
                });
            }
        });
    },
};

export { cookieBot };
