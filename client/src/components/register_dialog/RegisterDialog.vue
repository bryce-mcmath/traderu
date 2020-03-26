<template>
  <v-dialog :dark="dark" v-model="registerDialog" fullscreen hide-overlay>
    <template v-slot:activator="{ on }">
      <v-btn :dark="dark" v-on="on">Register</v-btn>
    </template>
    <v-card>
      <v-btn icon :dark="dark" @click="registerDialog = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-list three-line subheader>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Name</v-list-item-title>
            <v-input>
              <input v-model="registerName" placeholder="Name" type="text" required />
            </v-input>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Email</v-list-item-title>
            <v-input>
              <input v-model="registerEmail" placeholder="Email" type="email" required />
            </v-input>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Password</v-list-item-title>
            <v-input>
              <input
                v-model="registerPassword"
                placeholder="Password"
                type="password"
                minlength="6"
                required
              />
            </v-input>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-btn
              @click="submitRegisterUser"
              :loading="loading"
              :disabled="loading || !registerName || !registerEmail || !registerPassword"
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
  name: 'RegisterDialog',
  data() {
    return {
      registerDialog: false,
      gettingLocation: false
    };
  },
  computed: {
    registerName: {
      get() {
        return this.$store.state.ui.registerName;
      },
      set(value) {
        this.$store.commit('setRegisterName', value);
      }
    },
    registerEmail: {
      get() {
        return this.$store.state.ui.registerEmail;
      },
      set(value) {
        this.$store.commit('setRegisterEmail', value);
      }
    },
    registerPassword: {
      get() {
        return this.$store.state.ui.registerPassword;
      },
      set(value) {
        this.$store.commit('setRegisterPassword', value);
      }
    },
    registerLocation: {
      get() {
        return this.$store.state.ui.registerLocation;
      },
      set(value) {
        this.$store.commit('setRegisterLocation', value);
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
    getLocation() {
      if (!('geolocation' in navigator)) {
        this.gettingLocation = false;
        window.console.log('Geolocation not avail');
        return;
      }
      navigator.geolocation.getCurrentPosition(
        pos => {
          this.registerLocation = {
            latitude: pos.coords.latitude.toString(),
            longitude: pos.coords.longitude.toString()
          };
          this.gettingLocation = false;
          return;
        },
        err => {
          this.gettingLocation = false;
          window.console.error('Error getting geolocation');
          return;
        }
      );
    },
    async submitRegisterUser() {
      this.$store
        .dispatch('submitRegister')
        .then(() => {
          this.registerDialog = false;
          this.$store.commit('setDialogText', {
            title: 'Registration Successful',
            content: 'You are now registered. Time to create a portfolio!',
            primaryBtn: 'Ok',
            secondaryBtn: 'Logout',
            secondaryCallback: () => {
              this.$store.dispatch('submitLogout');
            }
          });
          this.$store.commit('setShowDialog', true);
        })
        .catch(err => {
          this.$store.commit('setDialogText', {
            title: 'Registration failed',
            content: err[0],
            primaryBtn: 'Ok'
          });
          this.$store.commit('setShowDialog', true);
        });
    }
  },
  mounted() {
    this.getLocation();
  }
});
</script>

<style lang="scss">
@import 'register_dialog';
</style>
