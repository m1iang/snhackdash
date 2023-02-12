<script lang="ts">
import { store } from "@/store";

export default {
  title: "Login",
  emits: {
    click: null,
    submit: ({ email, password }: any) => {
      if (email && password) {
        store.dispatch("auth/login", {
          email: email,
          password: password,
        });
        return true;
      }
      return false;
      alert("Please fill in all the fields correctly");
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
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      this.$emit("submit", {
        email: this.email,
        password: this.password,
      });
    },
  },
};
</script>
<template>
  <div class="login">
    <div class="container mx-auto">
      <div class="px-24">
        <section class="">
          <div
            class="flex flex-col items-center justify-center px-6 mx-auto md:h-screen lg:py-0"
          >
            <a
              href="#"
              class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
            >
              <img
                class="w-24 h-24 mr-2 rounded-full"
                src="@/assets/images/snhackdash.png"
                alt="logo"
              />
              <span class="text-3xl px-2 font-semibold text-gray-900 dark:text-white"
                >Login to<br />
                Snhackdash
              </span>
            </a>
            <div
              class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
            >
              <div class="p-6 sm:p-8">
                <div class="">
                  <div class="pb-4">
                    <div class="flex flex-col space-y-2">
                      <form @submit.prevent="login" class="flex flex-col">
                        <div class="py-2 space-y-2">
                          <div class="flex flex-row">
                            <input
                              type="email"
                              v-model="email"
                              placeholder="Enter your email"
                              class="grow px-4 py-2 text-gray-700 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 focus:border-orange-500 focus:outline-none focus:shadow-outline-orange dark:focus:shadow-outline-gray"
                            />
                          </div>
                        </div>
                        <div class="flex flex-row py-2 pb-4">
                          <input
                            type="password"
                            v-model="password"
                            placeholder="Enter your password"
                            class="grow px-4 py-2 text-gray-700 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 focus:border-orange-500 focus:outline-none focus:shadow-outline-orange dark:focus:shadow-outline-gray"
                          />

                          <button type="button" @click="login">
                            <v-icon
                              scale="2.5"
                              class="transition-all duration-500 ease-in-out"
                              name="bi-arrow-right-square-fill"
                            ></v-icon>
                          </button>
                        </div>
                        <div class="rounded-lg bg-slate-200 p-4">
                          <p>
                            Don't have an account? Sign up
                            <router-link
                              to="/signup"
                              class="hover:underline text-blue-500"
                              >here</router-link
                            >.
                          </p>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
