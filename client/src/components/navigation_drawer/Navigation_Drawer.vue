<template>
	<v-navigation-drawer
		absolute
		temporary
		:value="showDrawer"
		@input="drawerEvent"
	>
		<v-list-item>
			<v-list-item-content>
				<v-list-item-title class="title">Nav Menu</v-list-item-title>
				<v-list-item-subtitle>subtitle</v-list-item-subtitle>
			</v-list-item-content>
		</v-list-item>

		<v-divider></v-divider>

		<v-list dense nav>
			<v-list-item
				v-for="route in routes"
				:key="route.name"
				link
				:to="route.to"
			>
				<v-list-item-icon>
					<v-icon>{{ route.icon }}</v-icon>
				</v-list-item-icon>

				<v-list-item-content>
					<v-list-item-title>{{ route.name }}</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
			<v-list-item @click="test">
				<v-list-item-icon>
					<v-icon>mdi-logout</v-icon>
				</v-list-item-icon>
				<v-list-item-content>
					<v-list-item-title>EXAMPLE DIALOG</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
			<v-list-item v-if="isLoggedIn" @click="logout">
				<v-list-item-icon>
					<v-icon>mdi-logout</v-icon>
				</v-list-item-icon>
				<v-list-item-content>
					<v-list-item-title>Logout</v-list-item-title>
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
					{ name: 'Home', icon: 'mdi-login', to: '/' },
					{ name: 'Stocks', icon: 'mdi-image', to: '/stocks' },
					{ name: 'Portfolio', icon: 'mdi-help-box', to: '/portfolio' },
					{
						name: 'Leaderboard',
						icon: 'mdi-view-dashboard',
						to: '/leaderboard'
					}
				],
				drawerState: null
			};
		},
		computed: {
			showDrawer() {
				return this.$store.state.ui.showDrawer;
			},
			isLoggedIn() {
				return this.$store.getters.isLoggedIn;
			}
		},
		methods: {
			drawerEvent(e) {
				if (!e) this.$store.commit('setDrawer', false);
			},
			logout() {
				this.$store.dispatch('submitLogout');
			},
			test() {
				this.$store.commit('setDialogText', {
					title: 'Test title',
					content: 'TEST CONTENT, TEST CONTENT, TEST CONTENT, TEST CONTENT',
					primaryBtn: 'Yo',
					primaryCallback: function() {
						console.log('Called back yo');
					},
					secondaryBtn: 'No',
					secondaryCallback: function() {
						console.log('No called back');
					}
				});
				this.$store.commit('setShowDialog', true);
			}
		}
	};
</script>
