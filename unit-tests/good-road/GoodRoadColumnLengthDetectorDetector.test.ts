import {
  ADJACENT_TWO_COLUMNS,
  BigRoadScoreboard,
  CHASE,
  Converter,
  GoodRoadColumnLengthDetectorDetector,
  LONG_ROAD,
  ONE_HOME_TWO_ROOMS,
} from "../../src";

export interface SettlementResult {
  big: boolean;
  small: boolean;
  tie: boolean;
}

export default class ConverterTest extends Converter<SettlementResult> {
  positiveKey() {
    return "big";
  }
}

const big = {
  big: true,
  small: false,
  tie: false,
};
const small = {
  big: false,
  small: true,
  tie: false,
};
const tie = {
  big: false,
  small: false,
  tie: true,
};

const result = {
  oneHomeTwoRooms: [big, small, small, big, small, small],
  longRoad: [small, big, big, big, big, big, big],
  chase: [big, big, small, big, small, big, small],
  adjacentTwoColumns: [big, small, big, big, big, small, small],
};

const converter = new ConverterTest();

describe("GoodRoadColumnLengthDetectorDetector", () => {
  let bigRoad: BigRoadScoreboard<SettlementResult>;

  beforeEach(() => {
    bigRoad = new BigRoadScoreboard({ converter, height: 6 });
  });
  it("should detect one home two rooms", () => {
    // Arrange
    const detector = new GoodRoadColumnLengthDetectorDetector({ patterns: [ONE_HOME_TWO_ROOMS] });
    bigRoad.setGoodRoadDetectors([detector]);
    bigRoad.initialize(result.oneHomeTwoRooms);

    // Act
    const actual = bigRoad.getGoodRoad();

    // Assert
    expect(actual).toEqual({ x: 0, width: 4, height: 2, name: "ONE_HOME_TWO_ROOMS" });
  });

  it("should detect long road", () => {
    // Arrange
    const detector = new GoodRoadColumnLengthDetectorDetector({ patterns: [LONG_ROAD] });
    bigRoad.setGoodRoadDetectors([detector]);
    bigRoad.initialize(result.longRoad);

    // Act
    const actual = bigRoad.getGoodRoad();

    // Assert
    expect(actual).toEqual({ x: 1, width: 1, height: 6, name: "LONG_ROAD" });
  });

  it("should detect chase", () => {
    // Arrange
    const detector = new GoodRoadColumnLengthDetectorDetector({ patterns: [CHASE] });
    bigRoad.setGoodRoadDetectors([detector]);
    bigRoad.initialize(result.chase);

    // Act
    const actual = bigRoad.getGoodRoad();

    // Assert
    expect(actual).toEqual({ x: 1, width: 5, height: 1, name: "CHASE" });
  });

  it("should detect adjacent two columns", () => {
    // Arrange
    const detector = new GoodRoadColumnLengthDetectorDetector({ patterns: [ADJACENT_TWO_COLUMNS] });
    bigRoad.setGoodRoadDetectors([detector]);
    bigRoad.initialize(result.adjacentTwoColumns);

    // Act
    const actual = bigRoad.getGoodRoad();

    // Assert
    expect(actual).toEqual({ x: 2, width: 2, height: 3, name: "ADJACENT_TWO_COLUMNS" });
  });
});
