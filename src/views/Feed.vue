<script lang="ts">
import { store } from "@/store";

export default {
  title: "Feed",
  emits: {
    click: null,
    logout: () => {
      store.dispatch("auth/logout");
      return true;
    },
  },
  methods: {
    logout() {
      this.$emit("logout");
    },
  },
};
</script>
<template>
  <div class="feed">
    <h1>Feed</h1>
    <button @click="logout">logout</button>
  </div>
</template>
<style scoped></style>
