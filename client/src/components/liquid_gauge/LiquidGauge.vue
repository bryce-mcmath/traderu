<template>
  <svg
    :id="id"
    width="960"
    height="500"
    viewBox="0 0 960 500"
    preserveAspectRatio="xMidYMid meet"
  ></svg>
</template>

<script lang="ts">
  import Vue from 'vue';

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
    methods: {
      liquidGaugeSettings() {
        return {
          minValue: 0, // gauge minimum value
          maxValue: 100, // gauge maximum value
          circleThickness: 0.2, // outer circle thickness as percentage of radius
          circleFillGap: 0.05, // size of gap between outer circle and wave circle as percentage of outer circles radius
          circleColor: '#178BCA',
          waveHeight: 0.05, // wave height as percentage of radius of wave circle
          waveCount: 1, // number of full waves per width of wave circle
          waveRiseTime: 1000, // time in milliseconds for wave to rise from 0 to final height
          waveAnimateTime: 1000, // time in milliseconds for full wave to enter wave circle
          waveRise: true, // True -> rise to height, False -> fall to height
          waveHeightScaling: true, // Control wave size scaling (biggest wave at 50%)
          waveAnimate: true,
          waveColor: '#178BCA',
          waveOffset: 0, // amount to initially offset wave 0 = no offset 1 = offset of one full wave
          textVertPosition: 0.3, // height at which to display percentage text: 0 = bottom, 1 = top
          textSize: 1, // relative height of text to display in wave circle 1 = 50%
          valueCountUp: true, // If true, displayed value counts up from 0 to final value upon loading
          displayPercent: true, // If true, % symbol is displayed after value
          textColor: '#045681', // when wave does not overlap it
          waveTextColor: '#A4DBf8' // when wave overlaps it
        };
      }
    },
    mounted() {}
  });
</script>

<style lang="scss" scoped>
  @import 'liquid_gauge';
</style>
