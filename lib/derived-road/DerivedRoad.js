"use strict";
exports.__esModule = true;
var dragon_tail_1 = require("../dragon-tail");
var DerivedRoad = /** @class */ (function () {
    function DerivedRoad(options) {
        this.bigEyeBoy = new dragon_tail_1.DragonTailBoard(options);
        this.smallRoad = new dragon_tail_1.DragonTailBoard(options);
        this.cockroachPig = new dragon_tail_1.DragonTailBoard(options);
        this.bigRoadData = [];
    }
    DerivedRoad.prototype.initialize = function (bigRoadData) {
        this.bigRoadData = bigRoadData;
        this.loadBigEyeBoy();
        this.loadSmallRoad();
        this.loadCockroachPig();
    };
    DerivedRoad.prototype.loadBigEyeBoy = function () {
        this.loadBoard([]);
    };
    DerivedRoad.prototype.loadSmallRoad = function () {
        this.loadBoard([]);
    };
    DerivedRoad.prototype.loadCockroachPig = function () {
        this.loadBoard([]);
    };
    DerivedRoad.prototype.loadBoard = function (data) { };
    return DerivedRoad;
}());
