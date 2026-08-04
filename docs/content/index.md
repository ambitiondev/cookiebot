---
navigation: false
seo:
  title: Welcome to the Cookiebot plugin documentation
  description: Easily integrate Cookiebot into your Vue / Nuxt application. Manage cookies and consent efficiently while staying compliant with privacy regulations.
---

::u-page-hero
#title
Use the power of Cookiebot in your application.

#description
Easily integrate Cookiebot into your Vue / Nuxt application. Manage cookies and consent efficiently while staying compliant with privacy regulations.

#links
  :::u-button
  ---
  color: neutral
  size: xl
  to: /getting-started/introduction
  trailing-icon: i-lucide-arrow-right   
  ---
  Get started
  :::

  :::u-button
  ---
  color: neutral
  icon: simple-icons-github
  size: xl
  target: _blank
  to: https://github.com/ambitiondev/cookiebot
  variant: outline
  ---
  Star on GitHub
  :::
::

::u-page-section
---
orientation: horizontal
---
:::code-group

```typescript [vue]
// Vendor
import { cookieBot } from '@ambitiondev/vue-cookiebot';
import { createApp } from 'vue';

// Components
import App from './App.vue';

const app = createApp(App);

app.use(cookieBot, {
  cookiebotId: 'COOKIEBOT_ID_HERE',
});

app.mount('#app');
```

```typescript [nuxt]
export default defineNuxtConfig({
  modules: ["@ambitiondev/nuxt-cookiebot"],
  cookiebot: {
    cookiebotId: 'COOKIEBOT_ID_HERE',
  },
});
```
:::
#title
Easy setup and configuration

#description
Integrating Cookiebot into your Vue / Nuxt application is a breeze. With just a few simple steps, you can have Cookiebot up and running in no time.
::

::u-page-section
#title
Shipped with awesome features

#features
  :::u-page-feature
  ---
  icon: i-simple-icons-nuxt
  ---
  #title
  Optimized for [Nuxt 4+]{.text-primary}
  
  #description
  Optimized for SSR with fast and efficient script rendering.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-settings
  ---
  #title
  Highly configurable
  
  #description
  Easily configurable through global settings that are overrideable with in-app (stateful) logic.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-languages
  target: _blank
  to: https://content.nuxt.com
  ---
  #title
  Support for Vue/Nuxt i18n
  
  #description
  Out of the box support to pick up the culture for your Cookiebot based on i18n locale settings.
  :::
::
