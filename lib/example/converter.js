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
var Converter = /** @class */ (function () {
    function Converter() {
    }
    Converter.prototype.convert = function (group) {
        return group.filter(function (result) { return result.big; }).length !== 0;
    };
    Converter.prototype.group = function (items) {
        var groups = this.mergeTieIntoOtherGroups(items);
        var firstGroup = groups[0] || [];
        var isTieGroup = firstGroup.length && firstGroup.filter(function (round) { return round.tie; }).length === firstGroup.length;
        if (isTieGroup) {
            var secondGroup = groups[1] || [];
            groups.shift();
            secondGroup.push.apply(secondGroup, __spreadArray([], __read(firstGroup), false));
        }
        return groups;
    };
    Converter.prototype.mergeTieIntoOtherGroups = function (items) {
        var reducer = function (groups, round) {
            if (groups.length && round.tie) {
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
exports["default"] = Converter;
