import axios from 'axios';

import { loadToken } from '@composables/token';
import { ToastMessages, ToastMessagesLabels } from '@enums/toastMessages';
import router from '@router/index';
import { useAuthStore } from '@store/useAuthStore';
import { useToastStore } from '@store/useToastStore';

// Axios instance with base configuration.
const api = axios.create({
  baseURL: 'http://localhost:8081/',
  timeout: 10000, // Maximum wait time in milliseconds.
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Interceptor to add the token if needed.
api.interceptors.request.use(
  (config) => {
    const token = loadToken(); // Get the token from local storage.
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

//  Response interceptor to handle errors globally.
api.interceptors.response.use(
  (response) => response,

  (error) => {
    const toastStore = useToastStore();
    const authStore = useAuthStore();
    const currentRoute = router.currentRoute.value.fullPath;
    let message: string;

    if (currentRoute === '/login' && error.status === 401) {
      // Handle invalid login.
      message = error.response.data.error;

      toastStore.showToast(message, ToastMessages.isError);
    } else if (error.status === 401) {
      // Handle 401 errors and log out user.
      toastStore.showToast(
        ToastMessagesLabels.sessionExpired,
        ToastMessages.isError,
      );

      authStore.setRedirectPath(currentRoute);

      authStore.logout();

      setTimeout(() => {
        router.push('/login');
      }, 1000); // Short delay to display the toast.
    }

    return Promise.reject(error);
  },
);

export default api;
