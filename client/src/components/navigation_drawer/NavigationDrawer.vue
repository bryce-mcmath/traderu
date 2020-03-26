<template>
  <v-navigation-drawer
    width="280"
    absolute
    temporary
    :value="showDrawer"
    @input="drawerEvent"
    :dark="dark"
    v-bind:class="[{ 'v-navigation-drawer--dark': dark }, { 'v-navigation-drawer--light': !dark }]"
  >
    <v-list-item v-if="user">
      <div class="profile">
        <img class="profile__avatar" :src="user.avatar" />
        <h3 class="profile__name">{{user.name}}</h3>
      </div>
    </v-list-item>

    <v-divider v-if="user"></v-divider>

    <v-list dense nav v-if="user">
      <!-- Logout -->
      <v-list-item @click="logout">
        <v-list-item-icon>
          <v-icon>fas fa-sign-out-alt</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-btn>Logout</v-btn>
        </v-list-item-content>
      </v-list-item>

      <!-- View Portfolios -->
      <v-list-item link :to="'/portfolios'">
        <v-list-item-icon>
          <v-icon>fas fa-user-plus</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-btn>View Portfolios</v-btn>
        </v-list-item-content>
      </v-list-item>

      <!-- Assets -->
      <v-list-item link :to="'/assets'">
        <v-list-item-icon>
          <v-icon>fas fa-balance-scale-left</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-btn>View Assets</v-btn>
        </v-list-item-content>
      </v-list-item>

      <!-- View Leaderboard -->
      <v-list-item link :to="'/leaderboard'">
        <v-list-item-icon>
          <v-icon>fas fa-trophy</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-btn>View Leaderboard</v-btn>
        </v-list-item-content>
      </v-list-item>

      <!-- Settings -->
      <v-list-item link :to="'/'">
        <v-list-item-icon>
          <v-icon>fas fa-cogs</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-btn>Settings</v-btn>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-list dense nav v-if="!user">
      <!-- Login -->
      <v-list-item>
        <v-list-item-icon>
          <v-icon>fas fa-sign-in-alt</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <LoginDialog />
        </v-list-item-content>
      </v-list-item>

      <!-- Register -->
      <v-list-item>
        <v-list-item-icon>
          <v-icon>fas fa-user-plus</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <RegisterDialog />
        </v-list-item-content>
      </v-list-item>

      <!-- View Leaderboard -->
      <v-list-item link :to="'/leaderboard'">
        <v-list-item-icon>
          <v-icon>fas fa-trophy</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-btn>View Leaderboard</v-btn>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import Vuex from 'vuex';
import LoginDialog from '@/components/login_dialog/LoginDialog.vue';
import RegisterDialog from '@/components/register_dialog/RegisterDialog.vue';

export default {
  name: 'NavigationDrawer',
  components: {
    LoginDialog,
    RegisterDialog
  },
  data() {
    return {
      drawerState: null
    };
  },
  computed: {
    showDrawer() {
      return this.$store.state.ui.showDrawer;
    },
    user() {
      return this.$store.state.user;
    },
    dark() {
      return this.$store.state.ui.dark;
    }
  },
  methods: {
    drawerEvent(e) {
      if (!e) this.$store.commit('setDrawer', false);
    },
    logout() {
      this.$store
        .dispatch('submitLogout')
        .then(() => {
          this.$store.commit('setDialogText', {
            title: 'Logout Successful',
            content: "We'll miss you buddy.",
            primaryBtn: 'Ok',
            secondaryBtn: null,
            secondaryCallback: null
          });
          this.$store.commit('setShowDialog', true);
        })
        .catch(err => {
          this.$store.commit('setDialogText', {
            title: 'Logout failed. Wait, what? Logout failed?!',
            content: err[0],
            primaryBtn: 'Ok'
          });
          this.$store.commit('setShowDialog', true);
        });
    }
  }
};
</script>

<style lang="scss">
@import 'navigation_drawer';
</style>