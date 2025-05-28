<template>
  <div class="flex w-full flex-col gap-y-4 px-2">
    <section
      class="mt-5 ml-[5%] grid w-[50%] grid-cols-2 grid-rows-2 items-center gap-y-2 self-start"
    >
      <h1 class="row-span-2 w-[80%] text-4xl md:text-2xl lg:text-3xl">
        {{ currentClient?.name }}
      </h1>
      <h3 class="w-[90%] md:text-lg xl:text-xl">
        <span class="font-bold">email: </span>
        <a
          v-if="currentClient?.email"
          :href="`mailto:${currentClient.email}`"
          target="_blank"
          class="hover:underline md:text-lg xl:text-xl"
        >
          {{ currentClient?.email }}
        </a>
      </h3>
      <h3 class="w-[90%] md:text-lg xl:text-xl">
        <span class="font-bold">type: </span>
        {{ currentClient?.type }}
      </h3>
    </section>
    <div class="divider"></div>
    <section
      class="mb-5 ml-[5%] grid w-[50%] grid-cols-2 grid-rows-2 items-center gap-y-2 self-start"
    >
      <h2 class="row-span-2 w-[80%] text-4xl md:text-2xl lg:text-3xl">
        Projects
      </h2>
    </section>
    <section class="flex w-[90%] flex-row justify-between gap-x-8 self-center">
      <CreateModal
        :title="'project'"
        :buttonText="ModalButtonTextLabels.create"
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
import { ModalButtonTextLabels } from '@enums/modalButtonText';

const CreateModal = _CreateModal as typeof _CreateModal<NewProject>;

const props = defineProps<{
  client_id: string;
}>();

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
