import type { RouteRecordRaw } from 'vue-router';

import ServicesView from '@views/Services/index.vue';
import ServicesList from '@views/Services/components/ServicesList.vue';

const ServicesListRoute: RouteRecordRaw[] = [
  {
    path: '',
    name: 'Services',
    component: ServicesView,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'services',
        name: 'Services-List',
        component: ServicesList,
        meta: { requiresAuth: true },
        props: true,
      },
    ],
  },
];

export default ServicesListRoute;
