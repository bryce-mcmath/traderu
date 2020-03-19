<template>
	<v-toolbar dense max-height="48">
		<v-btn icon>
			<v-icon>mdi-dots-vertical</v-icon>
		</v-btn>

		<v-toolbar-title>TraderU</v-toolbar-title>

		<v-spacer></v-spacer>
		<v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
		<!-- <v-menu offset-y>
			<template v-slot:activator="{ on }">
				<v-app-bar-nav-icon v-on="on"></v-app-bar-nav-icon>
			</template>
			<v-list>
				<v-list-item v-for="(route, index) in routes" :key="index" @click="toggle">
					<v-list-item-title>{{ route.display }}</v-list-item-title>
				</v-list-item>
			</v-list>
		</v-menu>-->
	</v-toolbar>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapMutations } from 'vuex';

export default Vue.extend({
	name: 'Navbar',
	data() {
		return {
			// routes: [
			// 	{ display: 'Home', to: '/' },
			// 	{ display: 'Stock', to: '/stocks' },
			// 	{ display: 'Portfolio', to: '/portfolio' },
			// 	{ display: 'Leaderboard', to: '/leaderboard' }
			// ],
			// on: false
		};
	},
	methods: {
		...mapMutations(['toggleDrawer'])
	}
});
</script>