<template>
  <div class="justify-centera flex flex-row items-center gap-2 self-center">
    <EditModal
      :title="TitleMessagesLabels.service"
      :form-component="EditProjectServicesForm"
      @submit-form="updateService"
    />
    <button
      class="tooltip btn tooltip-top bg-quick-action btn-xs sm:btn-xs md:btn-sm lg:btn-sm xl:btn-sm"
      :data-tip="TooltipMessagesLabels.refreshService"
    >
      <font-awesome-icon
        :icon="['fas', 'arrows-rotate']"
        class="text text-white"
      />
    </button>
    <button
      class="tooltip btn tooltip-top bg-error btn-xs sm:btn-xs md:btn-sm lg:btn-sm xl:btn-sm"
      :data-tip="TooltipMessagesLabels.removeService"
      @click="removeService"
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
import { useProjectsStore } from '@store/useProjectsStore';
import { useToastStore } from '@store/useToastStore';
import EditProjectServicesForm from './EditProjectServicesForm.vue';
import type { UpdateProjectServices } from '../../../types/projects';

const projectStore = useProjectsStore();

const props = defineProps<{
  serviceId: number;
  projectId: number;
}>();

// This event is emitted when the project is updated successfully.
// It is used to notify the parent component that the project has been updated.
// This allows the parent component to refresh the project list or perform any other necessary actions.
const emit = defineEmits<{
  (e: 'itemUpdated'): void;
}>();

async function removeService() {
  const response = await projectStore.deleteProjectService(
    props.projectId,
    props.serviceId,
  );
  if (response) {
    useToastStore().showToast(
      ToastMessagesLabels.serviceRemoved,
      ToastMessages.isSuccess,
    );
  }
}

async function updateService(data: unknown): Promise<void> {
  const payload = data as UpdateProjectServices;
  const response = await projectStore.updateProjectService(
    props.projectId,
    props.serviceId,
    payload,
  );
  if (response) {
    useToastStore().showToast(
      ToastMessagesLabels.serviceUpdated,
      ToastMessages.isSuccess,
    );
    emit('itemUpdated');
  } 
}
</script>

<style scoped></style>
