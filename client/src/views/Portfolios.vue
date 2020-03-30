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

    <v-expansion-panels
      :accordion="true"
      :focusable="true"
      :flat="true"
      :dark="dark"
      v-if="user"
    >
      <v-expansion-panel
        v-for="(portfolio) in portfolios"
        :key="portfolio.name"
      >
        <v-expansion-panel-header
          >{{ portfolio.name }}</v-expansion-panel-header
        >
        <v-expansion-panel-content>
          <Portfolio :portfolio="portfolio" />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <aside v-else class="logged-out"
      ><h2>You're not logged in!</h2>
      <p>
        You won't be able to create a portfolio until you sign up or login.
      </p>
      <div class="cta-buttons">
        <LoginDialog />
        <RegisterDialog />
      </div>
    </aside>
    <NewPortfolioForm v-if="user"></NewPortfolioForm>
  </main>
</template>

<script>
  import { mapActions } from 'vuex';
  import Portfolio from '../components/portfolio/Portfolio.vue';
  import Spinner from '../components/spinner/Spinner.vue';
  import NewPortfolioForm from '../components/new_portfolio_form/NewPortfolioForm.vue';
  import RegisterDialog from '../components/register_dialog/RegisterDialog.vue';
  import LoginDialog from '../components/login_dialog/LoginDialog.vue';

  export default {
    name: 'Portfolios',
    components: {
      Portfolio,
      NewPortfolioForm,
      Spinner,
      RegisterDialog,
      LoginDialog
    },
    methods: {
      ...mapActions(['setUserPortfolios']),
      setUpPortfoliosLocal() {
        if (this.user && this.portfolios.length <= 0) this.setUserPortfolios();
      }
    },
    watch: {
      user() {
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
