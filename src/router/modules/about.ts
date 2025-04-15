import type { RouteRecordRaw } from 'vue-router';

import AboutView from '@views/AboutView.vue';

const AboutRoute: RouteRecordRaw[] = [
  {
    path: '/about',
    name: 'About',
    components: {
      default: AboutView,
    },
    meta: { requiresAuth: true },
  },
];

export default AboutRoute;
