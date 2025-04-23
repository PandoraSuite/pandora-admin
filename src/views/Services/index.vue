<template>
  <div class="w-full px-2 flex flex-col gap-y-4">
    <h1 class="text-2xl font-semibold mt-4 ml-3">Services List</h1>
    <div class="divider"></div>
    <section class=" w-[90%] self-center justify-between flex flex-row gap-x-8">
      <!-- Add create button and search. -->
    </section>
    <section class="w-[90%] flex self-center">
      <Table :tableData="servicesStore.services" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import Table from '../../components/Table.vue';
import { useServicesStore } from '@store/modules/useServicesStore';

const servicesStore = useServicesStore();

onMounted(async() => {
  await servicesStore.getAllServices();  
})
</script>

<style scoped></style>
