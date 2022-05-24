export interface DragonTailPositionOptions {
  x: number;
  y: number;
  parentColumn?: number;
}

export class DragonTailPosition {
  public readonly x: number;
  public readonly y: number;
  public readonly parentColumn: number;

  constructor(options: DragonTailPositionOptions) {
    this.x = options.x;
    this.y = options.y;
    this.parentColumn = options.parentColumn || options.x;
  }

  static getInstance(x: number, y: number) {
    return new DragonTailPosition({ x, y });
  }

  getName(): string {
    return `${this.x}-${this.y}`;
  }

  getBottom(): DragonTailPosition {
    return new DragonTailPosition({ x: this.x, y: this.y + 1, parentColumn: this.parentColumn });
  }

  getRight(): DragonTailPosition {
    return new DragonTailPosition({ x: this.x + 1, y: this.y, parentColumn: this.parentColumn });
  }

  getLeft(): DragonTailPosition {
    return new DragonTailPosition({ x: this.x - 1, y: this.y, parentColumn: this.parentColumn });
  }

  isValid(height: number) {
    return this.x >= 0 && this.y < height;
  }
}
