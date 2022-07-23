<template>
  <GameBoard msg="Welcome to Your Vue.js App" />
</template>

<script>
import GameBoard from "./components/GameBoard.vue";

export default {
  name: "App",
  components: {
    GameBoard,
  },
};
</script>

<style>
body {
  background-color: #ddd;
  height: 100%;
}
</style>
