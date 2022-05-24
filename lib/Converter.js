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
exports.Converter = void 0;
var Converter = /** @class */ (function () {
    function Converter() {
    }
    Converter.prototype.positiveKey = function () {
        return "banker";
    };
    Converter.prototype.specialKey = function () {
        return "tie";
    };
    Converter.prototype.convert = function (group) {
        var _this = this;
        return group.filter(function (result) { return result[_this.positiveKey()]; }).length !== 0;
    };
    Converter.prototype.group = function (items) {
        var _this = this;
        var groups = this.mergeSpecialIntoOtherGroups(items);
        var firstGroup = groups[0] || [];
        var isSpecialGroup = firstGroup.length && firstGroup.filter(function (round) { return round[_this.specialKey()]; }).length === firstGroup.length;
        if (isSpecialGroup) {
            var secondGroup = groups[1] || [];
            groups.shift();
            secondGroup.push.apply(secondGroup, __spreadArray([], __read(firstGroup), false));
        }
        return groups;
    };
    Converter.prototype.mergeSpecialIntoOtherGroups = function (items) {
        var _this = this;
        var reducer = function (groups, round) {
            if (groups.length && round[_this.specialKey()]) {
                groups[groups.length - 1].push(round);
            }
            else {
                groups.push([round]);
            }
            return groups;
        };
        return items.reduce(reducer, []);
    };
    return Converter;
}());
exports.Converter = Converter;
