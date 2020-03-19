<template>
  <v-list one-line>
    <v-subheader>STOCKS</v-subheader>
    <v-list-item-group v-model="item" color="primary">
      <v-list-item
        v-for="(item, i) in stockData"
        :key="i"
      >

        <v-list-item-content>
          <v-list-item-title v-text="item.name"></v-list-item-title>
          <v-list-item-subtitle>Price: {{item.prices[0]}}</v-list-item-subtitle>
           
          
        </v-list-item-content>
        <v-list-item-avatar>
          <v-sparkline
              :value="item.prices.reverse()"
              color="white"
              line-width="3"
              padding="16"
          ></v-sparkline>
        </v-list-item-avatar>
          
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
  export default {
    name: "BottomNav",
    props: ['stockData']
  }
</script>

<style lang="scss">
</style>