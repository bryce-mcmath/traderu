<template>
	<v-navigation-drawer dark :value="showStocksDrawer" app @input="drawerEvent">
    <v-list one-line>
      <v-subheader>STOCKS</v-subheader>
      <v-list-item-group color="primary">
        <v-list-item
          v-for="(item, i) in stocksData"
          :key="i"
        >

          <v-list-item-content>
            <v-list-item-title v-text="item.name"></v-list-item-title>
            <v-list-item-subtitle>Price: {{item.prices[0]}}</v-list-item-subtitle>
            
            
          </v-list-item-content>
          <v-list-item-avatar>
            <v-sparkline
                :value="item.prices.slice().reverse()"
                color="white"
                line-width="3"
                padding="16"
            ></v-sparkline>
          </v-list-item-avatar>
            
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  import Vuex from 'vuex';

  export default {
    name: "BottomNav",
    methods: {
		drawerEvent(e) {
        if (!e) this.$store.commit('toggleStocksDrawer');
      }
    },
    computed: {
		  showStocksDrawer() {
			  return this.$store.state.ui.showStocksDrawer;
      },
      showSpinner(){
        return this.$store.state.ui.ajaxInProgress;
      },
      stocksData(){
        return this.$store.state.apiData.stocksData;
      }
    },
  }
</script>

<style lang="scss">
  @import 'stocks_list_drawer';
</style>