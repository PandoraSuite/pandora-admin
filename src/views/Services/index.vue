<template>
  <div class="flex w-full flex-col gap-y-4 px-2">
    <h1 class="mt-4 ml-3 text-2xl font-semibold">Services List</h1>
    <div class="divider"></div>
    <section class="flex w-[90%] flex-row justify-between gap-x-8 self-center">
      <CreateModal :title="'service'" @handleClick="createNewService" />
    </section>
    <section class="flex w-[90%] self-center">
      <Table :tableData="servicesStore.services" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

import { useServicesStore } from '@store/modules/useServicesStore';
import Table from '../../components/Table.vue';
import CreateModal from '@components/CreateModal.vue';

const servicesStore = useServicesStore();

function createNewService(payload: string) {}

onMounted(async () => {
  await servicesStore.getAllServices();
});
</script>

<style scoped></style>
