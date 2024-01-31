<script setup lang="ts">
	// Vendor
	import { useI18n } from 'vue-i18n';

	// Composable
	const { t, locale } = useI18n();
</script>

<template>
	<div>
		{{
			t('welcome', {
				locale,
			})
		}}
	</div>
</template>
