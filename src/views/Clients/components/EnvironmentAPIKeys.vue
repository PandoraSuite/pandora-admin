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
        :title="'API key'"
        :buttonText="ModalButtonTextLabels.create"
        @submitForm="createAPIKey"
      />
      <SearchInput
        placeholder="Filter by Type"
        @search="handleSearch"
        disabled
      />
    </section>
    <section class="flex w-[90%] self-center">
      <Table :tableData="apikeys" :quickActionsComponent="APIKeyQuickActions" />
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
import { useAPIKeysStore } from '@store/useAPIKeysStore';
import { useEnvironmentsStore } from '@store/useEnvironmentsStore';
import { useIdsStore } from '@store/useIdsStore';
import { useProjectsStore } from '@store/useProjectsStore';
import { useToastStore } from '@store/useToastStore';
import { storeToRefs } from 'pinia';
import type { APIKey, NewAPIKey } from '../../../types/apiKeys';
import type {
  Environment,
  EnvironmentService,
  FilteredEnvironment,
  NewEnvironment,
  NewEnvironmentService,
} from '../../../types/environments';
import APIKeyQuickActions from './APIKeyQuickActions.vue';
import AssingEnvironmentService from './AssingEnvironmentService.vue';
import ProjectServiceQuickActions from './CardsServiceQuickActions.vue';
import { useClientsStore } from '@store/useClientsStore';
import type { Client } from '../../../types/clients';
import { ModalButtonTextLabels } from '@enums/modalButtonText';

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

const currentClient = ref<Client>();
const environmentData = ref<Environment>();
const apikeys = ref<APIKey[]>([]);
const tableData = ref<FilteredEnvironment>();
const servicesData = ref<EnvironmentService[]>([]);

async function createAPIKey(payload: NewAPIKey) {
  const response = await apiKeysStore.createAPIKey(payload);
  if (response) {
    useToastStore().showToast('API key created successfully', 'success');
  }
}

async function assignService(payload: NewEnvironmentService) {
  const response = await environmentStore.assignEnvironmentService(
    projectId,
    payload,
  );
  if (response) {
    useToastStore().showToast('Service assigned successfully', 'success');
  }
}

async function loadData() {
  const [ client, environmentById ] = await Promise.all([
    clientStore.getClientById(clientId),
    environmentStore.getEnvironmentById(environmentId),
  ]);

  return { client, environmentById };
}

onMounted(async () => {
  const { client, environmentById } = await loadData();
  currentClient.value = client as Client;
  environmentData.value = environmentById as Environment;
  apikeys.value =
    (await environmentStore.getEnvironmentAPIKeys(environmentId)) || [];

  idsStore.setEnvironmentId(environmentId);
  if (!idsStore.projectId) {
    idsStore.setProjectId(projectId);
  } else if (!idsStore.clientId) {
    idsStore.setClientId(clientId);
  }
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

      servicesData.value = environmentData.value?.services || [];
      idsStore.setServicesForCards(environmentData.value?.services || []);
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
