<template>
  <div class="justify-centera flex flex-row items-center gap-2 self-center">
    <button
      class="tooltip btn tooltip-top bg-accent btn-xs sm:btn-xs md:btn-sm lg:btn-sm xl:btn-sm"
      :data-tip="TooltipMessagesLabels.seeClient"
      @click="seeProjects"
    >
      <font-awesome-icon :icon="['fa', 'user-group']" class="text text-white" />
    </button>
    <EditModal
      :title="TitleMessagesLabels.client"
      :formComponent="EditClientForm"
      @submitForm="editClient"
    />
    <button
      class="tooltip btn tooltip-top bg-error btn-xs sm:btn-xs md:btn-sm lg:btn-sm xl:btn-sm"
      :data-tip="TooltipMessagesLabels.deleteClient"
      @click="deleteClient(props.id)"
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
import { useClientsStore } from '@store/useClientsStore';
import { useToastStore } from '@store/useToastStore';
import { type UpdateClient } from '../../../types/clients';
import EditClientForm from './EditClientForm.vue';

const clientStore = useClientsStore();
const router = useRouter();

const props = defineProps<{
  id: number;
  quickActionData?: any;
}>();

// This event is emitted when the project is updated successfully.
// It is used to notify the parent component that the project has been updated.
// This allows the parent component to refresh the project list or perform any other necessary actions.
const emit = defineEmits<{
  (e: 'itemUpdated'): void;
}>();

async function editClient(data: unknown): Promise<void> {
  // Assinging the data to a variable of type UpdateClient
  const payload = data as UpdateClient;
  const response = await clientStore.updateClient(Number(props.id), payload);
  if (response) {
    useToastStore().showToast('Client edited successfully', 'success');
  }
  // Emit the 'projectUpdated' event.
  emit('itemUpdated');
}

function seeProjects() {
  router.push({
    name: 'Client-Projects',
    params: { client_id: props.id },
  });
}

async function deleteClient(id: number): Promise<void> {
  const response = await clientStore.deleteClient(id);
  if (response) {
    useToastStore().showToast(
      ToastMessagesLabels.clientDeleted,
      ToastMessages.isSuccess,
    );
    // Emit the 'projectUpdated' event.
    emit('itemUpdated');
  }
}
</script>

<style scoped></style>
