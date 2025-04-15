import axios from 'axios';

// Axios instance with base configuration
const api = axios.create({
  baseURL: 'http://localhost:8000/',
  timeout: 10000, // Maximum wait time in milliseconds
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Interceptor to add the token if needed
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Get the token from local storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Request error:', error.response?.data || error.message);
    return Promise.reject(error);
  },
);

export default api;
