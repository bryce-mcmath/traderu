<template>
  <div class="stocks-container">
<<<<<<< HEAD
    <input
      class="symbol-text-input mt-2"
      type="text"
      v-model="searchSymbol"
      placeholder="Search or filter by symbol/name"
      @input="handleSymbolInput"
      @click="handleSymbolInput"
    />
    <h3 class="title">Assets</h3>
    <div class="assets-container">
      <div v-if="assetSelected">
        <h4>{{assetSelected.name}}</h4>
        <h5>Price: {{assetSelected.prices[assetSelected.prices.length - 1].price}}</h5>
        <v-sparkline
          :value="assetSelected.prices.map(stockObj => stockObj.price).slice().reverse()"
          :color="darkSparkline"
          line-width="3"
          padding="16"
        ></v-sparkline>
        <h3 class="mt-4">PLACE AN ORDER</h3>
        <v-container>
          <v-row justify="space-around">
            <v-col>
              <label>Price</label>
              <v-text-field background-color="white" outlined></v-text-field>
            </v-col>
            <v-col>
              <label>Transaction</label>
              <v-select
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
              <label>Quantity</label>
              <v-text-field
                onkeypress="return event.key === 'Enter' || (Number(event.key) >= 0 && Number(event.key) <= 9)"
                type="number"
                v-model="quantity"
                background-color="white"
                outlined
              ></v-text-field>
            </v-col>
            <v-col>
              <v-btn class="mt-8" @click="submitTransaction">Place Order</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </div>
      <div v-else>
        <div v-if="stocksData.length">
          <v-list :dark="dark" one-line>
            <v-list-item-group color="primary">
              <v-list-item v-for="(item, i) in stocksData" :key="i" @click="selectAsset(item)">
                <v-list-item-content>
                  <v-list-item-title v-text="item.name"></v-list-item-title>
                  <v-list-item-subtitle>Price: {{item.prices[0].price}}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-content>
                  <v-sparkline
                    :value="item.prices.map(stockObj => stockObj.price).slice().reverse()"
                    :color="darkSparkline"
                    line-width="3"
                    padding="16"
                  ></v-sparkline>
                </v-list-item-content>
                <v-btn dense>Buy / Sell</v-btn>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </div>
        <div class="cp" v-else-if="searchSymbol">
          <h3>Search markets for symbol "{{searchSymbol.toUpperCase()}}"</h3>
        </div>
        <div v-else>No assets to show at this time. Add some and we'll display the data here.</div>
      </div>
    </div>
=======
    <h1>Select a Stock</h1>
    <v-divider class="mt-2 mb-3"></v-divider>
    <h3>STOCK SYMBOL</h3>
    <v-row>
      <v-col cols="11">
        <v-text-field
          rounded
          background-color="white"
          v-model="symbol"
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
>>>>>>> 98856dc0f7e46f740fd09724752b46dec049fe48
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import AjaxCalls from '../../api/ajaxCalls';

export default Vue.extend({
  name: 'StockTransaction',
  computed: {
    stocksData() {
      const stocksData = this.$store.state.apiData.stocksData;
      const searchSymbol = String(this.searchSymbol);
      if (this.searchSymbol) {
        return stocksData.filter(element => {
          return (
            element.symbol.indexOf(searchSymbol.toUpperCase()) > -1 ||
            element.name.toLowerCase().indexOf(searchSymbol.toLowerCase()) > -1
          );
        });
      } else {
        return stocksData;
      }
    },
    dark() {
      return this.$store.state.ui.dark;
    },
<<<<<<< HEAD
    darkSparkline() {
      return this.$store.state.ui.dark ? 'white' : 'black';
    },
    portfolioId() {
      if (this.$store.state.user) {
        return this.$store.state.user.id;
      } else {
        return '00';
=======
    symbol: {
      get() {
        return this.$store.state.ui.stockSymbol;
      },
      set(value) {
        this.$store.commit('setStockSymbol', value);
>>>>>>> 98856dc0f7e46f740fd09724752b46dec049fe48
      }
    }
  },
  data: () => ({
    transactionsSelectArray: [
      { text: 'Buy', value: 'buy' },
      { text: 'Sell', value: 'sell' }
    ],
    transactionSelected: '',
<<<<<<< HEAD
    searchSymbol: '',
    assetSelected: '',
    quantity: ''
  }),
  methods: {
    selectAsset(assetItem) {
      this.assetSelected = assetItem;
    },
    handleSymbolInput() {
      if (this.assetSelected) {
        this.assetSelected = '';
      }
    },
    submitTransaction() {
      AjaxCalls.makeTransaction(
        {
          stock: {
            symbol: this.assetSelected.symbol,
            price: String(this.assetSelected.prices.pop().price)
          },
          type: this.transactionSelected,
          quantity: this.quantity
        },
        this.portfolioId
      )
        .then(res => console.log(res))
        .catch(err => console.log(err));
=======
    stockData: ''
  }),
  methods: {
    searchSymbol() {
      if (!this.symbol) return;
      this.$store.dispatch('setCurrentAsset');
>>>>>>> 98856dc0f7e46f740fd09724752b46dec049fe48
    }
  }
});
</script>

<style lang="scss" scoped>
@import 'stock_transaction';
</style>