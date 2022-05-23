"use strict";
exports.__esModule = true;
exports.start = void 0;
var BigRoadScoreboard_1 = require("./../big-road/BigRoadScoreboard");
var converter_1 = require("./converter");
var hepler_1 = require("./hepler");
var start = function () {
  var dataTest = [1, 2, 3, 1, 2, 1, 1, 1, 1, 3, 3, 3, 1, 3, 1, 3, 1, 2, 2, 2, 1, 1, 3, 3, 3, 3];
  var settlementResult = (0, hepler_1.getSettleResult)(dataTest);
  var converter = new converter_1["default"]();
  var bigRoad = new BigRoadScoreboard_1.BigRoadScoreboard({ converter: converter, height: 6 });
  bigRoad.initialize(settlementResult);
  console.log(bigRoad.rows());
  // const table = renderTable(bigRoad.rows());
  // console.log(table, 1);
};
exports.start = start;
(0, exports.start)();
