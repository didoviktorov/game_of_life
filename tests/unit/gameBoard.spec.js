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

  it("Matrix with length of 10 x 10 when child component emits init event", () => {
    let controlsComponent = board.findComponent(UserControls);
    controlsComponent.vm.$emit("init", {
      size: controlsComponent.vm.size,
      pattern: controlsComponent.vm.pattern,
    });
    let matrix = board.vm.matrix;
    expect(matrix.length).toBe(10);
    expect(matrix[0].length).toBe(10);
  });

  it("GameBoard to have 0 alive cells with 'By Click' pattern", () => {
    let controlsComponent = board.findComponent(UserControls);
    controlsComponent.vm.pattern = "By Click";
    controlsComponent.vm.$emit("init", {
      size: controlsComponent.vm.size,
      pattern: controlsComponent.vm.pattern,
    });

    let aliveCellsCount = board.vm.totalAliveCells;
    expect(aliveCellsCount).toBe(0);
  });

  it("GameBoard check alive cells with 'By Click' pattern when some cells are clicked", async () => {
    let controlsComponent = board.findComponent(UserControls);
    controlsComponent.vm.pattern = "By Click";
    await controlsComponent.vm.$emit("init", {
      size: controlsComponent.vm.size,
      pattern: controlsComponent.vm.pattern,
    });

    let cellsCollection = board.findAll(".cell");
    if (cellsCollection.length) {
      for (let i = 0; i < 10; i++) {
        let currentCell = cellsCollection.at(i);
        await currentCell.trigger("click");
      }
    }

    let aliveCellsCount = board.vm.totalAliveCells;
    expect(aliveCellsCount).toBe(10);

    let aliveCellsByClass = board.findAll(".alive");
    expect(aliveCellsByClass.length).toBe(10);
  });
});
