export interface IConverter<T> {
    convert(group: T[]): boolean;
    group(items: T[]): T[][];
}
