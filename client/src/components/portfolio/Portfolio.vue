<template>
	<svg :id="portfolio.name" width="200" height="200"></svg>
  <!-- <p>{{pieData}}</p> -->
</template>

<script>
  import * as d3 from 'd3';
  export default {
    mounted(){
      const data = this.pieData.map(obj => Number(obj.value));
      const labels = this.pieData.map(obj => obj.name);
      console.log(data)
    
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
      
      arcs.append("text")
      .attr("transform", function(d){
          d.innerRadius = 0;
          d.outerRadius = radius;
          return "translate(" + arc.centroid(d) + ")";
        })
        .attr("text-anchor", "middle")
        .text( function(d, i) {
          return labels[i];}
        );
      },
    methods: {

    },

    computed: {
      stocksData(){
        return this.$store.state.apiData.stocksData;
      },
      pieData(){
        //Postgress returns a null value in array_agg func, filter it out
        const stocks = this.portfolio.stock_names.filter(stock => stock.name !== null);
        const stockValues = stocks.map(stock => {
          //most recent price from stock with same name
          const price = this.stocksData.find(nestedStock => nestedStock.name === stock.name).prices[0];
          return {name: stock.name, value: stock.quantity * price}
        });
        return [...stockValues, {name:"cash", value:this.portfolio.cash}];
      }
    },
    props: ["portfolio"]
  }
</script>

<style lang="scss">
  @import 'portfolio';
</style>