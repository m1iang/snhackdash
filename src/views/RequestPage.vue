<script lang="ts">
import { auth } from "@/config/firebaseConfig";
import { store } from "@/store";
import { onAuthStateChanged } from "@firebase/auth";

export default {
  title: "Request a Solution",
  setup() {
    onAuthStateChanged(auth, (user: any) => {
      if (user) {
        store.dispatch("auth/setUser", user);
      } else {
        store.dispatch("auth/setUser", null);
      }
    });
  },
  emits: {
    click: null,
    submit: ({ userId, question, description, status }: any) => {
      if (question && description) {
        store.dispatch("user/makeRequest", {
          id: userId,
          question: question,
          description: description,
          status: status,
        });
        return true;
      }
      return false;
    },
  },
  computed: {
    isLoggedIn() {
      const isLoggedIn = store.getters["auth/getUserIsLoggedIn"];
      if (isLoggedIn === null) {
        return false;
      } else if (isLoggedIn === true) {
        return true;
      } else {
        return false;
      }
    },
    userId() {
      console.log(store.getters["auth/getUserId"]);
      return store.getters["auth/getUserId"];
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
        userId: this.userId,
        question: this.question,
        description: this.description,
        status: "pending",
      });
    },
    goBackToFeed() {
      window.history.back();
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
        <textarea
          style="white-space: pre-wrap"
          class="px-4 py-2 text-gray-700 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 focus:border-orange-500 focus:outline-none focus:shadow-outline-orange dark:focus:shadow-outline-gray"
          name=""
          placeholder="Any extra details, can be code, more context, etc."
          id=""
          cols="30"
          rows="10"
          v-model="description"
        ></textarea>
        <div class="py-4 flex flex-row space-x-4">
          <button
            class="w-fit px-4 py-2 rounded-full bg-orange-600 text-white font-semibold"
            type="button"
            @click="makeRequest"
          >
            Submit
          </button>
          <button
            class="w-fit px-4 py-2 rounded-full bg-orange-600 text-white font-semibold"
            type="button"
            @click="goBackToFeed"
          >
            cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<style scoped></style>
