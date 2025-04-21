import type { RouteRecordRaw } from 'vue-router';

import Header from '@components/Header.vue';
import Layout from '@components/Layout.vue';
import Sidebar from '@components/Sidebar.vue';
import AboutRoute from './about';
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
    children: [...AboutRoute, ...ServicesListRoute],
  },
];

export default LayoutRoute;
