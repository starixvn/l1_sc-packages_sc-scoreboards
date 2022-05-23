import { BigRoadScoreboardPoint } from "../big-road/BigRoadScoreboard";
import { DragonTailBoard, DragonTailBoardOptions } from "../dragon-tail";
import * as _ from "lodash";

interface DerivedScoreboardPoint {
  column: number;
  row: number;
  status: boolean | undefined;
}

interface IndexItem {
  readonly rowIndex: number;
  readonly columnIndex: number;
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

  private bigRoadData: BigRoadScoreboardPoint<SettlementResult>[][];

  constructor(options: DragonTailBoardOptions) {
    this.bigEyeBoy = new DragonTailBoard(options);
    this.smallRoad = new DragonTailBoard(options);
    this.cockroachPig = new DragonTailBoard(options);
    this.bigRoadData = [];
  }

  update(bigRoadData: BigRoadScoreboardPoint<SettlementResult>[][]) {
    this.bigRoadData = bigRoadData;
    this.updateBigEyeBoy();
    this.updateSmallRoad();
    this.updateCockroachPig();
  }

  getBeginIndexOfDerivedScoreboard(bigRoadData: BigRoadScoreboardPoint<SettlementResult>[][], colGap: number): number {
    const item1 = bigRoadData[1][colGap];
    const item2 = bigRoadData[0][colGap + 1];
    if (item1.status !== undefined) {
      return item1.index;
    } else if (item2.status !== undefined) {
      return item2.index;
    } else {
      return -1;
    }
  }

  generateDerivedScoreboardsData(bigRoadData: BigRoadScoreboardPoint<SettlementResult>[][], colGap: number) {
    const maxColumnCount = Math.max(0, ...bigRoadData.map((row) => row.length));

    const indexArr: IndexItem[] = [];
    const lengthArr: number[] = [];
    const rawDataArr: boolean[][] = [];

    let beginIndex: number = this.getBeginIndexOfDerivedScoreboard(bigRoadData, colGap);
    if (beginIndex === -1) return [];

    for (let columnIndex = 0; columnIndex < maxColumnCount; columnIndex++) {
      let currentLength = 0;
      const rawData = [];
      for (let rowIndex = 0; rowIndex < bigRoadData.length; rowIndex++) {
        const item = bigRoadData[rowIndex][columnIndex];
        if (item.status !== undefined) {
          if (item.parentColumn === columnIndex) {
            currentLength += 1;
            rawData.push(item.status);
          } else {
            lengthArr[item.parentColumn] += 1;
            rawDataArr[item.parentColumn].push(item.status);
          }
          indexArr.push({
            rowIndex: rowIndex,
            columnIndex: columnIndex,
            parentColumn: item.parentColumn,
            order: item.index,
          });
        }
      }
      rawDataArr.push(rawData);
      lengthArr.push(currentLength);
    }

    return this.compareWithOtherCol(rawDataArr, indexArr, lengthArr, beginIndex, colGap);
  }

  compareWithOtherCol(rawDataArr: boolean[][], indexArr: IndexItem[], lengthArr: number[], beginIndex: number, colGap: number) {
    const result: boolean[] = [];
    let currentCol = 0;
    let currentRow = 0;
    indexArr.sort((a, b) => a.order - b.order);
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
          const lastItem = rawDataArr[currentCol - colGap][currentRow - 1];
          const targetItem = rawDataArr[currentCol - colGap][currentRow];
          result.push(lastItem === undefined || targetItem !== undefined);
        }
      }
    });
    return result;
  }

  updateBigEyeBoy() {
    const data = this.generateDerivedScoreboardsData(this.bigRoadData, 1);
    this.updateBoard(data, this.bigEyeBoyKey);
  }

  updateSmallRoad() {
    const data = this.generateDerivedScoreboardsData(this.bigRoadData, 2);
    this.updateBoard(data, this.smallRoadKey);
  }

  updateCockroachPig() {
    const data = this.generateDerivedScoreboardsData(this.bigRoadData, 3);
    this.updateBoard(data, this.cockroachPigKey);
  }

  updateBoard(data: boolean[], boardKey: "bigEyeBoy" | "smallRoad" | "cockroachPig") {
    const lengthGroups = data.length;
    for (let i = 0; i < lengthGroups; i++) {
      const isEndTail = data[i] != data[i + 1];
      this[boardKey].addNode(data[i], isEndTail);
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
        rowData.push({
          column,
          row,
          status,
        });
      }

      result.push(rowData);
    }

    return result;
  }
}
