import { BigRoadScoreboardPoint } from "../big-road/BigRoadScoreboard";
import { DragonTailBoardOptions } from "../dragon-tail";
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
export declare class DerivedScoreboards<SettlementResult> {
    private readonly bigEyeBoy;
    private readonly smallRoad;
    private readonly cockroachPig;
    private readonly bigEyeBoyKey;
    private readonly smallRoadKey;
    private readonly cockroachPigKey;
    private bigRoadData;
    constructor(options: DragonTailBoardOptions);
    update(bigRoadData: BigRoadScoreboardPoint<SettlementResult>[][]): void;
    getBeginIndexOfDerivedScoreboard(bigRoadData: BigRoadScoreboardPoint<SettlementResult>[][], colGap: number): number;
    generateDerivedScoreboardsData(bigRoadData: BigRoadScoreboardPoint<SettlementResult>[][], colGap: number): boolean[];
    compareWithOtherCol(rawDataArr: boolean[][], indexArr: IndexItem[], lengthArr: number[], beginIndex: number, colGap: number): boolean[];
    updateBigEyeBoy(): void;
    updateSmallRoad(): void;
    updateCockroachPig(): void;
    updateBoard(data: boolean[], boardKey: "bigEyeBoy" | "smallRoad" | "cockroachPig"): void;
    getScoreboardData(key: "bigEyeBoy" | "smallRoad" | "cockroachPig"): DerivedScoreboardPoint[][];
}
export {};
