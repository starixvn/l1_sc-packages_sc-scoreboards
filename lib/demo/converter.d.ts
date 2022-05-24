import { Converter } from "../Converter";
export interface SettlementResult {
    big: boolean;
    small: boolean;
    tie: boolean;
}
export default class ConverterTest extends Converter<SettlementResult> {
    positiveKey(): string;
}
