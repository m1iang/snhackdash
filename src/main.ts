import { createApp } from 'vue'
import '@/style.css'
import App from '@/App.vue'
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import Prism from 'prismjs';

import { VueFire, VueFireAuth } from "vuefire"
import { app, auth } from "@/config/firebaseConfig"

import { OhVueIcon, addIcons } from "oh-vue-icons";
import titleMixin from './mixins/titleMixin'
import router from './router'
import enUS from '@kangc/v-md-editor/lib/lang/en-US';

import { HiLogin, HiLogout, HiSolidChevronRight, BiArrowRightSquareFill, HiSortAscending, HiSortDescending } from "oh-vue-icons/icons";

addIcons(HiLogin, HiLogout, HiSolidChevronRight, BiArrowRightSquareFill, HiSortDescending, HiSortAscending)

VueMarkdownEditor
  .use(vuepressTheme, {
    Prism,
  });

VueMarkdownEditor.lang.use('en-US', enUS);

createApp(App)
  .mixin(titleMixin)
  .use(VueMarkdownEditor)
  .use(router)
  .use(VueFire, {
    firebaseApp: app,
    modules: [
      VueFireAuth(),
    ],
  })
  .component('v-icon', OhVueIcon)
  .mount('#app')
