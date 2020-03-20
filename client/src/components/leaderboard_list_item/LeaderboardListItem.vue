<template>
  <div class="container">
    <div class="user-info row">
      <span class="rank">{{rank + 1}}</span>
      <span class="username">User:{{portfolio.username}}</span>
      <img class="avatar" :src="portfolio.avatar">
      <span></span>
    </div>
    <div class="portfolio-info row">
      Portfolio: {{portfolio.portfolio}}
    </div>
    <div class="performance-info row">
      <span class="percent-performance">Percent Change: {{valuePercent}}%</span>
      <span class="value-performance">Value: ${{portfolio.value}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['portfolio', 'rank'],
    computed: {
      valuePercent(){
        return (this.portfolio.value - 100000) / 1000
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import 'leaderboard_list_item'
</style>