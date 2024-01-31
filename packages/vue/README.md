# Vue Cookiebot composable

This project contains some simple functionality to add the Cookiebot consent banner to your Vue application.

## Installation

Add the package to your project `npm i @ambitiondev/vue-cookiebot`

## Basic Usage

#### Install plugin

First you'll need to install the plugin globally to use the cookiebot composable:

```
main.ts

// Vendor
import { createApp } from 'vue';
import { cookieBot } from '@ambitiondev/vue-cookiebot';

// Components
import App from './App.vue';

createApp(App)
	.use(cookieBot, {
		cookieBotId: 'COOKIEBOT_ID_HERE',
	})
	.mount('#app');
```

After this, you can use the consent banner and consent page methods like so:

#### Consent banner

```
<script setup>
import { onMounted } from 'vue';
import { useCookiebot } from '@ambitiondev/vue-cookiebot';

// You can provide optional settings for consent banner
const { consentBanner } = useCookiebot();

// Init consent banner
onMounted(() => {
	consentBanner();

	... rest of your code here
})
<script>

<template>
...
</template>
```

<div style="background-color: #D5E7FB; color: #0E4B90;padding:1rem;">
	<h4 style="margin: 0;">Recommended: always add the consentBanner at the highest level (e.g. App.vue)</h4>
</div>

#### Consent page

```
<script setup>
	// Vendor
	import { onMounted, ref } from 'vue';
	import { useCookiebot } from '@ambitiondev/vue-cookiebot';

	const { consentPage } = useCookiebot();

	const cookieConsentContent = ref(null);

	onMounted(() => {
		if (cookieConsentContent.value) {
			consentPage(cookieConsentContent.value);

			... rest of your code here
		}
	});
</script>

<template>
    <div ref="cookieConsentContent"></div>
</template>
```

## Advanced usage

In each instance of the `useCookiebot` composable, you can override the settings (except the cookieBotId). This can be useful to use the culture prop from the i18n locale for example:

```
// Vendor
import { useCookiebot } from '@ambitiondev/vue-cookiebot';
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

// Composable
const { locale } = useI18n();
const { consentBanner } = useCookiebot({
	culture: locale.value,
});

onMounted(() => {
	consentBanner();
});
```

## Available settings

For more detailed documentation visit the [developer reference from Cookiebot][cb_dev]

<table>
    <thead>
        <tr>
            <td>
                Name
            </td>
            <td>
                Type
            </td>
            <td style="width: 65%;">
                description
            </td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                blockingMode
            </td>
            <td>
                'auto' | 'none'
            </td>
            <td>
                Defines if Cookiebot should automatically block all cookies until a user has consented, value: “auto”. If not, (value: “none”) cookie-setting scripts should manually be marked up as described in our manual implementation guide. If you omit this attribute, behavior will equal value: “none”.
            </td>
        </tr>
		<tr>
            <td>
                consentMode
            </td>
            <td>
                boolean
            </td>
            <td>
                Allows you to disable Google Consent Mode when setting to true.
            </td>
        </tr>
			<tr>
            <td>
                cookieBotId*
            </td>
            <td>
				string
            </td>
            <td>
				The id of your cookiebot env. This is required to make your consent banner and content page work. 
            </td>
        </tr>
		<tr>
            <td>
                culture
            </td>
            <td>
                string
            </td>
            <td>
                Set a specific language to the cookiebot consent banner and content page. You must configure this in your Cookiebot environment as well.
            </td>
        </tr>
		<tr>
            <td>
                level
            </td>
            <td>
                'implied' | 'strict'
            </td>
            <td>
                Overrides the default consent method with one of the following values: “implied”, “strict”
            </td>
        </tr>
		<tr>
            <td>
                type
            </td>
            <td>
				'optin' | 'optout' | 'optinout' | 'leveloptin' | 'inlineoptin' | 'optionaloptin'
            </td>
            <td>
                Overrides the default dialog type.
            </td>
        </tr>
    </tbody>
</table>

[cb_dev]: https://www.cookiebot.com/en/developer/
