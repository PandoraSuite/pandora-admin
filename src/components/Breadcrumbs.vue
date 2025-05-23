<template>
  <div class="breadcrumbs px-4 pt-6 text-sm">
    <ul>
      <li>
        <RouterLink to="/" class="text-2xl">
          <font-awesome-icon :icon="['fas', 'house']" />
        </RouterLink>
      </li>
      <li v-for="(crumb, index) in breadcrumbs" :key="index">
        <RouterLink
          v-if="index !== breadcrumbs.length - 1"
          :to="crumb.to"
          class="text-2xl"
        >
          {{ crumb.label }}
        </RouterLink>
        <h3 v-else-if="index === 0" class="text-2xl">
          {{ crumb.label }}
        </h3>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useClientsStore } from '@store/useClientsStore';
import { useEnvironmentsStore } from '@store/useEnvironmentsStore';
import { useProjectsStore } from '@store/useProjectsStore';
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const clientStore = useClientsStore();
const projectStore = useProjectsStore();
const environmentStore = useEnvironmentsStore();

// Stores dynamically loaded names.
const dynamicNames = ref<Record<string, string>>({});

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

async function getProjectName(id: number): Promise<string> {
  const key = id;
  if (dynamicNames.value[key]) return dynamicNames.value[key];

  const response = await projectStore.getProjectById(id);
  const name = response?.name || `#${id}`;
  dynamicNames.value[key] = name;
  return name;
}

async function getClientName(id: number): Promise<string> {
  const key = id;
  if (dynamicNames.value[key]) return dynamicNames.value[key];

  const response = await clientStore.getClientById(id);
  const name = response?.name || `#${id}`;
  dynamicNames.value[key] = name;
  return name;
}

async function getEnvironmentName(id: number): Promise<string> {
  const key = id;
  if (dynamicNames.value[key]) return dynamicNames.value[key];

  const response = await environmentStore.getEnvironmentById(id);
  const name = response?.name || `#${id}`;
  dynamicNames.value[key] = name;
  return name;
}

watchEffect(async () => {
  const segments = route.path.split('/').filter(Boolean);
  const newBreadcrumbs: { to: string; label: string }[] = [];

  for (let i = 0; i < segments.length; i++) {
    const current = segments[i];
    const prev = segments[i - 1] || null;
    const path = '/' + segments.slice(0, i + 1).join('/');

    let label = routeNameMap[current] || decodeURIComponent(current);

    if (isNumeric(current) && prev) {
      switch (prev) {
        case 'clients':
          label = await getClientName(Number(current));
          break;
        case 'projects':
          label = await getProjectName(Number(current));
          break;
        case 'environments':
          label = await getEnvironmentName(Number(current));
          break;
      }
    }

    newBreadcrumbs.push({ to: path, label });
  }

  breadcrumbs.value = newBreadcrumbs;
});
</script>

<style scoped></style>
