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
			showStocksDrawer: false,
			loginEmail: '',
			loginPassword: '',
			ajaxInProgress: false,
			loginError: []
		},
		jwt: '',
		apiData: {
			stocksData: {},
		}
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
		toggleStocksDrawer(state) {
			state.ui.showStocksDrawer = !state.ui.showStocksDrawer;
		},
		setDrawer(state, payload) {
			state.ui.showDrawer = payload;
		},
		setApiStocksData(state, payload){
			state.apiData.stocksData = payload;
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
		setStocksData({commit, state}) {
			//Only update stocks if not already in state
			if(Object.keys(state.apiData.stocksData).length !== 0){
				return;
			}
			commit('setAjaxInProgress', true);
			fetch('/api/stocks')
			.then(res => {
				return res.json();
			})
			.then(res => {
				const closeValues = res.map(stockObject => {
					return ({name: stockObject.name, prices: stockObject.stockdata.map(stock => Number(stock.data['4. close']))})
				});
				commit('setApiStocksData', closeValues);
			})
			.catch(err => {
				console.log('submitLoginAuth:', err);
			})
			.finally(() => {
				commit('setAjaxInProgress', false);
			});
		},
		submitLoginAuth({ commit, state }) {
			const { loginEmail, loginPassword } = state.ui;
			commit('setAjaxInProgress', true);
			commit('setLoginError', []);

			AjaxCalls.loginAuth(loginEmail, loginPassword)
				.then(response => {
<<<<<<< HEAD
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
=======
					window.console.log('submitLoginAuth', response);
				})
				.catch(err => {
					window.console.log('submitLoginAuth:', err);
>>>>>>> feature/footer-nav-button
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
