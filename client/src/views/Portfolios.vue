<template>
  <main
    v-bind:class="[
      'view-container portfolios-container',
      { 'portfolios-container--dark': dark }
    ]"
  >
    <h2>Portfolios</h2>
    <hr class="break" />
    <div class="spinner-container" v-if="loading">
      <Spinner></Spinner>
    </div>
    <div v-else-if="!user" class="mt-2 mb-2">
      <h3>You are not logged into an account.</h3>
      <h3>Log in to view and create portfolios.</h3>
    </div>
    <div v-else>
      <v-expansion-panels
        :accordion="true"
        :focusable="true"
        :flat="true"
        :dark="dark"
        v-model="activePortfolio"
      >
        <v-expansion-panel
          v-for="(portfolio, i) in portfolios"
          :key="portfolio.name"
        >
          <v-expansion-panel-header
            v-on:click="() => setActive(portfolio.name, i, portfolio.id)"
            >{{ portfolio.name }}</v-expansion-panel-header
          >
          <v-expansion-panel-content>
            <Portfolio :portfolio="portfolio" />
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <NewPortfolioForm></NewPortfolioForm>
    </div>
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
    methods: {
      ...mapActions(['setUserPortfolios']),
      setActive(name, panelIndex, id) {
        // @TODO: expansion panels are being a real pain, they
        // aren't playing nice with vuex at all, this
        // is a mess. It works, but should Probably switch to something else
        if (this.active.name === name) {
          this.activePortfolio = { name: null, panelIndex: -1, id: null };
          this.active = { name: null, panelIndex: -1, id: null };
        } else {
          this.activePortfolio = { name, panelIndex, id };
          this.active = { name, panelIndex, id };
        }
      },
      setUpPortfoliosLocal() {
        if (this.user && this.portfolios.length <= 0) this.setUserPortfolios();
      }
    },
    watch: {
      user(val) {
        this.setUpPortfoliosLocal();
      }
    },
    computed: {
      user() {
        return this.$store.state.user;
      },
      dark() {
        return this.$store.state.ui.dark;
      },
      portfolios() {
        return this.$store.state.apiData.userPortfolios;
      },
      loading() {
        return this.$store.state.ui.ajaxInProgress;
      },
      activePortfolio: {
        get() {
          return this.$store.state.ui.activePortfolio.name
            ? this.$store.state.ui.activePortfolio.panelIndex
            : -1;
        },
        set() {
          this.$store.commit('setActivePortfolio', this.active);
        }
      }
    },
    data() {
      return {
        // active: {name: null, i: -1, id:null}
        active: this.$store.state.ui.activePortfolio.name
          ? this.$store.state.ui.activePortfolio
          : { name: null, panelIndex: -1, id: null }
      };
    },
    created() {
      // If no portfolios loaded, load em
      this.setUpPortfoliosLocal();
    }
  };
</script>

<style lang="scss">
  @import 'portfolios';
</style>
