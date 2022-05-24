import { DerivedScoreboards } from "../derived-scoreboards";
import { BigRoadScoreboard } from "../big-road/BigRoadScoreboard";
import Converter from "./converter";
import { getSettleResult, consoleLogTable } from "./helper";

export const start = () => {
  // blue: 1
  // red: 3
  // tie: 2
  const dataTest = [2, 1, 1, 1, 1, 1, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 3, 3, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 3, 1, 1];
  const settlementResult = getSettleResult(dataTest);
  const converter = new Converter();
  const bigRoad = new BigRoadScoreboard({ converter, height: 6 });
  bigRoad.initialize(settlementResult);
  const bigRoadData = bigRoad.rows();
  const derivedScoreboards = new DerivedScoreboards({ height: 6 });
  derivedScoreboards.update(bigRoadData);
  console.log(bigRoadData);
  consoleLogTable(bigRoadData);
  console.log("---------- big eye boy");
  consoleLogTable(derivedScoreboards.getScoreboardData("bigEyeBoy"));
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
