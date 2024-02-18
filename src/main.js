import './assets/main.css'
import tableConfig from '@/table-config.json';

import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia';

apps.forEach(appConfig => {
    const pinia = createPinia();
    pinia.use(({store}) => {
        store.$appData =  {...appConfig, ...tableConfig};
    })
    const app = createApp(App);
    app.config.globalProperties.$tableConfig = {...appConfig, ...tableConfig};
    app.use(pinia);
    app.mount(appConfig.appId);
});
