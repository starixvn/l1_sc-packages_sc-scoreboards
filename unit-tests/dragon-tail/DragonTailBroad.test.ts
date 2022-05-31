import { DragonTailBoard } from "../../src/dragon-tail";

describe("DragonTailBoard under test", () => {
  test("getStatus should return state of position (x,y) ", () => {
    const board = new DragonTailBoard({ height: 6 });
    const result = board.getStatus(0, 0);
    expect(result).toEqual(undefined);
  });

  test("add Node to location (x,y), status of that (x,y) should update to true", () => {
    const board = new DragonTailBoard({ height: 6 });
    board.addNode(true, true);

    const boardSize = board.getStatus(0, 0);
    expect(boardSize).toEqual(true);
  });

  test("getIndex should return state of position (x,y) ", () => {
    const board = new DragonTailBoard({ height: 6 });
    const result = board.getIndex(0, 0);
    expect(result).toEqual(undefined);
  });

  test("location (x,y) have value, getIndex should return index", () => {
    const board = new DragonTailBoard({ height: 6 });
    board.addNode(true, true);

    const boardSize = board.getIndex(0, 0);
    expect(boardSize).toEqual(0);
  });

  test("getPosition should return [], when board empty", () => {
    const board = new DragonTailBoard({ height: 6 });
    const result = board.getPosition(1);
    expect(result).toEqual([]);
  });

  test("getPosition should return locations, when board have value", () => {
    const board = new DragonTailBoard({ height: 6 });
    board.addNode(true, true);

    const result = board.getPosition(0);
    expect(result).toEqual([0, 0]);
  });

  test("clear should change size board", () => {
    const board = new DragonTailBoard({ height: 6 });
    board.clear();

    const boardSize = board.size();
    expect(boardSize).toEqual(0);
  });

  test("addNode should change size board", () => {
    const board = new DragonTailBoard({ height: 6 });
    board.addNode(true, true);

    const boardSize = board.size();
    expect(boardSize).toEqual(1);
  });

  test("getHeight should change height of board", () => {
    const board = new DragonTailBoard({ height: 6 });

    const boardHeight = board.getHeight();

    expect(boardHeight).toEqual(6);
  });

  test("when height < 2, use minimumHeight = 2 ", () => {
    const board = new DragonTailBoard({ height: 1 });

    const boardHeight = board.getHeight();

    expect(boardHeight).toEqual(2);
  });

  test("setHeight should change height of board, newHeight must >= 2", () => {
    const board = new DragonTailBoard({ height: 6 });
    board.addNode(true, false);

    expect(board.getHeight()).toEqual(6);
    board.setHeight(2);

    expect(board.getHeight()).toEqual(2);
  });

  test("setHeight newHeight <2, no effect ", () => {
    const board = new DragonTailBoard({ height: 6 });
    board.addNode(true, false);

    expect(board.getHeight()).toEqual(6);
    board.setHeight(1);

    expect(board.getHeight()).toEqual(6);
  });

  test("getWidth should change Width of board", () => {
    const board = new DragonTailBoard({ height: 6 });
    board.addNode(true, false);
    const boardSize = board.getWidth();

    expect(boardSize).toEqual(1);
  });

  describe("addNode should auto find exact location", () => {
    test("add node same value", () => {
      const board = new DragonTailBoard({ height: 6 });
      const locationTest = { x: 0, y: 1 };
      board.addNode(true, false); // add first node

      const statusBeforeAddSecondNode = board.getStatus(locationTest.x, locationTest.y);
      expect(statusBeforeAddSecondNode).toEqual(undefined);
      board.addNode(true, true); // add second node same value first node
      const statusAfterAddSecondNode = board.getStatus(locationTest.x, locationTest.y);

      expect(statusAfterAddSecondNode).toEqual(true); //
    });

    test("add node difference value", () => {
      const board = new DragonTailBoard({ height: 6 });
      const locationTest = { x: 1, y: 0 };
      board.addNode(true, true); // add first node

      const statusBeforeAddSecondNode = board.getStatus(locationTest.x, locationTest.y);
      expect(statusBeforeAddSecondNode).toEqual(undefined);
      board.addNode(false, true); // add second node same value first node
      const statusAfterAddSecondNode = board.getStatus(locationTest.x, locationTest.y);

      expect(statusAfterAddSecondNode).toEqual(false); //
    });

    test("add node, when have long-road", () => {
      const board = new DragonTailBoard({ height: 6 });
      const locationTest = { x: 1, y: 5 };
      const data = [
        { positive: true, isEndTail: false },
        { positive: true, isEndTail: false },
        { positive: true, isEndTail: false },
        { positive: true, isEndTail: false },
        { positive: true, isEndTail: false },
        { positive: true, isEndTail: false },
      ];
      data.forEach((e) => board.addNode(e.positive, e.isEndTail));

      const statusBefore = board.getStatus(locationTest.x, locationTest.y);
      expect(statusBefore).toEqual(undefined);

      board.addNode(true, true);

      const statusAfter = board.getStatus(locationTest.x, locationTest.y);
      expect(statusAfter).toEqual(true); //
    });

    test("add node, special case: `same value the longRoadBefore`", () => {
      const board = new DragonTailBoard({ height: 6 });
      const locationTest = { x: 4, y: 5 };
      const longRoad = [
        { positive: true, isEndTail: false },
        { positive: true, isEndTail: false },
        { positive: true, isEndTail: false },
        { positive: true, isEndTail: false },
        { positive: true, isEndTail: false },
        { positive: true, isEndTail: false },
        { positive: true, isEndTail: false },
        { positive: true, isEndTail: false },
        { positive: true, isEndTail: true },
      ];
      const data = [...longRoad, { positive: false, isEndTail: true }];
      data.forEach((e) => board.addNode(e.positive, e.isEndTail));

      const statusBefore = board.getStatus(locationTest.x, locationTest.y);
      expect(statusBefore).toEqual(undefined);

      [...longRoad].forEach((e) => board.addNode(e.positive, e.isEndTail));
      const statusAfter = board.getStatus(locationTest.x, locationTest.y);
      const statusAfter_RightNode = board.getStatus(locationTest.x + 1, locationTest.y);

      expect(statusAfter).toEqual(undefined); // see the long road, so fill into right
      expect(statusAfter_RightNode).toEqual(true);
    });
  });
});
