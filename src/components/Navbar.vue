<template>
  <div class="navbar">
    <div class="mx-24 rounded-b-lg bg-[#2d2d2d]">
      <div class="container flex flex-wrap items-center justify-between mx-auto">
        <div class="flex items-center text-[#FCFBF4]">
          <h1 class="font-serif font-semibold grow text-3xl px-12 py-3">
            Snhackdash<span class="text-4xl text-[#fc935b]">.</span>
          </h1>
        </div>
        <div class="space-x-8 px-12">
          <router-link
            class="text-lg text-white hover:underline hover:decoration-[#fc935b] hover:decoration-2 underline-offset-4"
            to="/"
            >Home</router-link
          >
          <router-link
            class="text-lg text-white hover:underline hover:decoration-[#fc935b] hover:decoration-2 underline-offset-4"
            to="/dashers"
            >Order</router-link
          >
          <router-link to="/login"
            ><v-icon name="hi-login" flip="horizontal" fill="#fc935b" scale="1.2">
            </v-icon>
          </router-link>
          <button v-if="isLoggedIn" @click="logout">
            <v-icon name="hi-logout" fill="#fc935b" scale="1.2"> </v-icon>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

<script lang="ts">
import { auth } from "@/config/firebaseConfig";
import { store } from "@/store";
import { onAuthStateChanged } from "@firebase/auth";
import { HiLogin } from "oh-vue-icons/icons";
import { HiLogout } from "oh-vue-icons/icons";

export default {
  name: "Navbar",
  components: { HiLogin, HiLogout },
  emits: {
    click: null,
    logout: () => {
      store.dispatch("auth/logout");
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
  methods: {
    logout() {
      this.$emit("logout");
    },
  },
};
</script>
