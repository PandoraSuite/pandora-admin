import type { RouteRecordRaw } from 'vue-router';

import ClientProjects from '@views/Clients/components/ClientProjects.vue';

const ClientProjectsRoute: RouteRecordRaw[] = [
  {
    path: '/clients/:id/projects',
    name: 'Client-Projects',
    component: ClientProjects,
    meta: { requiresAuth: true },
    props: true,
  },
];

export default ClientProjectsRoute;
