import type { RouteRecordRaw } from 'vue-router';

import ProjectsView from '@views/Projects/index.vue';
import ProjectsList from '@views/Projects/components/ProjectsList.vue';

const ProjectsListRoute: RouteRecordRaw[] = [
  {
    path: '',
    name: 'Projects',
    component: ProjectsView,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'projects',
        name: 'Projects-List',
        component: ProjectsList,
        meta: { requiresAuth: true },
        props: true,
      },
    ],
  },
];

export default ProjectsListRoute;
