"use strict";
exports.__esModule = true;
exports.DragonTailPosition = void 0;
var DragonTailPosition = /** @class */ (function () {
    function DragonTailPosition(options) {
        var _a;
        this.x = options.x;
        this.y = options.y;
        this.parentColumn = (_a = options.parentColumn) !== null && _a !== void 0 ? _a : options.x;
    }
    DragonTailPosition.getInstance = function (x, y) {
        return new DragonTailPosition({ x: x, y: y });
    };
    DragonTailPosition.prototype.getName = function () {
        return "".concat(this.x, "-").concat(this.y);
    };
    DragonTailPosition.prototype.getBottom = function () {
        return new DragonTailPosition({ x: this.x, y: this.y + 1, parentColumn: this.parentColumn });
    };
    DragonTailPosition.prototype.getRight = function () {
        return new DragonTailPosition({ x: this.x + 1, y: this.y, parentColumn: this.parentColumn });
    };
    DragonTailPosition.prototype.getLeft = function () {
        return new DragonTailPosition({ x: this.x - 1, y: this.y, parentColumn: this.parentColumn });
    };
    DragonTailPosition.prototype.isValid = function (height) {
        return this.x >= 0 && this.y < height;
    };
    return DragonTailPosition;
}());
exports.DragonTailPosition = DragonTailPosition;
