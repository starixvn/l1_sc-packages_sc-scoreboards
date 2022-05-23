import { IConverter } from "../IConverter";
export interface SettlementResult {
    big: boolean;
    small: boolean;
    tie: boolean;
}
export default class Converter implements IConverter<SettlementResult> {
    convert(group: SettlementResult[]): boolean;
    group(items: SettlementResult[]): SettlementResult[][];
    private mergeTieIntoOtherGroups;
}
