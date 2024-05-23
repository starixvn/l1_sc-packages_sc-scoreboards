import { DragonTailPosition } from "./DragonTailPosition";

export interface DragonTailBoardOptions {
  height: number;
}

interface DragonTailNode {
  positive: boolean;
  position: DragonTailPosition;
  index: number;
  isEndTail: boolean;
  parentColumn: number;
  isBlink: boolean;
}

export class DragonTailBoard {
  private readonly minimumHeight: number = 2;
  private height: number;

  private nodes: Map<string, DragonTailNode>;
  private positivePosition: DragonTailPosition;
  private negativePosition: DragonTailPosition;
  private index: number;

  constructor(options: DragonTailBoardOptions) {
    this.height = options.height >= this.minimumHeight ? options.height : this.minimumHeight;

    this.nodes = new Map<string, DragonTailNode>();

    this.positivePosition = DragonTailPosition.getInstance(0, 0);
    this.negativePosition = DragonTailPosition.getInstance(0, 0);

    this.index = 0;
  }

  getStatus(x: number, y: number): boolean | undefined {
    const node = this.getNode(x, y);

    return node?.positive;
  }

  getIndex(x: number, y: number): number | undefined {
    const node = this.getNode(x, y);

    return node?.index;
  }

  getParentColumn(x: number, y: number): number | undefined {
    const node = this.getNode(x, y);

    return node?.parentColumn;
  }

  getIsBlink(x: number, y: number) {
    const node = this.getNode(x, y);

    return node?.isBlink;
  }

  private getNode(x: number, y: number) {
    const position = DragonTailPosition.getInstance(x, y);
    return this.nodes.get(position.getName());
  }

  getPosition(index: number): number[] {
    const values = [...this.nodes.values()];
    const node = values.find((value) => value.index === index);

    return node ? [node.position.x, node.position.y] : [];
  }

  getHeight() {
    return this.height;
  }

  getWidth() {
    const keys = [...this.nodes.keys()];
    const maxX = Math.max(...keys.map((key) => Number(key.split("-")[0])));

    return maxX + 1;
  }

  setHeight(height: number) {
    if (this.height !== height && this.minimumHeight <= height) {
      this.height = height;

      const nodes = [...this.nodes.values()].sort((a, b) => a.index - b.index);
      const values = nodes.map((node) => node.positive);

      this.clear();

      const lengthGroups = values.length;
      for (let i = 0; i < lengthGroups; i++) {
        const isEndTail = values[i] != values[i + 1];
        this.addNode(values[i], isEndTail);
      }
    }
  }

  addNode(positive: boolean, isEndTail: boolean, isBlink = false) {
    const position = positive ? this.positivePosition : this.negativePosition;
    const node = {
      positive,
      position,
      index: this.index,
      isEndTail: isEndTail,
      parentColumn: position.parentColumn,
      isBlink,
    };

    this.nodes.set(node.position.getName(), node);
    this.updateNextPositions(node, positive);
  }

  size() {
    return this.index;
  }

  clear() {
    this.nodes = new Map<string, DragonTailNode>();

    this.positivePosition = DragonTailPosition.getInstance(0, 0);
    this.negativePosition = DragonTailPosition.getInstance(0, 0);

    this.index = 0;
  }

  protected updateNextPositions(node: DragonTailNode, positive: boolean) {
    const positionKey = positive ? "positivePosition" : "negativePosition";
    const oppositePositionKey = positive ? "negativePosition" : "positivePosition";
    const nextPosition = this.getNextPosition(node);
    const innerWidth = this.getInnerWidth();
    const nextOppositePosition = DragonTailPosition.getInstance(innerWidth, 0);

    this[positionKey] = nextPosition;
    this[oppositePositionKey] = nextOppositePosition;
    this.index += 1;
  }

  protected getInnerWidth(): number {
    const keys = [...this.nodes.keys()];
    const firstRow = keys.filter((key) => key.match(/[0-9]*-0/));
    const maxX = Math.max(...firstRow.map((key) => Number(key.split("-")[0])));

    return maxX + 1;
  }

  protected getNextPosition(current: DragonTailNode): DragonTailPosition {
    const bottom = current.position.getBottom();
    const right = current.position.getRight();
    const bottomLeft = bottom.getLeft();
    const isBottomValid = bottom.isValid(this.height);
    const isBottomEmpty = !this.nodes.has(bottom.getName());
    const bottomLeftHasDifferenceValue = this.nodes.get(bottomLeft.getName())?.positive !== current.positive;
    const endTailBottomLef = this.nodes.get(bottomLeft.getName())?.isEndTail;
    const isBottomLefNotEndTail = endTailBottomLef === false;

    const combineCase = bottomLeftHasDifferenceValue || isBottomLefNotEndTail;

    if (isBottomValid && isBottomEmpty && combineCase) {
      return bottom;
    } else {
      return right;
    }
  }
}
