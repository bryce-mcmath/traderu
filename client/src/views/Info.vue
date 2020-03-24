<template>
  <main class="home view-container">
    <v-btn :dark="dark" @click="showStocksDrawer">Toggle stocks</v-btn>
    <StocksListDrawer :dark="dark" />
    <Login></Login>
  </main>
</template>

<script>
  // @ is an alias to /src
  import StocksListDrawer from '../components/stocks_list_drawer/StocksListDrawer.vue';
  import Login from '@/components/login/Login.vue';
  import Vuex from 'vuex';
  import { mapMutations, mapActions } from 'vuex';

  export default {
    name: 'Home',
    components: {
      StocksListDrawer,
      Login
    },
    props: {
      dark: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      showStocksDrawer: function() {
        this.$store.commit('toggleStocksDrawer');
      },
    }
  };
</script>
