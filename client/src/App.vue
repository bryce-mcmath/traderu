<template>
  <v-app
    :dark="dark"
    v-bind:class="[{ 'app--dark': dark }, { 'app--light': !dark }]"
  >
    <Navbar></Navbar>
    <NavigationDrawer></NavigationDrawer>
    <v-content>
      <!-- <Spinner v-if="loading" /> -->
      <router-view></router-view>
    </v-content>
    <FooterNav />
  </v-app>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Navbar from '@/components/navbar/Navbar.vue';
  import NavigationDrawer from '@/components/navigation_drawer/NavigationDrawer.vue';
  import FooterNavButton from '@/components/footer_nav_button/FooterNavButton.vue';
  import FooterNav from './components/footer_nav/FooterNav.vue';
  import Spinner from './components/spinner/Spinner.vue';
  import Dialog from './components/dialog/Dialog.vue';
  import { mapMutations, mapActions } from 'vuex';

  export default Vue.extend({
    name: 'App',
    components: {
      Navbar,
      NavigationDrawer,
      FooterNav
      // Spinner
    },

    computed: {
      dark() {
        return this.$store.state.ui.dark;
      },
      loading() {
        return this.$store.state.ui.ajaxInProgress;
      },
      tabSelected() {
        const route = this.$route.path.toLowerCase();
        if (route.includes('trade')) return 'trade';
        if (route.includes('portfolios')) return 'portfolios';
        if (route.includes('leaderboard')) return 'leaderboard';
        return 'info';
      }
    },
    methods: {
      ...mapActions(['checkUserAuth', 'setStocksData', 'setRankingsData'])
    },
    created: function() {
      // check for a valid token whenever they visit
      this.checkUserAuth();
      this.setStocksData();
      this.setRankingsData();
    }
  });
</script>
