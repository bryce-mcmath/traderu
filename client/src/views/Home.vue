<template>
	<div class="home">
		  <v-btn @click="showStocksDrawer">Toggle stocks</v-btn>
			<StocksListDrawer />
		<Login></Login>
	</div>
</template>

<script>
	// @ is an alias to /src
	import StocksListDrawer from '../components/stocks_list_drawer/StocksListDrawer.vue'
	import Login from '@/components/login/Login.vue';
	import Vuex from 'vuex';
  import { mapMutations, mapActions } from 'vuex';

	export default {
		name: 'Home',
		components: {
			StocksListDrawer,
			Login
		},
		methods: {
			showStocksDrawer: function(){
				this.setStocksData();
				this.$store.commit('toggleStocksDrawer')
			},
	  	...mapActions(['setStocksData'])
    },
	};
</script>
