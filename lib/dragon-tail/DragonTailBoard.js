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
exports.DragonTailBoard = void 0;
var DragonTailPosition_1 = require("./DragonTailPosition");
var DragonTailBoard = /** @class */ (function () {
    function DragonTailBoard(options) {
        this.minimumHeight = 2;
        this.height = options.height >= this.minimumHeight ? options.height : this.minimumHeight;
        this.nodes = new Map();
        this.positivePosition = DragonTailPosition_1.DragonTailPosition.getInstance(0, 0);
        this.negativePosition = DragonTailPosition_1.DragonTailPosition.getInstance(0, 0);
        this.index = 0;
    }
    DragonTailBoard.prototype.getStatus = function (x, y) {
        var position = DragonTailPosition_1.DragonTailPosition.getInstance(x, y);
        var node = this.nodes.get(position.getName());
        return node === null || node === void 0 ? void 0 : node.positive;
    };
    DragonTailBoard.prototype.getIndex = function (x, y) {
        var position = DragonTailPosition_1.DragonTailPosition.getInstance(x, y);
        var node = this.nodes.get(position.getName());
        return node === null || node === void 0 ? void 0 : node.index;
    };
    DragonTailBoard.prototype.getParentColumn = function (x, y) {
        var position = DragonTailPosition_1.DragonTailPosition.getInstance(x, y);
        var node = this.nodes.get(position.getName());
        return node === null || node === void 0 ? void 0 : node.parentColumn;
    };
    DragonTailBoard.prototype.getPosition = function (index) {
        var values = __spreadArray([], __read(this.nodes.values()), false);
        var node = values.find(function (value) { return value.index === index; });
        return node ? [node.position.x, node.position.y] : [];
    };
    DragonTailBoard.prototype.getHeight = function () {
        return this.height;
    };
    DragonTailBoard.prototype.getWidth = function () {
        var keys = __spreadArray([], __read(this.nodes.keys()), false);
        var maxX = Math.max.apply(Math, __spreadArray([], __read(keys.map(function (key) { return Number(key.split("-")[0]); })), false));
        return maxX + 1;
    };
    DragonTailBoard.prototype.setHeight = function (height) {
        if (this.height !== height && this.minimumHeight <= height) {
            this.height = height;
            var nodes = __spreadArray([], __read(this.nodes.values()), false).sort(function (a, b) { return a.index - b.index; });
            var values = nodes.map(function (node) { return node.positive; });
            this.clear();
            var lengthGroups = values.length;
            for (var i = 0; i < lengthGroups; i++) {
                var isEndTail = values[i] != values[i + 1];
                this.addNode(values[i], isEndTail);
            }
        }
    };
    DragonTailBoard.prototype.addNode = function (positive, isEndTail) {
        var position = positive ? this.positivePosition : this.negativePosition;
        var node = {
            positive: positive,
            position: position,
            index: this.index,
            isEndTail: isEndTail,
            parentColumn: position.parentColumn
        };
        this.nodes.set(node.position.getName(), node);
        this.updateNextPositions(node, positive);
    };
    DragonTailBoard.prototype.size = function () {
        return this.index;
    };
    DragonTailBoard.prototype.clear = function () {
        this.nodes = new Map();
        this.positivePosition = DragonTailPosition_1.DragonTailPosition.getInstance(0, 0);
        this.negativePosition = DragonTailPosition_1.DragonTailPosition.getInstance(0, 0);
        this.index = 0;
    };
    DragonTailBoard.prototype.updateNextPositions = function (node, positive) {
        var positionKey = positive ? "positivePosition" : "negativePosition";
        var oppositePositionKey = positive ? "negativePosition" : "positivePosition";
        var nextPosition = this.getNextPosition(node);
        var innerWidth = this.getInnerWidth();
        var nextOppositePosition = DragonTailPosition_1.DragonTailPosition.getInstance(innerWidth, 0);
        this[positionKey] = nextPosition;
        this[oppositePositionKey] = nextOppositePosition;
        this.index += 1;
    };
    DragonTailBoard.prototype.getInnerWidth = function () {
        var keys = __spreadArray([], __read(this.nodes.keys()), false);
        var firstRow = keys.filter(function (key) { return key.match(/[0-9]*-0/); });
        var maxX = Math.max.apply(Math, __spreadArray([], __read(firstRow.map(function (key) { return Number(key.split("-")[0]); })), false));
        return maxX + 1;
    };
    DragonTailBoard.prototype.getNextPosition = function (current) {
        var _a, _b;
        var bottom = current.position.getBottom();
        var right = current.position.getRight();
        var bottomLeft = bottom.getLeft();
        var isBottomValid = bottom.isValid(this.height);
        var isBottomEmpty = !this.nodes.has(bottom.getName());
        var bottomLeftHasDifferenceValue = ((_a = this.nodes.get(bottomLeft.getName())) === null || _a === void 0 ? void 0 : _a.positive) !== current.positive;
        var endTailBottomLef = (_b = this.nodes.get(bottomLeft.getName())) === null || _b === void 0 ? void 0 : _b.isEndTail;
        var isBottomLefNotEndTail = endTailBottomLef === false;
        var combineCase = bottomLeftHasDifferenceValue || isBottomLefNotEndTail;
        if (isBottomValid && isBottomEmpty && combineCase) {
            return bottom;
        }
        else {
            return right;
        }
    };
    return DragonTailBoard;
}());
exports.DragonTailBoard = DragonTailBoard;
