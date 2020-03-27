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
    methods: {},
    mounted() {}
  });
</script>

<style lang="scss" scoped>
  @import 'liquid_gauge';
</style>
