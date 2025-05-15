import type { RouteRecordRaw } from 'vue-router';

import ClientProjects from '@views/Clients/components/ClientProjects.vue';
import ClientsView from '@views/Clients/index.vue';
import ClientsList from '@views/Clients/components/ClientsList.vue';

const ClientsListRoute: RouteRecordRaw[] = [
  {
    path: '',
    name: 'Clients',
    component: ClientsView,
    meta: { requiresAuth: true },
    children: [
      {
        path: '/clients/:id/projects',
        name: 'Client-Projects',
        component: ClientProjects,
        meta: { requiresAuth: true },
        props: true,
      },
      {
        path: '/clients',
        name: 'Clients-List',
        component: ClientsList,
        meta: { requiresAuth: true },
        props: true,
      },
    ],
  },
];

export default ClientsListRoute;
