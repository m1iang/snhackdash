import { createRouter, createWebHistory } from 'vue-router'
import { getCurrentUser } from 'vuefire'
import routes from './routes'

// Create a new router
const router = createRouter({
  history: createWebHistory(),
  routes,
})

/**
 * Route guard to check if the user is logged in or not before sending them to a protected route
 * Protected routes are denoted by the @see {meta.authRequired} property in the route object
 * @param {import('vue-router').RouteLocationNormalized} to
 * @param {import('vue-router').RouteLocationNormalized} from
 * @param {import('vue-router').NavigationGuardNext} next
 * @returns {Promise<void>} to the next route
 * @see https://next.router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards
 * @see https://next.router.vuejs.org/api/#router-beforeroute
 */
router.beforeEach(async (to, from, next) => {
  if (to.matched.some((route) => route.meta.authRequired)) {
    const user = await getCurrentUser();
    if (user) {
      next();
    } else {
      next({
        path: "/login",
      });
    }
  } else {
    next();
  }
});



export default router;
