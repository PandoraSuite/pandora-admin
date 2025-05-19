import type { RouteRecordRaw } from 'vue-router';

import ClientProjects from '@views/Clients/components/ClientProjects.vue';
import ClientsList from '@views/Clients/components/ClientsList.vue';
import ClientsView from '@views/Clients/index.vue';
import ProjectByID from '@views/Clients/components/ProjectByID.vue';

const ClientsListRoute: RouteRecordRaw[] = [
  {
    path: '',
    name: 'Clients',
    component: ClientsView,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'clients',
        name: 'Clients-List',
        component: ClientsList,
        meta: { requiresAuth: true },
        props: true,
      },
      {
        path: 'clients/:id/projects',
        name: 'Client-Projects',
        component: ClientProjects,
        meta: { requiresAuth: true },
        props: true,
      },
      {
        path: 'clients/:id/projects/:project_id',
        name: 'Project-By-Id',
        component: ProjectByID,
        meta: { requiresAuth: true },
        props: true,
      },
    ],
  },
];

export default ClientsListRoute;
