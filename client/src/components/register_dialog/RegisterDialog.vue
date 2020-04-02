<template>
  <v-dialog :dark="dark" v-model="registerDialog">
    <template v-slot:activator="{ on }">
      <v-btn :dark="dark" v-on="on">Register</v-btn>
    </template>
    <v-card>
      <v-btn icon :dark="dark" @click="registerDialog = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>

      <v-list three-line subheader>
        <h3 class="dialog-header">Register</h3>
        <v-list-item>
          <v-list-item-content>
            <v-text-field v-model="registerName" label="Name" filled :rules="[rules.required]"></v-text-field>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-text-field
              v-model="registerEmail"
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
              v-model="registerPassword"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              label="Password"
              hint="At least 8 characters"
              :rules="[rules.min, rules.required]"
              counter
              filled
              @keydown.enter="submitRegisterUser"
              @click:append="show = !show"
              minlength="8"
            ></v-text-field>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-btn
              @click="submitRegisterUser"
              :loading="loading"
              :disabled="!allowRegisterSubmit"
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
      gettingLocation: false,
      show: false,
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters'
      }
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
    },
    allowRegisterSubmit() {
      return (
        !this.loading &&
        this.registerName &&
        this.registerEmail &&
        this.registerPassword &&
        this.registerPassword.length > 7
      );
    }
  },
  methods: {
    getLocation() {
      if (!('geolocation' in navigator)) {
        this.gettingLocation = false;
        window.console.log('Geolocation not available');
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
          window.console.log('Geolocation refused');
          return;
        }
      );
    },
    registrationError(err) {
      this.$store.commit('setDialogText', {
        title: 'Registration failed',
        content: err || 'One or more required fields is missing',
        primaryBtn: 'Ok'
      });
      this.$store.commit('setShowDialog', true);
    },
    registrationSuccess() {
      this.registerDialog = false;
      this.$store.commit('setDialogText', {
        title: 'Registration Successful',
        content: 'You are now registered. Time to create a portfolio!',
        primaryBtn: 'Ok'
      });
      this.$store.commit('setShowDialog', true);
    },
    async submitRegisterUser() {
      if (!this.allowRegisterSubmit) return;

      this.$store
        .dispatch('submitRegister')
        .then(() => {
          this.registrationSuccess();
        })
        .catch(err => {
          this.registrationError(err);
        });
    }
  },
  watch: {
    registerDialog: function() {
      if (this.registerDialog) this.getLocation();
    }
  }
});
</script>

<style lang="scss">
@import 'register_dialog';
</style>
