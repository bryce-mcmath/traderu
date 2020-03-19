<template>
	<div class="home">
		  <v-btn @click="drawer = !drawer">Toggle stocks</v-btn>
		  <v-btn @click="getData">Load the data</v-btn>
		  <v-navigation-drawer dark v-model="drawer" app>
				<StocksList v-bind:stockData="this.apiData.stockData"/>
			</v-navigation-drawer>
		<img alt="Vue logo" src="../assets/logo.png" />
		<HelloWorld msg="Under construction, coming soon"></HelloWorld>
	</div>
</template>

<script>
	// @ is an alias to /src
	import HelloWorld from '@/components/hello_world/HelloWorld.vue';
	import StocksList from '../components/stocks_list/StocksList'

	export default {
		name: 'Home',
		components: {
			HelloWorld,
			StocksList
		},
		methods: {
      getData: async function(){
				fetch('http://localhost:8002/api/stocks')
					.then(res => {
						return res.json();
					})
					.then(res => {
						const closeValues = res.map(stockObject => {
							return ({name: stockObject.name, prices: stockObject.stockdata.map(stock => Number(stock.data['4. close']))})
						});
						this.apiData['stockData'] = closeValues;
						console.log(closeValues)
					})
      }
    },
		data(){
			return {
				drawer: false,
				apiData: {}
			}
		}
	};
</script>
