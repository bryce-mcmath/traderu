import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import axios from 'axios';
import ToggleButton from 'vue-js-toggle-button';

Vue.config.productionTip = false;
const baseURL = window.location.origin;
axios.defaults.baseURL = baseURL;

Vue.use(ToggleButton);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
