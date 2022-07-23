<template>
  <section id="controls">
    <div id="controls-container">
      <div>
        <label>
          Select Size:
          <select name="size" v-model="size">
            <option v-for="size in sizes" :value="size" :key="size">
              {{ size }}
            </option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Choose pattern:
          <select name="pattern" v-model="pattern">
            <option v-for="opt in patterns" :value="opt" :key="opt">
              {{ opt }}
            </option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Choose autoplay speed:
          <select name="speed" v-model="speed">
            <option v-for="sped in speeds" :value="sped" :key="sped">
              {{ sped + " ms" }}
            </option>
          </select>
        </label>
      </div>
      <button class="control-button" @click="init" :disabled="isMarrixCreated">
        create board
      </button>
      <button
        class="control-button"
        @click="tick"
        :disabled="!isMarrixCreated || isAutplayRunnig"
      >
        One Tick
      </button>
      <button
        class="control-button"
        @click="autoplay"
        :disabled="!isMarrixCreated || isAutplayRunnig"
      >
        Autoplay
      </button>
      <button
        class="control-button"
        @click="stop"
        :disabled="!isMarrixCreated || !isAutplayRunnig"
      >
        Stop
      </button>
      <button
        class="control-button"
        @click="reset"
        :disabled="!isMarrixCreated"
      >
        Reset
      </button>
    </div>
  </section>
</template>

<script>
export default {
  emits: ["tick", "autoplay", "stop", "clear", "init"],
  props: ["isMarrixCreated"],
  data() {
    return {
      size: 10,
      sizes: [10, 15, 20, 25, 30, 35, 40, 45, 50],
      patterns: ["Random", "By Click"],
      speeds: [100, 200, 300, 500, 1000],
      pattern: "Random",
      speed: 100,
      isAutplayRunnig: false,
    };
  },
  computed: {
    isDisabled() {
      return this.isMarrixCreated;
    },
  },
  methods: {
    init() {
      this.$emit("init", {
        size: this.size,
        pattern: this.pattern,
      });
    },
    tick() {
      this.$emit("tick");
    },
    autoplay() {
      this.$emit("autoplay", {
        speed: this.speed,
      });
      this.isAutplayRunnig = true;
    },
    stop() {
      this.$emit("stop");
      this.isAutplayRunnig = false;
    },
    reset() {
      this.$emit("reset");
      this.isAutplayRunnig = false;
      this.pattern = "Random";
      this.speed = 100;
      this.size = 10;
    },
  },
};
</script>

<style scoped>
#controls {
  height: 7rem;
  background-color: #fff;
  border-radius: 0.275rem;
  box-shadow: 0.3125rem 0.3125rem 0.5rem #888888;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
}

#controls-container > div {
  display: inline-block;
  padding-right: 1rem;
}

.control-button {
  margin-right: 1rem;
  background-color: #7a8288;
  color: #ffffff;
  text-transform: uppercase;
}

.control-button:hover:enabled {
  background-color: #c1c1c1;
}

button:disabled {
  background-color: #d1c8c8;
}
</style>
