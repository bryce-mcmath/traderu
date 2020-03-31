<template>
  <v-dialog :dark="dark" v-model="loginDialog">
    <template v-slot:activator="{ on }">
      <v-btn :dark="dark" v-on="on">Login</v-btn>
    </template>
    <v-card>
      <v-btn icon :dark="dark" @click="loginDialog = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>

      <v-list three-line subheader>
        <h3 class="dialog-header">Login</h3>
        <v-list-item>
          <v-list-item-content>
            <v-text-field
              v-model="loginEmail"
              label="Email"
              filled
              :rules="[rules.required]"
              type="email"
            ></v-text-field>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-text-field
              v-model="loginPassword"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              label="Password"
              :rules="[rules.required, rules.min]"
              hint="At least 8 characters"
              counter
              filled
              @keydown.enter="submitLoginAuth"
              @click:append="show = !show"
            ></v-text-field>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-btn
              @click="submitLoginAuth"
              :loading="loading"
              :disabled="!allowLoginSubmit"
              >Submit</v-btn
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Dialog from '@/components/dialog/Dialog.vue';
  export default Vue.extend({
    name: 'LoginDialog',
    data() {
      return {
        loginDialog: false,
        show: false,
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters'
        }
      };
    },
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
      loading() {
        return this.$store.state.ui.ajaxInProgress;
      },
      dark() {
        return this.$store.state.ui.dark;
      },
      allowLoginSubmit() {
        return !this.loading && this.loginEmail && this.loginPassword;
      }
    },
    methods: {
      submitLoginAuth() {
        if (!this.allowLoginSubmit) return;
        this.$store
          .dispatch('submitLoginAuth')
          .then(() => {
            this.loginSuccess();
          })
          .catch(err => {
            this.loginError(err);
          });
      },
      loginSuccess() {
        this.loginDialog = false;
        this.$store.commit('setDialogText', {
          title: 'Login Successful',
          content: 'You are now logged in',
          primaryBtn: 'Ok'
        });
        this.$store.commit('setShowDialog', true);
      },
      loginError(err) {
        this.$store.commit('setDialogText', {
          title: 'Login failed',
          content: 'Unable to login, invalid email or password',
          primaryBtn: 'Ok'
        });
        this.$store.commit('setShowDialog', true);
      }
    }
  });
</script>

<style lang="scss">
  @import 'login_dialog';
</style>
