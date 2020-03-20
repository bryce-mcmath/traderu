<template>
	<div>
		<svg />
	</div>
</template>

<script lang="ts">
	import Vue from 'vue';
	import * as d3 from 'd3';
	import _ from 'lodash';

	export default Vue.extend({
		props: ['issues'],
		data() {
			return {
				chart: null
			};
		},
		watch: {
			issues(val) {
				if (this.chart != null) this.chart.remove();
				this.renderChart(val);
			}
		},
		methods: {
			renderChart(issuesVal) {
				const margin = 60;
				const svgWidth = 1000;
				const svgHeight = 600;
				const chartWidth = 1000 - 2 * margin;
				const chartHeight = 600 - 2 * margin;

				const svg = d3
					.select('svg')
					.attr('width', svgWidth)
					.attr('height', svgHeight);

				this.chart = svg
					.append('g')
					.attr('transform', `translate(${margin}, ${margin})`);

				const yScale = d3
					.scaleLinear()
					.range([chartHeight, 0])
					.domain([0, _.maxBy(issuesVal, 'issues').issues]);

				this.chart
					.append('g')
					.call(d3.axisLeft(yScale).ticks(_.maxBy(issuesVal, 'issues').issues));

				const xScale = d3
					.scaleBand()
					.range([0, chartWidth])
					.domain(issuesVal.map(s => s.day))
					.padding(0.2);

				this.chart
					.append('g')
					.attr('transform', `translate(0, ${chartHeight})`)
					.call(d3.axisBottom(xScale));

				const barGroups = this.chart
					.selectAll('rect')
					.data(issuesVal)
					.enter();

				barGroups
					.append('rect')
					.attr('class', 'bar')
					.attr('x', (g: any) => xScale(g.day))
					.attr('y', (g: any) => yScale(g.issues))
					.attr('height', (g: any) => chartHeight - yScale(g.issues))
					.attr('width', xScale.bandwidth())
					.on('mouseenter', function(actual, i) {
						d3.select(this)
							.transition()
							.duration(300)
							.attr('opacity', 0.6)
							.attr('x', (a: any) => xScale(a.day) - 5)
							.attr('width', xScale.bandwidth() + 10);
						barGroups
							.append('text')
							.attr('class', 'value')
							.attr('x', (a: any) => xScale(a.day) + xScale.bandwidth() / 2)
							.attr('y', (a: any) => yScale(a.issues) - 20)
							.attr('text-anchor', 'middle')
							.text((a: any, idx) => {
								return idx !== i ? '' : `${a.issues} issues`;
							});
					})
					.on('mouseleave', function() {
						d3.selectAll('.issues').attr('opacity', 1);

						d3.select(this)
							.transition()
							.duration(300)
							.attr('opacity', 1)
							.attr('x', (a: any) => xScale(a.day))
							.attr('width', xScale.bandwidth());

						svg.selectAll('.value').remove();
					});
			}
		}
	});
</script>

<style scoped style="scss"></style>
