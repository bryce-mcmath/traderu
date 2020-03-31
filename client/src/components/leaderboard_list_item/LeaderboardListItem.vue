<template>
  <v-card class="leaderboard__list-item">
    <v-row class="user-info row">
      <v-col :cols="2" class="user-info__rank col">#{{ portfolio.rank + 1 }}</v-col>
      <v-col :cols="7" class="user-info__names col">
        <h3 class="user-info__name col">{{ portfolio.username }}</h3>
        <h3 class="portfolio-info row">Portfolio: {{ portfolio.portfolio }}</h3>
      </v-col>
      <v-col :cols="3">
        <div class="user-info__img-container">
          <img class="avatar" :src="portfolio.avatar" />
        </div>
      </v-col>
    </v-row>
    <v-row class="performance-info row">
      <v-col
        :cols="5"
        class="performance-info__percent"
        v-bind:style="{ color: valuePercent >= 0 ? '#75ff83' : '#ff073a' }"
      >{{ valuePercent }}%</v-col>
      <v-col :cols="5" class="performance-info__value">{{ format(portfolio.value) }}</v-col>
    </v-row>
  </v-card>
</template>

<script>
import { formatCurrency } from '@coingecko/cryptoformat';

export default {
  props: ['portfolio'],
  computed: {
    valuePercent() {
      const portfolioCapital = this.$store.state.apiData
        .initialPortfolioCapital;
      //Calculate percent change formula
      const percentChange =
        ((this.portfolio.value - portfolioCapital) * 100) / portfolioCapital;
      return Math.round(percentChange * 100) / 100;
    }
  },
  methods: {
    format(val) {
      return formatCurrency(val, 'USD', 'en').replace(/\.([^0]+)0+$/, '.$1');
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'leaderboard_list_item';
</style>
