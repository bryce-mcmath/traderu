import Vue from 'vue';
import Vuex from 'vuex';
import AjaxCalls from '@/api/ajaxCalls';
import Axios from 'axios';

Vue.use(Vuex);
const authTokenHeader = 'x-auth-token';

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
			// Multi component use
			ajaxInProgress: false,
			// For navigation drawer
			showDrawer: false,
			showStocksDrawer: false,
			// For login component
			loginEmail: '',
			loginPassword: '',
			loginError: [],
			// For dialog box
			showDialog: false,
			dialogOptions: {
				dialogTitle: '',
				dialogContent: '',
				dialogPrimaryBtnText: '',
				dialogSecondaryBtnText: '',
				dialogPrimaryCallback: '',
				dialogSecondaryCallback: ''
			}
		},
		jwt: '',
		apiData: {
			stocksData: {},
			allRankingsData: {},
			initialPortfolioCapital: 100000
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
		setApiStocksData(state, payload) {
			state.apiData.stocksData = payload;
		},
		setApiRankingsData(state, payload) {
			state.apiData.allRankingsData = payload;
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
		setLoginError(state, payload) {
			// Need to use vue.set when replacing an entire obj/array
			// Vue.set(state, 'loginError', [...payload]);
		},
		setJWT(state, payload) {
			state.jwt = payload;
		},
		setShowDialog(state, payload) {
			state.ui.showDialog = payload;
		},
		setDialogText(state, payload = {}) {
			const options = state.ui.dialogOptions;
			const {
				title = '',
				content = '',
				primaryBtn = '',
				primaryCallback = '',
				secondaryBtn = '',
				secondaryCallback = ''
			} = payload;
			options.dialogTitle = title;
			options.dialogContent = content;
			options.dialogPrimaryBtnText = primaryBtn;
			options.dialogPrimaryCallback = primaryCallback;
			options.dialogSecondaryBtnText = secondaryBtn;
			options.dialogSecondaryCallback = secondaryCallback;
		},
		submitLogout(state) {
			localStorage.removeItem('token');
			delete Axios.defaults.headers.common[authTokenHeader];
			state.jwt = '';
		}
	},
	actions: {
		setStocksData({ commit, state }) {
			//Only update stocks if not already in state
			if (Object.keys(state.apiData.stocksData).length !== 0) {
				return;
			}
			commit('setAjaxInProgress', true);
			AjaxCalls.fetchStocksData()
				.then(closeValues => commit('setApiStocksData', closeValues))
				.catch(err => {
					console.log('getAPIStockData:', err);
				})
				.finally(() => {
					commit('setAjaxInProgress', false);
				});
		},

		setRankingsData({ commit, state }) {
			//Don't update if already loaded
			if (Object.keys(state.apiData.allRankingsData).length !== 0) {
				return;
			}
			commit('setAjaxInProgress', true);
			AjaxCalls.fetchRankingsData()
				.then(rankData => {
					commit('setApiRankingsData', rankData);
				})
				.catch(err => {
					console.log('getAPIrankData:', err);
				})
				.finally(() => {
					commit('setAjaxInProgress', false);
				});
		},

		submitLoginAuth({ commit, state }) {
			const { loginEmail, loginPassword } = state.ui;
			commit('setAjaxInProgress', true);
			commit('setLoginError', []);

			return new Promise((resolve, reject) => {
				AjaxCalls.loginAuth(loginEmail, loginPassword)
					.then(response => {
						// Clear inputs
						commit('setLoginEmail', '');
						commit('setLoginPassword', '');
						if (response.response) {
							// There is an error
							console.log('Error in submitLoginAuth');
							reject(errorUnwrapper(response));
						} else {
							// Set JWT in store and local storage
							commit('setJWT', response.token);
							localStorage.setItem('token', response.token);
							Axios.defaults.headers.common[authTokenHeader] = response.token;
							resolve();
						}
					})
					.finally(() => {
						setTimeout(() => {
							commit('setAjaxInProgress', false);
						}, 1000);
					});
			});
		},
		submitLogout({ commit }) {
			localStorage.removeItem('token');
			delete Axios.defaults.headers.common[authTokenHeader];
			commit('setJWT', '');
		}
	},
	modules: {}
});
