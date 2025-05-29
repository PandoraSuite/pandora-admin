<template>
  <div class="justify-centera flex flex-row items-center gap-2 self-center">
    <EditModal
      :title="'service'"
      :formComponent="EditServiceForm"
      @submitForm="editService"
    />
    <button
      class="tooltip btn tooltip-top bg-error btn-xs sm:btn-xs md:btn-sm lg:btn-sm xl:btn-sm"
      :data-tip="TooltipMessagesLabels.deleteService"
    >
      <font-awesome-icon :icon="['fas', 'trash-can']" class="text text-white" />
    </button>
  </div>
</template>

<script setup lang="ts">
import EditModal from '@components/EditModal.vue';
// import { useToastStore } from '@store/useToastStore';
import EditServiceForm from './EditServiceForm.vue';
import { TooltipMessagesLabels } from '@enums/tooltipsTexts';
// import type { UpdateService } from '../../../types/services';
// import { useServicesStore } from '@store/useServicesStore';

// const serviceStore = useServicesStore();

const props = defineProps<{
  id: number;
  name: string;
}>();

async function editService(data: unknown): Promise<void> {
  // Assinging the data to a variable of type UpdateClient
  // const payload = data as UpdateService;
  // const response = await serviceStore.updateService(props.id, payload);
  // if (response) {
  //   useToastStore().showToast('Service edited successfully', 'success');
  // }
}
</script>

<style scoped></style>
