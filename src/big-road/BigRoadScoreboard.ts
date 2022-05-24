import { IConverter } from "../IConverter";
import { DragonTailBoard } from "../dragon-tail";

export interface BigRoadScoreboardOptions<T> {
  height: number;
  converter: IConverter<T>;
}

export interface BigRoadScoreboardPoint<T> {
  x: number;
  y: number;
  status: boolean | undefined;
  data: T[];
  index: number;
  parentColumn: number;
}

export class BigRoadScoreboard<InputType> {
  private readonly dragonTailBoard: DragonTailBoard;
  private readonly converter: IConverter<InputType>;

  private input: InputType[];
  private groups: boolean[];

  constructor(options: BigRoadScoreboardOptions<InputType>) {
    this.dragonTailBoard = new DragonTailBoard(options);
    this.converter = options.converter;
    this.input = [];
    this.groups = [];
  }

  initialize(input: InputType[]): void {
    this.input = input;
    this.loadDragonTailBoard();
  }

  fifo(record: InputType): void {
    // first in first out
    if (this.input.length) {
      this.input.shift();
      this.input.push(record);
      this.loadDragonTailBoard();
    }
  }

  rows(): BigRoadScoreboardPoint<InputType>[][] {
    const groups = this.converter.group(this.input);
    const width = this.width();
    const height = this.height();
    const result: BigRoadScoreboardPoint<InputType>[][] = [];

    for (let row = 0; row < height; row++) {
      const rowData: BigRoadScoreboardPoint<InputType>[] = [];

      for (let column = 0; column < width; column++) {
        const status = this.dragonTailBoard.getStatus(column, row);
        const index = this.dragonTailBoard.getIndex(column, row) ?? -1;
        const parentColumn = this.dragonTailBoard.getParentColumn(column, row) ?? -1;

        rowData.push({
          data: index !== -1 ? groups[index] : [],
          x: column,
          y: row,
          status,
          index,
          parentColumn,
        });
      }

      result.push(rowData);
    }

    return result;
  }

  width(): number {
    return this.dragonTailBoard.getWidth();
  }

  height(): number {
    return this.dragonTailBoard.getHeight();
  }

  private loadDragonTailBoard(): void {
    const groups = this.converter.group(this.input);

    this.groups = groups.map((group) => this.converter.convert(group)); /// [true,false,true]

    this.dragonTailBoard.clear();

    const lengthGroups = this.groups.length;
    for (let i = 0; i < lengthGroups; i++) {
      const isEndTail = this.groups[i] != this.groups[i + 1];
      this.dragonTailBoard.addNode(this.groups[i], isEndTail);
    }
  }
}
