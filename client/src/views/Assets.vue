<template>
  <main class="view-container">
    <div class="assets-container">
      <div v-if="assetSelected">
        <button class="back-btn" @click="assetSelected = ''">
          <i class="fas fa-arrow-left"></i>
        </button>
        <SingleAsset
          :assetSelected="assetSelected"
          :portfolioSelectArray="portfolioSelectArray"
        />
      </div>
      <div v-else>
        <input
          class="symbol-text-input mt-2"
          type="text"
          v-model="searchSymbol"
          placeholder="Filter by symbol or name..."
          @input="handleSymbolInput"
          @click="handleSymbolInput"
        />
        <hr class="break" />
        <div v-if="stocksData.length || cryptosData.length">
          <div v-if="stocksData.length">
            <h3 class="asset-title">Stocks</h3>
            <v-list :dark="dark" one-line>
              <v-list-item-group color="primary">
                <v-list-item
                  v-for="(item, i) in stocksData"
                  :key="i"
                  @click="selectAsset(item, 'stock')"
                >
                  <v-list-item-content>
                    <v-list-item-title v-text="item.name"></v-list-item-title>
                    <!-- {{ showDifference(item) }} -->
                    <v-list-item-subtitle
                      v-bind:style="{
                        color:
                          item.prices[0].price -
                            item.prices[item.prices.length - 1].price >
                          0
                            ? '#75ff83'
                            : '#ff073a'
                      }"
                    >
                      {{ format(item.prices[0].price) }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-content>
                    <v-sparkline
                      :value="
                        item.prices
                          .map(stockObj => stockObj.price)
                          .slice()
                          .reverse()
                      "
                      v-bind:color="
                        item.prices[0].price -
                          item.prices[item.prices.length - 1].price >
                        0
                          ? '#75ff83'
                          : '#ff073a'
                      "
                      line-width="3"
                      padding="16"
                    ></v-sparkline>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </div>
          <div v-if="cryptosData.length">
            <h3 class="asset-title">Cryptocurrencies</h3>
            <v-list :dark="dark" one-line>
              <v-list-item-group color="primary">
                <v-list-item
                  v-for="(item, i) in cryptosData"
                  :key="i"
                  @click="selectAsset(item, 'crypto')"
                >
                  <v-list-item-content>
                    <v-list-item-title v-text="item.name"></v-list-item-title>
                    <!-- {{ showDifference(item) }} -->
                    <v-list-item-subtitle
                      v-bind:style="{
                        color:
                          item.prices[0].price -
                            item.prices[item.prices.length - 1].price >
                          0
                            ? '#75ff83'
                            : '#ff073a'
                      }"
                    >
                      {{ format(item.prices[0].price) }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-content> </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </div>
        </div>
        <div class="cp" v-else-if="searchSymbol">
          <h3>No results for symbol "{{ searchSymbol.toUpperCase() }}"</h3>
        </div>
        <div v-else>
          No stocks to show at this time. Once we've added some we'll display
          the data here.
        </div>
      </div>
    </div>
  </main>
</template>

<script>
  import { formatCurrency } from '@coingecko/cryptoformat';
  import { mapActions, mapMutations } from 'vuex';
  import ajaxCalls from '../api/ajaxCalls';
  import { makeLineChart } from '../utils/d3';
  import SingleAsset from '../components/single_asset/SingleAsset.vue';
  const { makeStockTransaction, makeCryptoTransaction } = ajaxCalls;
  export default {
    name: 'Assets',
    components: {
      SingleAsset
    },
    computed: {
      user() {
        return this.$store.state.user;
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
              element.name.toLowerCase().indexOf(searchSymbol.toLowerCase()) >
                -1
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
              element.name.toLowerCase().indexOf(searchSymbol.toLowerCase()) >
                -1
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
      portfolioSelectArray: '',
      portfolioSelectedId: '',
      transactionSelected: '',
      searchSymbol: '',
      assetSelected: '',
      quantity: ''
    }),
    watch: {
      portfolioSelectedId: function(id) {
        this.setActivePortfolio(
          this.portfolioSelectArray.find(x => x.id === id)
        );
      },
      user() {
        this.getUserPortfolios();
      }
    },
    methods: {
      ...mapActions(['setUserPortfolios']),
      ...mapMutations(['setActivePortfolio']),
      format(val) {
        return formatCurrency(val, 'USD', 'en').replace(/\.([^0]+)0+$/, '.$1');
      },
      selectAsset(assetItem, assetType) {
        if (assetType === 'stock') assetItem.isStock = true;
        if (assetType === 'crypto') assetItem.isCrypto = true;
        const increase =
          assetItem.prices[0].price -
            assetItem.prices[assetItem.prices.length - 1].price >
          0;
        assetItem.increase = increase;
        this.assetSelected = assetItem;
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
      },
      async getUserPortfolios() {
        if (this.user) await this.setUserPortfolios();
        this.portfolioSelectArray = this.$store.state.apiData.userPortfolios;
      }
    },
    created() {
      this.getUserPortfolios();
    }
  };
</script>

<style lang="scss" scoped>
  @import 'assets';
</style>
