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
      :active="tabSelected === 'info'"
    />
    <FooterNavButton
      label="Assets"
      link="/assets"
      icon="fas fa-balance-scale-left"
      :dark="dark"
      :active="tabSelected === 'assets'"
    />
    <FooterNavButton
      label="Portfolios"
      link="/portfolios"
      icon="fas fa-chart-line"
      :dark="dark"
      :active="tabSelected === 'portfolios'"
    />
    <FooterNavButton
      label="Leaderboard"
      link="/leaderboard"
      icon="fas fa-trophy"
      :dark="dark"
      :active="tabSelected === 'leaderboard'"
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
    computed: {
      dark() {
        return this.$store.state.ui.dark;
      },
      tabSelected() {
        const route = this.$route.path.toLowerCase();
        if (route.includes('assets')) return 'assets';
        if (route.includes('portfolios')) return 'portfolios';
        if (route.includes('leaderboard')) return 'leaderboard';
        return 'info';
      }
    }
  };
</script>

<style scoped lang="scss">
  @import 'footer_nav';
</style>
