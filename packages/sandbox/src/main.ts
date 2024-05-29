import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { cookieBot } from '@ambitiondev/vue-cookiebot';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(cookieBot, {
    cookieBotId: import.meta.env.VITE_COOKIEBOT_ID,
});

app.mount('#app');
