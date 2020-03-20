<template>
  <nav class="navbar" v-bind:class="{ 'navbar--dark': dark }">
    <CustomToggleButton :dark="dark"></CustomToggleButton>
    <img class="brand" v-if="!dark" src="@/assets/logo.png" />
    <img class="brand" v-if="dark" src="@/assets/logo--dark-mode.png" />
    <v-app-bar-nav-icon @click="this.toggleDrawer"></v-app-bar-nav-icon>
  </nav>
</template>

<script lang="ts">
  import Vue from 'vue';
  import CustomToggleButton from '@/components/custom_toggle_button/CustomToggleButton.vue';
  import { mapMutations } from 'vuex';

  export default Vue.extend({
    name: 'Navbar',
    components: { CustomToggleButton },
    props: {
      dark: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        // routes: [
        // 	{ display: 'Home', to: '/' },
        // 	{ display: 'Stock', to: '/stocks' },
        // 	{ display: 'Portfolio', to: '/portfolio' },
        // 	{ display: 'Leaderboard', to: '/leaderboard' }
        // ],
        // on: false
      };
    },
    methods: {
      ...mapMutations(['toggleDrawer'])
    }
  });
</script>

<style lang="scss" scoped>
  @import 'navbar';
</style>
