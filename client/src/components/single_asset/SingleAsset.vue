<template>
  <div>
    <h4>{{ assetSelected.name }}</h4>
    <h5
      v-bind:style="{
        color:
          assetSelected.prices[0].price -
            assetSelected.prices[assetSelected.prices.length - 1].price >
          0
            ? '#75ff83'
            : '#ff073a'
      }"
    >
      {{ format(assetSelected.prices[0].price) }}
    </h5>
    <div id="chart-container" :width="chartWidth" :height="chartHeight">
      <h2>Asset Price</h2>
      <div class="spinner-container" v-if="waiting">
          <v-progress-circular size="120" :indeterminate="true"></v-progress-circular>
      </div>
      <svg id="assetChart3" :width="chartWidth" :height="chartHeight"/>
    </div>
    <v-select
      :items="chartOptions"
      label="Standard"
      dense
      :value="defaultSelectValue"
      @input="updateChart"
    ></v-select>
    <div v-if="portfolioSelectArray.length">
      <h3 class="mt-4">PLACE AN ORDER</h3>
      <v-container>
        <v-row justify="space-around">
          <label>Select portfolio for transaction:</label>
          <v-select
            :items="portfolioSelectArray"
            item-text="name"
            item-value="id"
            v-model="portfolioSelectedId"
            background-color="white"
            outlined
          ></v-select>
        </v-row>
        <v-row justify="space-around">
          <v-col>
            <label>Price</label>
            <v-text-field
              background-color="white"
              outlined
              disabled
              :value="
                (assetSelected.isStock && format(stockPrice)) ||
                  (assetSelected.isCrypto && format(cryptoPrice))
              "
            ></v-text-field>
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
      <h3
        >You have not yet created a portfolio, so you will not be able to
        purchase assets.</h3
      >
    </div>
  </div>
</template>

<script>
import { formatCurrency } from '@coingecko/cryptoformat';
import { mapActions, mapMutations } from 'vuex';
import ajaxCalls from '../../api/ajaxCalls';
import { makeLineChart } from '../../utils/d3.js'
import * as d3 from 'd3';
const { makeStockTransaction, makeCryptoTransaction } = ajaxCalls;

