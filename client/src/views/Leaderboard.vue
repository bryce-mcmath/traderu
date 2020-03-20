<template>
	<main>
		<h1>Leaders- Individuals</h1>
		<hr>
		<div class="spinner-container" v-if="showSpinner">
			<Spinner></Spinner>
		</div>
		<v-list v-for="(portfolio, i) in rankData" :key="`${i}`">
			<LeaderboardListItem :portfolio="portfolio" :rank="i"></LeaderboardListItem>
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
	created(){
		this.setRankingsData();
	},
	methods: {
	...mapActions(['setRankingsData'])
	},
	computed: {
		showSpinner(){
			return this.$store.state.ui.ajaxInProgress;
		},
		rankData(){
			return this.$store.state.apiData.rankingsData;
		}
	}
};
</script>

<style lang="scss" scoped>
  main{
		margin-bottom: 100px;
	}
	h1{
		text-align: center;
		margin-top: 10px;
		font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif
	}
	hr {
    height: 12px;
    border: 0;
		box-shadow: inset 0 12px 12px -12px rgba(0, 0, 0, 0.5);
		width: 80vw;
		margin:auto;
}
</style>