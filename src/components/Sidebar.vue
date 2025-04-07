<template>
  <div>
    <ul
      class="menu bg-sidebar w-[10%] min-h-screen overflow-x-hidden shadow-sm py-10 gap-2"
    >
      <li class="flex flex-row gap-1.5 content-center h-auto">
        <a class="w-[95%] menu-active">
          <font-awesome-icon
            :icon="['fa', 'server']"
            class="text text-text-primary"
          />
          Services
        </a>
      </li>
      <li class="flex flex-row gap-1.5 content-center h-auto">
        <a class="w-[95%]">
          <font-awesome-icon
            :icon="['fa', 'user-group']"
            class="text text-text-primary"
          />
          Clients
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
