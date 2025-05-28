<template>
  <div class="divider"></div>
  <div class="flex w-full flex-col gap-y-4 px-2">
    <section class="flex w-[90%] flex-row justify-between gap-x-8 self-center">
      <CreateModal
        :title="'client'"
        :buttonText="ModalButtonTextLabels.create"
        :formComponent="CreateClientForm"
        @submitForm="createClient"
      />
      <SearchInput placeholder="Filter by Type" @search="handleSearch" />
    </section>
    <section class="flex w-[90%] self-center">
      <Table
        :tableData="clientsStore.clients"
        :quickActionsComponent="QuickActions"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onMounted, watch } from 'vue';

import _CreateModal from '@components/CreateModal.vue';
import SearchInput from '@components/SearchInput.vue';
import { useClientsStore } from '@store/useClientsStore';
import { useToastStore } from '@store/useToastStore';
import Table from '../../../components/Table.vue';
import type { ClientPayload } from '../../../types/clients';
import QuickActions from './ClientQuickActions.vue';
import CreateClientForm from './CreateClientForm.vue';
import { ModalButtonTextLabels } from '@enums/modalButtonText';

const CreateModal = _CreateModal as typeof _CreateModal<ClientPayload>;

const clientsStore = useClientsStore();
const { error } = storeToRefs(clientsStore);

async function createClient(payload: ClientPayload) {
  const response = await clientsStore.createClient(payload);
  if (response) {
    useToastStore().showToast('Client created successfully', 'success');
  }
}

onMounted(async () => {
  await clientsStore.getClients();
});

watch(error, (value, _) => {
  if (value) {
    useToastStore().showToast(value, 'error');
  }
});

// Define the asynchronous function 'handleSearch' which receives the search term from the emitted event.
async function handleSearch(searchValue: string): Promise<void> {
  // Check if the received searchValue is "truthy" (i.e., not an empty string "").
  if (searchValue) {
    await clientsStore.getClients({
      type: searchValue,
    });
  } else {
    // If searchValue is empty (e.g., user cleared the input).
    await clientsStore.getClients();
  }
}
</script>

<style scoped></style>
