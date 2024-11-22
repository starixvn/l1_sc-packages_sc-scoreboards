import { DragonTailBoard } from "../dragon-tail";
import { GoodRoad, IGoodRoadDetector } from "./IGoodRoadDetector";

export interface ColumnLengthPattern {
  columns: { length: number; exact: boolean }[];
  repeat?: boolean;
  name?: string;
  positive?: boolean;
}

export interface GoodRoadColumnLengthDetectorOptions {
  patterns: ColumnLengthPattern[];
}

export function buildPattern(base: ColumnLengthPattern, positive: boolean) {
  return Object.assign({}, base, { positive });
}

export class GoodRoadColumnLengthDetectorDetector implements IGoodRoadDetector {
  private patterns: ColumnLengthPattern[];
  private readonly defaultResult = { x: -1, width: 0, height: 0 };

  constructor(options: GoodRoadColumnLengthDetectorOptions) {
    this.patterns = options.patterns;
  }

  updatePatterns(patterns: ColumnLengthPattern[]) {
    this.patterns = patterns;
  }

  detect(input: boolean[], board: DragonTailBoard): GoodRoad {
    const columns = this.getColumns(board);

    return this.patterns.reduce((result: GoodRoad, pattern) => {
      if (result.x >= 0) {
        return result;
      }

      const detected = this.detectSinglePattern(pattern, columns, board);
      const positive = pattern.positive;
      if (detected.x >= 0) {
        if (typeof positive === "undefined") {
          return detected;
        }

        const firstNode = board.getNodeByIndex(columns[detected.x][0]);
        if (firstNode?.positive === positive) {
          return detected;
        }
      }

      return result;
    }, this.defaultResult);
  }

  detectSinglePattern(pattern: ColumnLengthPattern, columns: number[][], board: DragonTailBoard): GoodRoad {
    const columnLengths = columns.map((column) => column.length);

    if (columns.length > 0) {
      const lastColumn = columns[columns.length - 1];
      if (lastColumn.length > 0) {
        const lastNode = board.getNodeByIndex(lastColumn[lastColumn.length - 1]);
        if (lastNode?.isBlink) {
          columnLengths[columns.length - 1] -= 1;
        }
      }
    }

    const selectedColumns = this.findMatchingColumns(pattern, columnLengths);

    if (!this.hasEnoughMatchingColumns(selectedColumns, pattern)) {
      return this.defaultResult;
    }

    const allEntries = this.getAllEntriesFromColumns(selectedColumns, columns);

    if (!allEntries.length) {
      return this.defaultResult;
    }

    return this.createGoodRoadFromEntries(allEntries, board, pattern.name);
  }

  private findMatchingColumns(pattern: ColumnLengthPattern, columnLengths: number[]): number[] {
    const patternColumns = pattern.columns;
    const selectedColumns: number[] = [];
    for (let startIndex = 0; startIndex < columnLengths.length; startIndex++) {
      let isMatch = this.checkBeginPattern(patternColumns, startIndex, columnLengths);

      if (isMatch) {
        isMatch = this.checkMatchedToTheEnd(pattern, startIndex, patternColumns, columnLengths);
      }

      if (isMatch) {
        for (let i = startIndex; i < columnLengths.length; i++) {
          selectedColumns.push(i);
        }
        break;
      }
    }

    return selectedColumns;
  }

  private checkMatchedToTheEnd(
    pattern: ColumnLengthPattern,
    startIndex: number,
    patternColumns: { length: number; exact: boolean }[],
    columnLengths: number[]
  ) {
    let isMatch = true;
    if (!pattern.repeat) {
      return startIndex + patternColumns.length === columnLengths.length;
    }

    for (let i = startIndex + patternColumns.length; i < columnLengths.length; i++) {
      const length = columnLengths[i];
      const patternColumn = patternColumns[(i - startIndex) % patternColumns.length];

      if (!this.isMatchPattern(length, patternColumn)) {
        isMatch = false;
        break;
      }
    }
    return isMatch;
  }

  private checkBeginPattern(patternColumns: { length: number; exact: boolean }[], startIndex: number, columnLengths: number[]) {
    let isMatch = true;

    for (let i = 0; i < patternColumns.length; i++) {
      const columnIndex = startIndex + i;
      if (columnIndex >= columnLengths.length) {
        isMatch = false;
        break;
      }

      const length = columnLengths[columnIndex];
      const patternColumn = patternColumns[i];

      if (!this.isMatchPattern(length, patternColumn)) {
        isMatch = false;
        break;
      }
    }
    return isMatch;
  }

  private getPatternColumnForIndex(pattern: ColumnLengthPattern, index: number): { length: number; exact: boolean } | null {
    if (index < pattern.columns.length) {
      return pattern.columns[index];
    }

    if (pattern.repeat) {
      return pattern.columns[index % pattern.columns.length];
    }

    return null;
  }

  private hasEnoughMatchingColumns(selectedColumns: number[], pattern: ColumnLengthPattern): boolean {
    return selectedColumns.length >= pattern.columns.length;
  }

  private getAllEntriesFromColumns(selectedColumns: number[], columns: number[][]): number[] {
    return selectedColumns.reduce((acc, index) => acc.concat(columns[index]), [] as number[]);
  }

  private createGoodRoadFromEntries(entries: number[], board: DragonTailBoard, name?: string): GoodRoad {
    const start = Math.min(...entries);
    const end = Math.max(...entries);

    return this.getGoodRoad(start, end, board, name);
  }
  private isMatchPattern(length: number, pattern: { length: number; exact: boolean }): boolean {
    if (pattern.exact) {
      return length === pattern.length;
    }
    return length >= pattern.length;
  }

  protected getColumns(board: DragonTailBoard): number[][] {
    const columns: number[][] = [];

    for (let x = board.getWidth() - 1; x > -1; x--) {
      const column = [];
      for (let y = 0; y < board.size(); y++) {
        const index = board.getIndex(x, y);

        if (index !== undefined) {
          column.push(index);
        }
      }

      columns.push(column);
    }

    columns.reverse();
    return columns;
  }

  protected getGoodRoad(start: number, end: number, board: DragonTailBoard, name?: string): GoodRoad {
    const [startX, startY] = board.getPosition(start);
    const [endX, endY] = [...Array(end - start).entries()].reduce(
      ([x, y], _, index) => {
        const [currentX, currentY] = board.getPosition(start + index + 1);

        return [Math.max(x, currentX), Math.max(y, currentY)];
      },
      [startX, startY]
    );

    return {
      name,
      x: startX,
      width: endX - startX + 1,
      height: endY - startY + 1,
    };
  }
}
