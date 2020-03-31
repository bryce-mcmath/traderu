<template>
  <main class="portfolio-container">
    <hr class="break" />
    <h1>Portfolio Value</h1>
    <p class="portfolio-value">{{ formattedValue }}</p>
    <v-card class="breakdown-card">
      <h2>Asset Breakdown</h2>
      <svg :id="`pie-chart-${portfolio.id}`" :width="width" :height="width" />
      <div class="pie-asset-info" v-bind:style="{ bottom: width / 2 - 50 + 'px' }">
        <h5>{{ highlightedAsset }}</h5>
        <p>{{ formattedAssetValue }}</p>
        <p>{{ assetPercent }}</p>
      </div>
    </v-card>
    <v-card class="value-card" id="chart-container">
      <h2>Value Trajectory</h2>
      <p v-if="portfolio.values.length < 4">
        More data will be shown here after you purchase some assets and time has
        passed!
      </p>
      <svg
        :id="`line-chart-${portfolio.id}`"
        :width="width * 1.1"
        :height="width"
        v-if="portfolio.values.length > 3"
      />
    </v-card>
    <v-card class="ranking-card">
      <h2>Rank and Percentile</h2>
      <div v-if="rank !== 0" class="ranking-card__info-container">
        <h1>#{{ rank }}</h1>
        <LiquidGauge
          class="ranking-card__gauge"
          :id="`gauge-${portfolio.id}`"
          :percentile="percentile"
        />
      </div>
      <div v-else class="ranking-card__info-container">
        <h3>Error retrieving rank and percentile data.</h3>
      </div>
      <v-btn class="ranking-card__btn" :to="`/leaderboard/${portfolio.id}`">Leaderboard Position</v-btn>
    </v-card>

    <v-card class="settings-card">
      <h2>Portfolio Settings</h2>

      <div class="settings-card__toggles-container">
        <h3>Public:</h3>
        <VuemorphicToggle
          :eventToEmit="'togglepublic'"
          @togglepublic="togglePublic"
          :type="'bool'"
          :active="isPublic"
          :options="{ left: '#ff073a', right: '#75ff83' }"
        />
        <h3>Notifications:</h3>
        <VuemorphicToggle
          :eventToEmit="'togglenotifications'"
          @togglenotifications="toggleNotifications"
          :type="'bool'"
          :active="user.notifications"
          :options="{ left: '#ff073a', right: '#75ff83' }"
        />
      </div>
      <div class="settings-card__btns-container">
        <v-btn class="settings-card__save-btn" color="#75ff83">Save Settings</v-btn>
        <v-btn
          class="settings-card__delete-btn"
          color="red"
          @click.stop="dialog = true"
        >Delete Portfolio</v-btn>
      </div>
    </v-card>

    <v-dialog v-model="dialog" max-width="290">
      <div class="spinner-container" v-if="deleting">
        <Spinner></Spinner>
      </div>
      <v-card v-if="!deleting">
        <v-card-title>Are you sure you want to delete this portfolio?</v-card-title>

        <v-card-text>Deleting a portfolio cannot be undone.</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="dialog = false">Go Back</v-btn>

          <v-btn color="green darken-1" text @click="deletePortfolio">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </main>
</template>

<script>
import * as d3 from 'd3';
import AjaxCalls from '../../api/ajaxCalls';
import { mapActions, mapMutations } from 'vuex';
import Spinner from '../spinner/Spinner.vue';
import LiquidGauge from '../liquid_gauge/LiquidGauge.vue';
import { makeLineChart } from '../../utils/d3';
import VuemorphicToggle from '../vuemorphic_toggle/VuemorphicToggle.vue';

