import { SettlementResult } from "./converter";
import { BigRoadScoreboardPoint } from "../big-road";

// compare to 2

export const getSettleResult = (data: number[]) => {
  return data.reduce((result: any, value: number) => {
    const a = { big: value > 2, small: value < 2, tie: value === 2 };
    result.push(a);
    return result;
  }, []);
};

const getData = (data: BigRoadScoreboardPoint<SettlementResult>[]) => {
  let result = "";
  for (const element of data) {
    if (element.isBlink) {
      result += "? ";
    } else {
      if (element.status) {
        result += "+ ";
      } else {
        if (element.status === false) {
          result += "- ";
        } else {
          result += "  ";
        }
      }
    }
  }
  return result;
};

export const consoleLogTable = (data: any) => {
  for (let row = 0; row < 6; row++) {
    console.log(getData(data[row]));
  }
};
