<template>
  <div>
    <ul
      class="menu bg-sidebar w-full h-full overflow-x-hidden shadow-sm py-10 gap-2"
    >
      <li class="flex flex-row gap-1.5 content-center h-auto">
        <RouterLink to="#" class="w-[95%] menu-active">
          <font-awesome-icon
            :icon="['fa', 'server']"
            class="text text-text-primary"
          />
          Services
        </RouterLink>
      </li>
      <li class="flex flex-row gap-1.5 content-center h-auto">
        <RouterLink to="#" class="w-[95%]">
          <font-awesome-icon
            :icon="['fa', 'user-group']"
            class="text text-text-primary"
          />
          Clients
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<style scoped></style>
