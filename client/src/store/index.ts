import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		ui: {
			showDrawer: false
		}
	},
	mutations: {
		toggleDrawer(state) {
			state.ui.showDrawer = !state.ui.showDrawer;
		},
		setDrawer(state, payload) {
			state.ui.showDrawer = payload;
		}
	},
	actions: {},
	modules: {}
});
