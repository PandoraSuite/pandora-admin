<template>
  <div class="justify-centera flex flex-row items-center gap-2 self-center">
    <button
      class="tooltip btn tooltip-top bg-accent btn-xs sm:btn-xs md:btn-sm lg:btn-sm xl:btn-sm"
      data-tip="See project."
    >
      <font-awesome-icon
        :icon="['fa', 'diagram-project']"
        class="text text-white"
      />
    </button>
    <EditModal
      :title="'project'"
      :formComponent="''"
      @submitForm="editClient"
    />
    <button
      class="tooltip btn tooltip-top bg-error btn-xs sm:btn-xs md:btn-sm lg:btn-sm xl:btn-sm"
      data-tip="Delete client."
    >
      <font-awesome-icon :icon="['fas', 'trash-can']" class="text text-white" />
    </button>
  </div>
</template>

<script setup lang="ts">
import EditModal from '@components/EditModal.vue';
import { useProjectsStore } from '@store/useProjectsStore';
import { type UpdateClient } from '../../../types/clients';

const projectStore = useProjectsStore();

const props = defineProps<{
  id: number;
}>();

async function editClient(data: unknown): Promise<void> {
  // Assinging the data to a variable of type UpdateClient
  const payload = data as UpdateClient;
  // const response = await projectStore.updateProject(props.id, payload);
  // if (response) {
  //   useToastStore().showToast('Client edited successfully', 'success');
  // }
}
</script>

<style scoped></style>
