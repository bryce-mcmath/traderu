<template>
	<div class="text-center">
		<v-dialog v-model="showDialog" width="500">
			<v-card>
				<v-card-title class="headline grey lighten-2" primary-title>
					{{ dialogOptions.dialogTitle }}
				</v-card-title>

				<v-card-text>
					{{ dialogOptions.dialogContent }}
				</v-card-text>

				<v-divider></v-divider>

				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="primary" text @click="closeDialogPrimary">
						{{ dialogOptions.dialogPrimaryBtnText || 'Ok' }}
					</v-btn>
					<v-btn
						color="primary"
						v-if="dialogOptions.dialogSecondaryBtnText"
						text
						@click="closeDialogSecondary"
					>
						{{ dialogOptions.dialogSecondaryBtnText }}
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
	import { mapState } from 'vuex';
	export default {
		data() {
			return {
				dialog: false
			};
		},
		computed: {
			showDialog: {
				get() {
					return this.$store.state.ui.showDialog;
				},
				set(value) {
					this.$store.commit('setShowDialog', value);
				}
			},
			dialogOptions() {
				return this.$store.state.ui.dialogOptions;
			}
		},
		methods: {
			closeDialogPrimary() {
				if (this.$store.state.ui.dialogOptions.dialogPrimaryCallback)
					this.$store.state.ui.dialogOptions.dialogPrimaryCallback();
				this.$store.commit('setShowDialog', false);
			},
			closeDialogSecondary() {
				if (this.$store.state.ui.dialogOptions.dialogSecondaryCallback)
					this.$store.state.ui.dialogOptions.dialogSecondaryCallback();
				this.$store.commit('setShowDialog', false);
			}
		}
	};
</script>
