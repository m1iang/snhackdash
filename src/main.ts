import { createApp } from 'vue'
import '@/style.css'
import App from '@/App.vue'

import { VueFire, VueFireAuth } from "vuefire"
import { app, auth } from "@/config/firebaseConfig"

import { OhVueIcon, addIcons } from "oh-vue-icons";
import titleMixin from './mixins/titleMixin'
import router from './router'

import { HiLogin, HiLogout, HiSolidChevronRight, BiArrowRightSquareFill, HiSortAscending, HiSortDescending, IoSettingsOutline, BiCheckCircleFill } from "oh-vue-icons/icons";

addIcons(HiLogin, HiLogout, HiSolidChevronRight, BiArrowRightSquareFill, HiSortDescending, HiSortAscending, IoSettingsOutline, BiCheckCircleFill)


const apiKeyMaps = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

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
