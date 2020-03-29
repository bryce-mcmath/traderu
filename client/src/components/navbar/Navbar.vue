<template>
  <nav class="navbar" v-bind:class="{ 'navbar--dark': dark }">
    <VuemorphicToggle
      :eventToEmit="'toggledark'"
      @toggledark="toggleDarkMode"
      :type="'icon'"
      :active="dark"
      :options="{ left: 'fas fa-moon', right: 'fas fa-sun' }"
    ></VuemorphicToggle>
    <img class="brand" v-if="!dark" src="@/assets/logo.png" />
    <img class="brand" v-if="dark" src="@/assets/logo--dark-mode.png" />
    <v-app-bar-nav-icon
      @click="this.toggleDrawer"
      v-bind:class="{ 'v-btn--icon--active': pressed }"
    ></v-app-bar-nav-icon>
  </nav>
</template>

<script lang="ts">
  import Vue from 'vue';
  import VuemorphicToggle from '@/components/vuemorphic_toggle/VuemorphicToggle.vue';
  import { mapMutations } from 'vuex';

  export default Vue.extend({
    name: 'Navbar',
    components: { VuemorphicToggle },
    computed: {
      pressed() {
        return this.$store.state.ui.showDrawer;
      },
      dark() {
        return this.$store.state.ui.dark;
      }
    },
    methods: {
      ...mapMutations(['toggleDrawer', 'toggleDarkMode'])
    }
  });
</script>

<style lang="scss" scoped>
  @import 'navbar';
</style>
