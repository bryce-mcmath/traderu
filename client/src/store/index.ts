import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		showDrawer: false
	},
	mutations: {
		toggleDrawer(state) {
			state.showDrawer = !state.showDrawer;
		},
		setDrawer(state, payload) {
			state.showDrawer = payload;
		}
	},
	actions: {},
	modules: {}
});
