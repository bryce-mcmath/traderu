<template>
  <svg
    :id="id"
    width="100"
    height="100"
    viewBox="0 0 100 100"
    v-bind:class="[{ 'liquid-gauge--dark': dark }, 'liquid-gauge']"
    preserveAspectRatio="xMidYMid meet"
  />
</template>

<script lang="ts">
import * as d3 from 'd3';
import Vue from 'vue';
import { ID3Coord } from '../../utils/types';
export default Vue.extend({
  name: 'LiquidGauge',
  props: {
    id: {
      type: String,
      default: 'gauge'
    },
    percentile: {
      type: Number,
      default: 74
    }
  },
  computed: {
    dark() {
      return this.$store.state.ui.dark;
    }
  },
  data() {
    return {
      liquidGaugeSettings: {
        minValue: 0, // gauge minimum value
        maxValue: 100, // gauge maximum value
        circleThickness: 0.2, // outer circle thickness as percentage of radius
        circleFillGap: 0.05, // size of gap between outer circle and wave circle as percentage of outer circles radius
        circleColor: 'rgb(110, 194, 114)',
        waveHeight: 0.05, // wave height as percentage of radius of wave circle
        waveCount: 1, // number of full waves per width of wave circle
        waveRiseTime: 1000, // time in milliseconds for wave to rise from 0 to final height
        waveAnimateTime: 1500, // time in milliseconds for full wave to enter wave circle
        waveRise: true, // True -> rise to height, False -> fall to height
        waveHeightScaling: true, // Control wave size scaling (biggest wave at 50%)
        waveAnimate: true,
        waveColor: 'rgb(110, 194, 114)',
        waveOffset: 0, // amount to initially offset wave 0 = no offset 1 = offset of one full wave
        textVertPosition: 0.5, // height at which to display percentage text: 0 = bottom, 1 = top
        textSize: 1, // relative height of text to display in wave circle 1 = 50%
        valueCountUp: true, // If true, displayed value counts up from 0 to final value upon loading
        displayPercent: true, // If true, % symbol is displayed after value
        waveTextColor: 'rgb(173, 243, 177)', // when wave overlaps it
        textColor: 'grey'
      }
    };
  },
  methods: {
    loadLiquidFillGauge(
      elementId = this.id,
      value = this.percentile,
      config = this.liquidGaugeSettings
    ) {
      const gauge = d3.select('#' + elementId);
      const height = parseInt(gauge.style('height'));
      const width = parseInt(gauge.style('width'));
      const radius = Math.min(width, height) / 2;

      const locationX = width / 2 - radius;
      const locationY = height / 2 - radius;

      const fillPercent =
        Math.max(config.minValue, Math.min(config.maxValue, value)) /
        config.maxValue;

      let waveHeightScale;

      if (config.waveHeightScaling) {
        waveHeightScale = d3
          .scaleLinear()
          .range([0, config.waveHeight, 0])
          .domain([0, 50, 100]);
      } else {
        waveHeightScale = d3
          .scaleLinear()
          .range([config.waveHeight, config.waveHeight])
          .domain([0, 100]);
      }

      const textPixels = (config.textSize * radius) / 2;
      const textFinalValue = parseFloat(value).toFixed(1);
      const textStartValue = config.valueCountUp
        ? config.minValue
        : textFinalValue;
      const percentText = config.displayPercent ? '%' : '';
      const circleThickness = config.circleThickness * radius;
      const circleFillGap = config.circleFillGap * radius;
      const fillCircleMargin = circleThickness + circleFillGap;
      const fillCircleRadius = radius - fillCircleMargin;
      const waveHeight = fillCircleRadius * waveHeightScale(fillPercent * 100);
      const waveLength = (fillCircleRadius * 2) / config.waveCount;
      const waveClipCount = 1 + config.waveCount;
      const waveClipWidth = waveLength * waveClipCount;

      // Rounding functions so that the correct number of decimal places is always displayed as the value counts up.
      let textRounder = (value: string | number) =>
        Math.round(Number(value)).toString();

      if (
        parseFloat(textFinalValue) != parseFloat(textRounder(textFinalValue))
      ) {
        textRounder = (value: string | number): string =>
          parseFloat(value.toString()).toFixed(1);
      }

      if (
        parseFloat(textFinalValue) != parseFloat(textRounder(textFinalValue))
      ) {
        textRounder = (value: string) => parseFloat(value).toFixed(2);
      }

      // Data for building the clip wave area.
      const data = [];
      for (let i = 0; i <= 40 * waveClipCount; i++) {
        data.push({ x: i / (40 * waveClipCount), y: i / 40 });
      }

      // Scales for drawing the outer circle.
      const gaugeCircleX = d3
        .scaleLinear()
        .range([0, 2 * Math.PI])
        .domain([0, 1]);
      const gaugeCircleY = d3
        .scaleLinear()
        .range([0, radius])
        .domain([0, radius]);

      // Scales for controlling the size of the clipping path.
      const waveScaleX = d3
        .scaleLinear()
        .range([0, waveClipWidth])
        .domain([0, 1]);
      const waveScaleY = d3
        .scaleLinear()
        .range([0, waveHeight])
        .domain([0, 1]);

      // Scales for controlling the position of the clipping path.
      const waveRiseScale = d3
        .scaleLinear()
        // The clipping area size is the height of the fill circle + the wave height, so we position the clip wave
        // such that the it will overlap the fill circle at all when at 0%, and will totally cover the fill
        // circle at 100%.
        .range([
          fillCircleMargin + fillCircleRadius * 2 + waveHeight,
          fillCircleMargin - waveHeight
        ])
        .domain([0, 1]);

      const waveAnimateScale = d3
        .scaleLinear()
        .range([0, waveClipWidth - fillCircleRadius * 2]) // Push the clip area one full wave then snap back.
        .domain([0, 1]);

      // Scale for controlling the position of the text within the gauge.
      const textRiseScaleY = d3
        .scaleLinear()
        .range([
          fillCircleMargin + fillCircleRadius * 2,
          fillCircleMargin + textPixels * 0.7
        ])
        .domain([0, 1]);

      // Center the gauge within the parent SVG.
      const gaugeGroup = gauge
        .append('g')
        .attr('transform', 'translate(' + locationX + ',' + locationY + ')');

      // Draw the outer circle.
      const gaugeCircleArc = d3
        .arc()
        .startAngle(gaugeCircleX(0))
        .endAngle(gaugeCircleX(1))
        .outerRadius(gaugeCircleY(radius))
        .innerRadius(gaugeCircleY(radius - circleThickness));
      gaugeGroup
        .append('path')
        .attr('d', gaugeCircleArc)
        .style('fill', config.circleColor)
        .attr('transform', 'translate(' + radius + ',' + radius + ')');

      // Text where the wave does not overlap.
      const text1 = gaugeGroup
        .append('text')
        .text(textRounder(textStartValue) + percentText)
        .attr('class', 'liquidFillGaugeText')
        .attr('text-anchor', 'middle')
        .attr('font-size', textPixels + 'px')
        .style('fill', config.textColor)
        .attr(
          'transform',
          'translate(' +
            radius +
            ',' +
            textRiseScaleY(config.textVertPosition) +
            ')'
        );

      // The clipping wave area
      const clipArea = d3
        .area<ID3Coord>()
        .x(function(d) {
          return waveScaleX(d.x);
        })
        .y0(function(d) {
          return waveScaleY(
            Math.sin(
              Math.PI * 2 * config.waveOffset * -1 +
                Math.PI * 2 * (1 - config.waveCount) +
                d.y * 2 * Math.PI
            )
          );
        })
        .y1(function() {
          return fillCircleRadius * 2 + waveHeight;
        });

      const waveGroup = gaugeGroup
        .append('defs')
        .append('clipPath')
        .attr('id', 'clipWave' + elementId);

      const wave = waveGroup
        .append('path')
        .datum(data)
        .attr('d', clipArea)
        .attr('T', 0);

      // The inner circle with the clipping wave attached.
      const fillCircleGroup = gaugeGroup
        .append('g')
        .attr('clip-path', 'url(#clipWave' + elementId + ')');
      fillCircleGroup
        .append('circle')
        .attr('cx', radius)
        .attr('cy', radius)
        .attr('r', fillCircleRadius)
        .style('fill', config.waveColor);

      // Text where the wave does overlap.
      const text2 = fillCircleGroup
        .append('text')
        .text(textRounder(textStartValue) + percentText)
        .attr('class', 'liquidFillGaugeText')
        .attr('text-anchor', 'middle')
        .attr('font-size', textPixels + 'px')
        .style('fill', config.waveTextColor)
        .attr(
          'transform',
          'translate(' +
            radius +
            ',' +
            textRiseScaleY(config.textVertPosition) +
            ')'
        );

      // Make the value count up.
      if (config.valueCountUp) {
        const textTween = function() {
          const i = d3.interpolate(this.textContent, textFinalValue);
          return function(t) {
            this.textContent = textRounder(i(t)) + percentText;
          };
        };
        text1
          .transition()
          .duration(config.waveRiseTime)
          .tween('text', textTween);
        text2
          .transition()
          .duration(config.waveRiseTime)
          .tween('text', textTween);
      }

      // Make the wave rise. wave and waveGroup are separate so that horizontal and vertical movement can be controlled independently.
      const waveGroupXPosition =
        fillCircleMargin + fillCircleRadius * 2 - waveClipWidth;
      if (config.waveRise) {
        waveGroup
          .attr(
            'transform',
            'translate(' + waveGroupXPosition + ',' + waveRiseScale(0) + ')'
          )
          .transition()
          .duration(config.waveRiseTime)
          .attr(
            'transform',
            'translate(' +
              waveGroupXPosition +
              ',' +
              waveRiseScale(fillPercent) +
              ')'
          );
      } else {
        waveGroup.attr(
          'transform',
          'translate(' +
            waveGroupXPosition +
            ',' +
            waveRiseScale(fillPercent) +
            ')'
        );
      }

      function animateWave() {
        wave.attr(
          'transform',
          'translate(' + waveAnimateScale(Number(wave.attr('T'))) + ',0)'
        );

        wave
          .transition()
          .duration(config.waveAnimateTime * (1 - Number(wave.attr('T'))))
          .ease(d3.easeLinear)
          .attr('transform', 'translate(' + waveAnimateScale(1) + ',0)')
          .attr('T', 1)
          .on('end', function() {
            wave.attr('T', 0);
            animateWave();
          });
      }

      if (config.waveAnimate) animateWave();
    }
  },
  mounted() {
    this.loadLiquidFillGauge();
  }
});
</script>

<style lang="scss" scoped>
@import 'liquid_gauge';
</style>
