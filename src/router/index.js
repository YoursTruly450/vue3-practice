import { createRouter, createWebHistory } from 'vue-router';
import store from '../store/index';

import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      layout: 'main',
      auth: true,
    },
  },
  {
    path: '/help',
    name: 'Help',
    component: () => import('../views/Help.vue'),
    meta: {
      layout: 'main',
      auth: true,
    },
  },
  {
    path: '/login',
    name: 'Auth',
    component: () => import('../views/Auth.vue'),
    meta: {
      layout: 'auth',
      auth: false,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
});

router.beforeEach((to, from, next) => {
  const required = to.meta.auth;
  if (required && store.getters['auth/isAuth']) {
    next();
  } else if (required && !store.getters['auth/isAuth']) {
    next('/login?message=auth');
  } else {
    next();
  }
});

export default router;
