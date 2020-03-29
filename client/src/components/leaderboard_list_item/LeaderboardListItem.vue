<template>
  <v-card class="leaderboard__list-item">
    <div class="user-info row">
      <span class="user-info__rank">#{{ portfolio.rank + 1 }}</span>
      <h3 class="user-info__name">{{ portfolio.username }}</h3>
      <div class="user-info__img-container">
        <img class="avatar" :src="portfolio.avatar" />
      </div>
    </div>
    <div class="portfolio-info row"> Portfolio: {{ portfolio.portfolio }} </div>
    <div class="performance-info row">
      <span class="percent-performance"
        >Percent Change: {{ valuePercent }}%</span
      >
      <span class="value-performance"
        >Value: {{ format(portfolio.value) }}</span
      >
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
        return formatCurrency(val, 'USD', 'en');
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import 'leaderboard_list_item';
</style>
