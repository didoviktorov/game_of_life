import { mount } from "@vue/test-utils";
import GameBoard from "@/components/GameBoard.vue";
import UserControls from "@/components/UserControls.vue";

describe("GameBoard.vue", () => {
  let board;
  beforeEach(() => {
    board = mount(GameBoard);
  });

  it("Default data props on first mount", () => {
    expect(board.vm.matrix).toHaveLength(0);
    expect(board.vm.isMarrixCreated).toBe(false);
    expect(board.vm.interval).toBe(null);
    expect(board.vm.pattern).toEqual("");
    expect(board.vm.isRunning).toBe(false);
    expect(board.vm.totalAliveCells).toEqual(0);
    expect(board.vm.totalCycles).toEqual(0);
  });

  it("Overflow visible when the matrix is not initialized", () => {
    expect(board.findAll("#overlay")).toHaveLength(1);
  });

  it("Hides overflow when child component emits init event", async () => {
    let controlsComponent = board.findComponent(UserControls);
    await controlsComponent.vm.$emit("init", {
      size: controlsComponent.vm.size,
      pattern: controlsComponent.vm.pattern,
    });

    expect(board.find("#overlay").exists()).toBe(false);
  });

  it("Matrix with lenth of 10 x 10 when child component emits init event", async () => {
    let controlsComponent = board.findComponent(UserControls);
    await controlsComponent.vm.$emit("init", {
      size: controlsComponent.vm.size,
      pattern: controlsComponent.vm.pattern,
    });
    let matrix = board.vm.matrix;
    expect(matrix.length).toBe(10);
    expect(matrix[0].length).toBe(10);
  });
});
