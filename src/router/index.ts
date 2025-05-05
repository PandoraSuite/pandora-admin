import { useAuthStore } from '@store/useAuthStore';
import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from 'vue-router';

import LayoutRoute from './modules/layout';
import LoginRoute from './modules/login';

const routes: RouteRecordRaw[] = [...LayoutRoute, ...LoginRoute];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// GLOBAL NAVIGATION GUARD
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isAuthenticated = authStore.isAuthenticated;
  if (requiresAuth && !isAuthenticated) next({ path: '/login' });
  else next();
});

export default router;
