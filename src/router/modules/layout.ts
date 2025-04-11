import type { RouteRecordRaw } from "vue-router";

import Header from "../../components/Header.vue";
import Layout from "../../components/Layout.vue";
import Sidebar from "../../components/Sidebar.vue";
import AboutRoute from "./about";

const LayoutRoute: RouteRecordRaw[] = [
  {
    path: "/",
    name: "layout",
    components: {
      default: Layout,
      Header: Header,
      Sidebar: Sidebar,
    },
    children: [...AboutRoute],
  },
];

export default LayoutRoute;
