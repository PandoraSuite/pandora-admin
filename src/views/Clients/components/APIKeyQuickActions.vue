<template>
  <div class="justify-centera flex flex-row items-center gap-2 self-center">
    <RevealAPIKeyModal :title="TitleMessagesLabels.apiKey" :id="props.id" />
    <EditModal
      :title="TitleMessagesLabels.apiKey"
      :form-component="UpdateAPIKeyForm"
      @submit-form="updateAPIKey"
    />
    <button
      class="tooltip btn tooltip-top bg-error btn-xs sm:btn-xs md:btn-sm lg:btn-sm xl:btn-sm"
      :data-tip="TooltipMessagesLabels.deleteAPIKey"
      @click="deleteAPIKey(props.id)"
    >
      <font-awesome-icon :icon="['fas', 'trash-can']" class="text text-white" />
    </button>
  </div>
</template>

<script setup lang="ts">
import EditModal from '@components/EditModal.vue';
import RevealAPIKeyModal from '@components/RevealAPIKeyModal.vue';
import { TitleMessagesLabels } from '@enums/componentTitle';
import { ToastMessages, ToastMessagesLabels } from '@enums/toastMessages';
import { TooltipMessagesLabels } from '@enums/tooltipsTexts';
import { useAPIKeysStore } from '@store/useAPIKeysStore';
import { useToastStore } from '@store/useToastStore';
import type { UpdateAPIKey } from '../../../types/apiKeys';
import UpdateAPIKeyForm from './UpdateAPIKeyForm.vue';

const props = defineProps<{
  id: number;
}>();

// This event is emitted when the project is updated successfully.
// It is used to notify the parent component that the project has been updated.
// This allows the parent component to refresh the project list or perform any other necessary actions.
const emit = defineEmits<{
  (e: 'itemUpdated'): void;
}>();

const apiKeysStore = useAPIKeysStore();

async function updateAPIKey(data: unknown) {
  // Assinging the data to a variable of type UpdateClient
  const payload = data as UpdateAPIKey;
  const response = await apiKeysStore.updateAPIKey(props.id, payload);
  if (response) {
    useToastStore().showToast(
      ToastMessagesLabels.apiKeyUpdated,
      ToastMessages.isSuccess,
    );
    emit('itemUpdated');
  }
}

async function deleteAPIKey(id: number): Promise<void> {
  const response = await apiKeysStore.deleteAPIKey(id);
  if (response) {
    useToastStore().showToast(
      ToastMessagesLabels.apiKeyDeleted,
      ToastMessages.isSuccess,
    );
    emit('itemUpdated');
  }
}
</script>

<style scoped></style>
