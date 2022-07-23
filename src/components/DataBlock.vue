<template>
  <div id="data-wrapper">
    <div class="info">Total Cells Created: {{ totalCells }}</div>
    <div class="info">Alive Cells: {{ totalAliveCells }}</div>
    <div class="info-no-margin">Cycles: {{ cycles }}</div>
  </div>
</template>

<script>
export default {
  props: ["totalCells", "totalAliveCells", "cycles"],
};
</script>

<style scoped>
#data-wrapper {
  height: 7rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 0.275rem;
  box-shadow: 0.3125rem 0.3125rem 0.5rem #888888;
  flex-direction: row;
  padding: 2rem;
}
.info {
  display: flex;
  margin-right: 2rem;
}
.info-no-margin {
  margin: 0 !important;
}
</style>
