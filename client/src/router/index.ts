import Vue from 'vue';
import VueRouter from 'vue-router';
import Info from '../views/Info.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Info',
    component: Info
  },
  {
    path: '/display',
    name: 'Display',
    // route level code-splitting
    // this generates a separate chunk (display.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "display" */ '../views/Display.vue')
  },
  {
    path: '/trade',
    name: 'Trade',
    component: () =>
      import(/* webpackChunkName: "trade" */ '../views/Trade.vue')
  },
  {
    path: '/portfolios',
    name: 'Portfolios',
    component: () =>
      import(/* webpackChunkName: "portfolios" */ '../views/Portfolios.vue')
  },
  {
    path: '/leaderboard',
    name: 'Leaderboard',
    component: () =>
      import(/* webpackChunkName: "leaderboard" */ '../views/Leaderboard.vue')
  },
  {
    path: '/leaderboard/:id',
    name: 'LeaderboardId',
    component: () =>
      import(/* webpackChunkName: "leaderboard" */ '../views/Leaderboard.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
