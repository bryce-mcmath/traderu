<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="name"
      :counter="10"
      :rules="nameRules"
      label="Name"
      required
    ></v-text-field>
  </v-form>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    props: {
    },
    methods: {
    },
    computed: {
    }
  };
</script>
