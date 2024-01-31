export default defineI18nConfig(() => ({
	legacy: false,
	locale: 'en',
	availableLocales: ['en', 'nl'],
	messages: {
		en: {
			welcome: 'Welcome',
		},
		nl: {
			welcome: 'Welkom',
		},
	},
}));
