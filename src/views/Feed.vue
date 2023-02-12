<script lang="ts">
import Badge from "@/components/Badge.vue";
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
    store.dispatch("user/fetchDeliveries");
    store.dispatch("user/destroyCompletedTransactions");
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
    Badge,
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
    acceptSolution(requestId: any) {
      store.dispatch("user/acceptSolution", {
        requestId: requestId,
      });
      this.deliveryStarted = "true";
      if (this.getDelivery === "true") {
        this.deliveryStarted = "true";
      } else {
        this.deliveryStarted = "false";
        store.dispatch("user/startDelivery", {
          requestId: requestId,
          dashingUser: this.userId,
          solutionUser:
            this.findMyActiveRequest.solutionProviderId ||
            this.findMyActiveRequest.temporalSolutionProviderId,
          snack: this.findMyActiveRequest.snack,
          location: this.findMyActiveRequest.location,
          deliveryStarted: "true",
        });
      }
    },
    completeDelivery(deliveryId: any) {
      store.dispatch("user/finishDelivery", {
        deliveryId: deliveryId,
      });
      this.deliveryConfirmed = "true";
    },
  },
  data() {
    return {
      descending: false,
      deliveryConfirmed: "",
      deliveryStarted: "",
    };
  },
  computed: {
    getDeliveries() {
      return store.getters["user/getDeliveries"];
    },
    canDisplaySolution() {
      const deliveries = this.getDeliveries;
      const userId = this.userId;
      const currentUserIsDasherDelivery = deliveries.find(
        (delivery: any) => delivery.dashingUser === userId
      );
      const currentUserIsSolutionProviderDelivery = deliveries.find(
        (delivery: any) => delivery.solutionUser === userId
      );
      if (currentUserIsDasherDelivery) {
        return currentUserIsDasherDelivery.deliveryFinished;
      } else if (currentUserIsSolutionProviderDelivery) {
        return currentUserIsSolutionProviderDelivery.deliveryFinished;
      } else {
        return "false";
      }
    },
    displaySolution() {
      const requests = this.requests;
      const userId = this.userId;
      const activeRequest = requests.find((request: any) => request.userId === userId);
      const request = activeRequest;
      return (
        request.solution || request.temporalSolution || store.getters["user/getSolution"]
      );
    },
    getDelivery() {
      const deliveries = this.getDeliveries;
      const userId = this.userId;
      const currentUserIsDasherDelivery = deliveries.find(
        (delivery: any) => delivery.dashingUser === userId
      );
      const currentUserIsSolutionProviderDelivery = deliveries.find(
        (delivery: any) => delivery.solutionUser === userId
      );
      if (currentUserIsDasherDelivery) {
        console.log(currentUserIsDasherDelivery.deliveryStarted);
        return currentUserIsDasherDelivery.deliveryStarted;
      } else if (currentUserIsSolutionProviderDelivery) {
        return currentUserIsSolutionProviderDelivery.deliveryStarted;
      } else {
        return "false";
      }
    },
    getSnackOfDelivery() {
      const deliveries = this.getDeliveries;
      const userId = this.userId;
      const currentUserIsDasherDelivery = deliveries.find(
        (delivery: any) => userId === delivery.dashingUser
      );
      const currentUserIsSolutionProviderDelivery = deliveries.find(
        (delivery: any) => userId === delivery.solutionUser
      );
      if (currentUserIsDasherDelivery) {
        return currentUserIsDasherDelivery.snack;
      } else if (currentUserIsSolutionProviderDelivery) {
        return currentUserIsSolutionProviderDelivery.snack;
      } else {
        return "false";
      }
    },
    getLocationOfDelivery() {
      const deliveries = this.getDeliveries;
      const userId = this.userId;
      const currentUserIsDasherDelivery = deliveries.find(
        (delivery: any) => userId === delivery.dashingUser
      );
      const currentUserIsSolutionProviderDelivery = deliveries.find(
        (delivery: any) => userId === delivery.solutionUser
      );

      if (currentUserIsDasherDelivery) {
        return currentUserIsDasherDelivery.location;
      } else if (currentUserIsSolutionProviderDelivery) {
        return currentUserIsSolutionProviderDelivery.location;
      } else {
        return "false";
      }
    },
    findIfImBeingDashed() {
      const deliveries = this.getDeliveries;
      const userId = this.userId;
      const currentUserIsDasherDelivery = deliveries.find(
        (delivery: any) => delivery.dashingUser === userId
      );
      const currentUserIsSolutionProviderDelivery = deliveries.find(
        (delivery: any) => delivery.solutionUser === userId
      );
      // console.log(currentUserIsDasherDelivery);
      // console.log(currentUserIsSolutionProviderDelivery);
      if (
        currentUserIsSolutionProviderDelivery === undefined &&
        currentUserIsDasherDelivery
      ) {
        return {
          dasher: "true",
          solution: "false",
          deliverId: currentUserIsDasherDelivery.deliveryId,
        };
      } else if (
        currentUserIsDasherDelivery === undefined &&
        currentUserIsSolutionProviderDelivery
      ) {
        return {
          solution: "true",
          dasher: "false",
          deliverId: currentUserIsSolutionProviderDelivery.deliveryId,
        };
      } else {
        return { dasher: "false", solution: "false", deliverId: "" };
      }
    },
    findMyActiveRequest() {
      const requests = this.requests;
      const userId = this.userId;
      const activeRequest = requests.find((request: any) => request.userId === userId);
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
    getDashingUserName() {
      const deliveries = this.getDeliveries;
      const userId = this.userId;
      const currentUserIsDasherDelivery = deliveries.find(
        (delivery: any) => delivery.dashingUser === userId
      );
      const currentUserIsSolutionProviderDelivery = deliveries.find(
        (delivery: any) => delivery.solutionUser === userId
      );
      if (currentUserIsDasherDelivery) {
        return currentUserIsDasherDelivery.dashingUserName;
      } else if (currentUserIsSolutionProviderDelivery) {
        return currentUserIsSolutionProviderDelivery.dashingUserName;
      } else {
        return "false";
      }
    },
    getSolutionUserName() {
      const deliveries = this.getDeliveries;
      const userId = this.userId;
      const currentUserIsDasherDelivery = deliveries.find(
        (delivery: any) => delivery.dashingUser === userId
      );
      const currentUserIsSolutionProviderDelivery = deliveries.find(
        (delivery: any) => delivery.solutionUser === userId
      );
      if (currentUserIsDasherDelivery) {
        return currentUserIsDasherDelivery.solutionUserName;
      } else if (currentUserIsSolutionProviderDelivery) {
        return currentUserIsSolutionProviderDelivery.solutionUserName;
      } else {
        return "false";
      }
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
          <div v-if="canDisplaySolution === 'false'" class="">
            <div class="flex flex-col w-full" v-if="getDelivery === 'false'">
              <h1 class="text-2xl pb-5 font-semibold">Your Current Request</h1>
              <div
                class="border border-2 border-gray-300 hover:border-[#fc935b] rounded-lg w-full"
              >
                <div class="p-5" v-if="findMyActiveRequest">
                  <h1 class="font-semibold text-3xl py-2">
                    {{ findMyActiveRequest.question }}
                  </h1>
                  <div class="flex flex-row space-x-3">
                    <Badge :text="findMyActiveRequest.status" />

                    <v-icon
                      @click="acceptSolution(findMyActiveRequest.requestId)"
                      class="cursor-pointer hover:scale-125 transition-all ease-in-out duration-500 delay-300"
                      name="bi-check-circle-fill"
                      fill="lightgreen"
                      scale="2"
                      v-if="findMyActiveRequest.status === 'solution_proposed'"
                    ></v-icon>
                  </div>
                  <p class="text-gray-500" v-html="findMyActiveRequest.description"></p>
                </div>
              </div>
            </div>
            <div class="border-2 p-3 rounded-lg" v-else-if="getDelivery === 'true'">
              <div v-if="findIfImBeingDashed.dasher === 'true'">
                <h1 class="font-semibold text-3xl py-2">
                  Deliver the {{ getSnackOfDelivery }} to {{ getLocationOfDelivery }} 📌
                </h1>
                <h1 class="font-semibold text-xl text-gray-400">
                  You are delivering to
                  <span class="text-[#fc935b]">{{ getSolutionUserName }}</span>
                </h1>
              </div>
              <div class="" v-else-if="findIfImBeingDashed.solution === 'true'">
                <div class="" v-if="deliveryConfirmed === 'false'">
                  <h1 class="font-semibold text-3xl py-2">
                    Waiting for...{{ getSnackOfDelivery }} @
                    {{ getLocationOfDelivery }} 📌
                  </h1>
                  <h1 class="font-semibold text-xl text-gray-400">
                    <span class="text-[#fc935b]">{{ getDashingUserName }}</span> will be
                    your courier.
                  </h1>

                  <div class="flex flex-row space-x-2 py-4 content-center">
                    <h1 class="font-semibold text-gray-400 align-baseline">
                      Got your delivery? Hit
                    </h1>
                    <button
                      @click="completeDelivery(findIfImBeingDashed.deliverId)"
                      class="font-semibold text-white px-4 py-2 rounded-full drop-shadow-xl hover:scale-105 transition-all ease-in-out duration-500 delay-300 w-fit bg-gradient-to-r from-orange-500 via-amber-500 to-red-300"
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="p-5 border border-2 border-gray-300 hover:border-[#fc935b] rounded-lg w-full"
            v-else
          >
            <h1 class="font-semibold text-xl text-[#fc935b]">Your solution 🎉</h1>
            <p v-html="displaySolution"></p>
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
              <p class="pb-2" v-html="request.description"></p>
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
