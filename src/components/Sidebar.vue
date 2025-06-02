<template>
  <div>
    <ul
      class="sidebar menu w-full gap-2 overflow-x-hidden bg-sidebar py-10 shadow-sm"
    >
      <li class="flex h-auto flex-row content-center gap-1.5">
        <RouterLink to="/home" class="w-[95%]">
          <font-awesome-icon
            :icon="['fa', 'chart-simple']"
            class="text text-text-primary"
          />
          Dashboard
        </RouterLink>
      </li>
      <li class="flex h-auto flex-row content-center gap-1.5">
        <RouterLink to="/services" class="w-[95%]">
          <font-awesome-icon
            :icon="['fa', 'server']"
            class="text text-text-primary"
          />
          Services
        </RouterLink>
      </li>
      <li class="flex h-auto flex-row content-center gap-1.5">
        <RouterLink to="/clients" class="w-[95%]">
          <font-awesome-icon
            :icon="['fa', 'user-group']"
            class="text text-text-primary"
          />
          Clients
        </RouterLink>
      </li>
      <li class="flex h-auto flex-row content-center gap-1.5">
        <RouterLink to="/projects" class="w-[95%]">
          <font-awesome-icon
            :icon="['fa', 'diagram-project']"
            class="text text-text-primary"
          />
          Projects
        </RouterLink>
      </li>
      <p class="bottom-[10px] mt-auto px-[12px] text-subtitle">BETA</p>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<style scoped>
.sidebar {
  min-height: 100vh;
  height: 100%;
}
</style>
