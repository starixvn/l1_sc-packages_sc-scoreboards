"use strict";
exports.__esModule = true;
exports.BigRoadScoreboard = void 0;
var dragon_tail_1 = require("../dragon-tail");
var BigRoadScoreboard = /** @class */ (function () {
    function BigRoadScoreboard(options) {
        this.dragonTailBoard = new dragon_tail_1.DragonTailBoard(options);
        this.converter = options.converter;
        this.input = [];
        this.groups = [];
    }
    BigRoadScoreboard.prototype.initialize = function (input) {
        this.input = input;
        this.loadDragonTailBoard();
    };
    BigRoadScoreboard.prototype.fifo = function (record) {
        // first in first out
        if (this.input.length) {
            this.input.shift();
            this.input.push(record);
            this.loadDragonTailBoard();
        }
    };
    BigRoadScoreboard.prototype.rows = function () {
        var _a, _b;
        var groups = this.converter.group(this.input);
        var width = this.width();
        var height = this.height();
        var result = [];
        for (var row = 0; row < height; row++) {
            var rowData = [];
            for (var column = 0; column < width; column++) {
                var status_1 = this.dragonTailBoard.getStatus(column, row);
                var index = (_a = this.dragonTailBoard.getIndex(column, row)) !== null && _a !== void 0 ? _a : -1;
                var parentColumn = (_b = this.dragonTailBoard.getParentColumn(column, row)) !== null && _b !== void 0 ? _b : -1;
                rowData.push({
                    data: index !== -1 ? groups[index] : [],
                    x: column,
                    y: row,
                    status: status_1,
                    index: index,
                    parentColumn: parentColumn
                });
            }
            result.push(rowData);
        }
        return result;
    };
    BigRoadScoreboard.prototype.width = function () {
        return this.dragonTailBoard.getWidth();
    };
    BigRoadScoreboard.prototype.height = function () {
        return this.dragonTailBoard.getHeight();
    };
    BigRoadScoreboard.prototype.loadDragonTailBoard = function () {
        var _this = this;
        var groups = this.converter.group(this.input);
        this.groups = groups.map(function (group) { return _this.converter.convert(group); }); /// [true,false,true]
        this.dragonTailBoard.clear();
        var lengthGroups = this.groups.length;
        for (var i = 0; i < lengthGroups; i++) {
            var isEndTail = this.groups[i] != this.groups[i + 1];
            this.dragonTailBoard.addNode(this.groups[i], isEndTail);
        }
    };
    return BigRoadScoreboard;
}());
exports.BigRoadScoreboard = BigRoadScoreboard;
