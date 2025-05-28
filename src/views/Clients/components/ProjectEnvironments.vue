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
        Services
      </h2>
    </section>
    <section class="flex w-[90%] self-center">
      <Cards
        :cardsData="servicesData"
        :quickActionComponent="ProjectServiceQuickActions"
        :createActionComponent="CreateServiceModal"
        :assingFormComponent="AssingProjectService"
        :projectId="projectId"
        :buttonText="ModalButtonTextLabels.assign"
        @submitForm="assignService"
      />
    </section>
    <div class="divider"></div>
    <section
      class="mb-5 ml-[5%] grid w-[50%] grid-cols-2 grid-rows-2 items-center gap-y-2 self-start"
    >
      <h2 class="row-span-2 w-[80%] text-4xl md:text-2xl lg:text-3xl">
        Environments
      </h2>
    </section>
    <section class="flex w-[90%] flex-row justify-between gap-x-8 self-center">
      <CreateModal
        :title="'environment'"
        :buttonText="ModalButtonTextLabels.create"
        :formComponent="CreateEnvironmentForm"
        @submitForm="createEnvironment"
      />
      <SearchInput
        placeholder="Filter by Type"
        @search="handleSearch"
        disabled
      />
    </section>
    <section class="flex w-[90%] self-center">
      <Table
        :tableData="environments"
        :quickActionsComponent="ProjectEvironmentsQuickActions"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

import Cards from '@components/Cards.vue';
import {
  default as _CreateModal,
  default as _CreateServiceModal,
} from '@components/CreateModal.vue';
import SearchInput from '@components/SearchInput.vue';
import Table from '@components/Table.vue';
import { useMapWithServices } from '@composables/useMapWithServices';
import { useClientsStore } from '@store/useClientsStore';
import { useEnvironmentsStore } from '@store/useEnvironmentsStore';
import { useIdsStore } from '@store/useIdsStore';
import { useProjectsStore } from '@store/useProjectsStore';
import { useToastStore } from '@store/useToastStore';
import { storeToRefs } from 'pinia';
import type { Client } from '../../../types/clients';
import type { NewEnvironment } from '../../../types/environments';
import type {
  FilteredProject,
  NewProjectService,
  Project,
  ProjectEnviroments,
  ProjectServices,
} from '../../../types/projects';
import AssingProjectService from './AssingProjectService.vue';
import ProjectServiceQuickActions from './CardsServiceQuickActions.vue';
import CreateEnvironmentForm from './CreateEnvironmentForm.vue';
import ProjectEvironmentsQuickActions from './ProjectEnvironmentsQuickActions.vue';
import { ModalButtonTextLabels } from '@enums/modalButtonText';
import type { ProjectEnvironmentsLoadData } from '../../../types/loadData';

const CreateModal = _CreateModal as typeof _CreateModal<NewEnvironment>;
const CreateServiceModal = _CreateServiceModal as typeof _CreateServiceModal<NewProjectService>;

const props = defineProps<{
  client_id: string;
  project_id: string;
}>();

const clientId = Number(props.client_id);
const projectId = Number(props.project_id);

const clientStore = useClientsStore();
const projectStore = useProjectsStore();
const { error } = storeToRefs(projectStore);
const environmentStore = useEnvironmentsStore();
const idsStore = useIdsStore();

const currentClient = ref<Client>();
const projectData = ref<Project>();
const environmentsData = ref<ProjectEnviroments[]>([]);
const tableData = ref<FilteredProject>();
const servicesData = ref<ProjectServices[]>([]);
const environments = ref<ProjectEnviroments[]>([]);

async function createEnvironment(payload: NewEnvironment) {
  const response = await environmentStore.createEnvironment(payload);
  if (response) {
    useToastStore().showToast('Environment created successfully', 'success');
  }
}

async function assignService(payload: NewProjectService) {
  const response = await projectStore.assignProjectServices(projectId, payload);
  if (response) {
    useToastStore().showToast('Service assigned successfully', 'success');
  }
}

async function loadData(): Promise<ProjectEnvironmentsLoadData> {
  const [client, projectById] = await Promise.all([
    clientStore.getClientById(clientId),
    projectStore.getProjectById(projectId),
  ]);
  return { client: client ?? {} as Client, projectById: projectById ?? {} as Project };
}

onMounted(async () => {
  const { client, projectById } = await loadData();
  projectData.value = projectById as Project;
  currentClient.value = client as Client;
  environmentsData.value =
    (await projectStore.getProjectEnvironments(projectId)) || [];

  environments.value = useMapWithServices(environmentsData.value);

  idsStore.setProjectId(projectId);
  if (!idsStore.clientId) {
    idsStore.setClientId(clientId);
  }
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
      idsStore.setServicesForCards(projectData.value?.services || []);
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
