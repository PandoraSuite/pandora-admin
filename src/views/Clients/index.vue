<template>
  <div class="flex w-full flex-col gap-y-4 px-2">
    <h1 class="mt-4 ml-3 text-2xl font-semibold">Clients List</h1>
    <div class="divider"></div>
    <section class="flex w-[90%] flex-row justify-between gap-x-8 self-center">
      <CreateModal
        :title="'client'"
        :formComponent="CreateClientForm"
        @submitForm="createClient"
      />
      <SearchInput placeholder="Filter by Type" @search="handleSearch" />
    </section>
    <section class="flex w-[90%] self-center">
      <Table :tableData="clientsStore.clients" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue';

import _CreateModal from '@components/CreateModal.vue';
import SearchInput from '@components/SearchInput.vue';
import { useClientsStore } from '@store/useClientsStore';
import { useToastStore } from '@store/useToastStore';
import { storeToRefs } from 'pinia';
import Table from '../../components/Table.vue';
import CreateClientForm from './components/CreateClientForm.vue';

interface ClientPayload {
  name: string;
  email: string;
  type: string;
}

const CreateModal = _CreateModal as typeof _CreateModal<ClientPayload>;

const clientsStore = useClientsStore();
const { error } = storeToRefs(clientsStore);

function createClient(payload: ClientPayload) {
  clientsStore.createClient(payload);
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
const handleSearch = async (searchValue: string): Promise<void> => {
  try {
    // Check if the received searchValue is "truthy" (i.e., not an empty string "").
    if (searchValue) {
      await clientsStore.getClients({
        type: searchValue,
      });
    } else {
      // If searchValue is empty (e.g., user cleared the input).
      await clientsStore.getClients();
    }
  } catch (error: unknown) {
    // Catches the error thrown by the store action
    console.error('Error getting clients in handleSearch:', error);
  }
};
</script>

<style scoped></style>
