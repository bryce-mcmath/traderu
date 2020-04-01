
<template>
  <div id="single-asset__container">
    <section v-bind:class="['asset-info', {'asset-info--dark':dark}]">
      <h3>{{ assetSelected.name }}</h3>
      <h5
        v-bind:style="{
        color:
          assetSelected.prices[0].price -
            assetSelected.prices[assetSelected.prices.length - 1].price >
          0
            ? '#75ff83'
            : '#ff073a'
      }"
      >{{ format(assetSelected.prices[0].price) }}</h5>
      <h5
        v-bind:style="{
        color:
          assetSelected.prices[0].price -
            assetSelected.prices[1].price >
          0
            ? '#75ff83'
            : '#ff073a'
      }"
      >{{ percentDifference(assetSelected.prices[0].price, assetSelected.prices[1].price) }}%</h5>
      <div id="chart-container" :width="chartWidth" :height="chartHeight">
        <div class="spinner-container" v-if="waiting">
          <v-progress-circular size="120" :indeterminate="true"></v-progress-circular>
        </div>
        <svg :class="{light: dark}" id="assetChart3" :width="chartWidth" :height="chartHeight" />
      </div>
      <v-select
        :menu-props="{dark: dark}"
        :dark="dark"
        :items="chartOptions"
        label="Standard"
        dense
        :value="defaultSelectValue"
        @input="updateChart"
      ></v-select>
    </section>
    <div
      v-bind:class="['order-form', {'order-form--dark': dark}]"
      v-if="portfolioSelectArray.length"
    >
      <h3>Place Order</h3>
      <v-container>
        <v-row>
          <label class="portfolio-select__label">Select portfolio for transaction:</label>
          <v-select
            :menu-props="{dark: dark}"
            :items="portfolioSelectArray"
            item-text="name"
            item-value="id"
            v-model="portfolioSelectedId"
            :dark="dark"
            outlined
          ></v-select>
        </v-row>
        <v-row v-if="portfolio.id">
          <v-col>
            <label>Funds Available:</label>
            <v-text-field class="left-row" :dark="dark" readonly :value="format(portfolio.cash)"></v-text-field>
          </v-col>
          <v-col>
            <label class="right-row">Quantity Owned:</label>
            <v-text-field
              class="right-row"
              readonly
              :dark="dark"
              :value="ownedAssetQuantity || '0'"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <label>Price:</label>
            <v-select
              class="left-row"
              :menu-props="{dark: dark}"
              :dark="dark"
              outlined
              :items="priceOptions"
              readonly
              :value="priceSelected"
              :hint="'Not yet adjustable'"
              :persistent-hint="true"
            ></v-select>
          </v-col>
          <v-col>
            <label class="right-row">$:</label>
            <v-text-field
              class="right-row"
              readonly
              :dark="dark"
              outlined
              :hint="'Not yet adjustable'"
              :persistent-hint="true"
              :value="
                (assetSelected.isStock && format(stockPrice)) ||
                  (assetSelected.isCrypto && format(cryptoPrice))
              "
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <label>Quantity:</label>
            <v-text-field
              class="left-row"
              onkeypress="return event.key === 'Enter' || (Number(event.key) >= 0 && Number(event.key) <= 9)"
              type="number"
              v-model="quantity"
              :dark="dark"
              outlined
            ></v-text-field>
          </v-col>
          <v-col>
            <label class="right-row">Transaction:</label>
            <v-select
              class="right-row"
              :menu-props="{dark: dark}"
              :items="transactionsSelectArray"
              item-text="text"
              item-value="value"
              v-model="transactionSelected"
              :dark="dark"
              outlined
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col :cols="6">
            <label>Duration:</label>
            <v-select
              class="left-row"
              :menu-props="{dark: dark}"
              :items="durationOptions"
              readonly
              :value="durationSelected"
              :dark="dark"
              outlined
              :hint="'Not yet adjustable'"
              :persistent-hint="true"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="right-row">
            <v-btn class="order-btn" :dark="dark" @click="submitTransaction">Place Order</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div v-else>
      <h3>
        You have not yet created a portfolio, so you will not be able to
        purchase assets.
      </h3>
    </div>
  </div>
</template>

