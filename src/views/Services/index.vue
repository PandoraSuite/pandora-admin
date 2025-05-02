<template>
  <div class="flex w-full flex-col gap-y-4 px-2">
    <h1 class="mt-4 ml-3 text-2xl font-semibold">Services List</h1>
    <div class="divider"></div>
    <section class="flex w-[90%] flex-row justify-between gap-x-8 self-center">
      <CreateModal
        :title="'service'"
        :formComponent="CreateServiceForm"
        @submitForm="createService"
      />
      <SearchInput placeholder="Filter by Status" @search="handleSearch" />
    </section>
    <section class="flex w-[90%] self-center">
      <Table :tableData="servicesStore.services" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

import _CreateModal from '@components/CreateModal.vue';
import SearchInput from '@components/SearchInput.vue';
import { useServicesStore } from '@store/modules/useServicesStore';
import Table from '../../components/Table.vue';
import CreateServiceForm from './components/CreateServiceForm.vue';

interface ServicePayload {
  name: string;
  version: string;
}

const CreateModal = _CreateModal as typeof _CreateModal<ServicePayload>;

const servicesStore = useServicesStore();

function createService(payload: ServicePayload) {
  servicesStore.createNewService(payload);
}

onMounted(async () => {
  await servicesStore.getAllServices();
});

// Define the asynchronous function 'handleSearch' which receives the search term from the emitted event.
const handleSearch = async (searchValue: string): Promise<void> => {
  try {
    // Check if the received searchValue is "truthy" (i.e., not an empty string "").
    if (searchValue) {
      await servicesStore.getAllServices({
        status: searchValue,
      });
    } else {
      // If searchValue is empty (e.g., user cleared the input).
      await servicesStore.getAllServices();
    }
  } catch (error: unknown) {
    // Catches the error thrown by the store action
    console.error('Error getting services in handleSearch:', error);
  }
};
</script>

<style scoped></style>
