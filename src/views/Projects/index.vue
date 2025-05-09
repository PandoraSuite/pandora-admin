<template>
  <div class="flex w-full flex-col gap-y-4 px-2">
    <h1 class="mt-4 ml-3 text-2xl font-semibold">Projects List</h1>
    <div class="divider"></div>
    <section class="flex w-[90%] flex-row justify-between gap-x-8 self-center">
      <CreateModal
        :title="'project'"
        :formComponent="CreateProjectForm"
        @submitForm="createClient"
      />
      <SearchInput placeholder="Filter by Type" @search="handleSearch" />
    </section>
    <section class="flex w-[90%] self-center">
      <Table :tableData="projectsStore.projects" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { storeToRefs } from 'pinia';

import _CreateModal from '@components/CreateModal.vue';
import SearchInput from '@components/SearchInput.vue';
import { useToastStore } from '@store/useToastStore';
import Table from '../../components/Table.vue';
import { useProjectsStore } from '@store/useProjectsStore';
import type { NewProject } from '../../types/projects';
import CreateProjectForm from './components/CreateProjectForm.vue';

const CreateModal = _CreateModal as typeof _CreateModal<NewProject>;

const projectsStore = useProjectsStore();
const { error } = storeToRefs(projectsStore);

async function createClient(payload: NewProject) {
  const response = await projectsStore.createProject(payload);
  if (response) {
    useToastStore().showToast('Project created successfully', 'success');
  }
}

onMounted(async () => {
  await projectsStore.getProjects();
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
    await projectsStore.getProjects();
  } else {
    // If searchValue is empty (e.g., user cleared the input).
    await projectsStore.getProjects();
  }
}
</script>

<style scoped></style>
