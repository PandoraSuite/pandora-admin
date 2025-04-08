import { createRouter, createWebHistory } from 'vue-router';
import AboutView from './views/AboutView.vue';
import LoginView from './views/Login/index.vue';
import CreatePasswordView from './views/Login/createPassword.vue';

const routes = [
  { path: '/about', component: AboutView },
  { path: '/login', component: LoginView },
  { path: '/create-password', component: CreatePasswordView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
