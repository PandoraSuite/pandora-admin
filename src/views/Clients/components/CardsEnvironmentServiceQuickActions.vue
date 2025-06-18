<template>
  <div class="justify-centera flex flex-row items-center gap-2 self-center">
    <EditModal
      :title="TitleMessagesLabels.service"
      :form-component="EditEnvironmentServicesForm"
      @submit-form="updateService"
    />
    <button
      class="tooltip btn tooltip-top bg-quick-action btn-xs sm:btn-xs md:btn-sm lg:btn-sm xl:btn-sm"
      :data-tip="TooltipMessagesLabels.refreshService"
      @click="resetServiceQuota"
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
import { useEnvironmentsStore } from '@store/useEnvironmentsStore';
import { useToastStore } from '@store/useToastStore';
import type { UpdateEnvironmentServices } from '../../../types/environments';
import EditEnvironmentServicesForm from './EditEnvironmentServicesForm.vue';

const environmentStore = useEnvironmentsStore();

const props = defineProps<{
  serviceId: number;
  projectId: number;
  environmentId: number;
}>();

// This event is emitted when the project is updated successfully.
// It is used to notify the parent component that the project has been updated.
// This allows the parent component to refresh the project list or perform any other necessary actions.
const emit = defineEmits<{
  (e: 'itemUpdated'): void;
}>();

async function removeService() {
  const response = await environmentStore.deleteEnvironmentService(
    props.projectId,
    props.serviceId,
  );
  if (response) {
    useToastStore().showToast(
      ToastMessagesLabels.serviceRemoved,
      ToastMessages.isSuccess,
    );
    emit('itemUpdated');
  }
}

async function updateService(data: unknown): Promise<void> {
  const payload = data as UpdateEnvironmentServices;
  const response = await environmentStore.updateEnvironmentService(
    props.environmentId,
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

async function resetServiceQuota(): Promise<void> {
  const response = await environmentStore.resetServiceQuota(
    props.projectId,
    props.serviceId,
  );
  if (response) {
    useToastStore().showToast(
      ToastMessagesLabels.serviceQuotaRefreshed,
      ToastMessages.isSuccess,
    );
    emit('itemUpdated');
  }
}
</script>

<style scoped></style>
