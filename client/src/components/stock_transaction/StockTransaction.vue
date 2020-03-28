<template>
  <div class="stocks-container">
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
        <h4>{{ assetSelected.name }}</h4>
        <h5
          >Price:
          {{ assetSelected.prices[assetSelected.prices.length - 1].price }}</h5
        >
        <v-sparkline
          :value="
            assetSelected.prices
              .map(stockObj => stockObj.price)
              .slice()
              .reverse()
          "
          :color="darkSparkline"
          line-width="3"
          padding="16"
        ></v-sparkline>
        <div v-if="portfolioSelectArray.length">
          <h3 class="mt-4">PLACE AN ORDER</h3>
          <v-container>
            <v-row justify="space-around">
              <label>Select portfolio for transaction: </label>
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
                  v-model="purchasePrice"
                  type="number"
                  outlined
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
      </div>
      <div v-else>
        <div v-if="stocksData.length">
          <v-list :dark="dark" one-line>
            <v-list-item-group color="primary">
              <v-list-item
                v-for="(item, i) in stocksData"
                :key="i"
                @click="selectAsset(item)"
              >
                <v-list-item-content>
                  <v-list-item-title v-text="item.name"></v-list-item-title>
                  <v-list-item-subtitle
                    >Price: {{ item.prices[0].price }}</v-list-item-subtitle
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
                    :color="darkSparkline"
                    line-width="3"
                    padding="16"
                  ></v-sparkline>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </div>
        <div class="cp" v-else-if="searchSymbol">
          <h3>Search markets for symbol "{{ searchSymbol.toUpperCase() }}"</h3>
        </div>
        <div v-else>No assets to show at this time.</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapActions } from 'vuex';
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
              element.name.toLowerCase().indexOf(searchSymbol.toLowerCase()) >
                -1
            );
          });
        } else {
          return stocksData;
        }
      },
      dark() {
        return this.$store.state.ui.dark;
      },
      darkSparkline() {
        return this.$store.state.ui.dark ? 'white' : 'black';
      },
      portfolioSelectArray() {
        if (Array.isArray(this.$store.state.apiData.userPortfolios)) {
          this.setUserPortfolios();
          return [];
        } else {
          return this.$store.state.apiData.userPortfolios.portfolios;
        }
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
      assetSelected: '',
      quantity: '',
      purchasePrice: ''
    }),
    methods: {
      selectAsset(assetItem) {
        if (this.portfolioSelectArray.length) {
          this.portfolioSelectedId = this.portfolioSelectArray[0].id;
        }
        this.assetSelected = assetItem;
      },
      handleSymbolInput() {
        if (this.assetSelected) {
          this.assetSelected = '';
        }
      },
      transactionValidation() {
        let valid = true;
        const errTemplate = {
          title: 'Error',
          content: ''
        };

        if (
          !this.portfolioSelectedId &&
          !isNaN(Number(this.portfolioSelectedId))
        ) {
          valid = false;
          errTemplate.content = 'No portfolio selected';
        }

        if (!this.purchasePrice && !isNaN(Number(this.purchasePrice))) {
          valid = false;
          errTemplate.content = 'Price must be a number';
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
      submitTransaction() {
        const portfolioId = this.portfolioSelectedId;
        if (this.transactionValidation()) {
          AjaxCalls.makeTransaction(
            {
              stock: {
                symbol: this.assetSelected.symbol,
                price: String(this.purchasePrice)
              },
              type: this.transactionSelected,
              quantity: Number(this.quantity)
            },
            portfolioId
          )
            .then(res => {
              res.data === 'error'
                ? this.transactionNotification(false)
                : this.transactionNotification(true);
            })
            .catch(err => this.transactionNotification(false));
        }
      },
      transactionNotification(transactionSuccess) {
        if (transactionSuccess) {
          this.$store.commit('setDialogText', {
            title: 'Success!',
            content: 'Transaction made successfully',
            primaryBtn: 'Ok'
          });
          this.$store.commit('setShowDialog', true);
          this.purchasePrice = '';
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
      ...mapActions(['setUserPortfolios'])
    }
  });
</script>

<style lang="scss" scoped>
  @import 'stock_transaction';
</style>
