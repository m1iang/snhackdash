<script lang="ts">
import { store } from "@/store";

export default {
  title: "Sign up",
  emits: {
    click: null,
    submit: ({ firstName, lastName, email, password, confirmPassword }: any) => {
      if (
        firstName &&
        lastName &&
        email &&
        password &&
        confirmPassword &&
        password === confirmPassword
      ) {
        store.dispatch("auth/register", {
          name: `${firstName} ${lastName}`,
          email: email,
          password: password,
        });
        return true;
      }
      return false;
    },
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  },
  computed: {
    isLoggedIn() {
      return store.getters["auth/isLoggedIn"];
    },
  },
  methods: {
    signup() {
      this.$emit("submit", {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword,
      });
    },
  },
};
</script>
<template>
  <div class="signup" v-if="!isLoggedIn">
    <h1>Sign up</h1>
    <form action="" @submit.prevent="signup">
      <input type="text" v-model="firstName" placeholder="first name" />
      <input type="text" v-model="lastName" placeholder="last name" />
      <input type="email" v-model="email" placeholder="email name" />
      <input type="password" v-model="password" placeholder="password" />
      <input type="password" v-model="confirmPassword" placeholder="confirm password" />
      <button @click="signup">submit</button>
    </form>
  </div>
  <div class="" v-else>
    <p>You are already logged in. Please head to home</p>
  </div>
</template>
<style scoped></style>
