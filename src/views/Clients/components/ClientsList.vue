<template>
  <div class="divider"></div>
  <div class="flex w-full flex-col gap-y-4 px-2">
    <section class="flex w-[90%] flex-row justify-between gap-x-8 self-center">
      <CreateModal
        :title="TitleMessagesLabels.client"
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
import { TitleMessagesLabels } from '@enums/componentTitle';
import { ModalButtonTextLabels } from '@enums/modalButtonText';
import { ToastMessages, ToastMessagesLabels } from '@enums/toastMessages';
import { useBreadcrumbStore } from '@store/useBreadcrumbStore';
import { useClientsStore } from '@store/useClientsStore';
import { useIdsStore } from '@store/useIdsStore';
import { useToastStore } from '@store/useToastStore';
import Table from '../../../components/Table.vue';
import type { ClientPayload } from '../../../types/clients';
import QuickActions from './ClientQuickActions.vue';
import CreateClientForm from './CreateClientForm.vue';

const CreateModal = _CreateModal as typeof _CreateModal<ClientPayload>;

const clientsStore = useClientsStore();
const { error } = storeToRefs(clientsStore);
const idsStore = useIdsStore();
const breadcrumbStore = useBreadcrumbStore();

async function createClient(payload: ClientPayload): Promise<void> {
  const response = await clientsStore.createClient(payload);
  if (response) {
    useToastStore().showToast(
      ToastMessagesLabels.clientCreated,
      ToastMessages.isSuccess,
    );
  }
}

function clearIds() {
  idsStore.clearClientId();
  idsStore.clearProjectId();
  idsStore.clearEnvironmentId();
}

function resetClientData() {
  breadcrumbStore.clearAllState();
}

onMounted(async () => {
  await clientsStore.getClients();
  clearIds();
  resetClientData();
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
