<template>
  <div>
    <ul
      class="menu h-full w-full gap-2 overflow-x-hidden bg-sidebar py-10 shadow-sm"
    >
      <li class="flex h-auto flex-row content-center gap-1.5">
        <RouterLink to="#" class="menu-active w-[95%]">
          <font-awesome-icon
            :icon="['fa', 'server']"
            class="text text-text-primary"
          />
          Services
        </RouterLink>
      </li>
      <li class="flex h-auto flex-row content-center gap-1.5">
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
import { RouterLink } from 'vue-router';
</script>

<style scoped></style>
