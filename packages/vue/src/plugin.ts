// Vendor
import { App } from 'vue';

// Types
import type { PluginOptions } from '@ambitiondev/cookiebot-common';

const cookieBot = {
	install: (app: App, options: PluginOptions) => {
		app.provide('cookieBotOptions', options);
	},
};

export { cookieBot };
