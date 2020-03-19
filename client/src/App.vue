<template>
	<v-app>
		<!-- <v-app-bar app color="primary" dark>
			<div class="d-flex align-center">
				<v-img
					alt="Vuetify Logo"
					class="shrink mr-2"
					contain
					src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
					transition="scale-transition"
					width="40"
				/>

				<v-img
					alt="Vuetify Name"
					class="shrink mt-1 hidden-sm-and-down"
					contain
					min-width="100"
					src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
					width="100"
				/>
			</div>

			<v-spacer></v-spacer>

			<v-btn href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank" text>
				<span class="mr-2">Latest Release</span>
				<v-icon>mdi-open-in-new</v-icon>
			</v-btn>

			<ul class="d-flex center">
				<v-btn to="/">Home</v-btn>
				<v-btn to="/display">Display</v-btn>
			</ul>
		</v-app-bar>-->
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

export default Vue.extend({
	name: 'App',
	components: {
		Navbar,
		NavigationDrawer,
		BottomNav
	}
});
</script>

<style lang="scss">
@import './assets/global_scss/app';
</style>