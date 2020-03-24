<template>
  <v-app
    :dark="dark"
    v-bind:class="[{ 'app--dark': dark }, { 'app--light': !dark }]"
  >
    <Dialog></Dialog>
    <Navbar :dark="dark"></Navbar>
    <NavigationDrawer :dark="dark"></NavigationDrawer>
    <v-content>
      <Spinner v-if="loading" />
      <router-view :dark="dark"></router-view>
    </v-content>
    <FooterNav :tabSelected="tabSelected" :dark="dark" />
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
      FooterNav,
      Dialog
    },
    created(){
      this.setStocksData();
    },
    methods: {
      ...mapActions(['setStocksData'])
    },
    data: function() {
      return {
        loading: false
      };
    },
    computed: {
      dark() {
        return this.$store.state.ui.dark;
      },
      tabSelected() {
        const route = this.$route.path.toLowerCase();
        if (route.includes('trade')) return 'trade';
        if (route.includes('portfolios')) return 'portfolios';
        if (route.includes('leaderboard')) return 'leaderboard';
        return 'info';
      }
    }
  });
</script>
