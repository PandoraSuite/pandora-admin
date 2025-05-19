<template>
  <div
    v-if="props.tableData"
    class="mt-[2%] mb-4 w-full overflow-x-auto"
  >
    <table class="table table-xs">
      <thead class="w-full justify-center bg-tertiary">
        <tr>
          <th
            v-for="(column, i) in tableColumns"
            :key="i"
            class="text-center text-lg font-semibold text-white"
          >
            {{ formatHeader(column as string) }}
          </th>
          <th class="text-center text-lg font-semibold text-white">
            Quick Actions
          </th>
        </tr>
      </thead>
      <tbody class="w-full">
        <tr class="border-solid border-border text-center">
          <td v-for="(column, j) in tableColumns" :key="j">
            {{ rowsData?.[column] }}
          </td>
          <td class="flex items-center justify-center">
            <component
              ref="formComponentRef"
              :is="props.quickActionsComponent"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-else class="mt-[2%] w-full">
    <h3 class="text-center text-2xl">There is no data available yet.</h3>
  </div>
</template>

<script setup lang="ts" generic="T extends Record<string, any>">
import { ref, watch, type DefineComponent } from 'vue';

import type { FilteredProject } from '../types/projects';

const props = defineProps<{
  // Define the props using a generic interface.
  tableData: T;
  quickActionsComponent: DefineComponent<{}, {}, any>;
  // {} = props, {} = raw bindings, any = slots
}>();

const tableColumns = ref<(keyof FilteredProject)[]>();

const rowsData = ref<FilteredProject | null>(null);

// Column header values ​​are formatted and returned as sentences.
function formatHeader(key: string): string {
  return key.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
}

// The assignment of table headers is made reactive to any change in the props.
watch(
  () => props.tableData,
  (newData) => {
    if (newData) {
      rowsData.value = props.tableData as unknown as FilteredProject;

      tableColumns.value = Object.keys(props.tableData) as (keyof FilteredProject)[];
    }
  },
  { immediate: true },
);
</script>

<style scoped></style>
