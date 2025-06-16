<template>
  <div class="justify-centera flex flex-row items-center gap-2 self-center">
    <button
      class="tooltip btn tooltip-top bg-accent btn-xs sm:btn-xs md:btn-sm lg:btn-sm xl:btn-sm"
      :data-tip="TooltipMessagesLabels.seeEnvironment"
      @click="seeEnvironment"
    >
      <font-awesome-icon :icon="['fa', 'cubes']" class="text text-white" />
    </button>
    <EditModal
      :title="TitleMessagesLabels.environment"
      :form-component="EditEnvironmentForm"
      @submit-form="UpdateEnvironment"
    />
    <button
      class="tooltip btn tooltip-top bg-error btn-xs sm:btn-xs md:btn-sm lg:btn-sm xl:btn-sm"
      :data-tip="TooltipMessagesLabels.deleteEnvironment"
      @click="deleteEnvironment(props.id)"
    >
      <font-awesome-icon :icon="['fas', 'trash-can']" class="text text-white" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

import EditModal from '@components/EditModal.vue';
import { TitleMessagesLabels } from '@enums/componentTitle';
import { ToastMessages, ToastMessagesLabels } from '@enums/toastMessages';
import { TooltipMessagesLabels } from '@enums/tooltipsTexts';
import { useEnvironmentsStore } from '@store/useEnvironmentsStore';
import { useToastStore } from '@store/useToastStore';
import type { UpdateEnvironmentName } from '../../../types/environments';
import EditEnvironmentForm from './EditEnvironmentForm.vue';

const environmentStore = useEnvironmentsStore();
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

function seeEnvironment() {
  router.push({
    name: 'Environments-APIkeys',
    params: { environment_id: props.id },
  });
}

async function UpdateEnvironment(data: unknown): Promise<void> {
  // Assinging the data to a variable of type UpdateClient
  const payload = data as UpdateEnvironmentName;
  const response = await environmentStore.updateEnvironment(props.id, payload);
  if (response) {
    useToastStore().showToast(
      ToastMessagesLabels.environmentUpdated,
      ToastMessages.isSuccess,
    );
  }
  // Emit the 'itemUpdated' event.
  emit('itemUpdated');
}

async function deleteEnvironment(id: number): Promise<void> {
  const response = await environmentStore.deleteEnvironment(id);
  if (response) {
    useToastStore().showToast(
      ToastMessagesLabels.environmentDeleted,
      ToastMessages.isSuccess,
    );
  }
  // Emit the 'itemUpdated' event.
  emit('itemUpdated');
}
</script>

<style scoped></style>
