<template>
  <div class="flex w-full flex-col gap-y-4 px-2">
    <h1 class="mt-4 ml-3 text-2xl font-semibold">Clients List</h1>
    <div class="divider"></div>
    <section class="flex w-[90%] flex-row justify-between gap-x-8 self-center">
      <!-- Add create button and search. -->
    </section>
    <section class="flex w-[90%] self-center">
      <Table :tableData="clientsStore.clients" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { useClientsStore } from '@store/modules/useClientsStore';
import { onMounted } from 'vue';
import Table from '../../components/Table.vue';

const clientsStore = useClientsStore();

onMounted(async () => {
  await clientsStore.getAllClients();
});
</script>

<style scoped></style>
