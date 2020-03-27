<template>
  <div class="container">
    <div class="user-info row">
      <span class="rank">{{ portfolio.rank + 1 }}</span>
      <span class="username">User:{{ portfolio.username }}</span>
      <img class="avatar" :src="portfolio.avatar" />
      <span></span>
    </div>
    <div class="portfolio-info row"> Portfolio: {{ portfolio.portfolio }} </div>
    <div class="performance-info row">
      <span class="percent-performance"
        >Percent Change: {{ valuePercent }}%</span
      >
      <span class="value-performance">Value: ${{ Math.round(portfolio.value * 100) / 100 }}</span>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['portfolio'],
    computed: {
      valuePercent() {
        const portfolioCapital = this.$store.state.apiData
          .initialPortfolioCapital;
        //Calculate percent change formula
        const percentChange = ((this.portfolio.value - portfolioCapital) * 100) / portfolioCapital
        return Math.round(percentChange * 100) / 100;
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import 'leaderboard_list_item';
</style>
