<template>
  <div class="flex flex-col min-h-screen">
    <AppHeader />
    <div class="flex-grow flex items-center justify-center bg-background-color">
      <div class="w-full max-w-md p-6 shadow-lg rounded-xl bg-white">
        <div class="flex flex-col items-center justify-center">
          <img
            src="../../../public/assets/color-logo-only.svg"
            alt="Pandora Logo"
            class="w-[90px] h-[170px] mb-2"
          />
          <h1 class="text-2xl mb-8 font-bold text-primary">Please Sing in</h1>
        </div>
        <form @submit.prevent="handleLogin">
          <input
            type="text"
            class="input input-accent mb-8 w-full border border-accent"
            placeholder="Username"
            v-model="username"
            required
          />
          <PasswordInput v-model="password" placeholder="Password" />
          <button
            class="btn btn-primary text-white w-1/3 block mx-auto"
            type="submit"
          >
            <font-awesome-icon icon="user" class="mr-2" />Sign in
          </button>
          <p class="text-primary text-center mt-5">Version xxx</p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AppHeader from './header.vue';
import PasswordInput from './passwordInput.vue';

const username = ref<string>('');
const password = ref<string>('');

const handleLogin = (): void => {
  console.log('Login attempt with:', {
    username: username.value,
    password: password.value,
  });
};
</script>

<style scoped></style>
