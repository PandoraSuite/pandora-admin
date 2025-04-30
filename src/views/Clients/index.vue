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
    </section>
    <section class="flex w-[90%] self-center">
      <Table :tableData="clientsStore.clients" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

import _CreateModal from '@components/CreateModal.vue';
import { useClientsStore } from '@store/modules/useClientsStore';
import Table from '../../components/Table.vue';
import CreateClientForm from './components/CreateClientForm.vue';

interface ClientPayload {
  name: string;
  email: string;
  type: string;
}

const CreateModal = _CreateModal as typeof _CreateModal<ClientPayload>;

const clientsStore = useClientsStore();

function createClient(payload: ClientPayload) {
  clientsStore.createNewClient(payload);
}

onMounted(async () => {
  await clientsStore.getAllClients();
});
</script>

<style scoped></style>
