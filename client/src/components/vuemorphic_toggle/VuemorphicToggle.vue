<template>
  <div @click="emitEvent" class="vuemorphic-toggle-container">
    <label
      v-bind:class="[
        'vuemorphic-toggle',
        { 'vuemorphic-toggle--active': active },
        { 'vuemorphic-toggle--dark': dark }
      ]"
    >
      <input type="checkbox" id="name" name="vuemorphic-toggle" />
      <span class="vuemorphic-toggle__bar">
        <i v-if="type === 'icon'" :class="options.left"></i>
        <span v-if="type === 'bool'">ON</span>
        <i v-if="type === 'icon'" :class="options.right"></i>
        <span v-if="type === 'bool'">OFF</span>
        <span
          class="vuemorphic-toggle__square"
          v-bind:style="{ 'box-shadow': active ? right : left }"
        >
          <div class="square-bumps">
            <div class="square-bump"></div>
            <div class="square-bump"></div>
            <div class="square-bump"></div>
            <div class="square-bump"></div>
          </div>
        </span>
      </span>
    </label>
  </div>
</template>

<script>
  export default {
    name: 'VuemorphicToggle',
    props: {
      // Active means the boolean that this switch corresponds to is true
      eventToEmit: {
        type: String,
        default: 'toggledark'
      },

      // Active means the boolean that this switch corresponds to is true
      active: {
        type: Boolean,
        default: false
      },

      // 'icon' or 'bool'
      type: {
        type: String,
        default: 'icon'
      },

      // object with left and right string properties
      // if 'icon' type, use left and right as fa icons
      // if 'bool' type, use left and right as on/off background colors
      options: {
        type: Object,
        default: () => ({ left: 'fas fa-sun', right: 'fas-fa-moon' })
      }
    },

    computed: {
      dark() {
        return this.$store.state.ui.dark;
      },

      left() {
        return this.type === 'bool'
          ? `0 4px 16px 8px ${this.options.left}`
          : '0 4px 16px 8px rgba(0, 0, 0, 0.15)';
      },

      right() {
        return this.type === 'bool'
          ? `0 4px 16px 8px ${this.options.right}`
          : '0 4px 16px 8px rgba(0, 0, 0, 0.15)';
      }
    },

    methods: {
      emitEvent(e) {
        e.preventDefault();
        e.stopPropagation();
        this.$emit(this.eventToEmit);
      }
    }
  };
</script>

<style scoped lang="scss">
  @import 'vuemorphic_toggle';
</style>
