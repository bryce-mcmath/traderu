import Vue from 'vue';
import Vuex from 'vuex';
import AjaxCalls from '@/api/ajaxCalls';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		ui: {
			showDrawer: false,
			loginEmail: '',
			loginPassword: '',
			ajaxInProgress: false
		}
	},
	mutations: {
		toggleDrawer(state) {
			state.ui.showDrawer = !state.ui.showDrawer;
		},
		setDrawer(state, payload) {
			state.ui.showDrawer = payload;
		},
		setLoginEmail(state, payload) {
			state.ui.loginEmail = payload;
		},
		setLoginPassword(state, payload) {
			state.ui.loginPassword = payload;
		},
		setAjaxInProgress(state, payload: boolean) {
			state.ui.ajaxInProgress = payload;
		}
	},
	actions: {
		submitLoginAuth({ commit, state }) {
			const { loginEmail, loginPassword } = state.ui;
			commit('setAjaxInProgress', true);

			AjaxCalls.loginAuth(loginEmail, loginPassword)
				.then(response => {
					console.log('submitLoginAuth', response);
				})
				.catch(err => {
					console.log('submitLoginAuth:', err);
				})
				.finally(() => {
					commit('setAjaxInProgress', false);
				});
		}
	},
	modules: {}
});
