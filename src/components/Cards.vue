<template>
  <div class="flex w-full flex-col">
    <section>
      <component
        :is="props.createActionComponent"
        :formComponent="assingFormComponent"
        :title="'service'"
        :buttonText="props.buttonText"
        @submitForm="submitForm"
      />
    </section>
    <div class="my-8 flex w-full flex-wrap justify-center gap-6">
      <div
        v-if="internalCards.length > 0"
        v-for="(card, i) in internalCards"
        :key="i"
        class="sm: card max-w-[40%] border border-border bg-cards text-primary-content shadow-xl card-sm md:max-w-[45%] lg:max-w-[36%]"
      >
        <div class="card-body gap-y-0.5">
          <h2 class="text-text-primary card-title text-xl font-bold">
            {{ card.name }} - {{ card.version }}
          </h2>
          <div class="divider my-0.5"></div>

          <span
            v-if="'reset_frequency' in card"
            class="flex flex-row items-center gap-2"
          >
            <p class="text-text-primary text-start font-bold">
              Reset frequency:
            </p>
            <p class="text-text-primary text-end">
              {{ card.reset_frequency }}
            </p>
          </span>
          <span
            v-if="'max_request' in card"
            class="flex flex-row items-center gap-2"
          >
            <p class="text-text-primary text-start font-bold">Max requests:</p>
            <p class="text-text-primary text-end">{{ card.max_request }}</p>
          </span>
          <span
            v-if="'next_reset' in card"
            class="flex flex-row items-center gap-2"
          >
            <p class="text-text-primary text-start font-bold">Next reset:</p>
            <p class="text-text-primary text-end">{{ card.next_reset }}</p>
          </span>
          <span
            v-if="'available_request' in card"
            class="flex flex-row items-center gap-2"
          >
            <p class="text-text-primary text-start font-bold">
              Available request:
            </p>
            <p class="text-text-primary text-end">
              {{ card.available_request }}
            </p>
          </span>
          <span
            v-if="'assigned_at' in card"
            class="flex flex-row items-center gap-2"
          >
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
      <div v-else class="mt-[2%] w-full">
        <h3 class="text-center text-2xl">
          There are no associated services yet.
        </h3>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" generic="T">
import { onMounted, ref, watch, type DefineComponent } from 'vue';

import type { EnvironmentService } from '../types/environments';
import type { ProjectServices } from '../types/projects';

const props = defineProps<{
  projectId: number;
  cardsData: ProjectServices[] | EnvironmentService[];
  buttonText: string;
  quickActionComponent: DefineComponent<{}, {}, any>;
  createActionComponent: DefineComponent<{}, {}, any>;
  assingFormComponent: DefineComponent<{}, {}, any>;
}>();

const internalCards = ref<ProjectServices[] | EnvironmentService[]>([]);

const emit = defineEmits<{
  (e: 'submitForm', data: T): void;
}>();

function submitForm(data: T) {
  emit('submitForm', data);
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
