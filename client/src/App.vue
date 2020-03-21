<template>
	<v-app>
		<Dialog></Dialog>
		<Navbar></Navbar>
		<NavigationDrawer></NavigationDrawer>
		<v-content>
			<router-view></router-view>
		</v-content>

		<BottomNav />
	</v-app>
</template>

<script lang="ts">
	import Vue from 'vue';
	import Navbar from '@/components/nav_bar/Navbar.vue';
	import NavigationDrawer from '@/components/navigation_drawer/Navigation_Drawer.vue';
	import BottomNav from './components/bottom_nav/BottomNav.vue';
	import Spinner from './components/spinner/Spinner.vue';
	import Dialog from './components/dialog/Dialog.vue';

	export default Vue.extend({
		name: 'App',
		components: {
			Navbar,
			NavigationDrawer,
			BottomNav,
			Dialog
		}
	});
</script>

<style lang="scss">
	@import './assets/global_scss/app';
</style>
