import type { RouteRecordRaw } from 'vue-router';

import DashboardView from '@views/Dashboard/index.vue';

const DashboardRoute: RouteRecordRaw[] = [
  {
    path: '/home',
    name: 'Dashboard',
    component: DashboardView,
    meta: { requiresAuth: true },
    children: [],
  },
];

export default DashboardRoute;
