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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
exports.__esModule = true;
exports.DerivedScoreboards = void 0;
var dragon_tail_1 = require("../dragon-tail");
var _ = require("lodash");
var DerivedScoreboards = /** @class */ (function () {
    function DerivedScoreboards(options) {
        this.bigEyeBoyKey = "bigEyeBoy";
        this.smallRoadKey = "smallRoad";
        this.cockroachPigKey = "cockroachPig";
        this.indexArr = [];
        this.lengthArr = [];
        this.rawDataArr = [];
        this.bigEyeBoy = new dragon_tail_1.DragonTailBoard(options);
        this.smallRoad = new dragon_tail_1.DragonTailBoard(options);
        this.cockroachPig = new dragon_tail_1.DragonTailBoard(options);
        this.bigRoadData = [];
    }
    DerivedScoreboards.prototype.update = function (bigRoadData) {
        this.bigRoadData = bigRoadData;
        this.convertDataFromBigRoadData(bigRoadData);
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
    DerivedScoreboards.prototype.convertDataFromBigRoadData = function (bigRoadData) {
        var e_1, _a;
        this.indexArr = [];
        this.lengthArr = [];
        this.rawDataArr = [];
        var maxColumnCount = Math.max.apply(Math, __spreadArray([0], __read(bigRoadData.map(function (row) { return row.length; })), false));
        for (var columnIndex = 0; columnIndex < maxColumnCount; columnIndex++) {
            var currentLength = 0;
            var rawData = [];
            try {
                for (var bigRoadData_1 = (e_1 = void 0, __values(bigRoadData)), bigRoadData_1_1 = bigRoadData_1.next(); !bigRoadData_1_1.done; bigRoadData_1_1 = bigRoadData_1.next()) {
                    var element = bigRoadData_1_1.value;
                    var item = element[columnIndex];
                    if (item.status !== undefined) {
                        if (item.parentColumn === columnIndex) {
                            currentLength += 1;
                            rawData.push(item.status);
                        }
                        else {
                            this.lengthArr[item.parentColumn] += 1;
                            this.rawDataArr[item.parentColumn].push(item.status);
                        }
                        this.indexArr.push({
                            parentColumn: item.parentColumn,
                            order: item.index
                        });
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (bigRoadData_1_1 && !bigRoadData_1_1.done && (_a = bigRoadData_1["return"])) _a.call(bigRoadData_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            this.rawDataArr.push(rawData);
            this.lengthArr.push(currentLength);
        }
        this.indexArr.sort(function (a, b) { return a.order - b.order; });
    };
    DerivedScoreboards.prototype.generateDerivedScoreboardsData = function (rawDataArr, indexArr, lengthArr, beginIndex, colGap) {
        var result = [];
        var currentCol = 0;
        var currentRow = 0;
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
        var colGap = 1;
        var beginIndex = this.getBeginIndexOfDerivedScoreboard(this.bigRoadData, colGap);
        var data = beginIndex === -1 ? [] : this.generateDerivedScoreboardsData(this.rawDataArr, this.indexArr, this.lengthArr, beginIndex, colGap);
        this.updateBoard(data, this.bigEyeBoyKey);
    };
    DerivedScoreboards.prototype.updateSmallRoad = function () {
        var colGap = 2;
        var beginIndex = this.getBeginIndexOfDerivedScoreboard(this.bigRoadData, colGap);
        var data = beginIndex === -1 ? [] : this.generateDerivedScoreboardsData(this.rawDataArr, this.indexArr, this.lengthArr, beginIndex, colGap);
        this.updateBoard(data, this.smallRoadKey);
    };
    DerivedScoreboards.prototype.updateCockroachPig = function () {
        var colGap = 3;
        var beginIndex = this.getBeginIndexOfDerivedScoreboard(this.bigRoadData, colGap);
        var data = beginIndex === -1 ? [] : this.generateDerivedScoreboardsData(this.rawDataArr, this.indexArr, this.lengthArr, beginIndex, colGap);
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
    DerivedScoreboards.prototype.getPrediction = function (isPositive) {
        var rawDataArr = _.cloneDeep(this.rawDataArr);
        var indexArr = _.cloneDeep(this.indexArr);
        var lengthArr = _.cloneDeep(this.lengthArr);
        var lastItem = this.rawDataArr[this.rawDataArr.length - 1][0];
        if (isPositive === lastItem) {
            rawDataArr[rawDataArr.length - 1].push(isPositive);
            indexArr.push({
                order: indexArr.length + 1,
                parentColumn: indexArr[indexArr.length - 1].parentColumn
            });
            lengthArr[lengthArr.length - 1] = lengthArr[lengthArr.length - 1] + 1;
        }
        else {
            rawDataArr.push([isPositive]);
            indexArr.push({
                order: indexArr.length + 1,
                parentColumn: indexArr[indexArr.length - 1].parentColumn + 1
            });
            lengthArr.push(1);
        }
        var result = [];
        for (var colGap = 1; colGap <= 3; colGap++) {
            var beginIndex = this.getBeginIndexOfDerivedScoreboard(this.bigRoadData, colGap);
            if (beginIndex === -1)
                result.push(undefined);
            var data = this.generateDerivedScoreboardsData(rawDataArr, indexArr, lengthArr, beginIndex, colGap);
            result.push(data[data.length - 1]);
        }
        return result;
    };
    return DerivedScoreboards;
}());
exports.DerivedScoreboards = DerivedScoreboards;
