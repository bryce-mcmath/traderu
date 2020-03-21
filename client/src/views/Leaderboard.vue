<template>
  <main>
    <h1>Leaders- Individuals</h1>
    <hr />
    <div class="spinner-container" v-if="showSpinner">
      <Spinner></Spinner>
    </div>
    <v-list v-for="(portfolio, i) in rankData" :key="`${i}`">
      <LeaderboardListItem :portfolio="portfolio"></LeaderboardListItem>
    </v-list>
  </main>
</template>

<script>
import LeaderboardListItem from '../components/leaderboard_list_item/LeaderboardListItem.vue';
import Spinner from '../components/spinner/Spinner.vue';
import { mapMutations, mapActions } from 'vuex';

export default {
  name: 'Leaderboard',
  components: {
    LeaderboardListItem,
    Spinner
  },
  created() {
    this.setRankingsData();
  },
  methods: {
    ...mapActions(['setRankingsData'])
  },
  computed: {
    showSpinner() {
      return this.$store.state.ui.ajaxInProgress;
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
          rankings.find(ranking => ranking.portfolioid == this.$route.params.id)
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
h1 {
  text-align: center;
  margin-top: 10px;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
hr {
  height: 12px;
  border: 0;
  box-shadow: inset 0 12px 12px -12px rgba(0, 0, 0, 0.5);
  width: 80vw;
  margin: auto;
}
</style>