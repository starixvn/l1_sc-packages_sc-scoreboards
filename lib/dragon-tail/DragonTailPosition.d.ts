export interface DragonTailPositionOptions {
    x: number;
    y: number;
    parentColumn?: number;
}
export declare class DragonTailPosition {
    readonly x: number;
    readonly y: number;
    readonly parentColumn: number;
    constructor(options: DragonTailPositionOptions);
    static getInstance(x: number, y: number): DragonTailPosition;
    getName(): string;
    getBottom(): DragonTailPosition;
    getRight(): DragonTailPosition;
    getLeft(): DragonTailPosition;
    isValid(height: number): boolean;
}
