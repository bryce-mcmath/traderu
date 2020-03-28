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
    path: '/assets',
    name: 'Assets',
    component: () =>
      import(/* webpackChunkName: "trade" */ '../views/Assets.vue')
  },
  {
    path: '/portfolios',
    name: 'Portfolios',
    beforeEnter(to, from, next){
      if(localStorage.getItem('token')){
        next();
      } else {
        next('/')
      }
    },
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
