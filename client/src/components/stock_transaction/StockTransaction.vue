<template>
  <div class="stocks-container">
    <h1>Select a Stock</h1>
    <v-divider class="mt-2 mb-3"></v-divider>
    <h3>STOCK SYMBOL</h3>
    <v-text-field rounded background-color="white" outlined></v-text-field>
    <div class="placeholder-graph rb"></div>
    <h3 class="mt-4">PLACE AN ORDER</h3>
    <v-container>
      <v-row justify="space-around">
        <v-col>
          <v-text-field class="rb" label="price" background-color="white" outlined></v-text-field>
        </v-col>
        <v-col>
          <v-select class="rb" :items="items" background-color="white" label="Transaction" outlined></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field class="rb" disabled label="duration" background-color="white" outlined></v-text-field>
        </v-col>
        <v-col>
          <v-btn class="rb">Place Order</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'StockTransaction',
  computed: {
    darkMode() {
      return this.$store.state.ui.dark;
    }
  },
  data: () => ({
    items: [
      { text: 'Buy', value: 'buy' },
      { text: 'Sell', value: 'sell' }
    ]
  })
});
</script>

<style lang="scss" scoped>
@import 'stock_transaction';
</style>