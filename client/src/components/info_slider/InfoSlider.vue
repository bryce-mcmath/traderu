<template>
  <v-card class="info-slider-card" :dark="dark" flat tile>
    <v-window v-model="onboarding">
      <v-window-item>
        <v-card color="transparent">
          <div class="slide-phone-container">
            <!-- <v-img src="@/assets/phone.png" aspect-ratio="1.7" height="100px"></v-img> -->
            <v-img
              src="@/assets/phone1.png"
              max-height="34vh"
              aspect-ratio=".532"
              contain
              class="phone-img"
            ></v-img>
          </div>

          <div class="slide-text-container">
            <h2>Trade a variety of assets</h2>
            <p>With everything from SPY to DogeCoin, we have over a hundred stocks and cryptocurrencies to choose from.</p>
          </div>
        </v-card>
      </v-window-item>

      <v-window-item>
        <v-card color="transparent">
          <div class="slide-phone-container">
            <v-img
              src="@/assets/phone2.png"
              max-height="34vh"
              aspect-ratio=".532"
              contain
              class="phone-img"
            ></v-img>
          </div>

          <div class="slide-text-container">
            <h2>Analyze your portfolio</h2>
            <p>View charts, graphs, and other data visualizations of your portfolios and their performance over time.</p>
          </div>
        </v-card>
      </v-window-item>

      <v-window-item>
        <v-card color="transparent">
          <div class="slide-phone-container">
            <v-img
              src="@/assets/phone3.png"
              max-height="34vh"
              aspect-ratio=".532"
              contain
              class="phone-img"
            ></v-img>
          </div>

          <div class="slide-text-container">
            <h2>Measure up</h2>
            <p>Our stock and cryptocurrency data is automatically updated daily, so as the assets you've bought go up in value, your position on the leaderboard will too.</p>
          </div>
        </v-card>
      </v-window-item>
    </v-window>

    <v-card-actions class="slide-controls">
      <v-btn aria-label="previous" text @click="prev">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-item-group v-model="onboarding" class="text-center" mandatory>
        <v-item v-for="n in length" :key="`btn-${n}`" v-slot:default="{ active, toggle }">
          <v-btn :aria-label="`slide-photo-${n}`" :input-value="active" icon @click="toggle">
            <v-icon>mdi-record</v-icon>
          </v-btn>
        </v-item>
      </v-item-group>
      <v-btn aria-label="next" text @click="next">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return { length: 3, onboarding: 0 };
  },
  computed: {
    dark() {
      return this.$store.state.ui.dark;
    }
  },
  methods: {
    next() {
      this.onboarding =
        this.onboarding + 1 === this.length ? 0 : this.onboarding + 1;
    },
    prev() {
      this.onboarding =
        this.onboarding - 1 < 0 ? this.length - 1 : this.onboarding - 1;
    }
  }
};
</script>

<style scoped lang="scss">
@import 'info_slider';
</style>
