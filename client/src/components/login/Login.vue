<template>
	<v-container class="login-container rb">
		<div class="mt-10 mb-10 fwb">Login</div>
		<v-input class="input-containers">
			<input class="input rb" v-model="loginEmail" placeholder="Email" type="text" />
		</v-input>
		<v-input class="input-containers">
			<input class="input rb" v-model="loginPassword" placeholder="Password" type="password" />
		</v-input>
		<v-btn @click="submitLoginAuth">Submit</v-btn>
	</v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapMutations, mapActions } from 'vuex';

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
		}
	},
	methods: {
		...mapActions(['submitLoginAuth'])
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
</style>
