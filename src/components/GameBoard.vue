<template>
  <div class="container">
    <UserControls
      @tick="oneCycle"
      @autoplay="autoplay"
      @stop="stop"
      @reset="resetBoard"
      @init="initMatrix"
      :isMarrixCreated="isMarrixCreated"
    />
    <div id="grid-wrapper">
      <div id="grid">
        <div v-if="!isMarrixCreated" id="overlay">
          <span>Create Board First</span>
        </div>
        <div class="row" v-for="(row, rIndex) in matrix" :key="'r' + rIndex">
          <div
            class="cell"
            v-for="(cel, cIndex) in row"
            :key="'c' + cIndex"
            :class="{
              alive: cel,
              'cell-selectable': pattern === 'By Click' && !isRunning,
            }"
            @click="toggleCell(rIndex, cIndex)"
          ></div>
        </div>
      </div>
    </div>
    <DataBlock
      :totalCells="totalCells"
      :totalAliveCells="totalAliveCells"
      :cycles="totalCycles"
    />
  </div>
</template>

<script>
import UserControls from "./UserControls.vue";
import DataBlock from "./DataBlock.vue";

export default {
  components: {
    UserControls,
    DataBlock,
  },
  data() {
    return {
      size: 0,
      matrix: [],
      isMarrixCreated: false,
      interval: null,
      pattern: "",
      isRunning: false,
      totalAliveCells: 0,
      totalCycles: 0,
    };
  },
  computed: {
    totalCells() {
      if (!this.isMarrixCreated) {
        return 0;
      }
      return this.size * this.size;
    },
  },
  methods: {
    toggleCell(row, col) {
      if (!this.isRunning && this.pattern === "By Click") {
        this.matrix[row][col] = !this.matrix[row][col];

        if (!this.matrix[row][col]) {
          this.totalAliveCells--;
        } else {
          this.totalAliveCells++;
        }
      }
    },
    autoplay(args) {
      if (!this.interval) {
        this.interval = setInterval(() => {
          this.oneCycle();
        }, args.speed);
        this.isRunning = true;
      }
    },
    stop() {
      clearInterval(this.interval);
      this.interval = null;
      this.isRunning = false;
    },
    resetBoard() {
      this.isRunning = false;
      this.size = 0;
      this.matrix = [];
      this.isMarrixCreated = false;
      this.stop();
      clearInterval(this.interval);
      this.interval = null;
      this.pattern = "";
      this.totalAliveCells = 0;
      this.totalCycles = 0;
    },
    oneCycle() {
      if (this.isMarrixCreated) {
        this.totalCycles++;
        let newStateMatrix = new Array(this.size);
        for (let i = 0; i < this.size; i++) {
          newStateMatrix[i] = new Array(this.size);
        }
        let aliveCellsCount = 0;
        for (let row = 0; row < this.size; row++) {
          for (let col = 0; col < this.size; col++) {
            let state = this.setCellState(row, col);
            newStateMatrix[row][col] = state;
            if (state) {
              aliveCellsCount++;
            }
          }
        }

        this.totalAliveCells = aliveCellsCount;

        this.matrix = newStateMatrix;
      }
    },
    setCellState(r, c) {
      let count = 0;
      for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
          let row = (r + i + this.size) % this.size; /* always in rows range */
          let col = (c + j + this.size) % this.size; /* always in cols range */
          /* not counting itself */
          if (r === row && col == c) {
            continue;
          }
          if (this.matrix[row][col]) {
            count++;
          }
          if (count > 3) {
            break;
          }
        }
        if (count > 3) {
          break;
        }
      }

      let isCellAlive = this.matrix[r][c];
      if (!isCellAlive && count === 3) {
        return true;
      } else if (isCellAlive && (count < 2 || count > 3)) {
        return false;
      } else {
        return isCellAlive;
      }
    },
    initMatrix(args) {
      if (!this.isMarrixCreated) {
        this.isMarrixCreated = true;
        this.size = args.size;
        this.matrix = new Array(this.size);
        for (let i = 0, iLen = this.size; i < iLen; i++) {
          this.matrix[i] = new Array(this.size);
          for (let j = 0; j < this.size; j++) {
            this.matrix[i][j] = false;
          }
        }
        if (args.pattern === "Random") {
          this.pattern = args.pattern;
          this.randomize();
        } else {
          this.pattern = args.pattern;
        }
      }
    },
    randomize() {
      for (let i = 0; i < this.size; i++) {
        for (let j = 0; j < this.size; j++) {
          let num = Math.round(Math.random());
          if (num == 1) {
            this.matrix[i][j] = true;
            this.totalAliveCells++;
          } else {
            this.matrix[i][j] = false;
          }
        }
      }
    },
  },
};
</script>

<style scoped>
#overlay {
  height: 100%;
  width: 100%;
  background: black;
  opacity: 0.3;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
}
#grid-wrapper {
  display: flex;
  justify-content: center;
  background-color: #fff;
  padding: 2rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
  border-radius: 0.275rem;
  box-shadow: 0.3125rem 0.3125rem 0.5rem #888888;
}

#grid {
  border: 0.0625rem solid #888888;
  width: 32.5rem;
  height: 32.5rem;
  display: flex;
  align-items: stretch;
  flex-direction: column;
}

.row {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: start;
  flex: 1 0 auto;
}

.cell {
  flex: 1 0 auto;
  background-color: #7a8288;
  /* border: 1px solid black; */
}
.cell-selectable:hover {
  background-color: #ffffff;
  cursor: pointer;
}

.alive {
  background-color: #ffffff;
}
</style>
