import { BigRoadScoreboardPoint } from "../big-road/BigRoadScoreboard";
import { DragonTailBoard, DragonTailBoardOptions } from "../dragon-tail";
import * as _ from "lodash";

export interface DerivedScoreboardPoint {
  column: number;
  row: number;
  status: boolean | undefined;
  isBlink?: boolean;
}

interface IndexItem {
  readonly order: number;
  readonly parentColumn: number;
}

export class DerivedScoreboards<SettlementResult> {
  private readonly bigEyeBoy: DragonTailBoard;
  private readonly smallRoad: DragonTailBoard;
  private readonly cockroachPig: DragonTailBoard;

  private readonly bigEyeBoyKey = "bigEyeBoy";
  private readonly smallRoadKey = "smallRoad";
  private readonly cockroachPigKey = "cockroachPig";

  private indexArr: IndexItem[] = [];
  private lengthArr: number[] = [];
  private rawDataArr: boolean[][] = [];

  constructor(options: DragonTailBoardOptions) {
    this.bigEyeBoy = new DragonTailBoard(options);
    this.smallRoad = new DragonTailBoard(options);
    this.cockroachPig = new DragonTailBoard(options);
  }

  update(bigRoadData: BigRoadScoreboardPoint<SettlementResult>[][], hasBlinkNode = false) {
    this.transformDataFromBigRoadData(bigRoadData);
    this.updateBigEyeBoy(hasBlinkNode);
    this.updateSmallRoad(hasBlinkNode);
    this.updateCockroachPig(hasBlinkNode);
  }

  getBeginIndexOfDerivedScoreboard(rawDataArr: boolean[][], colGap: number): number {
    const item1 = rawDataArr[colGap]?.[1];
    const item2 = rawDataArr[colGap + 1]?.[0];
    if (item1 !== undefined) {
      let index = 0;
      let column = colGap;
      while (column > 0) {
        index += rawDataArr[column - 1].length;
        column--;
      }
      return index + 1;
    } else {
      if (item2 !== undefined) {
        let index = 0;
        let column = colGap;
        while (column >= 0) {
          index += rawDataArr[column].length;
          column--;
        }
        return index;
      }
    }
    return -1;
  }

  transformDataFromBigRoadData(bigRoadData: BigRoadScoreboardPoint<SettlementResult>[][]) {
    this.indexArr = [];
    this.lengthArr = [];
    this.rawDataArr = [];
    const maxColumnCount = Math.max(0, ...bigRoadData.map((row) => row.length));

    for (let columnIndex = 0; columnIndex < maxColumnCount; columnIndex++) {
      let currentLength = 0;
      const rawData = [];
      for (const element of bigRoadData) {
        const item = element[columnIndex];
        if (item.status !== undefined && !item.isBlink) {
          if (item.parentColumn === columnIndex) {
            currentLength += 1;
            rawData.push(item.status);
          } else {
            this.lengthArr[item.parentColumn] += 1;
            this.rawDataArr[item.parentColumn].push(item.status);
          }
          this.indexArr.push({
            parentColumn: item.parentColumn,
            order: item.index,
          });
        }
      }
      this.rawDataArr.push(rawData);
      this.lengthArr.push(currentLength);
    }
    this.indexArr.sort((a, b) => a.order - b.order);
  }

  generateDerivedScoreboardsData(rawDataArr: boolean[][], indexArr: IndexItem[], lengthArr: number[], beginIndex: number, colGap: number) {
    const result: boolean[] = [];
    let currentCol = 0;
    let currentRow = 0;
    indexArr.forEach((item) => {
      if (currentCol === item.parentColumn) {
        currentRow += 1;
      } else {
        currentRow = 0;
        currentCol = item.parentColumn;
      }
      if (item.order >= beginIndex) {
        if (currentRow === 0) {
          result.push(lengthArr[currentCol - colGap - 1] === lengthArr[currentCol - 1]);
        } else {
          const lastItem = rawDataArr[currentCol - colGap]?.[currentRow - 1];
          const targetItem = rawDataArr[currentCol - colGap]?.[currentRow];
          result.push(lastItem === undefined || targetItem !== undefined);
        }
      }
    });
    return result;
  }

