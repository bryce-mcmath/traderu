<template>
  <v-navigation-drawer
    absolute
    temporary
    :value="showDrawer"
    @input="drawerEvent"
    :dark="dark"
  >
    <v-list-item>
      <v-list-item-content>
        <!-- @TODO: If current user, show data as per mockup, otherwise this entire section shouldn't appear -->
        <!-- <v-list-item-title class="title">Nav Menu</v-list-item-title>
        <v-list-item-subtitle>subtitle</v-list-item-subtitle> -->
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense nav v-if="isLoggedIn">
      <v-list-item
        v-for="route in loggedInLinks"
        :key="route.name"
        link
        :to="route.to"
      >
        <v-list-item-icon>
          <v-icon>{{ route.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ route.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-list dense nav v-if="!isLoggedIn">
      <v-list-item
        v-for="route in loggedOutLinks"
        :key="route.name"
        link
        :to="route.to"
      >
        <v-list-item-icon>
          <v-icon>{{ route.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ route.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  import Vuex from 'vuex';
  export default {
    name: 'NavigationDrawer',
    props: {
      dark: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        loggedInLinks: [
          { name: 'Logout', icon: 'fas fa-sign-in-alt', to: '/' },
          {
            name: 'View Portfolios',
            icon: 'fas fa-user-plus',
            to: '/portfolios'
          },
          {
            name: 'Make Trade',
            icon: 'fas fa-balance-scale-left',
            to: '/trade'
          },
          {
            name: 'View Leaderboard',
            icon: 'fas fa-trophy',
            to: '/leaderboard'
          },
          { name: 'Settings', icon: 'fas fa-cogs', to: '/' }
        ],
        loggedOutLinks: [
          { name: 'Login', icon: 'fas fa-sign-in-alt', to: '/' },
          { name: 'Register', icon: 'fas fa-user-plus', to: '/' },
          {
            name: 'View Leaderboard',
            icon: 'fas fa-trophy',
            to: '/leaderboard'
          }
        ],
        drawerState: null,
        isLoggedIn: {
          type: Boolean,
          default: false
        }
      };
    },
    computed: {
      showDrawer() {
        return this.$store.state.ui.showDrawer;
      }
    },
    methods: {
      drawerEvent(e) {
        if (!e) this.$store.commit('setDrawer', false);
      },
      // This is a placeholder. It was undefined and throwing an error
      logout(e) {
        return;
      }
    }
  };
</script>
