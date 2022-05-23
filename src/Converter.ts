import { IConverter } from "./IConverter";

export class Converter<T> implements IConverter<T> {
  protected positiveKey() {
    return "banker";
  }

  protected specialKey() {
    return "tie";
  }

  convert(group: T[]): boolean {
    return group.filter((result) => (result as any)[this.positiveKey()]).length !== 0;
  }

  group(items: T[]): T[][] {
    const groups = this.mergeSpecialIntoOtherGroups(items);
    const firstGroup = groups[0] || [];
    const isSpecialGroup =
      firstGroup.length && firstGroup.filter((round) => (round as any)[this.specialKey()]).length === firstGroup.length;

    if (isSpecialGroup) {
      const secondGroup = groups[1] || [];

      groups.shift();
      secondGroup.push(...firstGroup);
    }

    return groups;
  }

  private mergeSpecialIntoOtherGroups(items: T[]): T[][] {
    const reducer = (groups: T[][], round: T) => {
      if (groups.length && (round as any)[this.specialKey()]) {
        groups[groups.length - 1].push(round);
      } else {
        groups.push([round]);
      }

      return groups;
    };

    return items.reduce(reducer, []);
  }
}
