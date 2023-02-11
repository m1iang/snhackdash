import Home from '@/views/Home.vue';
import NotFound from '@/views/NotFound.vue';
import Login from '@/views/Login.vue';
import Feed from '@/views/Feed.vue';
import Signup from '@/views/Signup.vue';

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
    path: '/dashers',
    name: 'Feed',
    component: Feed,
    meta: {
      authRequired: true,
    }
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

