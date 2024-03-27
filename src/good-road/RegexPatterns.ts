export const POSITIVE_ACROSS_NEGATIVE = /(?<prefix>[01]*0|^)(?<goodRoad>[1]{4,}0110)/;
export const NEGATIVE_ACROSS_POSITIVE = /(?<prefix>[01]*1|^)(?<goodRoad>001[0]{4,}11)/;

export const BACCARAT_REGEX_PATTERNS = [POSITIVE_ACROSS_NEGATIVE, NEGATIVE_ACROSS_POSITIVE];
