<script lang="ts">
export default {
  title: "Home",
  methods: {
    login() {
      this.$router.push("/login");
    },
    signup() {
      this.$router.push("/signup");
    },
  },
};
</script>
<template>
  <div class="home">
    <h1>Hello</h1>
    <button @click="login">Login</button>
    <button @click="signup">Signup</button>
  </div>
</template>
<style scoped></style>
