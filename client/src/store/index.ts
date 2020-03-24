import Vue from 'vue';
import Vuex from 'vuex';
import ajaxCalls from '@/api/ajaxCalls';
import axios from 'axios';

const { checkAuth, loginAuth, fetchRankingsData, fetchStocksData } = ajaxCalls;

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
    user: null,
    ui: {
      dark: false,
      showDrawer: false,
      showStocksDrawer: false,
      registerName: '',
      registerEmail: '',
      registerPassword: '',
      registerLatitude: '',
      registerLongitude: '',
      loginEmail: '',
      loginPassword: '',
      ajaxInProgress: false,
      errors: []
    },
    apiData: {
      stocksData: {},
      cryptoData: {},
      allRankingsData: {},
      localRankingsData: {},
      initialPortfolioCapital: 100000
    }
  },
  mutations: {
    toggleDarkMode(state) {
      state.ui.dark = !state.ui.dark;
    },
    toggleDrawer(state) {
      state.ui.showDrawer = !state.ui.showDrawer;
    },
    toggleStocksDrawer(state) {
      state.ui.showStocksDrawer = !state.ui.showStocksDrawer;
    },
    setUser(state, payload) {
      state.user = payload;
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
    setErrors(state, payload) {
      state.ui.errors = payload;
    }
  },
  actions: {
    async setStocksData({ commit, state }) {
      //Only update stocks if not already in state
      if (Object.keys(state.apiData.stocksData).length !== 0) return;

      commit('setAjaxInProgress', true);
      fetchStocksData()
        .then(closeValues => commit('setApiStocksData', closeValues))
        .catch(err => {
          window.console.error('getAPIStockData:', err);
        })
        .finally(() => {
          commit('setAjaxInProgress', false);
        });
    },

    async setRankingsData({ commit, state }) {
      //Don't update if already loaded
      if (Object.keys(state.apiData.allRankingsData).length !== 0) {
        return;
      }
      commit('setAjaxInProgress', true);
      fetchRankingsData()
        .then(rankData => {
          commit('setApiRankingsData', rankData);
        })
        .catch(err => {
          window.console.error('fetchRankingsData:', err);
        })
        .finally(() => {
          commit('setAjaxInProgress', false);
        });
    },

    async checkUserAuth({ commit, state }) {
      // Only check auth if no current user
      if (state.user) return;
      commit('setAjaxInProgress', true);
      checkAuth()
        .then(data => {
          window.console.log('data in checkUserAuth', data);
          if (!data.user) {
            commit('setErrors', [data]);
            commit('setUser', null);
          } else {
            commit('setErrors', []);
            commit('setUser', { ...data.user });
          }
        })
        .catch(err => {
          return;
        })
        .finally(() => {
          commit('setAjaxInProgress', false);
        });
    },

    async submitLoginAuth({ dispatch, commit, state }) {
      const { loginEmail, loginPassword } = state.ui;
      commit('setAjaxInProgress', true);

      loginAuth(loginEmail, loginPassword)
        .then(async response => {
          // Clear inputs
          commit('setLoginEmail', '');
          commit('setLoginPassword', '');
          if (response.response) {
            // There is an error
            commit('setErrors', errorUnwrapper(response));
          } else {
            // Set JWT in store and local storage
            localStorage.setItem('token', response.token);
            axios.defaults.headers.common[authTokenHeader] = response.token;
            await dispatch('checkUserAuth');
          }
        })
        .finally(() => {
          commit('setAjaxInProgress', false);
        });
    },

    async submitLogout({ commit }) {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common[authTokenHeader];
      // @TODO: Clear the rest of state
    }
  },
  modules: {}
});
