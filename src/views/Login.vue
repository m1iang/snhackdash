<script lang="ts">
import { store } from "@/store";

export default {
  title: "Login",
  emits: {
    click: null,
    submit: ({ email, password }: any) => {
      if (email && password) {
        store.dispatch("auth/login", {
          email: email,
          password: password,
        });
        return true;
      }
      return false;
    },
  },
  computed: {
    isLoggedIn() {
      return store.getters["auth/isLoggedIn"];
    },
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      this.$emit("submit", {
        email: this.email,
        password: this.password,
      });
    },
  },
};
</script>
<template>
  <div class="login" v-if="!isLoggedIn">
    <h1>Login</h1>
    <form action="" @submit.prevent="login">
      <input type="email" v-model="email" placeholder="email name" />
      <input type="password" v-model="password" placeholder="password" />
      <button @click="login">submit</button>
    </form>
  </div>
  <div class="" v-else>
    <p>You are already logged in. Please head to home</p>
  </div>
</template>
<style scoped></style>
