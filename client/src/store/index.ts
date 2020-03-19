import Vue from 'vue';
import Vuex from 'vuex';
import AjaxCalls from '@/api/ajaxCalls';
import Axios from 'axios';

Vue.use(Vuex);

const errorUnwrapper = errObject => {
	const result = [];

	errObject.response.data.errors.forEach(element => {
		result.push(element.msg);
	});

	return result;
};

export default new Vuex.Store({
	state: {
		ui: {
			showDrawer: false,
			loginEmail: '',
			loginPassword: '',
			ajaxInProgress: false,
			loginError: []
		},
		jwt: ''
	},
	getters: {
		isLoggedIn(state) {
			if (state.jwt) return true;
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
		},
		setLoginError(state, payload: Array<string>) {
			// Need to use vue.set when replacing an entire obj/array
			Vue.set(state, 'loginError', [...payload]);
		},
		setJWT(state, payload) {
			state.jwt = payload;
		}
	},
	actions: {
		submitLoginAuth({ commit, state }) {
			const { loginEmail, loginPassword } = state.ui;
			commit('setAjaxInProgress', true);
			commit('setLoginError', []);

			AjaxCalls.loginAuth(loginEmail, loginPassword)
				.then(response => {
					// Clear inputs
					commit('setLoginEmail', '');
					commit('setLoginPassword', '');
					// Set JWT in store and local storage
					commit('setJWT', response.data.token);
					localStorage.setItem('token', response.data.token);
					Axios.defaults.headers.common['Authorization'] = response.data.token;
				})
				.catch(err => {
					const errArray = errorUnwrapper(err);
					commit('setLoginError', errArray);
				})
				.finally(() => {
					commit('setAjaxInProgress', false);
				});
		},
		submitLogout({ commit }) {
			localStorage.removeItem('token');
			delete Axios.defaults.headers.common['Authorization'];
			commit('setJWT', '');
		}
	},
	modules: {}
});
