import { DragonTailBoard } from "../dragon-tail";
import { GoodRoad, IGoodRoadDetector } from "./IGoodRoadDetector";

export interface GoodRoadRegexDetectorOptions {
  patterns: RegExp[];
}

export class GoodRoadRegexDetector implements IGoodRoadDetector {
  private readonly patterns: RegExp[];
  private readonly defaultResult = { x: -1, width: 0, height: 0 };

  constructor(options: GoodRoadRegexDetectorOptions) {
    this.patterns = options.patterns;
  }

  detect(input: boolean[], board: DragonTailBoard): GoodRoad {
    const line = input.map((status) => Number(status)).join("");

    return this.patterns.reduce((result: GoodRoad, pattern) => {
      if (result.x >= 0) {
        return result;
      }

      const detected = this.detectSinglePattern(line, board, pattern);

      if (detected.x >= 0) {
        return detected;
      }

      return result;
    }, this.defaultResult);
  }

  detectSinglePattern(line: string, board: DragonTailBoard, regex: RegExp): GoodRoad {
    const result = line.match(regex);
    const { prefix, goodRoad } = result?.groups ?? { prefix: "", goodRoad: "" };
    const detectedLength = prefix.length + goodRoad.length;

    if (detectedLength === line.length) {
      const start = prefix.length;
      const end = prefix.length + goodRoad.length - 1;

      return this.getGoodRoad(start, end, board);
    }

    return this.defaultResult;
  }

  protected getGoodRoad(start: number, end: number, board: DragonTailBoard): GoodRoad {
    if (end - start < 0) {
      return this.defaultResult;
    }
    const [startX, startY] = board.getPosition(start);
    const [endX, endY] = [...Array(end - start).entries()].reduce(
      ([x, y], _, index) => {
        const [currentX, currentY] = board.getPosition(start + index + 1);

        return [Math.max(x, currentX), Math.max(y, currentY)];
      },
      [startX, startY]
    );

    return {
      x: startX,
      width: endX - startX + 1,
      height: endY - startY + 1,
    };
  }
}
