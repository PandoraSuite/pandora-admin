<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
import { useUserStore } from "./stores/userStore";
import { ref, onMounted } from "vue";
import { getUsers, type User } from "./services/userService";

const users = ref<User[]>([]);
const loading = ref<boolean>(true);

onMounted(async () => {
  try {
    users.value = await getUsers();
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
});

const userStore = useUserStore();

onMounted(() => {
  userStore.fetchUsers();
});
</script>

<template>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />

  <div>
    <h1>Usuarios</h1>
    <p v-if="userStore.loading">Cargando usuarios...</p>
    <ul v-else>
      <li v-for="user in userStore.users" :key="user.id">
        {{ user.name }} - {{ user.email }}
      </li>
    </ul>
    <p>Total de usuarios: {{ userStore.totalUsers }}</p>
  </div>

  <div>
    <h1>Lista de Usuarios</h1>
    <p v-if="loading">Cargando...</p>
    <ul v-else>
      <li v-for="user in users" :key="user.id">
        {{ user.name }} - {{ user.email }}
      </li>
    </ul>
  </div>

  <div>
    <h1>Home Page</h1>
    <router-link to="/about">Go to About</router-link>
  </div>

  <div>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </nav>
    <router-view />
  </div>

  <font-awesome-icon icon="user" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
