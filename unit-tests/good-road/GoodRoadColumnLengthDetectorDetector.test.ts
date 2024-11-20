import { BigRoadScoreboard, Converter, GoodRoadColumnLengthDetectorDetector, ONE_HOME_TWO_ROOMS } from "../../src";

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

const result = {
  oneHomeTwoRooms: [
    {
      big: true,
      small: false,
      tie: false,
    },
    {
      big: false,
      small: true,
      tie: false,
    },
    {
      big: false,
      small: true,
      tie: false,
    },
    {
      big: true,
      small: false,
      tie: false,
    },
    {
      big: false,
      small: true,
      tie: false,
    },
    {
      big: false,
      small: true,
      tie: false,
    },
  ],
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
});
