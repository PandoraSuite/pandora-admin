import { createRouter, createWebHistory } from 'vue-router';
import AboutView from './views/AboutView.vue';
import LoginView from './views/Login/index.vue';
import ResetPasswordView from './views/Login/components/resetPassword.vue';

const routes = [
  { path: '/about', component: AboutView },
  { path: '/login', component: LoginView },
  { path: '/reset-password', component: ResetPasswordView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
