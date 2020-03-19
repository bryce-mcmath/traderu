<template>
  <v-bottom-navigation
    :fixed="true"
  >
    <v-btn to="/">
      <span>Home</span>
      <v-icon>mdi-history</v-icon>
    </v-btn>

    <v-btn to="/display">
      <span>Display</span>
      <v-icon>mdi-heart</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
  export default {
    name: "BottomNav"
  }
</script>

<style lang="scss">
@import 'bottom_nav';
</style>