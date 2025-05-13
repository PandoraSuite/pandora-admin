import type { RouteRecordRaw } from 'vue-router';

import ClientsView from '@views/Clients/index.vue';
import ClientProjects from '@views/Clients/components/ClientProjects.vue';

const ClientsListRoute: RouteRecordRaw[] = [
  {
    path: '/clients',
    name: 'Clients',
    component: ClientsView,
    meta: { requiresAuth: true },
    children: [
      {path: 'client-projects', name: 'Client-Projects', component: ClientProjects, props: true}
    ],
  },
];

export default ClientsListRoute;
