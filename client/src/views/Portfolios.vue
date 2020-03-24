<template>
  <main class="view-container--alt">
    <h2>Portfolios</h2>
    <NewPortfolioForm></NewPortfolioForm>
    <v-expansion-panels :accordion="true" :focusable="true" :flat="true" :dark="dark">
      <v-expansion-panel
        v-for="(portfolio) in portfolios"
        :key="portfolio.name"
      >
        <v-expansion-panel-header>{{portfolio.name}}</v-expansion-panel-header>
        <v-expansion-panel-content>
          <Portfolio :portfolio="portfolio"/>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </main>
</template>

<script>
  import { mapActions } from 'vuex';
  import Portfolio from '../components/portfolio/Portfolio.vue'
  import NewPortfolioForm from '../components/new_portfolio_form/NewPortfolioForm.vue'

  export default {
    name: 'Portfolios',
    components: {Portfolio, NewPortfolioForm},
    created(){
      //@TODO: think of better logic for this
      //Don't want to reload if current,
      //But need to make sure new portfolios get added
      this.setUserPortfolios();
    },
    props: {
      dark: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      ...mapActions(['setUserPortfolios']),
    },
    computed: {
      portfolios(){
        return this.$store.state.apiData.userPortfolios["portfolios"];
      },
    }
  };
</script>

<style scoped>
  .view-container--alt{
    margin-bottom: 150px !important;
  }
  .v-expansion-panels{
    margin-top: 20px;
  }
</style>
