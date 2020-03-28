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
  import StocksListDrawer from '../components/stocks_list_drawer/StocksListDrawer.vue';
  import InfoSlider from '../components/info_slider/InfoSlider.vue';
  import RegisterDialog from '../components/register_dialog/RegisterDialog.vue';
  import InfoList from '../components/info-list/InfoList.vue';
  import Vuex from 'vuex';
  import { mapMutations, mapActions } from 'vuex';

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
  .info-content {
    background-image: url('../assets/info-background.png');
    background-position: 43% 0%;
    background-size: auto 100vh;
    height: 78vh;
    padding-left: 6px;

    &--dark {
      background-image: url('../assets/info-background--dark.png');
    }

    img.info-display {
      margin: 2vh 3vw 0 2vw;
      width: 60%;
    }

    button.v-btn {
      width: 40vw;
      height: 100px;
      margin: 0;
      font-family: $primary-font;
      font-size: 6vw;
      background-color: rgb(75, 189, 84);
    }

    h1 {
      font-size: 8vw;
      font-family: $primary-font;
      width: 95%;
    }

    h2 {
      font-size: 6vw;
      width: 75%;
      margin-left: 0;
      margin-top: 1vh;
    }
  }

  #CTA-register {
    width: 40vw;
    height: 100px;
    font-family: $primary-font;
    font-size: 3vw;
  }

  .main-text {
    font-size: 5vw !important;
    width: 80%;

    p {
      margin: 0;

      &:last-child {
        margin-bottom: 6vw;
      }
    }
  }

  .buffer {
    height: 12vh !important;
  }
</style>
