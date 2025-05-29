<template>
  <div class="justify-centera flex flex-row items-center gap-2 self-center">
    <button
      class="tooltip btn tooltip-top bg-accent btn-xs sm:btn-xs md:btn-sm lg:btn-sm xl:btn-sm"
      :data-tip="TooltipMessagesLabels.seeClient"
      @click="seeProjects"
    >
      <font-awesome-icon
        :icon="['fa', 'diagram-project']"
        class="text text-white"
      />
    </button>
    <EditModal
      :title="'client'"
      :formComponent="EditClientForm"
      @submitForm="editClient"
    />
    <button
      class="tooltip btn tooltip-top bg-error btn-xs sm:btn-xs md:btn-sm lg:btn-sm xl:btn-sm"
      :data-tip="TooltipMessagesLabels.deleteClient"
    >
      <font-awesome-icon :icon="['fas', 'trash-can']" class="text text-white" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

import EditModal from '@components/EditModal.vue';
import { useClientsStore } from '@store/useClientsStore';
import { useToastStore } from '@store/useToastStore';
import { type UpdateClient } from '../../../types/clients';
import EditClientForm from './EditClientForm.vue';
import { TooltipMessagesLabels } from '@enums/tooltipsTexts';

const clientStore = useClientsStore();
const router = useRouter();

const props = defineProps<{
  id: number;
}>();

async function editClient(data: unknown): Promise<void> {
  // Assinging the data to a variable of type UpdateClient
  const payload = data as UpdateClient;
  const response = await clientStore.updateClient(Number(props.id), payload);
  if (response) {
    useToastStore().showToast('Client edited successfully', 'success');
  }
}

function seeProjects() {
  router.push({
    name: 'Client-Projects',
    params: { client_id: props.id },
  });
}
</script>

<style scoped></style>
