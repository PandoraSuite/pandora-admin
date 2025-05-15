import type { RouteRecordRaw } from 'vue-router';

import Header from '@components/Header.vue';
import Layout from '@components/Layout.vue';
import Sidebar from '@components/Sidebar.vue';
import ClientsListRoute from './clientsView';
import ProjectsListRoute from './projectsView';
import ServicesListRoute from './servicesView';

const LayoutRoute: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Layout',
    components: {
      default: Layout,
      Header: Header,
      Sidebar: Sidebar,
    },
    meta: { requiresAuth: true },
    children: [...ServicesListRoute, ...ClientsListRoute, ...ProjectsListRoute],
  },
];

export default LayoutRoute;
