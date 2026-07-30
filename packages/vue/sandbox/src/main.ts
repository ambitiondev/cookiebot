import "./assets/main.css";

import { createApp } from "vue";
import { cookieBot } from "../../src/plugin";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(router);
app.use(cookieBot, {
  cookiebotId: import.meta.env.VITE_COOKIEBOT_ID,
});

app.mount("#app");
