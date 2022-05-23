import { IConverter } from "./IConverter";
export declare class Converter<T> implements IConverter<T> {
    protected positiveKey(): string;
    protected specialKey(): string;
    convert(group: T[]): boolean;
    group(items: T[]): T[][];
    private mergeSpecialIntoOtherGroups;
}
