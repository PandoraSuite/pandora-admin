import { createRouter, createWebHistory } from 'vue-router';
import AboutView from './views/AboutView.vue';

const routes = [
  { path: '/about', component: AboutView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
