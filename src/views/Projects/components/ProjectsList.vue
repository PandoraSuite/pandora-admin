<template>
  <div class="divider"></div>
  <div class="flex w-full flex-col gap-y-4 px-2">
    <section class="flex w-[90%] flex-row justify-between gap-x-8 self-center">
      <CreateModal
        :title="TitleMessagesLabels.project"
        :button-text="ModalButtonTextLabels.create"
        :form-component="CreateProjectForm"
        @submit-form="createClient"
      />
      <SearchInput placeholder="Filter by Status" disabled  />
    </section>
    <section class="flex w-[90%] self-center">
      <Table
        :table-data="projects"
        :quick-actions-component="ProjectsQuickActions"
        @item-updated="handleProjectUpdated"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onMounted, ref, watch } from 'vue';

import _CreateModal from '@components/CreateModal.vue';
import SearchInput from '@components/SearchInput.vue';
import { useMapWithServices } from '@composables/useMapWithServices';
import { TitleMessagesLabels } from '@enums/componentTitle';
import { ModalButtonTextLabels } from '@enums/modalButtonText';
import { ToastMessages, ToastMessagesLabels } from '@enums/toastMessages';
import { useClientsStore } from '@store/useClientsStore';
import { useProjectsStore } from '@store/useProjectsStore';
import { useToastStore } from '@store/useToastStore';
import Table from '../../../components/Table.vue';
import type { Client } from '../../../types/clients';
import type { NewProject, Project } from '../../../types/projects';
import CreateProjectForm from './CreateProjectForm.vue';
import ProjectsQuickActions from './ProjectsQuickActions.vue';

const CreateModal = _CreateModal as typeof _CreateModal<NewProject>;

const projectStore = useProjectsStore();
const { error } = storeToRefs(projectStore);
const clientStore = useClientsStore();

const projectsList = ref<Project[]>([]);
const projects = ref<Project[]>([]);

async function loadClientData(id: number): Promise<Client> {
  const client = await clientStore.getClientById(id);
  if (!client) {
    throw new Error(`Client with ID ${id} not found`);
  }
  return client;
}

async function loadProjectsData(): Promise<void> {
  await projectStore.getProjects();
  projectsList.value = projectStore.projects as Project[];
  projects.value = useMapWithServices(projectsList.value);
}

async function createClient(payload: NewProject): Promise<void> {
  const response = await projectStore.createProject(payload);
  if (response) {
    useToastStore().showToast(
      ToastMessagesLabels.projectCreated,
      ToastMessages.isSuccess,
    );
  }
  loadProjectsData();
}

// Event handler for when a project is updated.
function handleProjectUpdated() {
  loadProjectsData();
}

onMounted(async () => {
  loadProjectsData();
});

watch(error, (value, _) => {
  if (value) {
    useToastStore().showToast(value, ToastMessages.isError);
  }
});
</script>

<style scoped></style>
