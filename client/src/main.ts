import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import axios from 'axios';
import ToggleButton from 'vue-js-toggle-button';

Vue.config.productionTip = false;
let baseURL = window.location.origin;

if (process.env.NODE_ENV === 'development') {
	console.log('Current dev environment:', process.env.NODE_ENV);
	baseURL = 'http://localhost:8080/';
}

axios.defaults.baseURL = baseURL;

Vue.use(ToggleButton);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
