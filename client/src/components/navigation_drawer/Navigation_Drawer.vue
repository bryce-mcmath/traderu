<template>
	<v-navigation-drawer absolute temporary :value="showDrawer" @input="drawerEvent">
		<v-list-item>
			<v-list-item-content>
				<v-list-item-title class="title">Nav Menu</v-list-item-title>
				<v-list-item-subtitle>subtitle</v-list-item-subtitle>
			</v-list-item-content>
		</v-list-item>

		<v-divider></v-divider>

		<v-list dense nav>
			<v-list-item v-for="route in routes" :key="route.name" link :to="route.to">
				<v-list-item-icon>
					<v-icon>{{ route.icon }}</v-icon>
				</v-list-item-icon>

				<v-list-item-content>
					<v-list-item-title>{{ route.name }}</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
		</v-list>
	</v-navigation-drawer>
</template>

<script>
import Vuex from 'vuex';
export default {
	data() {
		return {
			routes: [
				{ name: 'Home', icon: 'mdi-view-dashboard', to: '/' },
				{ name: 'Stocks', icon: 'mdi-image', to: '/stocks' },
				{ name: 'Portfolio', icon: 'mdi-help-box', to: '/portfolio' },
				{ name: 'Leaderboard', icon: 'mdi-view-dashboard', to: '/leaderboard' }
			],
			drawerState: null
		};
	},
	computed: {
		showDrawer() {
			return this.$store.state.showDrawer;
		}
	},
	methods: {
		drawerEvent(e) {
			if (!e) this.$store.commit('setDrawer', false);
		}
	}
};
</script>