import type { RouteRecordRaw } from 'vue-router';

import LoginHeader from '@views/Login/components/Header.vue';
import ResetPasswordView from '@views/Login/components/ResetPassword.vue';
import LoginView from '@views/Login/index.vue';

const LoginRoute: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    components: {
      default: LoginView,
      LoginHeader: LoginHeader,
    },
    meta: { requiresAuth: false },
  },
  {
    path: '/reset-password',
    name: 'Reset Password',
    components: {
      default: ResetPasswordView,
      LoginHeader: LoginHeader,
    },
    meta: { requiresAuth: true },
  },
];

export default LoginRoute;
