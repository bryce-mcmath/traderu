<template>
  <main class="view-container--alt">
    <h2>Primary Header</h2>
    <v-btn block :dark="dark" @click="test">Add Portfolio</v-btn>
    <Dialog>
    </Dialog>
    <v-expansion-panels :accordion="true" :focusable="true" :flat="true" :dark="dark">
      <v-expansion-panel
        v-for="(portfolio,i) in portfolios"
        :key="i"
      >
        <v-expansion-panel-header>{{portfolio.name}}</v-expansion-panel-header>
        <v-expansion-panel-content>
          <Portfolio :portfolio="portfolio"/>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </main>
</template>

<script>
  import { mapActions } from 'vuex';
  import Portfolio from '../components/portfolio/Portfolio.vue'
  // import Dialog from '../components/dialog/Dialog.vue'
  import NewPortfolioForm from '../components/new_portfolio_form/NewPortfolioForm.vue'

  export default {
    name: 'Portfolios',
    components: {Portfolio}, //, Dialog},
    created(){
      //@TODO: think of better logic for this
      //Don't want to reload if current,
      //But need to make sure new portfolios get added
      this.setUserPortfolios();
    },
    props: {
      dark: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      ...mapActions(['setUserPortfolios']),

      // test() {
			// 	this.$store.commit('setDialogText', {
			// 		title: 'Test title',
			// 		content: <NewPortfolioForm />,
			// 		primaryBtn: 'Yo',
			// 		primaryCallback: function() {
			// 			console.log('Called back yo');
			// 		},
			// 		secondaryBtn: 'No',
			// 		secondaryCallback: function() {
			// 			console.log('No called back');
			// 		}
			// 	});
			// 	this.$store.commit('setShowDialog', true);
			// }
    },
    computed: {
      portfolios(){
        return this.$store.state.apiData.userPortfolios["portfolios"];
      },
    }
  };
</script>
