<template>
  <div class="vuemorphic-toggle-container">
    <label
      @click="toggleDarkMode"
      for="Dark Mode"
      v-bind:class="[
        'vuemorphic-toggle',
        { 'vuemorphic-toggle--active': dark }
      ]"
    >
      <span class="hide-sm">Dark Mode</span>
      <input type="checkbox" id="name" name="vuemorphic-toggle" />
      <span class="vuemorphic-toggle__bar">
        <i class="fas fa-sun"></i>
        <i class="fas fa-moon"></i>
        <span class="vuemorphic-toggle__square">
          <div class="square-bumps">
            <div class="square-bump"></div>
            <div class="square-bump"></div>
            <div class="square-bump"></div>
            <div class="square-bump"></div>
          </div>
        </span>
      </span>
    </label>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'VuemorphicToggle',
  computed: {
    dark() {
      return this.$store.state.ui.dark;
    }
  },
  methods: {
    ...mapMutations(['toggleDarkMode'])
  }
};
</script>

<style scoped lang="scss">
@import 'vuemorphic_toggle';
</style>
