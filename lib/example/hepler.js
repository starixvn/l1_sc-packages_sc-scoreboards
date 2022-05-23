"use strict";
exports.__esModule = true;
exports.renderTable = exports.getSettleResult = void 0;
// compare to 2
var getSettleResult = function (data) {
    return data.reduce(function (result, value) {
        var a = { big: value > 2, small: value < 2, tie: value === 2 };
        result.push(a);
        return result;
    }, []);
};
exports.getSettleResult = getSettleResult;
var renderTable = function (data) {
    var result = "<table>";
    var length = data[0].length;
    for (var column = 0; column < length; column++) {
        result += "<tr>";
        for (var row = 0; row < 6; row++) {
            var node = data[row][column];
            result += "<td>".concat(node.status, "</td>");
        }
        result += "</tr>";
    }
    return result + "</table>";
};
exports.renderTable = renderTable;