<script>
import { formatCurrency } from '@coingecko/cryptoformat';
import { mapActions, mapMutations } from 'vuex';
import ajaxCalls from '../../api/ajaxCalls';
import { makeLineChart } from '../../utils/d3Graphs';
import * as d3 from 'd3';
const { makeStockTransaction, makeCryptoTransaction } = ajaxCalls;
export default {
  created() {
    this.setActivePortfolio({ name: null, id: null });
  },
  mounted() {
    if (this.assetSelected.isStock) {
      let data = this.assetSelected.prices;
      //grab most recent date from the time string
      const date = data[0].time.split(' ')[0];
      data = data.filter(dataPoint => dataPoint.time.split(' ')[0] === date);
      const dataOptions = {
        //Grab just the time portion of the datetime
        data: data.map(dataPoint => ({
          value: dataPoint.price,
          date: dataPoint.time.split(' ')[1]
        })),
        timeParseString: '%H:%M:%S'
      };
      makeLineChart(
        this.chartHeight,
        this.chartWidth,
        { top: 30, left: 70, bottom: 30, right: 40 },
        dataOptions,
        `#assetChart3`,
        'Day'
      );
    } else if (this.assetSelected.isCrypto) {
      //Use 1 yr of data
      const data = this.assetSelected.prices.slice(0, 90);
      const dataOptions = {
        //Grab just the time portion of the datetime
        data: data.map(dataPoint => ({
          value: dataPoint.price,
          date: dataPoint.time
        })),
        timeParseString: '%Y-%m-%d'
      };
      makeLineChart(
        this.chartHeight,
        this.chartWidth,
        { top: 30, left: 70, bottom: 30, right: 40 },
        dataOptions,
        `#assetChart3`,
        '3month'
      );
    }
  },
  props: ['assetSelected', 'portfolioSelectArray'],
  computed: {
    chartOptions() {
      return this.assetSelected.isStock
        ? ['Day', '3-month', '1-year']
        : ['3-month', '1-year'];
    },
    defaultSelectValue() {
      return this.assetSelected.isStock ? 'Day' : '3-month';
    },
    portfolio() {
      // return this.$store.state.ui.activePortfolio;
      return this.$store.state.apiData.userPortfolios.find(portfolio => portfolio.id === this.portfolioSelectedId) || { name: null, id: null };
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
    },
    ownedAssetQuantity() {
      if (this.assetSelected.isStock) {
        const stocks = this.portfolio.stocks.filter(stock => stock);
        const stock = stocks.find(
          stock => stock.name === this.assetSelected.name
        );
        return stock ? stock.quantity : 0;
      } else {
        const cryptos = this.portfolio.cryptos.filter(crypto => crypto);
        const crypto = cryptos.find(
          crypto => crypto.name === this.assetSelected.name
        );
        return crypto ? crypto.quantity : 0;
      }
    }
  },
  data: () => ({
    transactionsSelectArray: [
      { text: 'Buy', value: 'buy' },
      { text: 'Sell', value: 'sell' }
    ],
    priceOptions: ['Market'],
    priceSelected: 'Market',
    durationOptions: ['Instant'],
    durationSelected: 'Instant',
    portfolioSelectedId: '',
    transactionSelected: '',
    searchSymbol: '',
    quantity: '',
    chartWidth: window.innerWidth > 1100 ? window.innerWidth * 0.35 : window.innerWidth * 0.8,
    chartHeight: window.innerWidth ? window.innerWidth * 0.175 : window.innerWidth * 0.4,
    waiting: false,
    assetData: null
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
    // |V1 - V1|/((V1+V2)/2) * 100
    percentDifference(now, prev) {
      const diff = ((Math.abs(prev - now) / ((prev + now) / 2)) * 100).toFixed(
        2
      );
      return now > prev ? `${diff}` : `-${diff}`;
    },
    async updateChart(e) {
      d3.select('#assetChart3').html('');
      this.waiting = true;
      let data = this.assetData;
      if (this.assetSelected.isStock && !data) {
        data = await ajaxCalls.fetchStockData(this.assetSelected.symbol);
        this.assetData = data;
      } else if (this.assetSelected.isCrypto && !data) {
        data = await ajaxCalls.fetchCryptoData(this.assetSelected.symbol);
        this.assetData = data;
      }
      this.waiting = false;
      if (e === '3-month') {
        if (this.assetSelected.isStock) {
          data = data.daily.stockData
            .map(stock => ({ ...stock, data: stock.data['4. close'] }))
            .slice(0, 90);
        } else {
          data = data.daily.cryptoData
            .map(crypto => ({
              ...crypto,
              data: crypto.data['4b. close (USD)']
            }))
            .slice(0, 90);
        }
        const dataOptions = {
          //Grab just the time portion of the datetime
          data: data.map(dataPoint => ({
            value: dataPoint.data,
            date: dataPoint.time
          })),
          timeParseString: '%Y-%m-%d'
        };
        makeLineChart(
          this.chartHeight,
          this.chartWidth,
          { top: 30, left: 70, bottom: 30, right: 40 },
          dataOptions,
          `#assetChart3`,
          '3month'
        );
      }
      if (e === '1-year') {
        if (this.assetSelected.isStock) {
          data = data.weekly.stockData
            .map(stock => ({ ...stock, data: stock.data['4. close'] }))
            .slice(0, 52);
        } else {
          data = data.weekly.cryptoData
            .map(crypto => ({
              ...crypto,
              data: crypto.data['4b. close (USD)']
            }))
            .slice(0, 52);
        }
        const dataOptions = {
          //Grab just the time portion of the datetime
          data: data.map(dataPoint => ({
            value: dataPoint.data,
            date: dataPoint.time
          })),
          timeParseString: '%Y-%m-%d'
        };
        makeLineChart(
          this.chartHeight,
          this.chartWidth,
          { top: 30, left: 70, bottom: 30, right: 40 },
          dataOptions,
          `#assetChart3`,
          '1year'
        );
      }
      if (e === 'Day') {
        data = data.intraday.stockData.map(stock => ({
          ...stock,
          data: stock.data['4. close']
        }));
        const date = data[0].time.split(' ')[0];
        data = data.filter(dataPoint => dataPoint.time.split(' ')[0] === date);
        const dataOptions = {
          //Grab just the time portion of the datetime
          data: data.map(dataPoint => ({
            value: dataPoint.data,
            date: dataPoint.time.split(' ')[1]
          })),
          timeParseString: '%H:%M:%S'
        };
        makeLineChart(
          this.chartHeight,
          this.chartWidth,
          { top: 55, left: 70, bottom: 55, right: 40 },
          dataOptions,
          `#assetChart3`,
          'day'
        );
      }
    },
    handleSymbolInput() {
      if (this.assetSelected) {
        this.assetSelected = '';
      }
    },
    submitTransaction() {
      if (!this.transactionValidation()) return;
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
            window.console.log('res.data:', res.data);
            if (res.data === 'success') {
              window.console.log('#1, res:', res);
              window.console.log('#1, res.data:', res.data);
              this.transactionNotification(true);
            } else {
              window.console.log('#2, res:', res);
              window.console.log('#2, res.data:', res.data);
              window.console.log('#2, res.data.error:', res.data.error);
              this.transactionNotification(false, res.data.error);
            }
            this.setUserPortfolios();
          })
          .catch(err => {
            window.console.log('#3, res:', err);
            this.transactionNotification(false);
          });
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
            if (res.data === 'success') {
              window.console.log('#1, res:', res);
              window.console.log('#1, res.data:', res.data);
              this.transactionNotification(true);
            } else {
              window.console.log('#2, res:', res);
              window.console.log('#2, res.data:', res.data);
              window.console.log('#2, res.data.error:', res.data.error);
              this.transactionNotification(false, res.data.error);
            }
            this.setUserPortfolios();
          })
          .catch(err => {
            window.console.log('#3, res:', err);
            this.transactionNotification(false);
          });
      }
    },
    transactionValidation() {
      let valid = true;
      const errTemplate = {
        title: 'Error',
        content: []
      };
      if (!this.portfolio.id && !isNaN(Number(this.portfolio.id))) {
        valid = false;
        errTemplate.content.push('No portfolio selected.');
      }
      if (!this.quantity && !isNaN(Number(this.quantity))) {
        valid = false;
        errTemplate.content.push('Quantity must be a number.');
      }
      if (!this.transactionSelected) {
        valid = false;
        errTemplate.content.push('A transaction type must be selected.');
      }
      if (
        this.transactionSelected === 'sell' &&
        Number(this.OwnedAssetquantity) < Number(this.quantity)
      ) {
        valid = false;
        errTemplate.content.push(
          'You cannot sell more of an asset than you own. Double check how much you have currently!'
        );
      }
      if (
        this.transactionSelected === 'buy' &&
        Number(this.portfolio.cash) <
          Number(this.quantity) * Number(this.assetSelected.prices[0].price)
      ) {
        valid = false;
        errTemplate.content.push('Insufficient funds for transaction.');
      }
      this.$store.commit('setDialogText', errTemplate);
      this.$store.commit('setShowDialog', !valid);
      return valid;
    },
    transactionNotification(transactionSuccess, transactionMessage = '') {
      if (transactionSuccess) {
        //WORKING HERE
        if (this.assetSelected.isStock) {
          const stocks = this.portfolio.stocks.map(stock => {
            if (stock.name === this.assetSelected.name) {
              if (this.transactionSelected === 'sell')
                stock.quantity = Number(stock.quantity) - Number(this.quantity);
              else
                stock.quantity = Number(stock.quantity) + Number(this.quantity);
            }
            return stock;
          });
        } else if (this.assetSelected.isCrypto) {
          const cryptos = this.portfolio.cryptos.map(crypto => {
            if (crypto.name === this.assetSelected.name) {
              if (this.transactionSelected === 'sell')
                crypto.quantity =
                  Number(crypto.quantity) - Number(this.quantity);
              else
                crypto.quantity =
                  Number(crypto.quantity) + Number(this.quantity);
            }
            return crypto;
          });
        }
        this.$store.commit('setDialogText', {
          title: 'Success!',
          content: 'Transaction successful',
          primaryBtn: 'Ok'
        });
        this.$store.commit('setShowDialog', true);
        this.quantity = '';
      } else {
        console.log('fail');
        this.$store.commit('setDialogText', {
          title: 'Error',
          content:
            transactionMessage ||
            'There was an issue processing your transaction. Please try again later.',
          primaryBtn: 'Ok'
        });
        this.$store.commit('setShowDialog', true);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'single_asset';
</style>