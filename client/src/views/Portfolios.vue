<template>
  <main class="view-container--alt">
    <h2>Primary Header</h2>
    <p
      >Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
      dignissimos aperiam in cupiditate placeat minus adipisci delectus beatae
      fuga, veniam libero, pariatur iure id consectetur. Eaque unde veniam fugit
      id!</p
    >
    <p
      >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore,
      placeat. Sit quidem praesentium deleniti expedita facilis odio perferendis
      quos. Modi aspernatur molestias unde perferendis similique impedit
      deserunt maiores quae doloremque.</p
    >
    <p>This text would be best for legalese-type pages/views</p>
  </main>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    name: 'Portfolios',
    components: {},
    created(){
      this.setUserPortfolios();
    },
    props: {
      dark: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      ...mapActions(['setUserPortfolios'])
    },
  };
</script>
