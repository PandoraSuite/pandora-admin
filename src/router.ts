import { createRouter, createWebHistory } from 'vue-router';
import AboutView from './views/AboutView.vue';
import LoginView from './views/Login/index.vue';

const routes = [
  { path: '/about', component: AboutView },
  { path: '/login', component: LoginView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
