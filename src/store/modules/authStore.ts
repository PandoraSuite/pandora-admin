import { saveToken } from '@composables/token';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

import type {
  LoginResponse,
  LoginPayload,
  ChangePasswordPayload,
} from '../../services/repositories/authRepository';

import { repositories } from '../../services/repositories/repositoriesFactory';

const authRepository = repositories.auth;

export const useAuthStore = defineStore('auth', () => {
  const user = ref<LoginResponse | null>(null);
  const isLoading = ref<boolean>(false);
  const mustResetPassword = ref<boolean>(false);

  const login = async (payload: LoginPayload) => {
    isLoading.value = true;
    try {
      const response = await authRepository.login(payload);
      user.value = response;
      saveToken(response.access_token);
      mustResetPassword.value = response.force_password_reset;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        throw new Error(`Error logging in user ${err.message}`);
      } else {
        throw new Error('Unexpected error while logging in user');
      }
    } finally {
      isLoading.value = false;
    }
  };

  const changePassword = async (payload: ChangePasswordPayload) => {
    isLoading.value = true;
    try {
      await authRepository.changePassword(payload);
      mustResetPassword.value = false;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        throw new Error(`Error changing password ${err.message}`);
      } else {
        throw new Error('Unexpected error while changing password');
      }
    } finally {
      isLoading.value = false;
    }
  };

  return {
    user,
    isLoading,
    mustResetPassword,
    login,
    changePassword,
  };
});