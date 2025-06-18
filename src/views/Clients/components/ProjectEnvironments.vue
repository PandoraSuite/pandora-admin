<template>
  <div class="flex w-full flex-col gap-y-4 px-2">
    <section
      class="mt-5 ml-[5%] flex w-[50%] flex-row items-center gap-y-2 self-start sm:w-[70%] md:w-[60%]"
    >
      <div class="w-[40%]">
        <h1 class="text-4xl md:text-2xl lg:text-3xl">
          {{ breadcrumbStore.project?.name }}
        </h1>
      </div>
      <div class="w-[60%]">
        <h3 class="md:text-lg xl:text-xl">
          <span class="font-bold">status: </span>
          {{ breadcrumbStore.project?.status }}
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
        :cards-data="servicesData"
        :quick-action-component="ProjectServiceQuickActions"
        :create-action-component="CreateServiceModal"
        :assing-form-component="AssingProjectService"
        :project-id="projectId"
        :environment-id="0"
        :button-text="ModalButtonTextLabels.assign"
        @submit-form="assignService"
        @item-updated="handleServiceUpdated"
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
        :button-text="ModalButtonTextLabels.create"
        :form-component="CreateEnvironmentForm"
        @submit-form="createEnvironment"
      />
      <SearchInput placeholder="Filter by Status" disabled />
    </section>
    <section class="flex w-[90%] self-center">
      <Table
        :table-data="environmentsToRender"
        :quick-actions-component="ProjectEvironmentsQuickActions"
        @item-updated="handleEnvironmentUpdated"
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
import { useBreadcrumbStore } from '@store/useBreadcrumbStore';
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
import ProjectServiceQuickActions from './CardsProjectServiceQuickActions.vue';
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
const breadcrumbStore = useBreadcrumbStore();

const currentClient = ref<Client>();
const projectData = ref<Project>();
const environmentsData = ref<ProjectEnviroments[]>([]);
const tableData = ref<FilteredProject>();
const servicesData = ref<ProjectServicesToRender[]>([]);
const environments = ref<ProjectEnviroments[]>([]);
const environmentsToRender = ref<ProjectEnvironmentsToRender[]>([]);

async function createEnvironment(payload: NewEnvironment): Promise<void> {
  const response = await environmentStore.createEnvironment(payload);
  if (response) {
    useToastStore().showToast(
      ToastMessagesLabels.environmentCreated,
      ToastMessages.isSuccess,
    );
  }
  refreshData();
}

async function assignService(payload: NewProjectService): Promise<void> {
  const response = await projectStore.assignProjectServices(projectId, payload);
  if (response) {
    useToastStore().showToast(
      ToastMessagesLabels.serviceAssigned,
      ToastMessages.isSuccess,
    );
  }
  refreshData();
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

// Scatter data to the breadcrumb navigation
function scatterCrumbs(): void {
  const client = breadcrumbStore.client;
  const project = breadcrumbStore.project;
  if (!client && currentClient.value) {
    breadcrumbStore.setClient(currentClient.value);
  }
  if (!project && projectData.value) {
    breadcrumbStore.setProject(projectData.value);
  } else if (
    project &&
    projectData.value &&
    project.id !== projectData.value.id
  ) {
    breadcrumbStore.clearEnvironment();
    breadcrumbStore.setProject(projectData.value);
  }
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
  environmentsToRender.value = environments.value.map((project) => {
    const { project_id, ...rest } = project;
    return {
      ...rest,
      project_name:
        project_id === projectById.id
          ? projectById.name
          : 'Unknown Environment',
    };
  });
  scatterCrumbs();
}

// Event handler for when a service is updated.
function handleServiceUpdated() {
  refreshData();
}

function handleEnvironmentUpdated() {
  refreshData();
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
        max_requests:
          card.max_requests === -1
            ? ServiceRequestsLabels.unlimited
            : card.max_requests,
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
</script>
<style scoped></style>
