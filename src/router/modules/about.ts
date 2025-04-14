import type { RouteRecordRaw } from "vue-router";

import AboutView from "../../views/AboutView.vue";

const AboutRoute: RouteRecordRaw[] = [
  {
    path: "/about",
    name: "About",
    components: {
      default: AboutView,
    },
  },
];

export default AboutRoute;
