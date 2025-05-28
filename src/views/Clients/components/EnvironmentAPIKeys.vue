<template>
  <div class="flex w-full flex-col gap-y-4 px-2">
    <section class="flex w-[90%] self-center">
      <Cards
        :cardsData="servicesData"
        :quickActionComponent="ProjectServiceQuickActions"
        :createActionComponent="CreateServiceModal"
        :assingFormComponent="AssingEnvironmentService"
        :projectId="projectId"
        :buttonText="'Assing'"
        @submitForm="assignService"
      />
    </section>
    <div class="divider"></div>
    <section class="flex w-[90%] flex-row justify-between gap-x-8 self-center">
      <CreateModal
        :title="'API key'"
        :buttonText="'Create'"
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
import { useMapWithServices } from '@composables/useMapWithServices';
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
import type { NewProjectService } from '../../../types/projects';
import AssingEnvironmentService from './AssingEnvironmentService.vue';
import ProjectServiceQuickActions from './CardsServiceQuickActions.vue';
import APIKeyQuickActions from './APIKeyQuickActions.vue';

const CreateModal = _CreateModal as typeof _CreateModal<NewEnvironment>;
const CreateServiceModal =
  _CreateServiceModal as typeof _CreateServiceModal<NewProjectService>;

const props = defineProps<{
  client_id: string;
  project_id: string;
  environment_id: string;
}>();

/**
 * TODO Validate errors in the id cast.
 */
const clientId = Number(props.client_id);
const projectId = Number(props.project_id);
const environmentId = Number(props.environment_id);

const projectStore = useProjectsStore();
const { error } = storeToRefs(projectStore);
const environmentStore = useEnvironmentsStore();
const apiKeysStore = useAPIKeysStore();
const idsStore = useIdsStore();

const environmentData = ref<Environment>();
const apikeys = ref<APIKey[]>([]);
const tableData = ref<FilteredEnvironment>();
const servicesData = ref<EnvironmentService[]>([]);
const environments = ref([]);

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

async function loadEnvironmentData() {
  const data = await environmentStore.getEnvironmentById(environmentId);
  return data;
}

onMounted(async () => {
  environmentData.value = await loadEnvironmentData();
  apikeys.value =
    (await environmentStore.getEnvironmentAPIKeys(environmentId)) || [];

  environments.value = useMapWithServices(environmentData.value);

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
