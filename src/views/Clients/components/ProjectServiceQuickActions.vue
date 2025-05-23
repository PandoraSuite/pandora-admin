<template>
  <div class="justify-centera flex flex-row items-center gap-2 self-center">
    <EditModal :title="'service'" />
    <button
      class="tooltip btn tooltip-top bg-quick-action btn-xs sm:btn-xs md:btn-sm lg:btn-sm xl:btn-sm"
      data-tip="Refresh service."
    >
      <font-awesome-icon
        :icon="['fas', 'arrows-rotate']"
        class="text text-white"
      />
    </button>
    <button
      class="tooltip btn tooltip-top bg-error btn-xs sm:btn-xs md:btn-sm lg:btn-sm xl:btn-sm"
      data-tip="Remove service."
      @click="removeService"
    >
      <font-awesome-icon :icon="['fas', 'trash-can']" class="text text-white" />
    </button>
  </div>
</template>

<script setup lang="ts">
import EditModal from '@components/EditModal.vue';
import { useProjectsStore } from '@store/useProjectsStore';
import { useToastStore } from '@store/useToastStore';

const projectStore = useProjectsStore();

const props = defineProps<{
  serviceId: number;
  projectId: number;
}>();

async function removeService() {
  const response = await projectStore.deleteProjectService(
    props.projectId,
    props.serviceId,
  );
  if (response) {
    useToastStore().showToast('Service removed successfully', 'success');
  }
}
</script>

<style scoped></style>
