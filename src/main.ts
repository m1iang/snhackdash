import { createApp } from 'vue'
import '@/style.css'
import App from '@/App.vue'

import { VueFire, VueFireAuth } from "vuefire"
import { app, auth } from "@/config/firebaseConfig"

import { OhVueIcon, addIcons } from "oh-vue-icons";
import titleMixin from './mixins/titleMixin'
import router from './router'

import { HiLogin, HiLogout, HiSolidChevronRight } from "oh-vue-icons/icons";

addIcons(HiLogin, HiLogout, HiSolidChevronRight)


createApp(App)
  .mixin(titleMixin)
  .use(router)
  .use(VueFire, {
    firebaseApp: app,
    modules: [
      VueFireAuth(),
    ],
  })
  .component('v-icon', OhVueIcon)
  .mount('#app')
