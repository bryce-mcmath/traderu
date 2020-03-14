<template>
	<div>
		<form action="#" @submit.prevent="getIssues">
			<div class="form-group">
				<input
					type="text"
					placeholder="owner/repo Name"
					v-model="repository"
					class="col-md-2 col-md-offset-5"
				/>
			</div>
		</form>
		<v-alert info v-show="loading">Loading...</v-alert>
		<ChartExample :issues="issues"></ChartExample>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
import moment from 'moment';
import ChartExample from '@/components/chart_example/ChartExample.vue';

export default Vue.extend({
	name: 'D3World',
	components: { ChartExample },
	props: {},
	data() {
		return {
			loading: false,
			issues: [],
			repository: '',
			startDate: null
		};
	},
	methods: {
		getDateRange() {
			const startDate = moment().subtract(6, 'days');
			const endDate = moment();
			const dates: object[] = [];

			while (startDate.isSameOrBefore(endDate)) {
				dates.push({
					day: startDate.format('MMM Do YY'),
					issues: 0
				});

				startDate.add(1, 'days');
			}

			return dates;
		},
		getIssues() {
			this.loading = true;
			this.startDate = moment()
				.subtract(6, 'days')
				.format('YYYY-MM-DD');

			axios
				.get(
					`https://api.github.com/search/issues?q=repo:${this.repository}+is:issue+is:open+created:>=${this.startDate}`,
					{ params: { "per_page": 100 } }
				)
				.then(response => {
					const payload = this.getDateRange();

					response.data.items.forEach(item => {
						const key = moment(item.created_at).format('MMM Do YY');
						const obj = payload.filter(o => o.day === key)[0];
						obj.issues += 1;
					});

					this.issues = payload;
				})
				.finally(() => this.loading = false);
		}
	}
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import 'd3_world';
</style>
