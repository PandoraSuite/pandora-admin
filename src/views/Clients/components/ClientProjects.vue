<template>
  <div class="flex w-full flex-col gap-y-4 px-2">
    <section class="flex w-[90%] flex-row justify-between gap-x-8 self-center">
      <CreateModal :title="`project for ${props.name}`" :formComponent="''" @submitForm="" />
      <SearchInput
        placeholder="Filter by Type"
        @search="handleSearch"
        disabled
      />
    </section>
    <section class="flex w-[90%] self-center">
      <Table :tableData="projects" :id="props.id" :name="props.name" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

import Table from '@components/Table.vue';
import { useClientsStore } from '@store/useClientsStore';
import type { ClientProjects, Project } from '../../../types/projects';
import { storeToRefs } from 'pinia';
import { useToastStore } from '@store/useToastStore';
import CreateModal from '@components/CreateModal.vue';
import SearchInput from '@components/SearchInput.vue';

const props = defineProps<{
  id: number;
  name: string;
}>();

const clientStore = useClientsStore();
const { error } = storeToRefs(clientStore);

const projectsList = ref<Project[]>([]);
projectsList.value = clientStore.clientProjects;

const projects = projectsList.value.map((project: ClientProjects) => ({
  ...project,
  services: (() => {
    // We use an IIFE (Immediately Invoked Function Expression) to calculate the string
    if (Array.isArray(project.services) && project.services.length > 0) {
      // Case 1: project.services is an array and has elements
      const serviceStrings = project.services.map((service) => {
        const name = service.name ? String(service.name).trim() : '';
        const version = service.version ? String(service.version).trim() : '';

        if (name && version) {
          return `${name} - ${version}`; // Main format: 'name - version'
        } else if (name) {
          return `${name} - (no version)`;
        } else if (version) {
          return `(unnamed) - ${version}`;
        } else {
          // Neither name nor version for this specific service in the array
          return '(Service without details.)';
        }
      });
      // Join the strings with a comma and space
      return serviceStrings.join(', ');
    } else if (
      Array.isArray(project.services) &&
      project.services.length === 0
    ) {
      // Case 2: project.services is an empty array
      return 'There are no services available yet.';
    } else {
      // Case 3: project.services is not an array (it is null, undefined, etc.)
      return 'Services unavailable.';
    }
  })(),
}));

onMounted(() => {});

watch(error, (value, _) => {
  if (value) {
    useToastStore().showToast(value, 'error');
  }
});

// Define the asynchronous function 'handleSearch' which receives the search term from the emitted event.
async function handleSearch(searchValue: string): Promise<void> {
  // Check if the received searchValue is "truthy" (i.e., not an empty string "").
  if (searchValue) {
    await clientStore.getClients();
  } else {
    // If searchValue is empty (e.g., user cleared the input).
    await clientStore.getClients();
  }
}
</script>
<style scoped></style>
