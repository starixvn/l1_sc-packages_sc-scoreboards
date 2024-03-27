import { BigRoadScoreboard, BigRoadScoreboardPoint } from "../big-road";
import { DerivedScoreboards } from "../derived-scoreboards";
import { GoodRoadColumnLengthDetectorDetector, SYMMETRICAL_PATTERNS } from "../good-road";
import Converter, { SettlementResult } from "./converter";

// compare to 2

export const getSettleResult = (data: number[]) => {
  return data.reduce((result: any, value: number) => {
    const a = { big: value > 2, small: value < 2, tie: value === 2 };
    result.push(a);
    return result;
  }, []);
};

const getData = (data: BigRoadScoreboardPoint<SettlementResult>[]) => {
  let result = "";
  for (const element of data) {
    if (element.isBlink) {
      result += "? ";
    } else {
      if (element.status) {
        result += "+ ";
      } else {
        if (element.status === false) {
          result += "- ";
        } else {
          result += "  ";
        }
      }
    }
  }
  return result;
};

export const consoleLogTable = (data: any) => {
  for (let row = 0; row < 6; row++) {
    console.log(getData(data[row]));
  }
};

export const printAllTables = (
  data: any,
  options: {
    bigRoad?: boolean;
    bigEyeBoy?: boolean;
    smallRoad?: boolean;
    cockroachPig?: boolean;
  }
) => {
  const settlementResult = getSettleResult(data);
  const converter = new Converter();
  const columnDetector = new GoodRoadColumnLengthDetectorDetector({ patterns: SYMMETRICAL_PATTERNS });

  const bigRoad = new BigRoadScoreboard({ converter, height: 6, goodRoadDetectors: [columnDetector] });

  bigRoad.initialize(settlementResult);

  const bigRoadData = bigRoad.rows();
  const derivedScoreboards = new DerivedScoreboards({ height: 6 });
  derivedScoreboards.update(bigRoadData);

  options.bigRoad && consoleLogTable(bigRoadData);

  if (options.bigEyeBoy) {
    console.log("BIG EYE BOY");
    consoleLogTable(derivedScoreboards.getScoreboardData("bigEyeBoy"));
  }

  if (options.smallRoad) {
    console.log("SMALL ROAD");
    consoleLogTable(derivedScoreboards.getScoreboardData("smallRoad"));
  }

  if (options.cockroachPig) {
    console.log("COCKROACH PIG");
    consoleLogTable(derivedScoreboards.getScoreboardData("cockroachPig"));
  }

  console.log(bigRoad.getGoodRoad());
};
