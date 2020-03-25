<template>
  <main>
    <StockTransaction></StockTransaction>
  </main>
</template>

<script>
import StockTransaction from '@/components/stock_transaction/StockTransaction';

export default {
  name: 'Trade',
  data() {
    return {
      searchSymbol: ''
    };
  },
  components: { StockTransaction }
};
</script>
