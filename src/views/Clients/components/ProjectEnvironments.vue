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
        :title="TitleMessagesLabels.environment"
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
        :tableData="environmentsToRender"
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
import { TitleMessagesLabels } from '@enums/componentTitle';
import { ModalButtonTextLabels } from '@enums/modalButtonText';
import { ServiceRequestsLabels } from '@enums/serviceRequests';
import { ToastMessages, ToastMessagesLabels } from '@enums/toastMessages';
import { useClientsStore } from '@store/useClientsStore';
import { useEnvironmentsStore } from '@store/useEnvironmentsStore';
import { useIdsStore } from '@store/useIdsStore';
import { useProjectsStore } from '@store/useProjectsStore';
import { useToastStore } from '@store/useToastStore';
import { storeToRefs } from 'pinia';
import type { Client } from '../../../types/clients';
import type { NewEnvironment } from '../../../types/environments';
import type { ProjectEnvironmentsLoadData } from '../../../types/loadData';
import type {
  FilteredProject,
  NewProjectService,
  Project,
  ProjectEnviroments,
  ProjectEnvironmentsToRender,
  ProjectServicesToRender,
} from '../../../types/projects';
import AssingProjectService from './AssingProjectService.vue';
import ProjectServiceQuickActions from './CardsServiceQuickActions.vue';
import CreateEnvironmentForm from './CreateEnvironmentForm.vue';
import ProjectEvironmentsQuickActions from './ProjectEnvironmentsQuickActions.vue';

const CreateModal = _CreateModal as typeof _CreateModal<NewEnvironment>;
const CreateServiceModal =
  _CreateServiceModal as typeof _CreateServiceModal<NewProjectService>;

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
const servicesData = ref<ProjectServicesToRender[]>([]);
const environments = ref<ProjectEnviroments[]>([]);
const environmentsToRender = ref<ProjectEnvironmentsToRender[]>([]);

async function createEnvironment(payload: NewEnvironment) {
  const response = await environmentStore.createEnvironment(payload);
  if (response) {
    useToastStore().showToast(
      ToastMessagesLabels.environmentCreated,
      ToastMessages.isSuccess,
    );
  }
  refreshData();
}

async function assignService(payload: NewProjectService) {
  const response = await projectStore.assignProjectServices(projectId, payload);
  if (response) {
    useToastStore().showToast(
      ToastMessagesLabels.serviceAssigned,
      ToastMessages.isSuccess,
    );
  }
  refreshData()
}

async function loadData(): Promise<ProjectEnvironmentsLoadData> {
  const [client, projectById] = await Promise.all([
    clientStore.getClientById(clientId),
    projectStore.getProjectById(projectId),
  ]);
  return {
    client: client ?? ({} as Client),
    projectById: projectById ?? ({} as Project),
  };
}

function manageIds(clientId: number, projectId: number): void {
  idsStore.clearProjectId();
  idsStore.clearEnvironmentId();
  idsStore.setProjectId(projectId);
  if (!idsStore.clientId) {
    idsStore.setClientId(clientId);
  }
}

async function refreshData(): Promise<void> {
  const { client, projectById } = await loadData();
  projectData.value = projectById as Project;
  currentClient.value = client as Client;
  environmentsData.value =
    (await projectStore.getProjectEnvironments(projectId)) || [];

  environments.value = useMapWithServices(environmentsData.value);
  environmentsToRender.value = environments.value.map((project) => ({
    ...project,
    project_id:
      project.project_id === projectById.id
        ? projectById.name
        : 'Unknown Environment',
  }));
}

onMounted(async () => {
  refreshData();

  manageIds(clientId, projectId);
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

      servicesData.value = (projectData.value?.services || []).map((card) => ({
        ...card,
        max_request:
          card.max_request === -1
            ? ServiceRequestsLabels.unlimited
            : card.max_request,
        reset_frequency:
          card.reset_frequency === ''
            ? ServiceRequestsLabels.none
            : card.reset_frequency,
      }));
      idsStore.setProjectServices(projectData.value?.services || []);
    }
  },
  { immediate: true },
);

watch(error, (value, _) => {
  if (value) {
    useToastStore().showToast(value, ToastMessages.isError);
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
