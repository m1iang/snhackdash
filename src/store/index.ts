import { createStore } from 'vuex'
import authModule from './modules/auth'
import userModule from './modules/user'

export const store = createStore({
  modules: {
    auth: authModule,
    user: userModule,
  }
})