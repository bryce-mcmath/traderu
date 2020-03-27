<template>
  <v-card
    color="black"
    dark
    flat
    tile
  >
    <v-window v-model="onboarding">
      <v-window-item>
        <v-card
          color="transparent"
          height="82vh"
        >
          <v-row
            align="top"
            justify="center"
            tag="v-card-img"
          >
          <!-- <v-img src="@/assets/phone.png" aspect-ratio="1.7" height="100px"></v-img> -->
          <v-img src="@/assets/phone.png" max-width="40vw" aspect-ratio=".532"></v-img>
          </v-row>

          <v-row
            align="bottom"
            justify="center"
            tag="v-card-text"
          >
          <h2>Phone image with cool portfolio graph</h2>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus blanditiis in molestiae iusto ut enim eum eligendi unde dolorum veniam. Veritatis molestias enim quaerat corrupti sit vel ratione, quos possimus.</p>
          </v-row>
        </v-card>
      </v-window-item>
      
      <v-window-item>
        <v-card
          color="transparent"
          height="82vh"
        >
          <v-row
            align="top"
            justify="center"
            tag="v-card-img"
          >
          <!-- <v-img src="@/assets/phone.png" aspect-ratio="1.7" height="100px"></v-img> -->
          <v-img src="@/assets/phone.png" max-width="40vw" aspect-ratio=".532"></v-img>
          </v-row>

          <v-row
            align="bottom"
            justify="center"
            tag="v-card-text"
          >
          <h2>Phone image with stock/crypto nav</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error eaque et inventore atque consequuntur maiores quibusdam, cumque consequatur commodi eius est explicabo quos non eos dignissimos. Quibusdam consequuntur quidem quo.</p>
          </v-row>
        </v-card>
      </v-window-item>

      <v-window-item>
        <v-card
          color="transparent"
          height="82vh"
        >
          <v-row
            align="top"
            justify="center"
            tag="v-card-img"
          >
          <!-- <v-img src="@/assets/phone.png" aspect-ratio="1.7" height="100px"></v-img> -->
          <v-img src="@/assets/phone.png" max-width="40vw" aspect-ratio=".532"></v-img>
          </v-row>

          <v-row
            align="bottom"
            justify="center"
            tag="v-card-text"
          >
          <h2>Phone image with leaderboard</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, a eaque alias voluptatum necessitatibus nesciunt dolores accusamus sequi nisi hic, asperiores totam distinctio iusto, possimus amet earum culpa. Laboriosam, molestias!</p>  
          </v-row>
        </v-card>
      </v-window-item>

    </v-window>

    <v-card-actions class="justify-space-between">
      <v-btn
        text
        @click="prev"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-item-group
        v-model="onboarding"
        class="text-center"
        mandatory
      >
        <v-item
          v-for="n in length"
          :key="`btn-${n}`"
          v-slot:default="{ active, toggle }"
        >
          <v-btn
            :input-value="active"
            icon
            @click="toggle"
          >
            <v-icon>mdi-record</v-icon>
          </v-btn>
        </v-item>
      </v-item-group>
      <v-btn
        text
        @click="next"
      >
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      length: 3,
      onboarding: 0,
    }),

    methods: {
      next () {
        this.onboarding = this.onboarding + 1 === this.length
          ? 0
          : this.onboarding + 1
      },
      prev () {
        this.onboarding = this.onboarding - 1 < 0
          ? this.length - 1
          : this.onboarding - 1
      },
    }
  }
</script>

<style scoped lang="scss">
  @import 'info_slider';
</style>