"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.DerivedScoreboards = void 0;
var dragon_tail_1 = require("../dragon-tail");
var DerivedScoreboards = /** @class */ (function () {
    function DerivedScoreboards(options) {
        this.bigEyeBoyKey = "bigEyeBoy";
        this.smallRoadKey = "smallRoad";
        this.cockroachPigKey = "cockroachPig";
        this.bigEyeBoy = new dragon_tail_1.DragonTailBoard(options);
        this.smallRoad = new dragon_tail_1.DragonTailBoard(options);
        this.cockroachPig = new dragon_tail_1.DragonTailBoard(options);
        this.bigRoadData = [];
    }
    DerivedScoreboards.prototype.update = function (bigRoadData) {
        this.bigRoadData = bigRoadData;
        this.updateBigEyeBoy();
        this.updateSmallRoad();
        this.updateCockroachPig();
    };
    DerivedScoreboards.prototype.getBeginIndexOfDerivedScoreboard = function (bigRoadData, colGap) {
        var item1 = bigRoadData[1][colGap];
        var item2 = bigRoadData[0][colGap + 1];
        if (item1.status !== undefined) {
            return item1.index;
        }
        else if (item2.status !== undefined) {
            return item2.index;
        }
        else {
            return -1;
        }
    };
    DerivedScoreboards.prototype.generateDerivedScoreboardsData = function (bigRoadData, colGap) {
        var maxColumnCount = Math.max.apply(Math, __spreadArray([0], __read(bigRoadData.map(function (row) { return row.length; })), false));
        var indexArr = [];
        var lengthArr = [];
        var rawDataArr = [];
        var beginIndex = this.getBeginIndexOfDerivedScoreboard(bigRoadData, colGap);
        if (beginIndex === -1)
            return [];
        for (var columnIndex = 0; columnIndex < maxColumnCount; columnIndex++) {
            var currentLength = 0;
            var rawData = [];
            for (var rowIndex = 0; rowIndex < bigRoadData.length; rowIndex++) {
                var item = bigRoadData[rowIndex][columnIndex];
                if (item.status !== undefined) {
                    if (item.parentColumn === columnIndex) {
                        currentLength += 1;
                        rawData.push(item.status);
                    }
                    else {
                        lengthArr[item.parentColumn] += 1;
                        rawDataArr[item.parentColumn].push(item.status);
                    }
                    indexArr.push({
                        rowIndex: rowIndex,
                        columnIndex: columnIndex,
                        parentColumn: item.parentColumn,
                        order: item.index
                    });
                }
            }
            rawDataArr.push(rawData);
            lengthArr.push(currentLength);
        }
        return this.compareWithOtherCol(rawDataArr, indexArr, lengthArr, beginIndex, colGap);
    };
    DerivedScoreboards.prototype.compareWithOtherCol = function (rawDataArr, indexArr, lengthArr, beginIndex, colGap) {
        var result = [];
        var currentCol = 0;
        var currentRow = 0;
        indexArr.sort(function (a, b) { return a.order - b.order; });
        indexArr.forEach(function (item) {
            if (currentCol === item.parentColumn) {
                currentRow += 1;
            }
            else {
                currentRow = 0;
                currentCol = item.parentColumn;
            }
            if (item.order >= beginIndex) {
                if (currentRow === 0) {
                    result.push(lengthArr[currentCol - colGap - 1] === lengthArr[currentCol - 1]);
                }
                else {
                    var lastItem = rawDataArr[currentCol - colGap][currentRow - 1];
                    var targetItem = rawDataArr[currentCol - colGap][currentRow];
                    result.push(lastItem === undefined || targetItem !== undefined);
                }
            }
        });
        return result;
    };
    DerivedScoreboards.prototype.updateBigEyeBoy = function () {
        var data = this.generateDerivedScoreboardsData(this.bigRoadData, 1);
        this.updateBoard(data, this.bigEyeBoyKey);
    };
    DerivedScoreboards.prototype.updateSmallRoad = function () {
        var data = this.generateDerivedScoreboardsData(this.bigRoadData, 2);
        this.updateBoard(data, this.smallRoadKey);
    };
    DerivedScoreboards.prototype.updateCockroachPig = function () {
        var data = this.generateDerivedScoreboardsData(this.bigRoadData, 3);
        this.updateBoard(data, this.cockroachPigKey);
    };
    DerivedScoreboards.prototype.updateBoard = function (data, boardKey) {
        var lengthGroups = data.length;
        for (var i = 0; i < lengthGroups; i++) {
            var isEndTail = data[i] != data[i + 1];
            this[boardKey].addNode(data[i], isEndTail);
        }
    };
    DerivedScoreboards.prototype.getScoreboardData = function (key) {
        var width = this[key].getWidth();
        var height = this[key].getHeight();
        var result = [];
        for (var row = 0; row < height; row++) {
            var rowData = [];
            for (var column = 0; column < width; column++) {
                var status_1 = this[key].getStatus(column, row);
                rowData.push({
                    column: column,
                    row: row,
                    status: status_1
                });
            }
            result.push(rowData);
        }
        return result;
    };
    return DerivedScoreboards;
}());
exports.DerivedScoreboards = DerivedScoreboards;
