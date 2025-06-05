<template>
  <div class="justify-centera flex flex-row items-center gap-2 self-center">
    <EditModal
      :title="TitleMessagesLabels.project"
      :formComponent="EditProjectForm"
      @submitForm="updateProject"
    />
    <button
      class="tooltip btn tooltip-top bg-error btn-xs sm:btn-xs md:btn-sm lg:btn-sm xl:btn-sm"
      :data-tip="TooltipMessagesLabels.deleteProject"
    >
      <font-awesome-icon :icon="['fas', 'trash-can']" class="text text-white" />
    </button>
  </div>
</template>

<script setup lang="ts">
import EditModal from '@components/EditModal.vue';
import { TitleMessagesLabels } from '@enums/componentTitle';
import { ToastMessages, ToastMessagesLabels } from '@enums/toastMessages';
import { TooltipMessagesLabels } from '@enums/tooltipsTexts';
import { useToastStore } from '@store/useToastStore';
import EditProjectForm from './EditProjectForm.vue';
import { useProjectsStore } from '@store/useProjectsStore';
import type { UpdateProjectName } from '../../../types/projects';

const projectsStore = useProjectsStore();

const props = defineProps<{
  id: number;
}>();

async function updateProject(data: unknown): Promise<void> {
  // Assinging the data to a variable of type UpdateClient
  const payload = data as UpdateProjectName;
  const response = await projectsStore.updateProject(props.id, payload);
  if (response) {
    useToastStore().showToast(
      ToastMessagesLabels.projectUpdated,
      ToastMessages.isSuccess,
    );
  }
}
</script>

<style scoped></style>
