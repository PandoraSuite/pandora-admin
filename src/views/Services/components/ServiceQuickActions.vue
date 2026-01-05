<template>
  <div class="justify-centera flex flex-row items-center gap-2 self-center">
    <EditModal
      :title="TitleMessagesLabels.serviceStatus"
      :form-component="EditServiceForm"
      @submit-form="updateServiceStatus"
    />
    <button
      class="tooltip btn tooltip-top bg-error btn-xs sm:btn-xs md:btn-sm lg:btn-sm xl:btn-sm"
      :data-tip="TooltipMessagesLabels.deleteService"
      @click="deleteService"
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
import { useServicesStore } from '@store/useServicesStore';
import { useToastStore } from '@store/useToastStore';
import type { UpdateServiceStatus } from '../../../types/services';
import EditServiceForm from './EditServiceForm.vue';

const serviceStore = useServicesStore();

const props = defineProps<{
  id: number;
  quickActionData?: any;
}>();

async function updateServiceStatus(data: unknown): Promise<void> {
  // Assinging the data to a variable of type UpdateClient
  const payload = data as UpdateServiceStatus;
  const response = await serviceStore.updateServiceStatus(props.id, payload);
  if (response) {
    useToastStore().showToast(
      ToastMessagesLabels.serviceStatusUpdated,
      ToastMessages.isSuccess,
    );
  }
}

async function deleteService(): Promise<void> {
  const response = await serviceStore.deleteService(props.id);
  if (response) {
    useToastStore().showToast(
      ToastMessagesLabels.serviceDeleted,
      ToastMessages.isSuccess,
    );
  }
}
</script>

<style scoped></style>
