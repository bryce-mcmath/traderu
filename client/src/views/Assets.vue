<template>
  <main class="view-container">
    <div class="stocks-container">
      <input
        class="symbol-text-input mt-2"
        type="text"
        v-model="searchSymbol"
        placeholder="Filter by symbol or name..."
        @input="handleSymbolInput"
        @click="handleSymbolInput"
      />
      <div class="assets-container">
        <div v-if="assetSelected">
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
            >{{
              format(
                assetSelected.prices[assetSelected.prices.length - 1].price
              )
            }}</h5
          >
          <v-sparkline
            :value="
              assetSelected.prices
                .map(stockObj => stockObj.price)
                .slice()
                .reverse()
            "
            v-bind:color="
              assetSelected.prices[0].price -
                assetSelected.prices[assetSelected.prices.length - 1].price >
              0
                ? '#75ff83'
                : '#ff073a'
            "
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
                <v-btn class="mt-8" @click="submitTransaction"
                  >Place Order</v-btn
                >
              </v-col>
            </v-row>
          </v-container>
        </div>
        <div v-else>
          <div v-if="stocksData.length || cryptosData.length">
            <div v-if="stocksData.length">
              <h3 class="asset-title">Stocks</h3>
              <v-list :dark="dark" one-line>
                <v-list-item-group color="primary">
                  <v-list-item
                    v-for="(item, i) in stocksData"
                    :key="i"
                    @click="selectAsset(item)"
                  >
                    <v-list-item-content>
                      <v-list-item-title v-text="item.name"></v-list-item-title>
                      {{ showDifference(item) }}
                      <v-list-item-subtitle
                        v-bind:style="{
                          color:
                            item.prices[0].price -
                              item.prices[item.prices.length - 1].price >
                            0
                              ? '#75ff83'
                              : '#ff073a'
                        }"
                        >{{
                          format(item.prices[0].price)
                        }}</v-list-item-subtitle
                      >
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
                    @click="selectAsset(item)"
                  >
                    <v-list-item-content>
                      <v-list-item-title v-text="item.name"></v-list-item-title>
                      {{ showDifference(item) }}
                      <v-list-item-subtitle
                        v-bind:style="{
                          color:
                            item.prices[0].price -
                              item.prices[item.prices.length - 1].price >
                            0
                              ? '#75ff83'
                              : '#ff073a'
                        }"
                        >{{
                          format(item.prices[0].price)
                        }}</v-list-item-subtitle
                      >
                    </v-list-item-content>
                    <v-list-item-content>
                      <v-sparkline
                        :value="
                          item.prices
                            .map(cryptoObj => cryptoObj.price)
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
          </div>
          <div class="cp" v-else-if="searchSymbol">
            <h3>No results for symbol "{{ searchSymbol.toUpperCase() }}"</h3>
          </div>
          <div v-else
            >No stocks to show at this time. Once we've added some we'll display
            the data here.</div
          >
        </div>
      </div>
    </div>
  </main>
</template>

<script>
  import AjaxCalls from '@/api/ajaxCalls';
  import { formatCurrency } from '@coingecko/cryptoformat';
  export default {
    name: 'Assets',
    computed: {
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
      },
      portfolioId() {
        if (this.$store.state.user) {
          return this.$store.state.user.id;
        } else {
          return '00';
        }
      }
    },
    data: () => ({
      transactionsSelectArray: [
        { text: 'Buy', value: 'buy' },
        { text: 'Sell', value: 'sell' }
      ],
      transactionSelected: '',
      searchSymbol: '',
      assetSelected: '',
      quantity: ''
    }),
    methods: {
      format(val) {
        return formatCurrency(val, 'USD', 'en').replace(
          /^(\d+\.\d*?[1-9])0+$/,
          ''
        );
      },
      showDifference(asset) {
        const diff =
          asset.prices[0].price - asset.prices[asset.prices.length - 1].price;
        window.console.log(`Diff for ${asset.name}: `, diff);
      },
      selectAsset(assetItem) {
        const increase =
          assetItem.prices[0] - assetItem.prices[assetItem.prices.length - 1] >
          0;
        assetItem.highlight = increase ? '#75ff83' : '#ff073a';
        this.assetSelected = assetItem;
      },
      handleSymbolInput() {
        if (this.assetSelected) {
          this.assetSelected = '';
        }
      },
      submitTransaction() {
        // @TODO: Integrate crypto here after Wilson finishes up
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
          .then(res => window.console.log(res))
          .catch(err => window.console.log(err));
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import 'assets';
</style>
