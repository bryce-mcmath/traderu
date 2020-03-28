<template>
  <div class="text-center">
    <v-dialog :value="showDialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>{{
          dialogOptions.dialogTitle
        }}</v-card-title>

        <v-card-text class="mt-2">{{
          dialogOptions.dialogContent
        }}</v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="closeDialogPrimary">{{
            dialogOptions.dialogPrimaryBtnText || 'Ok'
          }}</v-btn>
          <v-btn
            v-if="dialogOptions.dialogSecondaryBtnText"
            text
            @click="closeDialogSecondary"
            >{{ dialogOptions.dialogSecondaryBtnText }}</v-btn
          >
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
      showDialog() {
        return this.$store.state.ui.showDialog;
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
