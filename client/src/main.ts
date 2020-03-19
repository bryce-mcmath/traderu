import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import axios from 'axios';

Vue.config.productionTip = false;
const baseURL = window.location.origin;
axios.defaults.baseURL = baseURL;

new Vue({
	router,
	store,
	vuetify,
	render: h => h(App)
}).$mount('#app');
