<template>
  <div class="justify-centera flex flex-row items-center gap-2 self-center">
    <EditModal
      :title="TitleMessagesLabels.apiKey"
      :formComponent="UpdateAPIKeyForm"
      @submitForm="updateAPIKey"
    />
    <button
      class="tooltip btn tooltip-top bg-error btn-xs sm:btn-xs md:btn-sm lg:btn-sm xl:btn-sm"
      :data-tip="TooltipMessagesLabels.deleteAPIKey"
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
import { useAPIKeysStore } from '@store/useAPIKeysStore';
import { useToastStore } from '@store/useToastStore';
import type { UpdateAPIKey } from '../../../types/apiKeys';
import UpdateAPIKeyForm from './UpdateAPIKeyForm.vue';

const props = defineProps<{
  id: number;
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
  }
}
</script>

<style scoped></style>