export default {
  components: { Spinner, LiquidGauge, VuemorphicToggle },

  mounted() {
    // Asset Breakdown
    this.makePie();
    const data = this.portfolio.values
      .map(dataPoint => ({
        date: dataPoint.date_time.split('T')[0],
        value: dataPoint.value
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    const dataOptions = {
      timeParseString: '%Y-%m-%d',
      data
    };
    makeLineChart(
      this.width,
      this.width * 1.1,
      { top: 55, left: 70, bottom: 55, right: 10 },
      dataOptions,
      `#line-chart-${this.portfolio.id}`,
      'value',
      true
    );
  },

  props: {
    portfolio: {
      type: Object,
      default: null
    }
  },

  data() {
    return {
      dialog: false,
      assetPercent: '',
      assetValue: this.portfolio.value,
      highlightedAsset: 'Total',
      isPublic: false
    };
  },

  computed: {
    user: {
      get() {
        return this.$store.state.user;
      },
      set(val) {
        this.setUser(val);
      }
    },
    rank() {
      // Ranking data is sorted so their rank is their index + 1
      const index = this.$store.state.apiData.allRankingsData.findIndex(
        x => x.portfolioid === this.portfolio.id
      );
      return index + 1;
    },

    percentile() {
      // Regular formula is P = R / (n + 1)
      // If you were in the top 2 percent, you would get 0.02 from this formula
      // We don't want a decimal, and we want to show a higher percentile the better they do
      // So formula becomes P = 100 - ( R / (n + 1) ) * 100
      // We are also only taking one decimal place, hence the toFixed and parseFloat
      const n = this.$store.state.apiData.allRankingsData.length;
      return parseFloat((100 - (this.rank / (n + 1)) * 100).toFixed(1));
    },

    formattedValue() {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(Math.round(this.portfolio.value * 100) / 100);
    },

    formattedAssetValue() {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(Math.round(this.assetValue * 100) / 100);
    },

    deleting() {
      return this.$store.state.ui.ajaxInProgress;
    },

    stocksData() {
      return this.$store.state.apiData.stocksData;
    },

    cryptosData() {
      return this.$store.state.apiData.cryptosData;
    },

    width() {
      return window.innerWidth / 1.4;
    },

    pieData() {
      const cryptos = this.getAssetData(
        this.portfolio.cryptos,
        this.cryptosData
      );
      const stocks = this.getAssetData(this.portfolio.stocks, this.stocksData);
      return [
        ...stocks,
        ...cryptos,
        { symbol: 'CASH', name: 'CASH', value: this.portfolio.cash }
      ];
    }
  },

  methods: {
    ...mapActions(['setUserPortfolios']),
    ...mapMutations(['setUser']),
    toggleNotifications() {
      this.user = { ...this.user, notifications: !this.user.notifications };
    },
    togglePublic() {
      this.isPublic = !this.isPublic;
    },
    deletePortfolio() {
      AjaxCalls.deletePortfolio(this.portfolio.id)
        .then(() => this.setUserPortfolios())
        .then(() => (this.dialog = false));
    },

    getAssetData(assets, assetsData) {
      assets = assets.filter(asset => asset && asset.quantity);
      const assetValues = assets.map(asset => {
        //most recent price from stock with same name
        const price = assetsData.find(
          foundAsset => foundAsset.name === asset.name
        ).prices[0].price;
        return {
          name: asset.name,
          symbol: asset.symbol,
          value: asset.quantity * price
        };
      });
      return assetValues;
    },

    handleMouseOver(d, i) {
      const assetData = this.pieData[i];
      this.highlightedAsset = assetData.name;
      this.assetValue = Math.round(assetData.value * 100) / 100;
      this.assetPercent =
        Math.round((assetData.value * 10000) / this.portfolio.value) / 100 +
        '%';
    },

    handleMouseOut() {
      this.highlightedAsset = 'Total';
      this.assetValue = Math.round(this.portfolio.value * 100) / 100;
      this.assetPercent = '';
    },

    makePie() {
      const data = this.pieData.map(obj => Number(obj.value));
      const labels = this.pieData.map(obj => obj.symbol);

      const svg = d3.select(`#pie-chart-${this.portfolio.id}`),
        width = svg.attr('width'),
        height = svg.attr('height'),
        radius = Math.min(width, height) / 2.1,
        g = svg
          .append('g')
          .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

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
        .attr('id', `pie-chart-${this.portfolio.id}-glow`);
      filter
        .append('feGaussianBlur')
        .attr('stdDeviation', '3.5')
        .attr('result', 'coloredBlur');
      const feMerge = filter.append('feMerge');
      feMerge.append('feMergeNode').attr('in', 'coloredBlur');
      feMerge.append('feMergeNode').attr('in', 'SourceGraphic');
      d3.select(`#pie-chart-${this.portfolio.id}`)
        .selectAll('path')
        .style('filter', `url(#pie-chart-${this.portfolio.id}-glow)`);

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
    }
  }
};
</script>

<style lang="scss">
@import 'portfolio';
</style>
