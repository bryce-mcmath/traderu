<template>
  <v-app :dark="this.dark">
    <Navbar :dark="this.dark"></Navbar>
    <NavigationDrawer></NavigationDrawer>
    <v-content>
      <Spinner v-if="loading" />
      <router-view></router-view>
    </v-content>

    <FooterNav :dark="this.dark" />
  </v-app>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Navbar from '@/components/nav_bar/Navbar.vue';
  import NavigationDrawer from '@/components/navigation_drawer/Navigation_Drawer.vue';
  import FooterNavButton from '@/components/footer_nav_button/FooterNavButton.vue';
  // import CustomToggleButton from '@/components/custom_toggle_button/CustomToggleButton.vue';
  import FooterNav from './components/footer_nav/FooterNav.vue';
  import Spinner from './components/spinner/Spinner.vue';

  export default Vue.extend({
    name: 'App',
    components: {
      Navbar,
      NavigationDrawer,
      FooterNav
    },
    data: function() {
      return {
        dark: false,
        loading: false
      };
    }
  });
</script>
