import type { RouteRecordRaw } from "vue-router";

import ServicesView from "../../views/Services/index.vue";

const ServicesListRoute: RouteRecordRaw[] = [
  {
    path: "/services",
    name: "Services",
    components: {
      default: ServicesView,
    },
  },
];

export default ServicesListRoute;
