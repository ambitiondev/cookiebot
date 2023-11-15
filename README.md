# Vue Cookiebot composable

This project contains some simple functionality to add the Cookiebot consent banner to your Vue application.

## Installation

Add the package to your project `npm i @ambitiondev/vue-cookiebot`

### Usage

#### Consent banner

```
<script setup>
import { onMounted } from 'vue';
import { useCookiebot } from '@ambitiondev/vue-cookiebot';

// You can provide optional settings for consent banner
const { consentBanner } = useCookiebot('COOKIEBOT_ID_HERE', {
    culture: 'en'
});

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

	const { consentPage } = useCookiebot('COOKIEBOT_ID_HERE', {
		culture: 'en',
	});

	const cookieConsentContent = ref(null);

	onMounted(async () => {
		if (cookieConsentContent.value) {
			await consentPage(cookieConsentContent.value);

			... rest of your code here
		}
	});
</script>

<template>
    <div ref="cookieConsentContent"></div>
</template>
```
