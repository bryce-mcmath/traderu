<template>
  <div class="text-center">
    <v-dialog :value="showDialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>{{
          dialogOptions.dialogTitle
        }}</v-card-title>

        <v-card-text class="mt-2"
          ><div v-for="(content, index) in dialogContent" :key="index">{{
            content
          }}</div></v-card-text
        >

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
  export default {
    computed: {
      showDialog() {
        return this.$store.state.ui.showDialog;
      },
      dialogOptions() {
        return this.$store.state.ui.dialogOptions;
      },
      dialogContent() {
        const contentReference = this.$store.state.ui.dialogOptions
          .dialogContent;

        if (Array.isArray(contentReference)) {
          return contentReference;
        } else {
          return [contentReference];
        }
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
