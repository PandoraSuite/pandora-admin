import type { RouteRecordRaw } from 'vue-router';

import ClientsView from '@views/Clients/index.vue';

const ClientsListRoute: RouteRecordRaw[] = [
  {
    path: '/clients',
    name: 'Clients',
    components: {
      default: ClientsView,
    },
    meta: { requiresAuth: true },
  },
];

export default ClientsListRoute;
