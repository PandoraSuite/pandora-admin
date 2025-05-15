import type { RouteRecordRaw } from 'vue-router';

import ProjectsView from '@views/Projects/index.vue';

const ProjectsListRoute: RouteRecordRaw[] = [
  {
    path: '/projects',
    name: 'Projects',
    components: {
      default: ProjectsView,
    },
    meta: { requiresAuth: true },
  },
];

export default ProjectsListRoute;
