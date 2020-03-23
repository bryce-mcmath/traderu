<template>
  <main>
  	<svg :id="portfolio.name" width="200" height="200"></svg>
    <svg id="visualisation" width="1000" height="500"></svg>
  </main>
</template>

<script>
  import * as d3 from 'd3';
  export default {
    mounted(){
      // STOCK BREAKDOWN CHART
      this.makePie();
      //VALUE OVER TIME 
      const data = [{
        "sale": "202",
        "year": "00"
         }, {
        "sale": "215",
        "year": "01"
        }, {
        "sale": "179",
        "year": "02"
        }, {
        "sale": "199",
        "year": "03"
        }, {
        "sale": "134",
        "year": "03"
         }, {
        "sale": "176",
        "year": "10"
        }];
      const vis = d3.select("#visualisation"),
        WIDTH = 300,
        HEIGHT = 500,
        MARGINS = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 40},
        xScale = d3.scaleLinear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([0,10]),
        yScale = d3.scaleLinear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([134,215]),
        xAxis = d3.axisBottom(xScale),
        yAxis = d3.axisLeft(yScale);
      
      vis.append("svg:g").call(xAxis)
        .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
        .call(xAxis);

      vis.append("svg:g")
        .attr("transform", "translate(" + (MARGINS.left) + ",0)")
        .call(yAxis);

      const lineGen = d3.line()
        .x(function(d) {
          return xScale(d.year);
        })
        .y(function(d) {
          return yScale(d.sale);
        });
     
      vis.append('svg:path')
        .attr('d', lineGen(data))
        .attr('stroke', 'green')
        .attr('stroke-width', 2)
        .attr('fill', 'none');

    },
      methods: {
        makePie(){
        const data = this.pieData.map(obj => Number(obj.value));
        const labels = this.pieData.map(obj => obj.name);
      
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
        }
    },

    computed: {
      stocksData(){
        return this.$store.state.apiData.stocksData;
      },
      pieData(){
        const stocks = this.portfolio.stocks.filter(stock => stock);
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