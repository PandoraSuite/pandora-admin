// ! Estos son datos de ejemplo. Una vez definidos las store Pandora, escribir aquí los métodos a lugar.

import { defineStore } from 'pinia';

// Definimos la estructura del usuario
interface User {
  id: number;
  name: string;
  email: string;
}

// Creamos la store de usuarios
export const useUserStore = defineStore('user', {
  state: () => ({
    users: [] as User[], // Estado inicial vacío
    loading: false,
  }),

  getters: {
    totalUsers: (state) => state.users.length, // Obtiene la cantidad total de usuarios
  },

  actions: {
    async fetchUsers() {
      this.loading = true;
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/users',
        );
        this.users = await response.json();
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        this.loading = false;
      }
    },
  },
});
