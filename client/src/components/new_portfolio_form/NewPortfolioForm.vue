<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn block v-on="on">New Portfolio</v-btn>
      </template>
      <div class="spinner-container" v-if="creating">
        <Spinner></Spinner>
      </div>
      <v-card v-if="!creating">
        <v-card-title>
          <span class="headline">New Portfolio</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Portfolio name" v-model="portfolioName" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false"
            >Close</v-btn
          >
          <v-btn color="blue darken-1" text @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  import { mapActions } from 'vuex';
  import Spinner from '../spinner/Spinner.vue'

  export default {
    data: () => ({
      dialog: false,
      portfolioName: ''
    }),
    components: {
      Spinner
    },
    methods: {
      save(){
        this.createPortfolio(this.portfolioName)
        .then(async () => {
          await this.setUserPortfolios();
          this.dialog = false;
        });
      },
      ...mapActions(['setUserPortfolios', 'createPortfolio']),
    },
    computed: {
      creating(){
        return this.$store.state.ui.ajaxInProgress;
      },
    }
  };
</script>
