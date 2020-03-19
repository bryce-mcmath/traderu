<template>
	<div class="home">
		  <v-btn @click="drawer = !drawer">Toggle stocks</v-btn>
		  <v-navigation-drawer dark v-model="drawer" app>
				<StocksList />
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
		data(){
			return {
				drawer: false
			}
		}
	};
</script>
