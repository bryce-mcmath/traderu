<template>
  <v-card class="leaderboard__list-item">
    <div class="user-info row">
      <span class="user-info__rank">#{{ portfolio.rank + 1 }}</span>
      <h3 class="user-info__name">{{ portfolio.username }}</h3>
      <div class="user-info__img-container">
        <img class="avatar" :src="portfolio.avatar" />
      </div>
    </div>
    <h3 class="portfolio-info row"> Portfolio: {{ portfolio.portfolio }} </h3>
    <div class="performance-info row">
      <span
        class="performance-info__percent"
        v-bind:style="{ color: valuePercent >= 0 ? '#75ff83' : '#ff073a' }"
        >{{ valuePercent }}%</span
      >
      <span class="performance-info__value">{{ format(portfolio.value) }}</span>
    </div>
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
