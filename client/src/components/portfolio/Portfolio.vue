<template>
	<svg :id="portfolio.name" width="200" height="200"></svg>
</template>

<script>
  import * as d3 from 'd3';
  export default {
    mounted(){
const data = [2, 4, 8, 10];

    const svg = d3.select(`#${this.portfolio.name}`),
        width = svg.attr("width"),
        height = svg.attr("height"),
        radius = Math.min(width, height) / 2,
        g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    const color = d3.scaleOrdinal(['#4daf4a','#377eb8','#ff7f00','#984ea3','#e41a1c']);

    // Generate the pie
    const pie = d3.pie();

    // Generate the arcs
    const arc = d3.arc()
                .innerRadius(0)
                .outerRadius(radius);

    //Generate groups
    const arcs = g.selectAll("arc")
                .data(pie(data))
                .enter()
                .append("g")
                .attr("class", "arc")

    //Draw arc paths
    arcs.append("path")
        .attr("fill", function(d, i) {
            return color(i);
        })
        .attr("d", arc);
    },
    methods: {

    },
    computed: {

    },
    props: ["portfolio"]
  }
</script>

<style lang="scss">
  @import 'portfolio';
</style>