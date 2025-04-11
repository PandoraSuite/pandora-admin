import type { RouteRecordRaw } from "vue-router";

import AboutView from "../../views/AboutView.vue";

const AboutRoute: RouteRecordRaw[] = [
  {
    path: "/about",
    name: "about",
    components: {
      default: AboutView,
    },
  },
];

export default AboutRoute;
