// Vendor
import { createI18n } from 'vue-i18n';

export const i18n = createI18n({
	locale: 'en',
	legacy: false,
	messages: {
		en: {
			welcome: 'Welcome to the sandbox in locale {locale}',
		},
	},
});
