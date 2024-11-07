import { DragonTailBoard } from "../dragon-tail";
import { GoodRoad, IGoodRoadDetector } from "./IGoodRoadDetector";

export interface ColumnLengthPattern {
  columns: { length: number; exact: boolean }[];
  repeat: number;
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
  private readonly patterns: ColumnLengthPattern[];
  private readonly defaultResult = { x: -1, width: 0, height: 0 };

  constructor(options: GoodRoadColumnLengthDetectorOptions) {
    this.patterns = options.patterns;
  }

  detect(input: boolean[], board: DragonTailBoard): GoodRoad {
    const columns = this.getColumns(board);

    return this.patterns.reduce((result: GoodRoad, pattern) => {
      if (result.x >= 0) {
        return result;
      }

      const detected = this.detectSinglePattern(pattern, columns, board);
      const positive = pattern.positive;

      if (detected.x >= 0 && (typeof positive === "undefined" || board.getNodeByIndex(detected.x)?.positive === positive)) {
        return detected;
      }

      return result;
    }, this.defaultResult);
  }

  detectSinglePattern(pattern: ColumnLengthPattern, columns: number[][], board: DragonTailBoard): GoodRoad {
    const columnLengths = columns.map((column) => column.length);
    const repeat = <T>(data: T[], times = 1) => [...Array(times)].map(() => data).reduce((acc, val) => acc.concat(val), []);
    const patternColumns = repeat(pattern.columns, pattern.repeat || 1);

    const selectedColumns = columnLengths.reduce((result, length, index) => {
      if (patternColumns.length > index && result.length === index) {
        const patternColumn = patternColumns[index];

        if ((patternColumn.exact && patternColumn.length === length) || (!patternColumn.exact && patternColumn.length <= length)) {
          result.push(index);
        }
      }

      return result;
    }, [] as number[]);

    if (selectedColumns.length >= pattern.columns.length) {
      const allEntries = selectedColumns.reduce((acc, index) => acc.concat(columns[index]), [] as number[]);

      if (allEntries.length) {
        const start = Math.min(...allEntries);
        const end = Math.max(...allEntries);

        return this.getGoodRoad(start, end, board, pattern.name);
      }
    }

    return this.defaultResult;
  }

  protected getColumns(board: DragonTailBoard): number[][] {
    const height = board.getHeight();
    const columns: number[][] = [];

    board.setHeight(board.size());

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

    board.setHeight(height);

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
