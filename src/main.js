import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia';

apps.forEach(appConfig => {
    const pinia = createPinia();
    const app = createApp(App);
    app.config.globalProperties.$tableConfig = appConfig;
    app.use(pinia);
    app.mount(appConfig.appId);
});
