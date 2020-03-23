<template>
  <main class="view-container">
    <StockTransaction></StockTransaction>
  </main>
</template>

<script>
import StockTransaction from '@/components/stock_transaction/StockTransaction';

export default {
  name: 'Trade',
  components: { StockTransaction },
  props: {
    dark: {
      type: Boolean,
      default: false
    }
  }
};
</script>