export default {
  mounted(){
    if(this.assetSelected.isStock){
      let data = this.assetSelected.prices;
      //grab most recent date from the time string
      const date = data[0].time.split(' ')[0];
      data = data.filter(dataPoint => dataPoint.time.split(' ')[0] === date)
      const dataOptions = {
        //Grab just the time portion of the datetime
        data: data.map(dataPoint => ({value: dataPoint.price, date: dataPoint.time.split(' ')[1]})),
        timeParseString: '%H:%M:%S'
      }
      makeLineChart(this.chartHeight, this.chartWidth, {top: 55, left: 100, bottom: 55, right: 40}, dataOptions, `#assetChart3`);
    } else if(this.assetSelected.isCrypto){
      //Use 1 yr of data
      const data = this.assetSelected.prices.slice(0,90);
      const dataOptions = {
        //Grab just the time portion of the datetime
        data: data.map(dataPoint => ({value: dataPoint.price, date: dataPoint.time})),
        timeParseString: '%Y-%m-%d'
      }
      makeLineChart(this.chartHeight, this.chartWidth, {top: 55, left: 100, bottom: 55, right: 40}, dataOptions, `#assetChart3`);
    }
  },
  props: ["assetSelected", "portfolioSelectArray"],
  computed: {
    chartOptions(){
      return this.assetSelected.isStock ? ['Day', '3-month', '1-year'] : ['3-month', '1-year']
    },
    defaultSelectValue(){
      return this.assetSelected.isStock ? 'Day' : '3-month'
    },
    portfolio() {
      return this.$store.state.ui.activePortfolio;
    },
    stockPrice() {
      if (this.assetSelected) {
        const asset = this.stocksData.find(
          stock => stock.name === this.assetSelected.name
        );
        return asset.prices[0].price;
      }
      return null;
    },
    cryptoPrice() {
      if (this.assetSelected) {
        const asset = this.cryptosData.find(
          crypto => crypto.name === this.assetSelected.name
        );
        return asset.prices[0].price;
      }
      return null;
    },
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
    cryptosData() {
      const cryptosData = this.$store.state.apiData.cryptosData;
      const searchSymbol = String(this.searchSymbol);
      if (this.searchSymbol) {
        return cryptosData.filter(element => {
          return (
            element.symbol.indexOf(searchSymbol.toUpperCase()) > -1 ||
            element.name.toLowerCase().indexOf(searchSymbol.toLowerCase()) > -1
          );
        });
      } else {
        return cryptosData;
      }
    },
    dark() {
      return this.$store.state.ui.dark;
    }
  },
  data: () => ({
    transactionsSelectArray: [
      { text: 'Buy', value: 'buy' },
      { text: 'Sell', value: 'sell' }
    ],
    portfolioSelectedId: '',
    transactionSelected: '',
    searchSymbol: '',
    quantity: '',
    chartWidth: window.innerWidth * 0.9,
    chartHeight: (window.innerWidth * 0.9) * 0.5,
    waiting: false
  }),
  watch: {
    portfolioSelectedId: function(id) {
      this.setActivePortfolio(this.portfolioSelectArray.find(x => x.id === id));
    }
  },
  methods: {
    ...mapActions(['setUserPortfolios']),
    ...mapMutations(['setActivePortfolio']),
    format(val) {
      return formatCurrency(val, 'USD', 'en').replace(
        /^(\d+\.\d*?[1-9])0+$/,
        ''
      );
    },
    async updateChart(e){
      d3.select('#assetChart3').html('')
      this.waiting = true;
      let data;
      if(this.assetSelected.isStock){
        data = await ajaxCalls.fetchStockData(this.assetSelected.symbol);
      }
      else {
        data = await ajaxCalls.fetchCryptoData(this.assetSelected.symbol);
      }
      this.waiting = false;
      if(e === '3-month'){
        if(this.assetSelected.isStock){
          data = data.daily.stockData.map(stock => ({...stock, data: stock.data["4. close"]})).slice(0,90);
        }
        else {
          console.log(data)
          data = data.daily.cryptoData.map(crypto => ({...crypto, data: crypto.data["4b. close (USD)"]})).slice(0,90)
        }
        const dataOptions = {
          //Grab just the time portion of the datetime
          data: data.map(dataPoint => ({value: dataPoint.data, date: dataPoint.time})),
          timeParseString: '%Y-%m-%d'
        }
        makeLineChart(this.chartHeight, this.chartWidth, {top: 55, left: 100, bottom: 55, right: 40}, dataOptions, `#assetChart3`);
      }
      if(e === '1-year'){
        console.log(data)
        if(this.assetSelected.isStock){
          data = data.weekly.stockData.map(stock => ({...stock, data: stock.data["4. close"]})).slice(0,52);
        }
        else {
          console.log(data)
          data = data.weekly.cryptoData.map(crypto => ({...crypto, data: crypto.data["4b. close (USD)"]})).slice(0,52)
        }
        const dataOptions = {
          //Grab just the time portion of the datetime
          data: data.map(dataPoint => ({value: dataPoint.data, date: dataPoint.time})),
          timeParseString: '%Y-%m-%d'
        }
        makeLineChart(this.chartHeight, this.chartWidth, {top: 55, left: 100, bottom: 55, right: 40}, dataOptions, `#assetChart3`, 6);
      }
      if(e === 'Day'){
        data = data.intraday.stockData.map(stock => ({...stock, data: stock.data["4. close"]}))
        const date = data[0].time.split(' ')[0];
        data = data.filter(dataPoint => dataPoint.time.split(' ')[0] === date)
        const dataOptions = {
          //Grab just the time portion of the datetime
          data: data.map(dataPoint => ({value: dataPoint.data, date: dataPoint.time.split(' ')[1]})),
          timeParseString: '%H:%M:%S'
        }
        makeLineChart(this.chartHeight, this.chartWidth, {top: 55, left: 100, bottom: 55, right: 40}, dataOptions, `#assetChart3`);
      }

    },
    handleSymbolInput() {
      if (this.assetSelected) {
        this.assetSelected = '';
      }
    },
    submitTransaction() {
      if (!this.portfolio.id) {
        return console.log('Handle no selected portfolio here');
      }

      if (this.assetSelected.isStock && !this.assetSelected.isCrypto) {
        makeStockTransaction(
          {
            stock: {
              symbol: this.assetSelected.symbol,
              price: String(this.assetSelected.prices[0].price)
            },
            type: this.transactionSelected,
            quantity: Number(this.quantity)
          },
          this.portfolio.id
        )
          .then(res => {
            res.data === 'error'
              ? this.transactionNotification(false)
              : this.transactionNotification(true);
            this.setUserPortfolios();
          })
          .catch(() => this.transactionNotification(false));
      } else if (this.assetSelected.isCrypto && !this.assetSelected.isStock) {
        makeCryptoTransaction(
          {
            crypto: {
              symbol: this.assetSelected.symbol,
              price: String(this.assetSelected.prices[0].price)
            },
            type: this.transactionSelected,
            quantity: Number(this.quantity)
          },
          this.portfolio.id
        )
          .then(res => {
            res.data === 'error'
              ? this.transactionNotification(false)
              : this.transactionNotification(true);
            this.setUserPortfolios();
          })
          .catch(() => this.transactionNotification(false));
      }
    },
    transactionValidation() {
      let valid = true;
      const errTemplate = {
        title: 'Error',
        content: ''
      };

      if (!this.portfolio.id && !isNaN(Number(this.portfolio.id))) {
        valid = false;
        errTemplate.content = 'No portfolio selected';
      }

      if (!this.quantity && !isNaN(Number(this.quantity))) {
        valid = false;
        errTemplate.content = 'Quantity must be a number';
      }

      if (!this.transactionSelected) {
        valid = false;
        errTemplate.content = 'Transaction must be selected';
      }

      this.$store.commit('setDialogText', errTemplate);
      this.$store.commit('setShowDialog', !valid);

      return valid;
    },
    transactionNotification(transactionSuccess) {
      if (transactionSuccess) {
        this.$store.commit('setDialogText', {
          title: 'Success!',
          content: 'Transaction successful',
          primaryBtn: 'Ok'
        });
        this.$store.commit('setShowDialog', true);
        this.quantity = '';
      } else {
        this.$store.commit('setDialogText', {
          title: 'Error',
          content:
            'There was an issue processing your transaction. Please try again later.',
          primaryBtn: 'Ok'
        });
        this.$store.commit('setShowDialog', true);
      }
    }
  },

};

</script>

<style lang="scss" scoped>
  @import 'single_asset';
</style>
