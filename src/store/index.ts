import { createStore } from 'vuex'
import authModule from './modules/auth'
import snackModule from './modules/snack'
import solutionModule from './modules/solution'
import userModule from './modules/user'

export const store = createStore({
  modules: {
    auth: authModule,
    snack: snackModule,
    solution: solutionModule,
    user: userModule,
  }
})