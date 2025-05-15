import type { RouteRecordRaw } from 'vue-router';

import ClientsView from '@views/Clients/index.vue';
import ClientProjects from '@views/Clients/components/ClientProjects.vue';

const ClientsListRoute: RouteRecordRaw[] = [
  {
    path: '/clients',
    name: 'Clients',
    component: ClientsView,
    meta: { requiresAuth: true },
  },
  {
      path: '/clients/:id/projects',
      name: 'Client-Projects',
      component: ClientProjects,
      meta: { requiresAuth: true },
      props: true,
    },
];

export default ClientsListRoute;
