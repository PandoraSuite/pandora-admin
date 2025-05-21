<template>
  <div class="flex w-full flex-col gap-y-4 px-2">
    <section class="flex w-[90%] self-center">
      <Cards
        :cardsData="servicesData"
        :quickActionComponent="ProjectServiceQuickActions"
        :createActionComponent="CreateServiceModal"
        :projectId="projectId"
      />
    </section>
    <div class="divider"></div>
    <section class="flex w-[90%] flex-row justify-between gap-x-8 self-center">
      <CreateModal
        :title="'environment'"
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
      <Table :tableData="environments" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

import type {
  FilteredProject,
  Project,
  ProjectEnviroments,
  ProjectServices,
} from '../../../types/projects';
import { storeToRefs } from 'pinia';
import { useToastStore } from '@store/useToastStore';
import SearchInput from '@components/SearchInput.vue';
import { useProjectsStore } from '@store/useProjectsStore';
import Cards from '@components/Cards.vue';
import CreateServiceModal from '@components/CreateModal.vue';
import ProjectServiceQuickActions from './ProjectServiceQuickActions.vue';
import Table from '@components/Table.vue';
import CreateEnvironmentForm from './CreateEnvironmentForm.vue';
import CreateModal from '@components/CreateModal.vue';
import type { NewEnvironment } from '../../../types/environments';
import { useEnvironmentsStore } from '@store/useEnvironmentsStore';
import { useIdsStore } from '@store/useIdsStore';


const props = defineProps<{
  client_id: string;
  project_id: string;
}>();

/**
 * TODO Validate errors in the id cast.
 */
const clientId = Number(props.client_id);
const projectId = Number(props.project_id);
const projectStore = useProjectsStore();
const { error } = storeToRefs(projectStore);
const environmentStore = useEnvironmentsStore();
const idsStore = useIdsStore();

const projectData = ref<Project>();
const environmentsData = ref<ProjectEnviroments[]>([]);
const tableData = ref<FilteredProject>();
const servicesData = ref<ProjectServices[]>([]);
const environments = ref([]);

async function createEnvironment(payload: NewEnvironment) {
  const response = await environmentStore.createEnvironment(payload);
  if (response) {
    useToastStore().showToast('Environment created successfully', 'success');
  }
}

async function loadProjectData() {
  const data = await projectStore.getProjectById(projectId);
  return data;
}

onMounted(async () => {
  projectData.value = await loadProjectData();
  environmentsData.value = (await projectStore.getProjectEnvironments(projectId)) || [];

  environments.value = environmentsData.value.map((environment: ProjectEnviroments) => ({
    ...environment,
    services: (() => {
      // We use an IIFE (Immediately Invoked Function Expression) to calculate the string
      if (Array.isArray(environment.services) && environment.services.length > 0) {
        // Case 1: environment.services is an array and has elements
        const serviceStrings = environment.services.map((service) => {
          const name = service.name ? String(service.name).trim() : '';
          const version = service.version ? String(service.version).trim() : '';

          if (name && version) {
            return `${name} - ${version}`; // Main format: 'name - version'
          } else if (name) {
            return `${name} - (no version)`;
          } else if (version) {
            return `(unnamed) - ${version}`;
          } else {
            // Neither name nor version for this specific service in the array
            return '(Service without details.)';
          }
        });
        // Join the strings with a comma and space
        return serviceStrings.join(', ');
      } else if (
        Array.isArray(environment.services) &&
        environment.services.length === 0
      ) {
        // Case 2: project.services is an empty array
        return 'There are no services available yet.';
      } else {
        // Case 3: project.services is not an array (it is null, undefined, etc.)
        return 'Services unavailable.';
      }
    })(),
  }));

  idsStore.setProjectId(projectId);
  if (!idsStore.clientId) {
    idsStore.setClientId(clientId)
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
