<template>
  <v-list
    v-bind:class="['info-list', { 'info-list--dark': dark }]"
    :dark="dark"
  >
    <v-card class="info-list__card">
      <h2><i class="fas fa-user-plus"></i>Register for free</h2>
      <p>Create an account for free today and start trading instantly.</p>
    </v-card>
    <v-card class="info-list__card">
      <h2><i class="fa fa-chart-line"></i>Create a portfolio</h2>
      <p>Create one or more portfolios to see what could have been.</p>
    </v-card>
    <v-card class="info-list__card">
      <h2><i class="fas fa-balance-scale-left"></i>Trade assets</h2>
      <p>
        Choose from over a hundred stocks and cryptocurrencies. With more on the
        way!
      </p>
    </v-card>
    <v-card class="info-list__card">
      <h2><i class="fas fa-trophy"></i>Compete with friends</h2>
      <p>
        Track your portfolios performance against others.
      </p>
    </v-card>
  </v-list>
</template>

<script>
  export default {
    name: 'InfoList',
    computed: {
      dark() {
        return this.$store.state.ui.dark;
      }
    }
  };
</script>

<style scoped lang="scss">
  @import 'info_list';
</style>
