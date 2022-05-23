"use strict";
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
exports.consoleLogTable = exports.getSettleResult = void 0;
// compare to 2
var getSettleResult = function (data) {
    return data.reduce(function (result, value) {
        var a = { big: value > 2, small: value < 2, tie: value === 2 };
        result.push(a);
        return result;
    }, []);
};
exports.getSettleResult = getSettleResult;
var getData = function (data) {
    var e_1, _a;
    var result = "";
    try {
        for (var data_1 = __values(data), data_1_1 = data_1.next(); !data_1_1.done; data_1_1 = data_1.next()) {
            var element = data_1_1.value;
            if (element.status) {
                result += "+ ";
            }
            else {
                if (element.status === false) {
                    result += "- ";
                }
                else {
                    result += "  ";
                }
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (data_1_1 && !data_1_1.done && (_a = data_1["return"])) _a.call(data_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return result;
};
var consoleLogTable = function (data) {
    for (var row = 0; row < 6; row++) {
        console.log(getData(data[row]));
    }
};
exports.consoleLogTable = consoleLogTable;
