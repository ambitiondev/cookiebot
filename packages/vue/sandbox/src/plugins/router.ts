// Vendor
import { createRouter, createWebHistory } from 'vue-router';

// Views
import HomePage from '../views/HomePage.vue';
import ConsentPage from '../views/ConsentPage.vue';

export const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			component: HomePage,
		},
		{
			path: '/consentpage',
			component: ConsentPage,
		},
	],
});
