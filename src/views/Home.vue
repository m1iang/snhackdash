<script lang="ts">
import Navbar from "@/components/Navbar.vue";
import { HiSolidChevronRight } from "oh-vue-icons/icons";

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
  components: { Navbar, HiSolidChevronRight },
};
</script>
<template>
  <div class="home">
    <Navbar />
    <div class="mx-24">
      <div class="py-24">
        <div class="grid grid-rows lg:grid-cols-6">
          <div class="col-span-2 lg:col-span-3 flex flex-col font-bold">
            <div class="pb-4">
              <h1 class="text-6xl text-[#333] font-serif">Stack Overflow?</h1>
              <h1 class="text-6xl text-[#333] font-serif">more like</h1>
              <h1 class="text-6xl font-serif">
                <span class="text-[#fc935b]">Snack</span> Overflow.
              </h1>
            </div>
            <h1 class="w-2/3">Want to stretch your legs?</h1>
            <h1 class="pb-4 w-2/3">Got a software problem you need help with?</h1>
            <h1 class="pb-12 w-2/3">
              Find someone who can help you solve that by
              <span class="bg-[#fc935b] py-1 px-2 text-white">dashing</span>
              them a snack.
            </h1>
            <button
              @click="signup"
              class="px-3 py-2 rounded-full drop-shadow-xl hover:scale-105 transition-all ease-in-out duration-500 delay-300 w-fit bg-gradient-to-r from-orange-500 via-amber-500 to-red-300"
            >
              <h1 class="text-white py-1 px-3 text-lg font-semibold">
                Get Started
                <span>
                  <v-icon name="hi-solid-chevron-right" scale="1.1"></v-icon>
                </span>
              </h1>
            </button>
          </div>
          <div class="col-span-3 invisible lg:visible lg:p-0 lg:col-span-2 flex">
            <img class="rounded-full" src="@/assets/images/snhackdash.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
