<template>
  <div class="flex w-full flex-col gap-y-4 px-2">
    <h1 class="mt-4 ml-3 text-2xl font-semibold">{{ props.name }} Projects List</h1>
    <div class="divider"></div>
    <section class="flex w-[90%] flex-row justify-between gap-x-8 self-center">
      <!-- <CreateModal
        :title="'client'"
        :formComponent=""
        @submitForm=""
      /> -->
      <SearchInput placeholder="Filter by Type" @search="handleSearch" disabled />
    </section>
    <section class="flex w-[90%] self-center">
      <Table
        :tableData="clientStore.clientProjects"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

import Table from '@components/Table.vue';
import { useClientsStore } from '@store/useClientsStore';
import type { Project, SimplifiedProject } from '../../../types/projects';
import { storeToRefs } from 'pinia';
import { useToastStore } from '@store/useToastStore';

const props = defineProps<{
  id: number;
  name: string;
}>();

const clientStore = useClientsStore();
const {error} = storeToRefs(clientStore);

const projectsList = ref<Project[]>([]);

const projects: SimplifiedProject[] = projectsList.value.map((project: Project) => ({
  ...project,
  services: project.services.map((service) => ({
    ...service,
    name: service.name,
    version: service.version,
  })),
}));

onMounted(() => {
  projectsList.value = clientStore.clientProjects;  
});

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
