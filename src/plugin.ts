// Vendor
import { App } from 'vue';

// Types
import { PluginOptions } from './@types/cookiebot';

const cookieBot = {
	install: (app: App, options: PluginOptions) => {
		app.provide('cookieBotOptions', options);
	},
};

export { cookieBot };
