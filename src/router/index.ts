import { createRouter, createWebHistory } from "vue-router";

import LayoutRoute from "./modules/layout";
import LoginRoute from "./modules/login";


const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...LayoutRoute,
    ...LoginRoute
  ],
});

export default router;
