<template>
	<v-container class="login-container rb">
		<div class="mt-2 mb-2 fwb">Login</div>
		<v-input class="input-containers">
			<input
				class="input rb"
				v-model="loginEmail"
				placeholder="Email"
				type="text"
			/>
		</v-input>
		<v-input class="input-containers">
			<input
				class="input rb"
				v-model="loginPassword"
				placeholder="Password"
				type="password"
			/>
		</v-input>
		<v-btn
			@click="submitLoginAuth"
			:loading="ajaxInProgress"
			:disabled="ajaxInProgress"
		>
			Submit
		</v-btn>
	</v-container>
</template>

<script lang="ts">
	import Vue from 'vue';

	export default Vue.extend({
		name: 'Login',
		computed: {
			loginEmail: {
				get() {
					return this.$store.state.ui.loginEmail;
				},
				set(value) {
					this.$store.commit('setLoginEmail', value);
				}
			},
			loginPassword: {
				get() {
					return this.$store.state.ui.loginPassword;
				},
				set(value) {
					this.$store.commit('setLoginPassword', value);
				}
			},
			ajaxInProgress() {
				return this.$store.state.ui.ajaxInProgress;
			}
		},
		methods: {
			submitLoginAuth() {
				this.$store
					.dispatch('submitLoginAuth')
					.then(() => {
						this.$store.commit('setDialogText', {
							title: 'Login Successful',
							content: 'You are now logged in',
							primaryBtn: 'Ok',
							secondaryBtn: 'Logout',
							secondaryCallback: () => {
								this.$store.commit('submitLogout');
							}
						});
						this.$store.commit('setShowDialog', true);
					})
					.catch(err => {
						this.$store.commit('setDialogText', {
							title: 'Login failed',
							content: err[0],
							primaryBtn: 'Ok'
						});
						this.$store.commit('setShowDialog', true);
					});
			}
		}
	});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	.login-container {
		margin-top: 8px;
		background-color: silver;
		width: 100%;
	}

	.input-containers {
		margin-left: 10px;
		margin-right: 10px;
	}

	.input {
		background-color: white;
		width: 100%;
	}

	.rb {
		border-radius: 15px;
	}

	.custom-loader {
		animation: loader 1s infinite;
		display: flex;
	}
</style>