  updateBigEyeBoy(hasBlinkNode: boolean) {
    const colGap = 1;
    const data = this.getDerivedScoreboardsData(colGap, hasBlinkNode);
    this.updateBoard(data, this.bigEyeBoyKey, hasBlinkNode);
  }

  updateSmallRoad(hasBlinkNode: boolean) {
    const colGap = 2;
    const data = this.getDerivedScoreboardsData(colGap, hasBlinkNode);
    this.updateBoard(data, this.smallRoadKey, hasBlinkNode);
  }

  updateCockroachPig(hasBlinkNode: boolean) {
    const colGap = 3;
    const data = this.getDerivedScoreboardsData(colGap, hasBlinkNode);
    this.updateBoard(data, this.cockroachPigKey, hasBlinkNode);
  }

  private getDerivedScoreboardsData(colGap: number, hasBlinkNode: boolean) {
    const beginIndex = this.getBeginIndexOfDerivedScoreboard(this.rawDataArr, colGap);
    if (beginIndex === -1) {
      return hasBlinkNode && this.rawDataArr?.[colGap]?.[0] !== undefined ? [true] : [];
    }
    const data = this.generateDerivedScoreboardsData(this.rawDataArr, this.indexArr, this.lengthArr, beginIndex, colGap);
    return hasBlinkNode ? [...data, data?.[data.length - 1] || true] : data;
  }

  updateBoard(data: boolean[], boardKey: "bigEyeBoy" | "smallRoad" | "cockroachPig", hasBlinkNode: boolean) {
    const lengthGroups = data.length;
    this[boardKey].clear();
    for (let i = 0; i < lengthGroups; i++) {
      const isEndTail = data[i] != data[i + 1];
      this[boardKey].addNode(data[i], isEndTail, hasBlinkNode && i === lengthGroups - 1);
    }
  }

  getScoreboardData(key: "bigEyeBoy" | "smallRoad" | "cockroachPig") {
    const width = this[key].getWidth();
    const height = this[key].getHeight();
    const result = [];
    for (let row = 0; row < height; row++) {
      const rowData: DerivedScoreboardPoint[] = [];

      for (let column = 0; column < width; column++) {
        const status = this[key].getStatus(column, row);
        const isBlink = this[key].getIsBlink(column, row) ?? false;

        rowData.push({
          column,
          row,
          status,
          isBlink,
        });
      }

      result.push(rowData);
    }
    return result;
  }

  getPrediction(isPositive: boolean) {
    if (this.rawDataArr.length < 2) {
      return [undefined, undefined, undefined];
    }
    let rawDataArr: boolean[][] = _.cloneDeep(this.rawDataArr);
    let indexArr: IndexItem[] = _.cloneDeep(this.indexArr);
    let lengthArr: number[] = _.cloneDeep(this.lengthArr);
    const lastIndex = [...this.rawDataArr].reverse().findIndex((a) => a.length > 0);
    const lastItem = this.rawDataArr[this.rawDataArr.length - 1 - lastIndex]?.[0];
    if (isPositive === lastItem) {
      rawDataArr[rawDataArr.length - 1 - lastIndex].push(isPositive);
      indexArr.push({
        order: indexArr.length + 1,
        parentColumn: indexArr[indexArr.length - 1].parentColumn,
      });
      lengthArr[lengthArr.length - 1] = lengthArr[lengthArr.length - 1] + 1;
    } else {
      if (rawDataArr[rawDataArr.length - lastIndex]) {
        rawDataArr[rawDataArr.length - lastIndex].push(isPositive);
      } else {
        rawDataArr.push([isPositive]);
      }
      indexArr.push({
        order: indexArr.length + 1,
        parentColumn: indexArr[indexArr.length - 1].parentColumn + 1,
      });
      lengthArr.push(1);
    }

    const result = [];
    for (let colGap = 1; colGap <= 3; colGap++) {
      const beginIndex: number = this.getBeginIndexOfDerivedScoreboard(rawDataArr, colGap);
      if (beginIndex === -1) {
        result.push(undefined);
      } else {
        const data = this.generateDerivedScoreboardsData(rawDataArr, indexArr, lengthArr, beginIndex, colGap);
        result.push(data[data.length - 1]);
      }
    }

    return result;
  }
}
