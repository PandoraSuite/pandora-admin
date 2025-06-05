<template>
  <div class="flex w-full flex-col gap-y-4 px-2">
    <section
      class="mt-5 ml-[5%] grid w-[50%] grid-cols-3 grid-rows-2 items-center gap-y-2 self-start sm:w-[70%] md:w-[60%]"
    >
      <div class="col-span-1 row-span-2 w-[70%]">
        <h1 class="text-4xl md:text-2xl lg:text-3xl">
          {{ currentClient?.name }}
        </h1>
      </div>
      <div class="col-span-2 row-span-1 w-[90%]">
        <h3 class="md:text-lg xl:text-xl">
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
      </div>
      <div class="col-span-2 row-span-1 w-[90%]">
        <h3 class="md:text-lg xl:text-xl">
          <span class="font-bold">type: </span>
          {{ currentClient?.type }}
        </h3>
      </div>
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
        :assingFormComponent="AssingEnvironmentService"
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
        API Keys
      </h2>
    </section>
    <section class="flex w-[90%] flex-row justify-between gap-x-8 self-center">
      <CreateModal
        :title="TitleMessagesLabels.apiKey"
        :buttonText="ModalButtonTextLabels.create"
        :formComponent="CreateAPIKeyForm"
        @submitForm="createAPIKey"
      />
      <SearchInput
        placeholder="Filter by Type"
        @search="handleSearch"
        disabled
      />
    </section>
    <section class="flex w-[90%] self-center">
      <Table
        :tableData="apiKeysToRender"
        :quickActionsComponent="APIKeyQuickActions"
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
import { TitleMessagesLabels } from '@enums/componentTitle';
import { ModalButtonTextLabels } from '@enums/modalButtonText';
import { ServiceRequestsLabels } from '@enums/serviceRequests';
import { ToastMessages, ToastMessagesLabels } from '@enums/toastMessages';
import { useAPIKeysStore } from '@store/useAPIKeysStore';
import { useClientsStore } from '@store/useClientsStore';
import { useEnvironmentsStore } from '@store/useEnvironmentsStore';
import { useIdsStore } from '@store/useIdsStore';
import { useProjectsStore } from '@store/useProjectsStore';
import { useToastStore } from '@store/useToastStore';
import { storeToRefs } from 'pinia';
import type { APIKey, APIKeyToRender, NewAPIKey } from '../../../types/apiKeys';
import type { Client } from '../../../types/clients';
import type {
  Environment,
  EnvironmentServiceToRender,
  FilteredEnvironment,
  NewEnvironment,
  NewEnvironmentService,
} from '../../../types/environments';
import type { EnvironmentAPiKeysLoadData } from '../../../types/loadData';
import APIKeyQuickActions from './APIKeyQuickActions.vue';
import AssingEnvironmentService from './AssingEnvironmentService.vue';
import ProjectServiceQuickActions from './CardsServiceQuickActions.vue';
import CreateAPIKeyForm from './CreateAPIKeyForm.vue';
import { useBreadcrumbStore } from '@store/useBreadcrumbStore';
import type { Project } from '../../../types/projects';

const CreateModal = _CreateModal as typeof _CreateModal<NewEnvironment>;
const CreateServiceModal =
  _CreateServiceModal as typeof _CreateServiceModal<NewEnvironmentService>;

const props = defineProps<{
  client_id: string;
  project_id: string;
  environment_id: string;
}>();

const clientId = Number(props.client_id);
const projectId = Number(props.project_id);
const environmentId = Number(props.environment_id);

const clientStore = useClientsStore();
const projectStore = useProjectsStore();
const { error } = storeToRefs(projectStore);
const environmentStore = useEnvironmentsStore();
const apiKeysStore = useAPIKeysStore();
const idsStore = useIdsStore();
const breadcrumbStore = useBreadcrumbStore();

const currentClient = ref<Client>();
const currentProject = ref<Project>();
const environmentData = ref<Environment>();
const apikeys = ref<APIKey[]>([]);
const apiKeysToRender = ref<APIKeyToRender[]>([]);
const tableData = ref<FilteredEnvironment>();
const servicesData = ref<EnvironmentServiceToRender[]>([]);

async function createAPIKey(payload: NewAPIKey): Promise<void> {
  const response = await apiKeysStore.createAPIKey(payload);
  if (response) {
    useToastStore().showToast(
      ToastMessagesLabels.apiKeyCreated,
      ToastMessages.isSuccess,
    );
  }
  refreshData();
}

async function assignService(payload: NewEnvironmentService): Promise<void> {
  const response = await environmentStore.assignEnvironmentService(
    environmentId,
    payload,
  );
  if (response) {
    useToastStore().showToast(
      ToastMessagesLabels.serviceAssigned,
      ToastMessages.isSuccess,
    );
  }
  refreshData();
}

async function loadData(): Promise<EnvironmentAPiKeysLoadData> {
  const [client, projectById, environmentById] = await Promise.all([
    clientStore.getClientById(clientId),
    projectStore.getProjectById(projectId),
    environmentStore.getEnvironmentById(environmentId),
  ]);

  return {
    client: client ?? ({} as Client),
    projectById: projectById ?? ({} as Project),
    environmentById: environmentById ?? ({} as Environment),
  };
}

// Scatter data to the breadcrumb navigation
function scatterCrumbs(): void {
  const client = breadcrumbStore.client;
  const project = breadcrumbStore.project;
  const environment = breadcrumbStore.environment;
  if (!client && currentClient.value) {
    breadcrumbStore.setClient(currentClient.value);
  }
  if (!project && currentProject.value) {
    breadcrumbStore.setProject(currentProject.value);
  }
  if (!environment && environmentData.value) {
    breadcrumbStore.setEnvironment(environmentData.value);
  } else if (
    environment &&
    environmentData.value &&
    environment.id !== environmentData.value.id
  ) {
    breadcrumbStore.setEnvironment(environmentData.value);
  }
}

function manageIds(
  clientId: number,
  projectId: number,
  environmentId: number,
): void {
  idsStore.clearEnvironmentId();
  idsStore.setEnvironmentId(environmentId);
  if (!idsStore.projectId) {
    idsStore.setProjectId(projectId);
  } else if (!idsStore.clientId) {
    idsStore.setClientId(clientId);
  }
}

async function refreshData(): Promise<void> {
  const { client, projectById, environmentById } = await loadData();
  currentClient.value = client as Client;
  currentProject.value = projectById as Project;
  environmentData.value = environmentById as Environment;
  apikeys.value =
    (await environmentStore.getEnvironmentAPIKeys(environmentId)) || [];
  apiKeysToRender.value = apikeys.value.map((apiKey) => ({
    ...apiKey,
    environment_id:
      apiKey.environment_id === environmentById.id
        ? environmentById.name
        : 'Unknown API Keys',
  }));

  scatterCrumbs();
}

onMounted(async () => {
  refreshData();
  manageIds(clientId, projectId, environmentId);
});

watch(
  () => environmentData.value,
  (newData) => {
    if (newData) {
      tableData.value = {
        id: newData.id,
        name: newData.name,
        project_id: newData.project_id,
        created_at: newData.created_at,
        status: newData.status,
      };

      servicesData.value = (environmentData.value?.services || []).map(
        (card) => ({
          ...card,
          max_request:
            card.max_request === -1
              ? ServiceRequestsLabels.unlimited
              : card.max_request,
          available_request:
            card.available_request === -1
              ? ServiceRequestsLabels.unlimited
              : card.available_request,
        }),
      );
      idsStore.setEnvironmentServices(environmentData.value?.services || []);
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
