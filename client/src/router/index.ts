import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Stocks from '../views/Stocks.vue';
import Portfolio from '../views/Portfolio.vue';
import Leaderboard from '../views/Leaderboard.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
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
		path: '/stocks',
		name: 'Stocks',
		component: Stocks
	},
	{
		path: '/portfolio',
		name: 'Portfolio',
		component: Portfolio
	},
	{
		path: '/leaderboard',
		name: 'Leaderboard',
		component: Leaderboard
	}
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
});

export default router;
