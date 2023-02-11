<script lang="ts">
import { auth } from "@/config/firebaseConfig";
import router from "@/router";
import { store } from "@/store";
import { onAuthStateChanged } from "@firebase/auth";
import { HiSortAscending, HiSortDescending } from "oh-vue-icons/icons";

export default {
  title: "Feed",
  emits: {
    click: null,
    logout: () => {
      store.dispatch("auth/logout");
      return true;
    },
    navigateToRequestPage: () => {
      const userId = store.getters["auth/getUserId"];
      router.push({ path: "/request", query: { userId } });
    },
    makeRequest: () => {
      store.dispatch("user/makeAWillDashPost");
      return true;
    },
  },
  setup() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        store.dispatch("auth/setUser", user);
      } else {
        store.dispatch("auth/setUser", null);
      }
    });
  },
  components: {
    HiSortAscending,
    HiSortDescending,
  },
  methods: {
    logout() {
      this.$emit("logout");
    },
    toggleAscendingOrDescending() {
      this.descending = !this.descending;
    },
    makeRequest() {
      this.$emit("navigateToRequestPage");
    },
  },
  data() {
    return {
      descending: false,
    };
  },
  computed: {
    displayName() {
      return store.getters["auth/getUserName"];
    },
    email() {
      return store.getters["auth/getUserEmail"];
    },
  },
};
</script>
<template>
  <div class="feed">
    <div class="flex">
      <aside class="h-screen z-40 left-0 sticky top-0 px-6 py-6 border-r-2">
        <div class="h-full px-3 py-4 overflow-y-auto ml-24 mr-6">
          <h1 class="text-lg font-semibold">@john</h1>
          <h1 class="text-md text-gray-400 font-semibold">{{ email }}</h1>

          <div class="py-12">
            <h1 class="font-semibold">Need help?</h1>
            <h1 class="font-semibold">Dash a snack for a solution!</h1>
            <div class="py-4">
              <button
                @click="makeRequest"
                class="font-semibold text-white px-4 py-2 rounded-full drop-shadow-xl hover:scale-105 transition-all ease-in-out duration-500 delay-300 w-fit bg-gradient-to-r from-orange-500 via-amber-500 to-red-300"
              >
                Request
              </button>
            </div>
          </div>
        </div>
      </aside>
      <div class="p-6 grow">
        <div class="flex flex-row px-12 pt-4 justify-end">
          <button @click="toggleAscendingOrDescending">
            <v-icon v-if="descending" name="hi-sort-ascending" scale="2"></v-icon>
            <v-icon v-else name="hi-sort-descending" scale="2"></v-icon>
          </button>
        </div>

        <div class="flex flex-col p-12 space-y-6">
          <div
            class="border border-2 border-gray-300 hover:border-[#fc935b] rounded-lg w-full"
          >
            <div class="p-4">
              <h1 class="lowercase text-gray-500">
                <span class="text-[#fc935b] font-semibold">simon</span>
                will dash a snack for...
              </h1>
              <h1 class="py-4 text-xl font-semibold lowercase text-gray-700">
                How to pass auth context in React?
              </h1>
              <button
                class="bg-[#fc935b] py-2 px-4 font-semibold hover:scale-105 transition-all duration-700 delay-200 ease-in-out text-white rounded-full"
              >
                Send Solution
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
