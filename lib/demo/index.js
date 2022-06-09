"use strict";
exports.__esModule = true;
exports.start = void 0;
var derived_scoreboards_1 = require("../derived-scoreboards");
var BigRoadScoreboard_1 = require("../big-road/BigRoadScoreboard");
var converter_1 = require("./converter");
var helper_1 = require("./helper");
var start = function () {
    // blue: 1
    // red: 3
    // tie: 2
    var dataTest = [3, 1, 1, 1, 1, 1, 1, 1, 1];
    var settlementResult = (0, helper_1.getSettleResult)(dataTest);
    var converter = new converter_1["default"]();
    var bigRoad = new BigRoadScoreboard_1.BigRoadScoreboard({ converter: converter, height: 6 });
    bigRoad.initialize(settlementResult);
    var bigRoadData = bigRoad.rows();
    var derivedScoreboards = new derived_scoreboards_1.DerivedScoreboards({ height: 6 });
    derivedScoreboards.update(bigRoadData);
    console.log(bigRoadData);
    (0, helper_1.consoleLogTable)(bigRoadData);
    console.log("---------- big eye boy");
    (0, helper_1.consoleLogTable)(derivedScoreboards.getScoreboardData("bigEyeBoy"));
    console.log(derivedScoreboards.getScoreboardData("bigEyeBoy"));
    console.log("---------- small road");
    (0, helper_1.consoleLogTable)(derivedScoreboards.getScoreboardData("smallRoad"));
    console.log("---------- cockroach pig");
    (0, helper_1.consoleLogTable)(derivedScoreboards.getScoreboardData("cockroachPig"));
    console.log("---------- predictor board with true");
    console.log(derivedScoreboards.getPrediction(true));
    console.log("---------- predictor board with false");
    console.log(derivedScoreboards.getPrediction(false));
};
exports.start = start;
(0, exports.start)();
