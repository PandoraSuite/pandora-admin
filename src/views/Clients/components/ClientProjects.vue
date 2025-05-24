<template>
  <div class="flex w-full flex-col gap-y-4 px-2">
    <section class="flex w-[90%] flex-row justify-between gap-x-8 self-center">
      <CreateModal
        :title="`project for ${currentClient?.name}`"
        :buttonText="'Create'"
        :formComponent="CreateClientProjectForm"
        @submitForm="createProject"
      />
      <SearchInput
        placeholder="Filter by Type"
        @search="handleSearch"
        disabled
      />
    </section>
    <section class="flex w-[90%] self-center">
      <Table
        :tableData="projects"
        :quickActionsComponent="ClientProjectsQuickActions"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

import _CreateModal from '@components/CreateModal.vue';
import SearchInput from '@components/SearchInput.vue';
import Table from '@components/Table.vue';
import { useMapWithServices } from '@composables/useMapWithServices';
import { useClientsStore } from '@store/useClientsStore';
import { useIdsStore } from '@store/useIdsStore';
import { useProjectsStore } from '@store/useProjectsStore';
import { useToastStore } from '@store/useToastStore';
import { storeToRefs } from 'pinia';
import type { Client } from '../../../types/clients';
import type { NewProject, Project } from '../../../types/projects';
import ClientProjectsQuickActions from './ClientProjectsQuickActions.vue';
import CreateClientProjectForm from './CreateClientProjectForm.vue';

const CreateModal = _CreateModal as typeof _CreateModal<NewProject>;

const props = defineProps<{
  client_id: string;
}>();

/**
 * TODO Validate errors in the id cast.
 */
const id = Number(props.client_id);
const projectStore = useProjectsStore();
const clientStore = useClientsStore();
const idsStore = useIdsStore();
const { error } = storeToRefs(clientStore);

const projectsList = ref<Project[]>([]);
const currentClient = ref<Client>();
const projects = ref([]);

async function createProject(payload: NewProject) {
  const response = await projectStore.createProject(payload);
  if (response) {
    useToastStore().showToast('Project created successfully', 'success');
  }
}

async function loadData() {
  const [client, clientProjects] = await Promise.all([
    clientStore.getClientById(id),
    clientStore.getClientProjects(id),
  ]);
  return { client, clientProjects };
}

onMounted(async () => {
  const { client, clientProjects } = await loadData();
  projectsList.value = clientProjects as Project[];
  currentClient.value = client as Client;

  projects.value = useMapWithServices(projectsList.value);

  idsStore.setClientId(id);
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
