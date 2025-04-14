import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";

import LayoutRoute from "./modules/layout";
import LoginRoute from "./modules/login";

const routes: RouteRecordRaw[] = [...LayoutRoute, ...LoginRoute];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
