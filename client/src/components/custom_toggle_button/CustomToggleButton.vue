<template>
  <toggle-button
    @click="this.onChangeHandler"
    :sync="sync"
    :color="this.color"
    :value="dark"
    :labels="true"
  />
</template>

<script>
  export default {
    name: 'CustomToggleButton',
    data: function() {
      return {
        color: {
          checked: '#2a2a2a',
          unchecked: '#f7f7f7f',
          disabled: '#CCCCCC'
        },
        onChangeHandler: {
          type: Function,
          default: e => {
            this.dark = !this.dark;
          }
        }
      };
    },
    props: {
      dark: {
        type: Boolean,
        default: false
      },
      sync: {
        type: Boolean,
        default: true
      }
    }
  };
</script>

<style scoped lang="scss">
  @import 'custom_toggle_button';
</style>
