<template>
  <v-bottom-navigation
    v-bind:class="{ 'v-bottom-navigation--dark': dark }"
    :dark="dark"
    :fixed="true"
  >
    <FooterNavButton
      label="Info"
      link="/"
      icon="fa fa-info"
      :dark="dark"
      :active="tab === 'info'"
    />
    <FooterNavButton
      label="Trade"
      link="/transaction"
      icon="fas fa-balance-scale-left"
      :dark="dark"
      :active="tab === 'trade'"
    />
    <FooterNavButton
      label="Portfolios"
      link="/portfolios"
      icon="fas fa-chart-line"
      :dark="dark"
      :active="tab === 'portfolios'"
    />
    <FooterNavButton
      label="Leaderboard"
      link="/leaderboard"
      icon="fas fa-trophy"
      :dark="dark"
      :active="tab === 'leaderboard'"
    />
  </v-bottom-navigation>
</template>

<script>
  import FooterNavButton from '@/components/footer_nav_button/FooterNavButton.vue';

  export default {
    name: 'FooterNav',
    components: {
      FooterNavButton
    },
    props: {
      dark: {
        type: Boolean,
        default: false
      },
      tab: {
        type: String,
        default: 'info'
      }
    }
  };
</script>

<style scoped lang="scss">
  @import 'footer_nav';
</style>
