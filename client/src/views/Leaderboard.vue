<template>
  <main class="view-container">
    <h1>Leaderboard</h1>
    <hr />
    <h2>Individuals</h2>
    <div class="spinner-container" v-if="showSpinner">
      <Spinner></Spinner>
    </div>
    <v-list :dark="darken">
      <LeaderboardListItem
        :portfolio="portfolio"
        v-for="(portfolio, i) in rankData"
        :key="`${i}`"
      ></LeaderboardListItem>
    </v-list>
  </main>
</template>

<script>
  import LeaderboardListItem from '../components/leaderboard_list_item/LeaderboardListItem.vue';
  import Spinner from '../components/spinner/Spinner.vue';
  import { mapActions } from 'vuex';

  export default {
    name: 'Leaderboard',
    components: {
      LeaderboardListItem,
      Spinner
    },
    methods: {
      ...mapActions(['setRankingsData'])
    },
    computed: {
      showSpinner() {
        return this.$store.state.ui.ajaxInProgress;
      },
      darken() {
        return this.$store.state.ui.dark;
      },
      rankData() {
        if (!Array.isArray(this.$store.state.apiData.allRankingsData)) return;
        //For /:id, only return portfolios around given ID
        if (this.$route.params.id) {
          //Add on array index as rank
          const rankings = this.$store.state.apiData.allRankingsData.map(
            (rank, i) => ({ ...rank, rank: i })
          );
          //Get array index of portfolio with given ID
          const portfolioIndex = rankings.indexOf(
            rankings.find(
              ranking => ranking.portfolioid == this.$route.params.id
            )
          );
          if (portfolioIndex === 0) {
            return rankings.slice(portfolioIndex, portfolioIndex + 2);
          }
          return rankings.slice(portfolioIndex - 1, portfolioIndex + 2);
        }
        //Return all portfolios otherwise
        return this.$store.state.apiData.allRankingsData.map((rank, i) => ({
          ...rank,
          rank: i
        }));
      }
    }
  };
</script>

<style lang="scss" scoped>
  main {
    margin-bottom: 100px;
  }
  .v-list {
    background-color: rgba(0, 0, 0, 0);
    margin-bottom: 150px;
  }

  h1,
  h2 {
    text-align: center;
    margin-top: 10px;
    font-family: $primary-font;
  }

  hr {
    height: 12px;
    border: 0;
    box-shadow: inset 0 12px 12px -12px rgba(0, 0, 0, 0.5);
    width: 80vw;
    margin: auto;
  }
</style>
