import type { RouteRecordRaw } from 'vue-router';

import Header from '@components/Header.vue';
import Layout from '@components/Layout.vue';
import Sidebar from '@components/Sidebar.vue';
import AboutRoute from './about';
import ClientsListRoute from './clientsList';
import ProjectsListRoute from './projectsList';
import ServicesListRoute from './servicesList';

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
    children: [
      ...AboutRoute,
      ...ServicesListRoute,
      ...ClientsListRoute,
      ...ProjectsListRoute,
    ],
  },
];

export default LayoutRoute;
