<template>
  <div class="navbar bg-primary px-4 shadow-sm">
    <div class="flex flex-1 items-center gap-3">
      <img
        src="/assets/white-logo-only.svg"
        alt="Pandora Logo"
        class="h-[60px] w-[40px]"
      />
      <h1 class="text-2xl font-semibold text-white">Pandora</h1>
    </div>
    <div class="flex-none">
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="theme-btn btn-circle">
          <font-awesome-icon icon="bars" class="text-white" />
        </label>
        <ul
          tabindex="0"
          class="dropdown-content menu z-1 w-52 rounded-box bg-base-100 p-2 shadow-sm"
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

<script setup lang="ts"></script>

<style scoped></style>
