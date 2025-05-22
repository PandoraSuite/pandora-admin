<template>
  <div class="flex w-full flex-col">
    <section>
      <component
        :is="props.createActionComponent"
        :formComponent="AssingProjectService"
        :title="'service'"
        :buttonText="props.buttonText"
        @submitForm="submitForm"
      />
    </section>
    <div class="my-8 flex w-full flex-wrap justify-center gap-6">
      <div
        v-for="(card, i) in internalCards"
        :key="i"
        class="sm: card max-w-[40%] border border-border bg-cards text-primary-content shadow-xl card-sm md:max-w-[45%] lg:max-w-[36%]"
      >
        <div class="card-body gap-y-0.5">
          <h2 class="text-text-primary card-title text-xl font-bold">
            {{ card.name }} - {{ card.version }}
          </h2>
          <div class="divider my-0.5"></div>

          <span class="flex flex-row items-center gap-2">
            <p class="text-text-primary text-start font-bold">
              Reset frequency:
            </p>
            <p class="text-text-primary text-end">{{ card.reset_frequency }}</p>
          </span>
          <span class="flex flex-row items-center gap-2">
            <p class="text-text-primary text-start font-bold">Max requests:</p>
            <p class="text-text-primary text-end">{{ card.max_request }}</p>
          </span>
          <span class="flex flex-row items-center gap-2">
            <p class="text-text-primary text-start font-bold">Next reset:</p>
            <p class="text-text-primary text-end">{{ card.next_reset }}</p>
          </span>
          <span class="flex flex-row items-center gap-2">
            <p class="text-text-primary text-start font-bold">Assigned at:</p>
            <p class="text-text-primary text-end">{{ card.assigned_at }}</p>
          </span>
          <div class="mt-3 card-actions justify-end">
            <component
              :is="props.quickActionComponent"
              :serviceId="card.id"
              :projectId="projectId"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" generic="T">
import { onMounted, ref, watch, type DefineComponent } from 'vue';

import AssingProjectService from '@views/Clients/components/AssingProjectService.vue';
import type { ProjectServices } from '../types/projects';

const props = defineProps<{
  projectId: number;
  cardsData: ProjectServices[];
  buttonText: string;
  quickActionComponent: DefineComponent<{}, {}, any>;
  createActionComponent: DefineComponent<{}, {}, any>;
}>();

const internalCards = ref<ProjectServices[]>([]);

const emit = defineEmits<{
  (
    e: 'submitForm',
    data: T,
  ): void;
}>();

function submitForm(data: T) {
  emit('submitForm', data)
}

onMounted(() => {
  internalCards.value = props.cardsData;
});

watch(
  () => props.cardsData,
  (newCards) => {
    internalCards.value = newCards;
  },
  { immediate: true, deep: true },
);
</script>

<style scoped></style>
