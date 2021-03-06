import Vue from 'vue';
import Vuex from 'vuex';
import ajaxCalls from '@/api/ajaxCalls';
import axios from 'axios';

const {
  checkAuth,
  loginAuth,
  fetchRankingsData,
  fetchStocksData,
  fetchStockData,
  fetchCryptosData,
  fetchCryptoData,
  postPortfolio,
  fetchPortfolioData,
  register
} = ajaxCalls;

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
      // Multi component use
      dark: false,
      ajaxInProgress: false,
      activePortfolio: { name: null, id: null },
      // For navigation drawer
      showDrawer: false,
      // For login component
      loginEmail: '',
      loginPassword: '',
      // For dialog box
      showDialog: false,
      dialogOptions: {
        dialogTitle: '',
        dialogContent: '',
        dialogPrimaryBtnText: '',
        dialogSecondaryBtnText: '',
        dialogPrimaryCallback: '',
        dialogSecondaryCallback: ''
      },
      // For search
      symbol: {
        isStock: false,
        isCrypto: false,
        text: ''
      },
      // For register component
      registerName: '',
      registerEmail: '',
      registerPassword: '',
      registerLocation: null,
      errors: []
    },
    apiData: {
      currentAsset: null,
      stocksData: [],
      cryptosData: [],
      allRankingsData: [],
      initialPortfolioCapital: 100000,
      userPortfolios: [],
      localRankingsData: []
    }
  },
  mutations: {
    toggleDarkMode(state) {
      state.ui.dark = !state.ui.dark;
    },
    toggleDrawer(state) {
      state.ui.showDrawer = !state.ui.showDrawer;
    },
    setUser(state, payload) {
      state.user = Vue.set(this.state, 'user', payload);
    },
    setErrors(state, payload) {
      state.ui.errors = payload;
    },
    setDrawer(state, payload) {
      state.ui.showDrawer = payload;
    },
    setApiStocksData(state, payload) {
      state.apiData.stocksData = payload;
    },
    setApiCryptosData(state, payload) {
      state.apiData.cryptosData = payload;
    },
    setSymbol(state, payload) {
      state.ui.symbol.isStock = payload.isStock;
      state.ui.symbol.isCrypto = payload.isCrypto;
      state.ui.symbol.text = payload.text;
    },
    setCurrentAsset(state, payload) {
      state.apiData.currentAsset = payload;
    },
    setActivePortfolio(state, payload) {
      state.ui.activePortfolio = payload;
    },
    setUserPortfolios(state, payload) {
      state.apiData.userPortfolios = payload;
    },
    setApiRankingsData(state, payload) {
      state.apiData.allRankingsData = payload;
    },
    setApiLocalRankingsData(state, payload) {
      state.apiData.localRankingsData = payload;
    },
    setLoginEmail(state, payload) {
      state.ui.loginEmail = payload;
    },
    setLoginPassword(state, payload) {
      state.ui.loginPassword = payload;
    },
    setRegisterName(state, payload) {
      state.ui.registerName = payload;
    },
    setRegisterEmail(state, payload) {
      state.ui.registerEmail = payload;
    },
    setRegisterPassword(state, payload) {
      state.ui.registerPassword = payload;
    },
    setRegisterLocation(state, payload) {
      state.ui.registerLocation = payload;
    },
    setAjaxInProgress(state, payload: boolean) {
      state.ui.ajaxInProgress = payload;
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
          window.console.error('Error fetching stocks:', err);
        });
    },

    async setCryptosData({ commit, state }) {
      //Only update crypto if not already in state
      if (Object.keys(state.apiData.cryptosData).length !== 0) return;

      commit('setAjaxInProgress', true);
      fetchCryptosData()
        .then(closeValues => commit('setApiCryptosData', closeValues))
        .catch(err => {
          window.console.error('Error fetching crypto:', err);
        });
    },

    async createPortfolio({ commit }, name) {
      commit('setAjaxInProgress', true);
      await postPortfolio(name);
      commit('setAjaxInProgress', false);
    },

    async setRankingsData({ commit }) {
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
          if (!data.user) {
            commit('setErrors', [data]);
            commit('setUser', null);
          } else {
            commit('setErrors', []);
            commit('setUser', { ...data.user });
          }
        })
        .catch(() => {
          return;
        })
        .finally(() => {
          commit('setAjaxInProgress', false);
        });
    },

    async setCurrentAsset({ commit, state }) {
      // If the symbol is for a stock, fetch from the stock route
      if (state.ui.symbol.isStock) {
        commit('setAjaxInProgress', true);
        return fetchStockData(state.ui.symbol.text)
          .then(asset => {
            commit('setCurrentAsset', asset);
          })
          .catch(err => {
            window.console.error('setCurrentAsset:', err);
            commit('setCurrentAsset', null);
          })
          .finally(() => {
            commit('setAjaxInProgress', false);
          });

        // If the symbol is for a cryptocurrency, fetch from the crypto route
      } else if (state.ui.symbol.isCrypto) {
        commit('setAjaxInProgress', true);
        return fetchCryptoData(state.ui.symbol.text)
          .then(asset => {
            commit('setCurrentAsset', asset);
          })
          .catch(err => {
            window.console.error('setCurrentAsset:', err);
            commit('setCurrentAsset', null);
          })
          .finally(() => {
            commit('setAjaxInProgress', false);
          });
      }
    },

    async setUserPortfolios({ commit }) {
      commit('setAjaxInProgress', true);
      return fetchPortfolioData()
        .then(data => {
          commit('setUserPortfolios', data.portfolios);
          return data.portfolios;
        })
        .catch(err => {
          window.console.error('Error in setUserPortfolios: ', err);
          commit('setUserPortfolios', []);
        })
        .finally(() => {
          commit('setAjaxInProgress', false);
        });
    },

    async submitRegister({ dispatch, commit, state }) {
      const {
        registerName,
        registerEmail,
        registerPassword,
        registerLocation
      } = state.ui;
      commit('setAjaxInProgress', true);

      return new Promise((resolve, reject) =>
        register(
          registerName,
          registerEmail,
          registerPassword,
          registerLocation
        )
          .then(async response => {
            // Clear inputs
            commit('setRegisterName', '');
            commit('setRegisterEmail', '');
            commit('setRegisterPassword', '');
            commit('setRegisterLocation', null);
            if (response.response) {
              // There is an error
              reject(errorUnwrapper(response));
            } else {
              // Set JWT in local storage, checkUserAuth to get user data and verify token
              localStorage.setItem('token', response.token);
              axios.defaults.headers.common[authTokenHeader] = response.token;
              await dispatch('checkUserAuth');
              resolve();
            }
          })
          .finally(() => {
            commit('setAjaxInProgress', false);
          })
      );
    },

    async submitLoginAuth({ dispatch, commit, state }) {
      const { loginEmail, loginPassword } = state.ui;
      commit('setAjaxInProgress', true);

      return new Promise((resolve, reject) =>
        loginAuth(loginEmail, loginPassword)
          .then(async response => {
            // Clear inputs
            commit('setLoginEmail', '');
            commit('setLoginPassword', '');

            if (response.response) {
              // There is an error
              reject(response.response);
            } else {
              // Set JWT in local storage, checkUserAuth to get user data and verify token
              localStorage.setItem('token', response.token);
              axios.defaults.headers.common[authTokenHeader] = response.token;
              await dispatch('checkUserAuth');
              resolve();
            }
          })
          .finally(() => {
            commit('setAjaxInProgress', false);
          })
      );
    },

    async submitLogout({ commit }) {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common[authTokenHeader];
      commit('setUser', null);
      commit('setUserPortfolios', []);
      commit('setApiLocalRankingsData', {});
    }
  },
  modules: {}
});
