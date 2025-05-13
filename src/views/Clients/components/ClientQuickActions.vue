<template>
  <div class="justify-centera flex flex-row items-center gap-2 self-center">
    <button
      class="tooltip btn tooltip-top bg-accent btn-xs sm:btn-xs md:btn-sm lg:btn-sm xl:btn-sm"
      data-tip="See projects."
      @click="seeProjects(props.id, props.name)"
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
      data-tip="Delete client."
    >
      <font-awesome-icon :icon="['fas', 'trash-can']" class="text text-white" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

import EditModal from '@components/EditModal.vue';
import { useClientsStore } from '@store/useClientsStore';
import { type UpdateClient } from '../../../types/clients';
import { useToastStore } from '@store/useToastStore';
import EditClientForm from './EditClientForm.vue';

const clientStore = useClientsStore();
const router = useRouter();

const props = defineProps<{
  id: number;
  name: string;
}>();

async function editClient(payload: UpdateClient): Promise<void> {
  const response = await clientStore.updateClient(props.id, payload);
  if (response) {
    useToastStore().showToast('Client edited successfully', 'success');
  }
}

async function seeProjects(id: number, name: string) {
  const response = await clientStore.getClientProjects(id);
  if (response) {
    router.push({
      name: 'Client-Projects',
      params: { id, name },
    });
  }
}
</script>

<style scoped></style>
