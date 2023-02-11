<script lang="ts">
import { store } from "@/store";

export default {
  title: "Request a Solution",
  emits: {
    click: null,
    submit: ({ question, description }: any) => {
      const urlParams = new URLSearchParams(window.location.search);
      const userId = urlParams.get("userId");
      if (userId && question && description) {
        store.dispatch("user/makeAWillDashPost", {
          userId,
          question,
          description,
        });
        return true;
      }
      return false;
    },
  },
  computed: {
    isLoggedIn() {
      const isLoggedIn = store.getters["auth/isLoggedIn"];
      if (isLoggedIn === null) {
        return false;
      } else if (isLoggedIn === true) {
        return true;
      } else {
        return false;
      }
    },
  },
  data() {
    return {
      question: "",
      description: "",
    };
  },
  methods: {
    makeRequest() {
      this.$emit("submit", {
        question: this.question,
        description: this.description,
      });
    },
  },
};
</script>
<template>
  <div class="login">
    <div class="container mx-auto py-24 px-12">
      <form @submit.prevent="makeRequest" class="flex flex-col">
        <div class="py-2 space-y-2">
          <div class="flex flex-row">
            <input
              type="text"
              v-model="question"
              placeholder="Your question"
              class="grow px-4 py-2 text-gray-700 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 focus:border-orange-500 focus:outline-none focus:shadow-outline-orange dark:focus:shadow-outline-gray"
            />
          </div>
        </div>
        <v-md-editor v-model="description"></v-md-editor>
        <button type="button" @click="makeRequest">Submit</button>
      </form>
    </div>
  </div>
</template>
<style scoped></style>
