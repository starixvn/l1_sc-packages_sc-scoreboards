import { DragonTailPosition } from "./DragonTailPosition";
export interface DragonTailBoardOptions {
    height: number;
}
interface DragonTailNode {
    positive: boolean;
    position: DragonTailPosition;
    index: number;
    isEndTail: boolean;
    parentColumn: number;
}
export declare class DragonTailBoard {
    private readonly minimumHeight;
    private height;
    private nodes;
    private positivePosition;
    private negativePosition;
    private index;
    constructor(options: DragonTailBoardOptions);
    getStatus(x: number, y: number): boolean | undefined;
    getIndex(x: number, y: number): number | undefined;
    getParentColumn(x: number, y: number): number | undefined;
    getPosition(index: number): number[];
    getHeight(): number;
    getWidth(): number;
    setHeight(height: number): void;
    addNode(positive: boolean, isEndTail: boolean): void;
    size(): number;
    clear(): void;
    protected updateNextPositions(node: DragonTailNode, positive: boolean): void;
    protected getInnerWidth(): number;
    protected getNextPosition(current: DragonTailNode): DragonTailPosition;
}
export {};
