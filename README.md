# Vue Cookiebot composable

This project contains some simple functionality to add the Cookiebot consent banner to your Vue application.

## Installation

Add the package to your project `npm i @ambitiondev/vue-cookiebot`

### Usage

#### Consent banner

```
<script setup>
import { useCookiebot } from '@ambitiondev/vue-cookiebot';

// You can provide optional settings for consent banner
const { consentBanner } = useCookiebot('COOKIEBOT_ID_HERE', {
    culture: 'en'
});

// Init consent banner
consentBanner();
<script>

<template>
...
</template>
```

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

	onMounted(() => {
		if (cookieConsentContent.value) {
			consentPage(cookieConsentContent.value);
		}
	});
</script>

<template>
    <div ref="cookieConsentContent"></div>
</template>
```
