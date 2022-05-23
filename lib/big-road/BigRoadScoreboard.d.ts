import { IConverter } from "../IConverter";
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
export declare class BigRoadScoreboard<InputType> {
    private readonly dragonTailBoard;
    private readonly converter;
    private input;
    private groups;
    constructor(options: BigRoadScoreboardOptions<InputType>);
    initialize(input: InputType[]): void;
    fifo(record: InputType): void;
    rows(): BigRoadScoreboardPoint<InputType>[][];
    width(): number;
    height(): number;
    private loadDragonTailBoard;
}
