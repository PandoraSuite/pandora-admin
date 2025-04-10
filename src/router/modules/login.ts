import LoginView from "../../views/Login/index.vue";
import ResetPasswordView from "../../views/Login/components/resetPassword.vue";
import LoginHeader from "../../views/Login/components/header.vue";

const LoginRoute = [
  {
    path: "/login",
    name: "login",
    components: {
      default: LoginView,
      LoginHeader: LoginHeader,
    },
  },
  {
    path: "/reset-password",
    name: "reset-password",
    components: {
      default: ResetPasswordView,
      LoginHeader: LoginHeader,
    },
  },
];

export default LoginRoute;
