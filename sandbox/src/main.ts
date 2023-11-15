// Vendor
import { createApp } from 'vue';

// Plugins
import { i18n } from './plugins/i18n';
import { router } from './plugins/router';

// Components
import App from './App.vue';

createApp(App).use(i18n).use(router).mount('#app');
