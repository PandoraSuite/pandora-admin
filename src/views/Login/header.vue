<template>
  <div class="navbar bg-primary shadow-sm px-4">
    <div class="flex-1 flex items-center gap-3">
      <img src="../../../public/assets/white-logo-only.svg" alt="Pandora Logo" class="w-[40px] h-[60px]">
      <h1 class="text-2xl text-white font-semibold">Pandora</h1>
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
</script>

<style scoped></style>
