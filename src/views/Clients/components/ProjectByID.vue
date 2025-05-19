<template>
  <div class="flex w-full flex-col gap-y-4 px-2">
    <section class="flex w-[90%] flex-row justify-between gap-x-8 self-center">
      <CreateModal
        :title="`project for ${projectData?.name}`"
        :formComponent="CreateClientProjectForm"
        @submitForm=""
      />
      <SearchInput
        placeholder="Filter by Type"
        @search="handleSearch"
        disabled
      />
    </section>
    <section class="flex w-[90%] self-center">
      <Table
        :tableData="tableData"
      />
    </section>
    <section class="flex w-[90%] self-center">
      <Cards :cardsData="servicesData" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

import Table from '@components/IndividualTable.vue';
import type {
  FilteredProject,
  Project,
  ProjectServices,
} from '../../../types/projects';
import { storeToRefs } from 'pinia';
import { useToastStore } from '@store/useToastStore';
import CreateModal from '@components/CreateModal.vue';
import SearchInput from '@components/SearchInput.vue';
import CreateClientProjectForm from './CreateClientProjectForm.vue';
import { useProjectsStore } from '@store/useProjectsStore';
import Cards from '@components/Cards.vue';

const props = defineProps<{
  id: string;
}>();

/**
 * TODO Validate errors in the id cast.
 */
const id = Number(props.id);
const projectStore = useProjectsStore();
const { error } = storeToRefs(projectStore);

const projectData = ref<Project>();
const tableData = ref<FilteredProject>();
const servicesData = ref<ProjectServices[]>([]);

async function loadData() {
  const data = await projectStore.getProjectById(id);
  return data;
}

onMounted(async () => {
  projectData.value = await loadData();
});

watch(
  () => projectData.value,
  (newData) => {
    if (newData) {
      tableData.value = {
        id: newData.id,
        name: newData.name,
        client_id: newData.client_id,
        created_at: newData.created_at,
        status: newData.status,
      };

      servicesData.value = projectData.value?.services || [];
    }
  },
  { immediate: true },
);

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
