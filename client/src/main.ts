import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import axios from 'axios';

Vue.config.productionTip = false;
let baseURL = window.location.origin;


if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'cypress') {
  window.console.log('Current dev environment:', process.env.NODE_ENV);
  baseURL = 'http://localhost:8080/';
}

axios.defaults.baseURL = baseURL;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
