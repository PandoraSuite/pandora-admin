<template>
  <div class="w-full px-2 flex flex-col gap-y-4">
    <h1>Services List</h1>
    <section class="w-[90%] flex self-center">
      <Table />
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import Table from './components/Table.vue';
import { useServicesStore } from '@store/modules/useServicesStore';

const servicesStore = useServicesStore();

onMounted(async() => {
  const data = await servicesStore.getAllServices();
  console.log(data);
  
})
</script>

<style scoped></style>
