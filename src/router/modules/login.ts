import type { RouteRecordRaw } from "vue-router";

import LoginView from "../../views/Login/index.vue";
import ResetPasswordView from "../../views/Login/components/resetPassword.vue";
import LoginHeader from "../../views/Login/components/header.vue";

const LoginRoute: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "Login",
    components: {
      default: LoginView,
      LoginHeader: LoginHeader,
    },
  },
  {
    path: "/reset-password",
    name: "Reset Password",
    components: {
      default: ResetPasswordView,
      LoginHeader: LoginHeader,
    },
  },
];

export default LoginRoute;
