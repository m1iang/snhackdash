<script lang="ts">
import { auth, db } from "@/config/firebaseConfig";
import router from "@/router";
import { store } from "@/store";
import { onAuthStateChanged } from "@firebase/auth";
import { doc, onSnapshot, where } from "@firebase/firestore";

import {
  HiSortAscending,
  HiSortDescending,
  HiLogout,
  IoSettingsOutline,
} from "oh-vue-icons/icons";

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
  },
  setup() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        store.dispatch("auth/setUser", user);
      } else {
        store.dispatch("auth/setUser", null);
      }
    });
    store.dispatch("user/fetchRequests");
  },
  // created() {
  //   onSnapshot(doc(db, "requests", this.outGoingRequest.id), (doc: any) => {
  //     if (doc.exists()) {
  //       if (
  //         doc.data().status === "delivery confirmed" &&
  //         doc.data().userId === this.userId
  //       )
  //         this.deliveryConfirmed = true;
  //     } else {
  //       this.deliveryConfirmed = false;
  //     }
  //   });
  // },
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
    navigateToSendSolutionPageWithRequestId(requestId: any) {
      router.push({ path: "/solution", query: { id: requestId } });
    },
  },
  data() {
    return {
      descending: false,
      deliveryConfirmed: false,
    };
  },
  computed: {
    findMyActiveRequest() {
      const requests = this.requests;
      const userId = this.userId;
      const activeRequest = requests.find((request: any) => request.userId === userId);
      console.log(userId);
      return activeRequest;
    },
    displayName() {
      return store.getters["user/getUser"].name;
    },
    userId() {
      return store.getters["auth/getUserId"];
    },
    email() {
      return store.getters["auth/getUserEmail"];
    },
    requests() {
      return store.getters["user/getRequests"];
    },
    nonUserRequests() {
      const requests = this.requests;
      const userId = this.userId;
      const nonUserRequests = requests.filter(
        (request: any) => request.userId !== userId
      );
      return nonUserRequests;
    },
  },
};
</script>
<template>
  <div class="feed">
    <div class="flex">
      <aside class="h-screen z-40 left-0 sticky top-0 px-6 py-6 border-r-2">
        <div class="h-full px-3 py-4 overflow-y-auto ml-24 mr-6">
          <h1 class="text-lg font-semibold">{{ displayName }}</h1>
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
            <div class="flex flex-row space-x-2">
              <button>
                <v-icon scale="2" name="io-settings-outline"></v-icon>
              </button>
              <button @click="logout">
                <v-icon scale="2" name="hi-logout"></v-icon>
              </button>
            </div>
          </div>
        </div>
      </aside>
      <div class="p-6 grow">
        <div class="flex flex-row space-x-4 pb-8 pt-4">
          <div class="flex flex-col">
            <h1 class="text-2xl pb-5 font-semibold">Your Current Request</h1>
            <div
              class="border border-2 border-gray-300 hover:border-[#fc935b] rounded-lg w-full"
            >
              <div class="p-5" v-if="findMyActiveRequest">
                <h1 class="font-semibold">Your Request:</h1>
                <h1 class="font-semibold">
                  {{ findMyActiveRequest.question }}
                </h1>
                <p class="text-gray-500">{{ findMyActiveRequest.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-col">
          <h1 class="text-2xl font-semibold">Other's Requests</h1>
        </div>

        <div class="flex flex-row px-12 pt-4 justify-end">
          <button @click="toggleAscendingOrDescending">
            <v-icon v-if="descending" name="hi-sort-ascending" scale="2"></v-icon>
            <v-icon v-else name="hi-sort-descending" scale="2"></v-icon>
          </button>
        </div>

        <div class="flex flex-col p-12 space-y-6">
          <div
            v-if="nonUserRequests"
            v-for="request in nonUserRequests"
            :key="request.requestId"
            class="border border-2 border-gray-300 hover:border-[#fc935b] rounded-lg w-full"
          >
            <div class="p-4">
              <h1 class="lowercase text-gray-500">
                <span class="text-[#fc935b] font-semibold"></span>
                will dash a snack for...
              </h1>
              <h1 class="py-4 text-xl font-semibold lowercase text-gray-700">
                {{ request.question }}
              </h1>
              <p class="pb-2">{{ request.description }}</p>
              <button
                @click="navigateToSendSolutionPageWithRequestId(request.requestId)"
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
