<template>
  <div class="justify-centera flex flex-row items-center gap-2 self-center">
    <button
      class="tooltip btn tooltip-top bg-accent btn-xs sm:btn-xs md:btn-sm lg:btn-sm xl:btn-sm"
      :data-tip="TooltipMessagesLabels.seeProject"
      @click="seeProject"
    >
      <font-awesome-icon
        :icon="['fa', 'diagram-project']"
        class="text text-white"
      />
    </button>
    <EditModal :title="TitleMessagesLabels.project" @submitForm="" />
    <button
      class="tooltip btn tooltip-top bg-error btn-xs sm:btn-xs md:btn-sm lg:btn-sm xl:btn-sm"
      :data-tip="TooltipMessagesLabels.deleteProject"
    >
      <font-awesome-icon :icon="['fas', 'trash-can']" class="text text-white" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

import EditModal from '@components/EditModal.vue';
import { useProjectsStore } from '@store/useProjectsStore';
import { type UpdateClient } from '../../../types/clients';
import { TooltipMessagesLabels } from '@enums/tooltipsTexts';
import { TitleMessagesLabels } from '@enums/componentTitle';

const projectStore = useProjectsStore();
const router = useRouter();

const props = defineProps<{
  id: number;
}>();

function seeProject() {
  router.push({
    name: 'Project-Environments',
    params: { project_id: props.id },
  });
}

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
