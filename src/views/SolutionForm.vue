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
    submit: ({
      requestId,
      solution,
      snack,
      location,
      status,
      temporalSolutionProviderId,
    }: any) => {
      if (snack && location && solution && status) {
        store.dispatch("user/makeSolution", {
          requestId: requestId,
          snack: snack,
          location: location,
          solution: solution,
          status: status,
          solutionProviderId: temporalSolutionProviderId,
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
    getRequestId(): any {
      console.log(this.$route.query.id);
      return this.$route.query.id;
    },
  },
  data() {
    return {
      snack: "",
      location: "",
      address: "",
      solution: "",
      requestId: "",
      temporalSolutionProviderId: "",
    };
  },
  methods: {
    makeRequest() {
      this.$emit("submit", {
        snack: this.snack,
        location: this.location,
        status: "solution_proposed",
        solution: this.solution,
        requestId: this.getRequestId,
        temporalSolutionProviderId: this.userId,
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
        <h1 class="text-3xl font-bold text-gray-800 dark:text-white">
          Request a snack to be dashed
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          Please provide a description of the snack you would like to be dashed to you.
        </p>
        <div class="py-2 space-y-2">
          <div class="flex flex-col space-y-2">
            <input
              type="text"
              v-model="snack"
              placeholder="motts fruit and veggie snacks, pringles, etc."
              class="grow px-4 py-2 text-gray-700 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 focus:border-orange-500 focus:outline-none focus:shadow-outline-orange dark:focus:shadow-outline-gray"
            />
            <input
              type="text"
              v-model="location"
              placeholder="where you're located in the building"
              class="grow px-4 py-2 text-gray-700 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 focus:border-orange-500 focus:outline-none focus:shadow-outline-orange dark:focus:shadow-outline-gray"
            />
          </div>
        </div>
        <textarea
          class="px-4 py-2 text-gray-700 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 focus:border-orange-500 focus:outline-none focus:shadow-outline-orange dark:focus:shadow-outline-gray"
          name=""
          placeholder="Write your solution to help this person here."
          id=""
          cols="30"
          rows="10"
          v-model="solution"
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
