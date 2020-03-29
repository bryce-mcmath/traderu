<template>
  <v-card class="leaderboard__list-item">
    <div class="user-info row">
      <span class="rank">{{ portfolio.rank + 1 }}</span>
      <span class="username">User:{{ portfolio.username }}</span>
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
        window.console.log(val);
        if (val) {
          return formatCurrency(val.toFixed());
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import 'leaderboard_list_item';
</style>
