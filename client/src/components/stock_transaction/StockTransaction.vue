<template>
  <div class="stocks-container">
    <h1>Select a Stock</h1>
    <v-divider class="mt-2 mb-3"></v-divider>
    <h3>STOCK SYMBOL</h3>
    <v-row>
      <v-col cols="11">
        <v-text-field
          rounded
          background-color="white"
          v-model="stockSymbolInput"
          outlined
          @keyup.enter="searchSymbol"
        ></v-text-field>
      </v-col>
      <v-col cols="1" @click="searchSymbol">
        <v-icon x-large class="ml-3 mt-2 cp">mdi-magnify-plus-outline</v-icon>
      </v-col>
    </v-row>
    <div class="placeholder-graph rb"></div>
    <h3 class="mt-4">PLACE AN ORDER</h3>
    <v-container>
      <v-row justify="space-around">
        <v-col>
          <label>Price</label>
          <v-text-field class="rb" background-color="white" outlined></v-text-field>
        </v-col>
        <v-col>
          <label>Transaction</label>
          <v-select
            class="rb"
            :items="transactionsSelectArray"
            item-text="text"
            item-value="value"
            v-model="transactionSelected"
            background-color="white"
            outlined
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <label>Duration</label>
          <v-text-field class="rb" disabled background-color="white" outlined></v-text-field>
        </v-col>
        <v-col>
          <v-btn class="rb mt-8">Place Order</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import AjaxCalls from '../../api/ajaxCalls';

export default Vue.extend({
  name: 'StockTransaction',
  computed: {
    darkMode() {
      return this.$store.state.ui.dark;
    }
  },
  data: () => ({
    transactionsSelectArray: [
      { text: 'Buy', value: 'buy' },
      { text: 'Sell', value: 'sell' }
    ],
    transactionSelected: '',
    stockSymbolInput: '',
    stockData: ''
  }),
  methods: {
    searchSymbol() {
      if (this.stockSymbolInput) {
        AjaxCalls.fetchStockSymbolData(this.stockSymbolInput)
          .then(data => {
            Vue.set(this, 'stockData', data);
          })
          .catch(err => console.log(err.response));
      }
    }
  }
});
</script>

<style lang="scss" scoped>
@import 'stock_transaction';
</style>