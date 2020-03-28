<template>
  <v-btn
    :to="link"
    class="footer-nav-button"
    v-bind:class="[
      { 'footer-nav-button--dark': dark },
      { 'footer-nav-button--active': active }
    ]"
    :disabled="disabled"
  >
    <i :class="icon + ' footer-nav-button__icon'"></i>
  </v-btn>
</template>

<script>
export default {
  name: 'FooterNavButton',
  props: {
    label: {
      type: String,
      default: 'fas fa-question'
    },
    dark: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: 'fas fa-question'
    },
    link: {
      type: String,
      default: '/'
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    disabled(){
      return (this.label === "Portfolios" && !this.$store.state.user) 
    }
  }
};
</script>

<style scoped lang="scss">
@import 'footer_nav_button';
</style>
