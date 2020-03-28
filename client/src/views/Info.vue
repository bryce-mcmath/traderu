<template>
  <main class="view-container">
    <div v-bind:class="['info-content', { 'info-content--dark': dark }]">
      <div id="intro-text">
        <h1>Lose all your money.</h1>
        <h2>Without losing money.</h2>
        <img
          src="../assets/info-display.png"
          alt="info-display"
          class="info-display"
        />
        <aside class="main-text">
          <p>Trade stocks and crypto.</p>
          <p>Compete with friends.</p>
          <p>All with live data.</p>
        </aside>
      </div>
      <RegisterDialog />
    </div>
    <InfoSlider />
    <InfoList />
    <div class="buffer"></div>
  </main>
</template>

<script>
  // @ is an alias to /src
  import InfoSlider from '../components/info_slider/InfoSlider.vue';
  import RegisterDialog from '../components/register_dialog/RegisterDialog.vue';
  import InfoList from '../components/info-list/InfoList.vue';
  import { mapActions } from 'vuex';

  export default {
    name: 'Info',
    components: {
      InfoSlider,
      RegisterDialog,
      InfoList
    },
    computed: {
      dark() {
        return this.$store.state.ui.dark;
      }
    },
    methods: {
      ...mapActions(['setStocksData'])
    }
  };
</script>

<style lang="scss">
  @import 'info';
</style>
