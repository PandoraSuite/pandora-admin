import { createPinia } from 'pinia';
import { createApp } from 'vue';

import App from './App.vue';
import FontAwesomeIcon from './plugins/fontawesome';
import router from './router/index';
import './style.css';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');
