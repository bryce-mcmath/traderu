<template>
  <main class="portfolio-container">
    <h1>Portfolio Value</h1>
    <p id="portfolioValue">{{ formattedValue }}</p>
    <v-card class="breakdown-card">
      <h2>Asset Breakdown</h2>
      <svg :id="`pie-chart-${portfolio.name}`" :width="width" :height="width" />
      <div id="pieStockInfo" v-bind:style="{ bottom: width / 2 - 50 + 'px' }">
        <h5>{{ highlightedStock }}</h5>
        <p>{{ formattedValue }}</p>
        <p>{{ stockPercent }}</p>
      </div>
    </v-card>
    <v-card class="value-card">
      <h2>Value Trajectory</h2>
      <p v-if="portfolio.values.length < 4">
        More data will be shown here after you purchase some assets and time has
        passed!
      </p>
      <svg
        :id="`line-chart-${portfolio.name}`"
        :width="width * 1.1"
        :height="width"
        v-if="portfolio.values.length > 3"
      />
    </v-card>
    <v-card class="ranking-card">
      <h2>Rank and Percentile</h2>
      <div class="ranking-card__info-container">
        <h1>#{{ rank }}</h1>
        <LiquidGauge
          class="ranking-card__gauge"
          :id="'liqgauge'"
          :percentile="percentile"
        />
      </div>
    </v-card>

    <v-btn :to="`/leaderboard/${this.portfolio.id}`"
      >Leaderboard Position</v-btn
    >

    <v-btn id="delete-portfolio" color="red" @click.stop="dialog = true"
      >Delete Portfolio</v-btn
    >

    <v-dialog v-model="dialog" max-width="290">
      <div class="spinner-container" v-if="deleting">
        <Spinner></Spinner>
      </div>
      <v-card v-if="!deleting">
        <v-card-title
          >Are you sure you want to delete this portfolio?</v-card-title
        >

        <v-card-text>Deleting a portfolio cannot be undone.</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="dialog = false"
            >Go Back</v-btn
          >

          <v-btn color="green darken-1" text @click="deletePortfolio"
            >Delete</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </main>
</template>

