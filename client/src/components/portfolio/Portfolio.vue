<template>
  <main class="portfolio-container">
    <h2>Stocks Breakdown</h2>
  	<svg :id="`pie-chart-${portfolio.name}`" :width="width" :height="width"></svg>
    <h2>Portfolio value</h2>
    <svg :id="`line-chart-${portfolio.name}`" :width="width" :height="width"></svg>
    <v-btn id="delete-portfolio"
      color="red"
      @click.stop="dialog = true"
    >
      Delete Portfolio
    </v-btn>

    <v-dialog
      v-model="dialog"
      max-width="290"
    >
      <div class="spinner-container" v-if="deleting">
        <Spinner></Spinner>
      </div>
      <v-card v-if="!deleting">
        <v-card-title>Are you sure you want to delete this portfolio?</v-card-title>

        <v-card-text>
          Deleting a portfolio cannot be undone.
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            Go Back
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="deletePortfolio"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </main>
</template>

<script>
  import * as d3 from 'd3';
  import AjaxCalls from '../../api/ajaxCalls';
  import { mapActions } from 'vuex';
  import Spinner from '../spinner/Spinner.vue'

  export default {
    components: {Spinner},
    mounted(){
      // STOCK BREAKDOWN CHART
      this.makePie();
      //VALUE OVER TIME 
      this.makeLineChart();
    },
      methods: {
        deletePortfolio(){
          AjaxCalls.deletePortfolio(this.portfolio.id)
          .then(() => this.setUserPortfolios())
          .then(() => this.dialog = false)
        },
        makePie(){
        const data = this.pieData.map(obj => Number(obj.value));
        const labels = this.pieData.map(obj => obj.name);
      
        const svg = d3.select(`#pie-chart-${this.portfolio.name}`),
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
        ...mapActions(['setUserPortfolios']),
        makeLineChart(){
          const rawData = this.portfolio.values;
          //Format time values to just dates for this graph
          const data = rawData.map(value => ({...value, date: value.date_time.split("T")[0]})) 
          const parseTime = d3.timeParse("%Y-%m-%d");

          const vis = d3.select(`#line-chart-${this.portfolio.name}`),
            WIDTH = vis.attr('width'),
            HEIGHT = vis.attr('height'),
            MARGINS = {
            top: 20,
            right: 20,
            bottom: 20,
            left: 55},
            xScale = d3.scaleTime()
              .range([MARGINS.left, WIDTH - MARGINS.right])
              .domain(d3.extent(data, d =>  parseTime(d.date))),
            yScale = d3.scaleLinear()
              .range([HEIGHT - MARGINS.top, MARGINS.bottom])
              //Going from min to max, 0 to max might be better
              .domain([d3.min(data, d => d.value) * 0.9, d3.max(data, d => d.value) * 1.1]),
            xAxis = d3.axisBottom(xScale)
              // @TODO this will make 5 ticks even if only one datapoint.
              //Maybe use v-if to only display values chart for portfolios > x days old 
              .ticks(5),
            yAxis = d3.axisLeft(yScale);
          
          //Append and move down x axis
          vis.append("svg:g")
            .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
            .call(xAxis);
          
          //Append and move y axis past margin
          vis.append("svg:g")
            .attr("transform", "translate(" + (MARGINS.left) + ",0)")
            .call(yAxis);

          //Make line
          const lineGen = d3.line()
            .x(d => xScale(parseTime(d.date)))
            .y(d => {return yScale(d.value)});
        
          vis.append('svg:path')
            .attr('d', lineGen(data))
            .attr('stroke', 'green')
            .attr('stroke-width', 2)
            .attr('fill', 'none');
        }
    },

    computed: {
      deleting(){
        return this.$store.state.ui.ajaxInProgress;
      },
      stocksData(){
        return this.$store.state.apiData.stocksData;
      },
      width(){
        return window.innerWidth / 1.5;
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
    data () {
      return {
        dialog: false,
      }
    },
    props: ["portfolio"]
  }
</script>

<style lang="scss">
  @import 'portfolio';
</style>