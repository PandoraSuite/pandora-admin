<template>
  <div class="justify-centera flex flex-row items-center gap-2 self-center">
    <EditModal
      :title="'API Key'"
      @submitForm=""
    />
    <button
      class="tooltip btn tooltip-top bg-error btn-xs sm:btn-xs md:btn-sm lg:btn-sm xl:btn-sm"
      :data-tip="TooltipMessagesLabels.deleteAPIKey"
    >
      <font-awesome-icon :icon="['fas', 'trash-can']" class="text text-white" />
    </button>
  </div>
</template>

<script setup lang="ts">
import EditModal from '@components/EditModal.vue';
import { TooltipMessagesLabels } from '@enums/tooltipsTexts';

const props = defineProps<{
  id: number;
}>();
</script>

<style scoped></style>
