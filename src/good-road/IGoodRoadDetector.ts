import { DragonTailBoard } from "../dragon-tail";

export interface GoodRoad {
  name?: string;
  x: number;
  width: number;
  height: number;
}

export interface IGoodRoadDetector {
  detect(input: boolean[], board: DragonTailBoard): GoodRoad;
}
