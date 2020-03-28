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
      v-model="activePortfolio"
    >
      <v-expansion-panel v-for="(portfolio, i) in portfolios" :key="portfolio.name">
        <v-expansion-panel-header
          v-on:click="() => setActive(portfolio.name, i, portfolio.id)"
        >{{portfolio.name}}</v-expansion-panel-header>
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
    //If user portfolios not loaded yet, load them
    if (!this.$store.state.apiData.userPortfolios) this.setUserPortfolios();
  },
  props: {
    dark: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    ...mapActions(['setUserPortfolios']),
    setActive(name, i, id) {
      // @TODO: expansion panels are being a real pain, they
      // aren't playing nice with vuex at all, this
      // is a mess. It works, but should Probably switch to something else
      if (this.active.name === name) {
        this.activePortfolio = { name: null, i: -1, id: null };
        this.active = { name: null, i: -1, id: null };
      } else {
        this.activePortfolio = { name, i, id };
        this.active = { name, i, id };
      }
    }
  },
  computed: {
    darken() {
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
          ? this.$store.state.ui.activePortfolio.i
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
        : { name: null, i: -1, id: null }
    };
  }
};
</script>

<style lang="scss">
@import 'portfolios';
</style>
