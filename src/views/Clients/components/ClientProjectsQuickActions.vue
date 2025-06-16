<template>
  <div class="justify-centera flex flex-row items-center gap-2 self-center">
    <button
      class="tooltip btn tooltip-top bg-accent btn-xs sm:btn-xs md:btn-sm lg:btn-sm xl:btn-sm"
      :data-tip="TooltipMessagesLabels.seeProject"
      @click="seeProject"
    >
      <font-awesome-icon
        :icon="['fa', 'diagram-project']"
        class="text text-white"
      />
    </button>
    <EditModal
      :title="TitleMessagesLabels.project"
      :form-component="EditProjectForm"
      @submit-form="updateProject"
    />
    <button
      class="tooltip btn tooltip-top bg-error btn-xs sm:btn-xs md:btn-sm lg:btn-sm xl:btn-sm"
      :data-tip="TooltipMessagesLabels.deleteProject"
      @click="deleteProject(props.id)"
    >
      <font-awesome-icon :icon="['fas', 'trash-can']" class="text text-white" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

import EditModal from '@components/EditModal.vue';
import { TitleMessagesLabels } from '@enums/componentTitle';
import { TooltipMessagesLabels } from '@enums/tooltipsTexts';
import { useProjectsStore } from '@store/useProjectsStore';
import EditProjectForm from '@views/Projects/components/EditProjectForm.vue';
import type { UpdateProjectName } from '../../../types/projects';
import { useToastStore } from '@store/useToastStore';
import { ToastMessages, ToastMessagesLabels } from '@enums/toastMessages';

const projectStore = useProjectsStore();
const router = useRouter();

const props = defineProps<{
  id: number;
}>();

// This event is emitted when the project is updated successfully.
// It is used to notify the parent component that the project has been updated.
// This allows the parent component to refresh the project list or perform any other necessary actions.
const emit = defineEmits<{
  (e: 'itemUpdated'): void;
}>();

function seeProject() {
  router.push({
    name: 'Project-Environments',
    params: { project_id: props.id },
  });
}

async function updateProject(data: unknown): Promise<void> {
  // Assinging the data to a variable of type UpdateClient
  const payload = data as UpdateProjectName;
  const response = await projectStore.updateProject(props.id, payload);
  if (response) {
    useToastStore().showToast(
      ToastMessagesLabels.projectUpdated,
      ToastMessages.isSuccess,
    );
    // Emit the 'projectUpdated' event.
    emit('itemUpdated');
  }
}

async function deleteProject(id: number): Promise<void> {
  const response = await projectStore.deleteProject(id);
  if (response) {
    useToastStore().showToast(
      ToastMessagesLabels.projectDeleted,
      ToastMessages.isSuccess,
    );
    // Emit the 'projectUpdated' event.
    emit('itemUpdated');
  }
}
</script>

<style scoped></style>
