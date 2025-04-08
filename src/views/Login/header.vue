<template>
  <div class="navbar bg-primary shadow-sm px-4">
    <div class="flex-1 flex items-center gap-3">
      <img :src="pandoraLogo" alt="Pandora Logo" class="h-11 logo-filtered" />
      <h1 class="text-3xl font-bold text-white">Pandora</h1>
    </div>
    <div class="flex-none">
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-circle">
          <font-awesome-icon icon="bars" class="h-5 w-5" />
        </label>
        <ul
          tabindex="0"
          class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
        >
          <li>
            <a><font-awesome-icon icon="file" />Documentation</a>
          </li>
          <li>
            <a><font-awesome-icon icon="fa-code-branch" />GitHub Links</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import pandoraLogo from '../../../public/assets/white-logo.png';
</script>

<style scoped></style>
