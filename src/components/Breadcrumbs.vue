<template>
  <div class="breadcrumbs ml-[5%] text-sm">
    <ul>
      <li>
        <RouterLink to="/home" class="text-lg">
          <font-awesome-icon :icon="['fas', 'house']" />
        </RouterLink>
      </li>
      <li v-for="(crumb, index) in breadcrumbs" :key="index">
        <RouterLink v-if="crumb.to" :to="crumb.to" class="text-lg">
          {{ crumb.label }}
        </RouterLink>
        <h3 v-else class="text-lg">
          {{ crumb.label }}
        </h3>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';

import { useBreadcrumbStore } from '@store/useBreadcrumbStore';

const route = useRoute();

const breadcrumbStore = useBreadcrumbStore();

function isNumeric(str: string) {
  return /^\d+$/.test(str);
}

const breadcrumbs = ref<{ to: string; label: string }[]>([]);

// Map to translate route segments.
const routeNameMap: Record<string, string> = {
  clients: 'Clients',
  projects: 'Projects',
  dashboard: 'Dashboard',
  environments: 'Environments',
  services: 'Services',
  home: 'Dashboard',
};

function getClientName(): string {
  const name = breadcrumbStore.client?.name ?? 'Unknown Client';
  return name;
}

function getProjectName(): string {
  const name = breadcrumbStore.project?.name ?? 'Unknown Project';
  return name;
}

function getEnvironmentName(): string {
  const name = breadcrumbStore.environment?.name ?? 'Unknown Environment';
  return name;
}

watchEffect(() => {
  const segments = route.path.split('/').filter(Boolean);
  const newBreadcrumbs: { to: string; label: string }[] = [];

  for (let i = 0; i < segments.length; i++) {
    const current = segments[i];
    const prev = segments[i - 1] || null;
    const path = '/' + segments.slice(0, i + 1).join('/');

    // Determines whether the segment is a numeric ID.
    const isIdSegment = isNumeric(current);

    let label = routeNameMap[current] || decodeURIComponent(current);

    if (isIdSegment && prev) {
      switch (prev) {
        case 'clients':
          label = getClientName();
          break;
        case 'projects':
          label = getProjectName();
          break;
        case 'environments':
          label = getEnvironmentName();
          break;
      }
    }

    // Prevents the ID from being the last segment.
    const isLastSegment = i === segments.length - 1;
    const isLastId = isIdSegment && isLastSegment;

    newBreadcrumbs.push({
      to: !isIdSegment && !isLastId ? path : '',
      label,
    });
  }

  breadcrumbs.value = newBreadcrumbs;
});
</script>

<style scoped></style>