<script>
  import * as d3 from 'd3';
  import AjaxCalls from '../../api/ajaxCalls';
  import { mapActions } from 'vuex';
  import Spinner from '../spinner/Spinner.vue';
  import LiquidGauge from '../liquid_gauge/LiquidGauge.vue';

  export default {
    components: { Spinner, LiquidGauge },
    mounted() {
      // STOCK BREAKDOWN CHART
      this.makePie();
      //VALUE OVER TIME
      this.makeLineChart();
    },
    data() {
      return {
        dialog: false,
        stockPercent: '',
        stockValue: Math.round(this.portfolio.value * 100) / 100,
        highlightedStock: 'Total'
      };
    },
    methods: {
      deletePortfolio() {
        AjaxCalls.deletePortfolio(this.portfolio.id)
          .then(() => this.setUserPortfolios())
          .then(() => (this.dialog = false));
      },

      handleMouseOver(d, i) {
        const stockData = this.pieData[i];
        this.highlightedStock = stockData.name;
        this.stockValue = Math.round(stockData.value * 100) / 100;
        this.stockPercent =
          Math.round((stockData.value * 10000) / this.portfolio.value) / 100 +
          '%';
      },

      handleMouseOut(d, i) {
        this.highlightedStock = 'Total';
        this.stockValue = Math.round(this.portfolio.value * 100) / 100;
        this.stockPercent = '';
      },

      makePie() {
        const data = this.pieData.map(obj => Number(obj.value));
        const labels = this.pieData.map(obj => obj.symbol);

        const svg = d3.select(`#pie-chart-${this.portfolio.name}`),
          width = svg.attr('width'),
          height = svg.attr('height'),
          radius = Math.min(width, height) / 2.1,
          g = svg
            .append('g')
            .attr(
              'transform',
              'translate(' + width / 2 + ',' + height / 2 + ')'
            );

        const color = d3.scaleOrdinal([
          '#EC4F28',
          '#FCD132',
          '#B1BA68',
          '#529E7B',
          '#516564'
        ]);

        // Generate the pie
        const pie = d3.pie();

        // Generate the arcs
        const arc = d3
          .arc()
          .innerRadius(radius / 2)
          .outerRadius(radius);

        //Generate groups
        const arcs = g
          .selectAll('arc')
          .data(pie(data))
          .enter()
          .append('g')
          .attr('class', 'arc')
          .on('mouseover', this.handleMouseOver)
          .on('mouseout', this.handleMouseOut);

        //Draw arc paths
        arcs
          .append('path')
          .attr('fill', function(d, i) {
            return color(i);
          })
          .attr('d', arc);

        //Container for the gradients
        const defs = svg.append('defs');

        // Filter for the outside glow
        const filter = defs
          .append('filter')
          .attr('id', `pie-chart-${this.portfolio.name}-glow`);
        filter
          .append('feGaussianBlur')
          .attr('stdDeviation', '3.5')
          .attr('result', 'coloredBlur');
        const feMerge = filter.append('feMerge');
        feMerge.append('feMergeNode').attr('in', 'coloredBlur');
        feMerge.append('feMergeNode').attr('in', 'SourceGraphic');
        d3.select(`#pie-chart-${this.portfolio.name}`)
          .selectAll('path')
          .style('filter', `url(#pie-chart-${this.portfolio.name}-glow)`);

        arcs
          .append('text')
          .attr('transform', function(d) {
            d.innerRadius = 0;
            d.outerRadius = radius;
            return 'translate(' + arc.centroid(d) + ')';
          })
          .attr('text-anchor', 'middle')
          .text(function(d, i) {
            return labels[i];
          });
      },
      ...mapActions(['setUserPortfolios']),

      makeLineChart() {
        const rawData = this.portfolio.values;
        //Format time values to just dates for this graph
        const data = rawData.map(value => ({
          ...value,
          date: value.date_time.split('T')[0]
        }));
        const parseTime = d3.timeParse('%Y-%m-%d');

        const vis = d3.select(`#line-chart-${this.portfolio.name}`),
          WIDTH = vis.attr('width'),
          HEIGHT = vis.attr('height'),
          MARGINS = {
            top: 55,
            right: 20,
            bottom: 55,
            left: 80
          },
          xScale = d3
            .scaleTime()
            .range([MARGINS.left, WIDTH - MARGINS.right])
            .domain(d3.extent(data, d => parseTime(d.date))),
          yScale = d3
            .scaleLinear()
            .range([HEIGHT - MARGINS.top, MARGINS.bottom])
            //Going from min to max, 0 to max might be better
            .domain([
              d3.min(data, d => d.value) * 0.9,
              d3.max(data, d => d.value) * 1.1
            ]),
          xAxis = d3
            .axisBottom(xScale)
            //Ticks is a hint, not exact. Frustrating, but better to go under than over
            .ticks(4)
            .tickSizeOuter(0),
          yAxis = d3
            .axisLeft(yScale)
            .ticks(5)
            .tickSizeOuter(0);

        function makeXGridlines() {
          return d3.axisBottom(xScale);
        }

        // gridlines in y axis function
        function makeYGridlines() {
          return d3.axisLeft(yScale);
        }

        //Append and move down x axis
        vis
          .append('svg:g')
          .attr('transform', 'translate(0,' + (HEIGHT - MARGINS.bottom) + ')')
          .call(xAxis);

        //Append and move y axis past margin
        vis
          .append('svg:g')
          .attr('transform', 'translate(' + MARGINS.left + ',0)')
          .call(yAxis);

        //X axis label
        vis
          .append('text')
          .attr('class', 'axis-label')
          .attr(
            'transform',
            'translate(' + WIDTH / 2 + ' ,' + (HEIGHT + MARGINS.top) + ')'
          )
          .style('text-anchor', 'middle')
          .text('Date');

        //Y-axis label
        vis
          .append('text')
          .attr('class', 'axis-label')
          .attr('transform', 'rotate(-90)')
          .attr('y', 0)
          .attr('x', 0 - HEIGHT / 2)
          .attr('dy', '1em')
          .style('text-anchor', 'middle')
          .text('Value (USD)');

        //Add x gridlines
        vis
          .append('g')
          .attr('class', 'grid')
          .attr('transform', 'translate(0,' + (HEIGHT - MARGINS.bottom) + ')')
          .call(
            makeXGridlines()
              .tickSize(-(HEIGHT - MARGINS.bottom - MARGINS.top))
              .tickFormat('')
              .tickSizeOuter(0)
          );

        // add the Y gridlines
        vis
          .append('g')
          .attr('class', 'grid')
          .attr('transform', 'translate(' + MARGINS.left + ', 0)')
          .call(
            makeYGridlines()
              .tickSize(-(WIDTH - MARGINS.left - MARGINS.right))
              .tickFormat('')
              .tickSizeOuter(0)
          );
        //Make line
        const lineGen = d3
          .line()
          .x(d => xScale(parseTime(d.date)))
          .y(d => {
            return yScale(d.value);
          });

        vis
          .append('svg:path')
          .attr('d', lineGen(data))
          .attr('stroke', 'grey')
          .attr('stroke-width', 4)
          .attr('fill', 'none');
      }
    },

    computed: {
      rank() {
        // Ranking data is sorted so their rank is their index + 1
        const index = this.$store.state.apiData.allRankingsData.findIndex(
          x => x.portfolioId === this.portfolio.portfolioId
        );
        return index + 1;
      },
      percentile() {
        // Regular formula is P = R / (n + 1)
        // If you were in the top 2 percent, you would get 0.02 from this formula
        // We don't want a decimal, and we want to show a higher percentile the better they do
        // So formula becomes P = 100 - ( R / (n + 1) ) * 100
        const n = this.$store.state.apiData.allRankingsData.length;
        return 100 - (this.rank / (n + 1)) * 100;
      },
      formattedValue() {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(Math.round(this.portfolio.value * 100) / 100);
      },
      deleting() {
        return this.$store.state.ui.ajaxInProgress;
      },
      stocksData() {
        return this.$store.state.apiData.stocksData;
      },
      width() {
        return window.innerWidth / 1.4;
      },
      pieData() {
        const stocks = this.portfolio.stocks.filter(stock => stock);
        const stockValues = stocks.map(stock => {
          //most recent price from stock with same name
          const price = this.stocksData.find(
            nestedStock => nestedStock.name === stock.name
          ).prices[0].price;
          return {
            name: stock.name,
            symbol: stock.symbol,
            value: stock.quantity * price
          };
        });
        return [
          ...stockValues,
          { symbol: 'CASH', name: 'CASH', value: this.portfolio.cash }
        ];
      }
    },
    props: {
      portfolio: {
        type: Object,
        default: null
      }
    }
  };
</script>

<style lang="scss">
  @import 'portfolio';
</style>
