<template>
  <div
    v-if="props.tableData.length >= 1"
    class="mt-[2%] w-full overflow-x-auto"
  >
    <table class="table w-full self-center table-xs">
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
        <tr
          v-for="(item, j) in paginatedData"
          :key="j"
          class="border-solid border-border text-center"
        >
          <td v-for="key in tableColumns" :key="key">
            {{ item[key as keyof T] }}
          </td>
          <td class="flex items-center justify-center">
            <component
              ref="formComponentRef"
              :is="props.quickActionsComponent"
              :id="item.id"
              :name="item.name"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <div class="mt-7 flex items-center justify-center gap-2">
      <button
        @click="currentPage--"
        :disabled="currentPage === 1"
        class="btn btn-sm"
      >
        Prev
      </button>

      <span>Page {{ currentPage }} of {{ totalPages }}</span>

      <button
        @click="currentPage++"
        :disabled="currentPage === totalPages"
        class="btn btn-sm"
      >
        Next
      </button>
    </div>
  </div>
  <div v-else class="mt-[2%] w-full">
    <h3 class="text-center text-2xl">There is no data available yet.</h3>
  </div>
</template>

<script setup lang="ts" generic="T extends { id: number; name: string }">
import { computed, ref, watch, type DefineComponent } from 'vue';

const props = defineProps<{
  // Define the props using a generic interface.
  tableData: T[];
  quickActionsComponent: DefineComponent<{}, {}, any>;
  // {} = props, {} = raw bindings, any = slots
}>();

const tableColumns = ref<(keyof T)[]>([]);
const currentPage = ref<number>(1);
// Number of rows per page.
const itemsPerPage: number = 10;

// The keys of the first object are obtained to generate the table headers(columns).
function firstObjectKeys(): (keyof T)[] {
  const firstObject = props.tableData[0];
  return firstObject ? (Object.keys(firstObject) as (keyof T)[]) : [];
}

// Column header values ​​are formatted and returned as sentences.
function formatHeader(key: string): string {
  return key.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
}

// Gets the total number of available pages.
const totalPages = computed(() => {
  return Math.ceil(props.tableData.length / itemsPerPage);
});

// Divide the information by page.
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return props.tableData.slice(start, start + itemsPerPage);
});

// The assignment of table headers is made reactive to any change in the props.
watch(
  () => props.tableData,
  (newData) => {
    if (newData.length > 0) {
      tableColumns.value = firstObjectKeys();
    }
  },
  { immediate: true },
);
</script>

<style scoped></style>
