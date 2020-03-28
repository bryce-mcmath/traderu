<template>
  <main class="view-container">
    <h2>Portfolios</h2>
    <NewPortfolioForm></NewPortfolioForm>
    <div class="spinner-container" v-if="loading">
      <Spinner></Spinner>
    </div>
    <v-expansion-panels :accordion="true" :focusable="true" :flat="true" :dark="darken" v-if="!loading" v-model="activePortfolio">
      <v-expansion-panel v-for="(portfolio, i) in portfolios" :key="portfolio.name">
        <v-expansion-panel-header v-on:click="() => setActive(portfolio.name, i, portfolio.id)">{{portfolio.name}}</v-expansion-panel-header>
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
    if(!this.$store.state.apiData.userPortfolios["portfolios"])
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
    setActive(name, i, id){
      // console.log(name,i)
      if(this.activePortfolio.name === name){
        this.active = {name:null, i:-1, id: null};
      } else {
        this.active = {name, i, id};
      }
    }
  },
  computed: {
    portfolios() {
      return this.$store.state.apiData.userPortfolios['portfolios'];
    },
    // methods: {
    //   ...mapActions(['setUserPortfolios'])
    // },
    loading(){
      return this.$store.state.ui.ajaxInProgress;
    },
    activePortfolio: {
      get(){
        return this.$store.state.ui.activePortfolio.name ? this.$store.state.ui.activePortfolio.i : -1;
      },
      set(){
        this.$store.commit('setActivePortfolio', this.active)
      }
    }
  },
  data(){
    return {
      active: {name: null, i: -1, id:null}
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
  }
</style>
