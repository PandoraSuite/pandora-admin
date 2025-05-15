<template>
  <div class="flex w-full flex-col gap-y-4 px-2">
    <section class="flex w-[90%] flex-row justify-between gap-x-8 self-center">
      <CreateModal
        :title="'service'"
        :formComponent="CreateServiceForm"
        @submitForm="createService"
      />
      <SearchInput placeholder="Filter by Status" @search="handleSearch" />
    </section>
    <section class="flex w-[90%] self-center">
      <Table :tableData="servicesStore.services" :quickActionsComponent="ServiceQuickActions" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onMounted, watch } from 'vue';

import _CreateModal from '@components/CreateModal.vue';
import SearchInput from '@components/SearchInput.vue';
import { useServicesStore } from '@store/useServicesStore';
import { useToastStore } from '@store/useToastStore';
import Table from '../../../components/Table.vue';
import type { ServicePayload } from '../../../types/services';
import CreateServiceForm from './CreateServiceForm.vue';
import ServiceQuickActions from './ServiceQuickActions.vue';

const CreateModal = _CreateModal as typeof _CreateModal<ServicePayload>;

const servicesStore = useServicesStore();
const { error } = storeToRefs(servicesStore);

async function createService(payload: ServicePayload) {
  const response = await servicesStore.createNewService(payload);
  if (response) {
    useToastStore().showToast('Service created successfully', 'success');
  }
}

onMounted(async () => {
  await servicesStore.getServices();
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
    await servicesStore.getServices({
      status: searchValue,
    });
  } else {
    // If searchValue is empty (e.g., user cleared the input).
    await servicesStore.getServices();
  }
}
</script>

<style scoped></style>
