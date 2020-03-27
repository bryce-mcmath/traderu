<template>
  <main>
    <div id="main-content">
      <div id="intro-text">
        <h1>Try out trading, Risk free.</h1>
        <p class="main-text">Buy and sell stocks and cryptocurrencies.</p>
        <p class="main-text">Compete with friends.</p>
        <p class="main-text">All with live data.</p>
      </div>
      <RegisterDialog/>
    </div>
    <InfoSlider />
    <InfoList />
    <div class="buffer"></div>
  </main>
</template>

<script>
// @ is an alias to /src
import StocksListDrawer from '../components/stocks_list_drawer/StocksListDrawer.vue';
import InfoSlider from '../components/info_slider/InfoSlider.vue'
import RegisterDialog from '../components/register_dialog/RegisterDialog.vue'
import InfoList from '../components/info-list/InfoList.vue'
import Vuex from 'vuex';
import { mapMutations, mapActions } from 'vuex';

export default {
  name: 'Info',
  components: {
    InfoSlider,
    RegisterDialog,
    InfoList,
  },
  computed: {
    dark() {
      return this.$store.state.ui.dark;
    }
  },
  methods: {
    showStocksDrawer: function() {
      this.setStocksData();
      this.$store.commit('toggleStocksDrawer');
    },
    ...mapActions(['setStocksData'])
  }
};
</script>

<style lang="scss">
#main-content{
  background-image: url('../assets/info-background.jpg');
  background-position: 43% 0%;
  background-size: auto 100vh;
  height: 78vh;
  display:flex;
  flex-direction: column;
  justify-content: space-between;
  padding-left: 10px;
  button {
    width: 40vw;
    height: 100px;
    margin: 20px;
    font-family: $primary-font;
    font-size: 1.5em;
    background-color: rgb(75, 189, 84);
  }
}

#CTA-register {
  width: 40vw;
  height: 100px;
  margin: 20px;
  font-family: $primary-font;
  font-size: 1.5em;
}
.main-text{
  font-size: 2.5em !important;
  width: 85%;
  padding-top: 20px;
}
.buffer{
  height: 150px !important;
}
h1{
  font-size: 4em;
  font-family: $primary-font;
  width: 85%;
}

</style>
