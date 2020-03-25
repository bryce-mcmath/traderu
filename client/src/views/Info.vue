<template>
  <main class="home view-container">
    <v-btn :dark="dark" @click="showStocksDrawer">View Stocks</v-btn>
    <StocksListDrawer />
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
  name: 'Info',
  components: {
    StocksListDrawer,
    Login
  },
  computed: {
    dark() {
      return this.$store.state.ui.dark;
    }
  },
  methods: {
    showStocksDrawer: function() {
      this.setStocksData();
      this.$store.commit('toggleStocksDrawer');
    },
    ...mapActions(['setStocksData'])
  }
};
</script>
