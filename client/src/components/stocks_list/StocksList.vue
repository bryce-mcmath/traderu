<template>
  <v-list disabled>
    <v-subheader>STONKS</v-subheader>
    <v-list-item-group v-model="item" color="primary">
      <v-list-item
        v-for="(item, i) in info"
        :key="i"
      >

        <v-list-item-content>
          <v-list-item-title v-text="item.name"></v-list-item-title>
          <span>Price: {{item.stockdata.data['4. close:']}}</span>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
  export default {
    name: "BottomNav",
    data(){
      return {
        info: [{
          name: "Ford",
          symbol: "F",
          stockdata: {
            time: '',
            data: {
              '4. close:': "4.2050"
            }
          }
        },
        {
          name: "Ford",
          symbol: "F",
          stockdata: {
            time: '',
            data: {
              '4. close:': "4.2050"
            }
          }
        },
        {
          name: "Ford",
          symbol: "F",
          stockdata: {
            time: '',
            data: {
              '4. close:': "4.2050"
            }
          }
        },
        {
          name: "Ford",
          symbol: "F",
          stockdata: {
            time: '',
            data: {
              '4. close:': "4.2050"
            }
          }
        }]
      }
    }
  }
</script>

<style lang="scss">
</style>