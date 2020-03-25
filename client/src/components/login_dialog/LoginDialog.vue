<template>
  <v-dialog :dark="dark" v-model="loginDialog" fullscreen hide-overlay>
    <template v-slot:activator="{ on }">
      <v-btn :dark="dark" v-on="on">Login</v-btn>
    </template>
    <v-card>
      <v-btn icon :dark="dark" @click="loginDialog = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-list three-line subheader>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Email</v-list-item-title>
            <v-input>
              <input v-model="loginEmail" placeholder="Email" type="email" />
            </v-input>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Password</v-list-item-title>
            <v-input>
              <input
                class="input rb"
                v-model="loginPassword"
                placeholder="Password"
                type="password"
              />
            </v-input>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-btn
              @click="submitLoginAuth"
              :loading="loading"
              :disabled="loading || !loginEmail || !loginPassword"
            >Submit</v-btn>
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
      loginDialog: false
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
    }
  },
  methods: {
    submitLoginAuth() {
      this.$store
        .dispatch('submitLoginAuth')
        .then(() => {
          this.loginDialog = false;
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

<style lang="scss">
@import 'login_dialog';
</style>
