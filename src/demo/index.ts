import { BigRoadScoreboard } from "../big-road";
import { Converter } from "../Converter";
import { DerivedScoreboards } from "../derived-scoreboards";
import { consoleLogTable, getSettleResult } from "./helper";

export const start = () => {
  // blue: 1
  // red: 3
  // tie: 2
  const dataTest = [3, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3];
  const settlementResult = getSettleResult(dataTest);
  const converter = new Converter();
  const bigRoad = new BigRoadScoreboard({ converter, height: 6 });
  const derivedScoreboards = new DerivedScoreboards({ height: 6 });
  const hasBlinkNode = true;
  bigRoad.initialize(settlementResult, hasBlinkNode);
  const bigRoadData = bigRoad.rows();
  derivedScoreboards.update(bigRoadData, hasBlinkNode);
  console.log(bigRoadData);
  consoleLogTable(bigRoadData);
  console.log("---------- big eye boy");
  consoleLogTable(derivedScoreboards.getScoreboardData("bigEyeBoy"));
  console.log(derivedScoreboards.getScoreboardData("bigEyeBoy"));
  console.log("---------- small road");
  consoleLogTable(derivedScoreboards.getScoreboardData("smallRoad"));
  console.log("---------- cockroach pig");
  consoleLogTable(derivedScoreboards.getScoreboardData("cockroachPig"));
  console.log("---------- predictor board with true");
  console.log(derivedScoreboards.getPrediction(true));
  console.log("---------- predictor board with false");
  console.log(derivedScoreboards.getPrediction(false));
};

start();
