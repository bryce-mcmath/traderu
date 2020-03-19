import Vue from 'vue';
import Vuex from 'vuex';
import AjaxCalls from '@/api/ajaxCalls';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		ui: {
			showDrawer: false,
			showStocksDrawer: false,
			loginEmail: '',
			loginPassword: '',
			ajaxInProgress: false,
		},
		apiData: {
			stocksData: {},
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
