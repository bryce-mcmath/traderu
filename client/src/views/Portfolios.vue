<template>
  <main class="view-container">
    <h2>Portfolios</h2>
    <NewPortfolioForm></NewPortfolioForm>
    <div class="spinner-container" v-if="loading">
      <Spinner></Spinner>
    </div>
    <v-expansion-panels
      :accordion="true"
      :focusable="true"
      :flat="true"
      :dark="darken"
      v-if="!loading"
    >
      <v-expansion-panel v-for="portfolio in portfolios" :key="portfolio.name">
        <v-expansion-panel-header>{{
          portfolio.name
        }}</v-expansion-panel-header>
        <v-expansion-panel-content>
          <Portfolio :portfolio="portfolio" />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </main>
</template>

<script>
  import { mapActions } from 'vuex';
  import Portfolio from '../components/portfolio/Portfolio.vue';
  import Spinner from '../components/spinner/Spinner.vue';
  import NewPortfolioForm from '../components/new_portfolio_form/NewPortfolioForm.vue';

  export default {
    name: 'Portfolios',
    components: { Portfolio, NewPortfolioForm, Spinner },
    created() {
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
      ...mapActions(['setUserPortfolios'])
    },
    computed: {
      portfolios() {
        return this.$store.state.apiData.userPortfolios['portfolios'];
      },
      darken() {
        return this.$store.state.ui.dark;
      },
      loading() {
        return this.$store.state.ui.ajaxInProgress;
      }
    }
  };
</script>

<style lang="scss">
  .v-expansion-panel {
    margin-top: 20px;
  }
  .spinner-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 160px;
  }
  .v-expansion-panel-content__wrap {
    width: 100%;
    margin: 0;
    padding: 0;
    background: black;
  }
</style>
