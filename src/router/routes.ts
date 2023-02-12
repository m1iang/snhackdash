import Home from '@/views/Home.vue';
import NotFound from '@/views/NotFound.vue';
import Login from '@/views/Login.vue';
import Feed from '@/views/Feed.vue';
import Signup from '@/views/Signup.vue';
import RequestPage from '@/views/RequestPage.vue';
import SubmitSolution from '@/views/SolutionForm.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/dashboard',
    name: 'Feed',
    component: Feed,
    meta: {
      authRequired: true,
    }
  },
  {
    path: '/request',
    name: 'Request',
    component: RequestPage,
    meta: {
      authRequired: true,
    }
  },
  {
    path: '/solution',
    name: 'SubmitSolution',
    component: SubmitSolution,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  }
]

export default routes;

