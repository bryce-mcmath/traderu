<template>
  <main class="view-container">
    <StockTransaction></StockTransaction>
  </main>
</template>

<script>
  import StockTransaction from '@/components/stock_transaction/StockTransaction';

  export default {
    name: 'Assets',
    components: { StockTransaction }
  };
</script>
