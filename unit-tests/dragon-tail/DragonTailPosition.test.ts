import { DragonTailPosition } from "../../src/dragon-tail/DragonTailPosition";

describe("DragonTailPosition under test", () => {
  test("getInstance should return exact x, y ", () => {
    const result = DragonTailPosition.getInstance(0, 0);
    expect(result).toEqual({ x: 0, y: 0, parentColumn: 0 });
  });

  test("getName should return exact x, y string ", () => {
    const position = new DragonTailPosition({ x: 1, y: 1 });

    const result = position.getName();

    expect(result).toEqual("1-1");
  });

  test("getBottom should return exact x, y ", () => {
    const position = new DragonTailPosition({ x: 1, y: 1 });

    const result = position.getBottom();

    expect(result).toEqual({ x: 1, y: 2, parentColumn: 1 });
  });

  test("getRight should return exact x, y ", () => {
    const position = new DragonTailPosition({ x: 1, y: 1 });

    const result = position.getRight();

    expect(result).toEqual({ x: 2, y: 1, parentColumn: 1 });
  });

  test("getLeft should return exact x, y ", () => {
    const position = new DragonTailPosition({ x: 1, y: 1 });

    const result = position.getLeft();

    expect(result).toEqual({ x: 0, y: 1, parentColumn: 1 });
  });

  test("isValid should return true, when (x >= 0 && y < height)", () => {
    const position = new DragonTailPosition({ x: 1, y: 1 });

    const result = position.isValid(6);

    expect(result).toEqual(true);
  });

  test("isValid should return false, when /9x < 0 || y > height)", () => {
    const position = new DragonTailPosition({ x: -1, y: 1 });

    const result = position.isValid(6);

    expect(result).toEqual(false);
  });
});
