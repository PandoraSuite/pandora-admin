<template>
  <div class="mt-8 flex w-full flex-wrap justify-center gap-6">
    <div
      v-for="(card, i) in props.cardsData"
      :key="i"
      class="sm: card max-w-[30%] bg-tertiary text-primary-content shadow-sm card-sm md:max-w-[25%] lg:max-w-[22%]"
    >
      <div class="card-body">
        <h2 class="card-title text-2xl font-bold text-white">
          {{ card.name }}
        </h2>
        <div class="divider my-1"></div>

        <span class="flex flex-row items-center gap-2">
          <p class="font-bold text-white text-start">Version:</p>
          <p class="text-white text-end">{{ card.version }}</p>
        </span>
        <span class="flex flex-row items-center gap-2">
          <p class="font-bold text-white text-start">Reset frequency:</p>
          <p class="text-white text-end">{{ card.reset_frequency }}</p>
        </span>
        <span class="flex flex-row items-center gap-2">
          <p class="font-bold text-white text-start">Max requests:</p>
          <p class="text-white text-end">{{ card.max_request }}</p>
        </span>
        <span class="flex flex-row items-center gap-2">
          <p class="font-bold text-white text-start">Next reset:</p>
          <p class="text-white text-end">{{ card.next_reset }}</p>
        </span>
        <span class="flex flex-row items-center gap-2">
          <p class="font-bold text-white text-start">Assigned at:</p>
          <p class="text-white text-end">{{ card.assigned_at }}</p>
        </span>
        <span class="flex flex-row items-center gap-2">
          <p class="font-bold text-white text-start">Id:</p>
          <p class="text-white text-end">{{ card.id }}</p>
        </span>
        <div class="card-actions justify-end mt-3">
          <button class="btn">Buy Now</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProjectServices } from '../types/projects';

const props = defineProps<{
  cardsData: ProjectServices[];
}>();
</script>

<style scoped></style>
