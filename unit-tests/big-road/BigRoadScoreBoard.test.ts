import { BigRoadScoreboard, Converter } from "../../src";

describe("big road test", () => {
  // arrange
  const converter = new Converter();
  const options = { height: 6, converter };
  const bigRoadScoreboard = new BigRoadScoreboard(options);

  const getSettlementResult = (data: any) => {
    return data.reduce((result: any, value: number) => {
      const a = { banker: value > 2, player: value < 2, tie: value === 2 };
      result.push(a);
      return result;
    }, []);
  };
  it("should return expected data when tie first", () => {
    // arrange
    const expected: any = [
      [
        {
          index: 0,
          x: 0,
          y: 0,
          status: false,
          parentColumn: 0,
          data: [
            { banker: false, player: true, tie: false },
            { banker: false, player: false, tie: true },
          ],
        },
        {
          index: 2,
          x: 1,
          y: 0,
          status: true,
          parentColumn: 1,
          data: [{ banker: true, player: false, tie: false }],
        },
      ],
      [
        {
          index: 1,
          x: 0,
          y: 1,
          status: false,
          parentColumn: 0,
          data: [{ banker: false, player: true, tie: false }],
        },
        {
          index: -1,
          x: 1,
          y: 1,
          status: undefined,
          parentColumn: -1,
          data: [],
        },
      ],
      [
        {
          index: -1,
          x: 0,
          y: 2,
          status: undefined,
          parentColumn: -1,
          data: [],
        },
        {
          index: -1,
          x: 1,
          y: 2,
          status: undefined,
          parentColumn: -1,
          data: [],
        },
      ],
      [
        {
          index: -1,
          x: 0,
          y: 3,
          status: undefined,
          parentColumn: -1,
          data: [],
        },
        {
          index: -1,
          x: 1,
          y: 3,
          status: undefined,
          parentColumn: -1,
          data: [],
        },
      ],
      [
        {
          index: -1,
          x: 0,
          y: 4,
          status: undefined,
          parentColumn: -1,
          data: [],
        },
        {
          index: -1,
          x: 1,
          y: 4,
          status: undefined,
          parentColumn: -1,
          data: [],
        },
      ],
      [
        {
          index: -1,
          x: 0,
          y: 5,
          status: undefined,
          parentColumn: -1,
          data: [],
        },
        {
          index: -1,
          x: 1,
          y: 5,
          status: undefined,
          parentColumn: -1,
          data: [],
        },
      ],
    ];
    const dataTest = [2, 1, 1, 3];
    bigRoadScoreboard.initialize(getSettlementResult(dataTest));

    // act
    const actual = bigRoadScoreboard.rows();

    // assert
    expect(actual).toStrictEqual(expected);
  });

  it("should return expected data when tie not first", () => {
    // arrange
    const expected: any = [
      [
        {
          index: 0,
          x: 0,
          y: 0,
          status: false,
          parentColumn: 0,
          data: [{ banker: false, player: true, tie: false }],
        },
        {
          index: 2,
          x: 1,
          y: 0,
          status: true,
          parentColumn: 1,
          data: [
            { banker: true, player: false, tie: false },
            { banker: false, player: false, tie: true },
          ],
        },
      ],
      [
        {
          index: 1,
          x: 0,
          y: 1,
          status: false,
          parentColumn: 0,
          data: [{ banker: false, player: true, tie: false }],
        },
        {
          index: -1,
          x: 1,
          y: 1,
          status: undefined,
          parentColumn: -1,
          data: [],
        },
      ],
      [
        {
          index: -1,
          x: 0,
          y: 2,
          status: undefined,
          parentColumn: -1,
          data: [],
        },
        {
          index: -1,
          x: 1,
          y: 2,
          status: undefined,
          parentColumn: -1,
          data: [],
        },
      ],
      [
        {
          index: -1,
          x: 0,
          y: 3,
          status: undefined,
          parentColumn: -1,
          data: [],
        },
        {
          index: -1,
          x: 1,
          y: 3,
          status: undefined,
          parentColumn: -1,
          data: [],
        },
      ],
      [
        {
          index: -1,
          x: 0,
          y: 4,
          status: undefined,
          parentColumn: -1,
          data: [],
        },
        {
          index: -1,
          x: 1,
          y: 4,
          status: undefined,
          parentColumn: -1,
          data: [],
        },
      ],
      [
        {
          index: -1,
          x: 0,
          y: 5,
          status: undefined,
          parentColumn: -1,
          data: [],
        },
        {
          index: -1,
          x: 1,
          y: 5,
          status: undefined,
          parentColumn: -1,
          data: [],
        },
      ],
    ];
    const dataTest = [1, 1, 3, 2];
    bigRoadScoreboard.initialize(getSettlementResult(dataTest));

    // act
    const actual = bigRoadScoreboard.rows();

    // assert
    expect(actual).toStrictEqual(expected);
  });

  it("should return expected data when dragon tails exists", () => {
    // arrange
    const expected: any = [
      [
        {
          index: 0,
          x: 0,
          y: 0,
          status: false,
          parentColumn: 0,
          data: [{ banker: false, player: true, tie: false }],
        },
        {
          index: 2,
          x: 1,
          y: 0,
          status: true,
          parentColumn: 1,
          data: [
            { banker: true, player: false, tie: false },
            { banker: false, player: false, tie: true },
          ],
        },
        {
          index: -1,
          x: 2,
          y: 0,
          status: undefined,
          parentColumn: -1,
          data: [],
        },
        {
          index: -1,
          x: 3,
          y: 0,
          status: undefined,
          parentColumn: -1,
          data: [],
        },
      ],
      [
        {
          index: 1,
          x: 0,
          y: 1,
          status: false,
          parentColumn: 0,
          data: [{ banker: false, player: true, tie: false }],
        },
        {
          index: 3,
          x: 1,
          y: 1,
          status: true,
          parentColumn: 1,
          data: [{ banker: true, player: false, tie: false }],
        },
        {
          index: -1,
          x: 2,
          y: 1,
          status: undefined,
          parentColumn: -1,
          data: [],
        },
        {
          index: -1,
          x: 3,
          y: 1,
          status: undefined,
          parentColumn: -1,
          data: [],
        },
      ],
      [
        {
          index: -1,
          x: 0,
          y: 2,
          status: undefined,
          parentColumn: -1,
          data: [],
        },
        {
          index: 4,
          x: 1,
          y: 2,
          status: true,
          parentColumn: 1,
          data: [{ banker: true, player: false, tie: false }],
        },
        {
          index: -1,
          x: 2,
          y: 2,
          status: undefined,
          parentColumn: -1,
          data: [],
        },
        {
          index: -1,
          x: 3,
          y: 2,
          status: undefined,
          parentColumn: -1,
          data: [],
        },
      ],
      [
        {
          index: -1,
          x: 0,
          y: 3,
          status: undefined,
          parentColumn: -1,
          data: [],
        },
        {
          index: 5,
          x: 1,
          y: 3,
          status: true,
          parentColumn: 1,
          data: [{ banker: true, player: false, tie: false }],
        },
        {
          index: -1,
          x: 2,
          y: 3,
          status: undefined,
          parentColumn: -1,
          data: [],
        },
        {
          index: -1,
          x: 3,
          y: 3,
          status: undefined,
          parentColumn: -1,
          data: [],
        },
      ],
      [
        {
          index: -1,
          x: 0,
          y: 4,
          status: undefined,
          parentColumn: -1,
          data: [],
        },
        {
          index: 6,
          x: 1,
          y: 4,
          status: true,
          parentColumn: 1,
          data: [{ banker: true, player: false, tie: false }],
        },
        {
          index: -1,
          x: 2,
          y: 4,
          status: undefined,
          parentColumn: -1,
          data: [],
        },
        {
          index: -1,
          x: 3,
          y: 4,
          status: undefined,
          parentColumn: -1,
          data: [],
        },
      ],
      [
        {
          index: -1,
          x: 0,
          y: 5,
          status: undefined,
          parentColumn: -1,
          data: [],
        },
        {
          index: 7,
          x: 1,
          y: 5,
          status: true,
          parentColumn: 1,
          data: [{ banker: true, player: false, tie: false }],
        },
        {
          index: 8,
          x: 2,
          y: 5,
          status: true,
          parentColumn: 1,
          data: [{ banker: true, player: false, tie: false }],
        },
        {
          index: 9,
          x: 3,
          y: 5,
          status: true,
          parentColumn: 1,
          data: [{ banker: true, player: false, tie: false }],
        },
      ],
    ];
    const dataTest = [1, 1, 3, 2, 3, 3, 3, 3, 3, 3, 3];
    bigRoadScoreboard.initialize(getSettlementResult(dataTest));

    // act
    const actual = bigRoadScoreboard.rows();

    // assert
    expect(actual).toStrictEqual(expected);
  });

  it("should return expected data when Sextuple Dragon", () => {
    // arrange
    const data = [
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 3, 3, 3,
      3,
    ];
    const expected = [
      [
        { index: 0, x: 0, y: 0, parentColumn: 0, status: false, data: [{ banker: false, player: true, tie: false }] },
        { index: 12, x: 1, y: 0, parentColumn: 1, status: true, data: [{ banker: true, player: false, tie: false }] },
        { index: 21, x: 2, y: 0, parentColumn: 2, status: false, data: [{ banker: false, player: true, tie: false }] },
        { index: 29, x: 3, y: 0, parentColumn: 3, status: true, data: [{ banker: true, player: false, tie: false }] },
        { index: 36, x: 4, y: 0, parentColumn: 4, status: false, data: [{ banker: false, player: true, tie: false }] },
        { index: 42, x: 5, y: 0, parentColumn: 5, status: true, data: [{ banker: true, player: false, tie: false }] },
        { index: 43, x: 6, y: 0, parentColumn: 5, status: true, data: [{ banker: true, player: false, tie: false }] },
        { index: 44, x: 7, y: 0, parentColumn: 5, status: true, data: [{ banker: true, player: false, tie: false }] },
        { index: 45, x: 8, y: 0, parentColumn: 5, status: true, data: [{ banker: true, player: false, tie: false }] },
      ],
      [
        { index: 1, x: 0, y: 1, parentColumn: 0, status: false, data: [{ banker: false, player: true, tie: false }] },
        { index: 13, x: 1, y: 1, parentColumn: 1, status: true, data: [{ banker: true, player: false, tie: false }] },
        { index: 22, x: 2, y: 1, parentColumn: 2, status: false, data: [{ banker: false, player: true, tie: false }] },
        { index: 30, x: 3, y: 1, parentColumn: 3, status: true, data: [{ banker: true, player: false, tie: false }] },
        { index: 37, x: 4, y: 1, parentColumn: 4, status: false, data: [{ banker: false, player: true, tie: false }] },
        { index: 38, x: 5, y: 1, parentColumn: 4, status: false, data: [{ banker: false, player: true, tie: false }] },
        { index: 39, x: 6, y: 1, parentColumn: 4, status: false, data: [{ banker: false, player: true, tie: false }] },
        { index: 40, x: 7, y: 1, parentColumn: 4, status: false, data: [{ banker: false, player: true, tie: false }] },
        { index: 41, x: 8, y: 1, parentColumn: 4, status: false, data: [{ banker: false, player: true, tie: false }] },
      ],
      [
        { index: 2, x: 0, y: 2, parentColumn: 0, status: false, data: [{ banker: false, player: true, tie: false }] },
        { index: 14, x: 1, y: 2, parentColumn: 1, status: true, data: [{ banker: true, player: false, tie: false }] },
        { index: 23, x: 2, y: 2, parentColumn: 2, status: false, data: [{ banker: false, player: true, tie: false }] },
        { index: 31, x: 3, y: 2, parentColumn: 3, status: true, data: [{ banker: true, player: false, tie: false }] },
        { index: 32, x: 4, y: 2, parentColumn: 3, status: true, data: [{ banker: true, player: false, tie: false }] },
        { index: 33, x: 5, y: 2, parentColumn: 3, status: true, data: [{ banker: true, player: false, tie: false }] },
        { index: 34, x: 6, y: 2, parentColumn: 3, status: true, data: [{ banker: true, player: false, tie: false }] },
        { index: 35, x: 7, y: 2, parentColumn: 3, status: true, data: [{ banker: true, player: false, tie: false }] },
        { index: -1, x: 8, y: 2, parentColumn: -1, status: undefined, data: [] },
      ],
      [
        { index: 3, x: 0, y: 3, parentColumn: 0, status: false, data: [{ banker: false, player: true, tie: false }] },
        { index: 15, x: 1, y: 3, parentColumn: 1, status: true, data: [{ banker: true, player: false, tie: false }] },
        { index: 24, x: 2, y: 3, parentColumn: 2, status: false, data: [{ banker: false, player: true, tie: false }] },
        { index: 25, x: 3, y: 3, parentColumn: 2, status: false, data: [{ banker: false, player: true, tie: false }] },
        { index: 26, x: 4, y: 3, parentColumn: 2, status: false, data: [{ banker: false, player: true, tie: false }] },
        { index: 27, x: 5, y: 3, parentColumn: 2, status: false, data: [{ banker: false, player: true, tie: false }] },
        { index: 28, x: 6, y: 3, parentColumn: 2, status: false, data: [{ banker: false, player: true, tie: false }] },
        { index: -1, x: 7, y: 3, parentColumn: -1, status: undefined, data: [] },
        { index: -1, x: 8, y: 3, parentColumn: -1, status: undefined, data: [] },
      ],
      [
        { index: 4, x: 0, y: 4, parentColumn: 0, status: false, data: [{ banker: false, player: true, tie: false }] },
        { index: 16, x: 1, y: 4, parentColumn: 1, status: true, data: [{ banker: true, player: false, tie: false }] },
        { index: 17, x: 2, y: 4, parentColumn: 1, status: true, data: [{ banker: true, player: false, tie: false }] },
        { index: 18, x: 3, y: 4, parentColumn: 1, status: true, data: [{ banker: true, player: false, tie: false }] },
        { index: 19, x: 4, y: 4, parentColumn: 1, status: true, data: [{ banker: true, player: false, tie: false }] },
        { index: 20, x: 5, y: 4, parentColumn: 1, status: true, data: [{ banker: true, player: false, tie: false }] },
        { index: -1, x: 6, y: 4, parentColumn: -1, status: undefined, data: [] },
        { index: -1, x: 7, y: 4, parentColumn: -1, status: undefined, data: [] },
        { index: -1, x: 8, y: 4, parentColumn: -1, status: undefined, data: [] },
      ],
      [
        { index: 5, x: 0, y: 5, parentColumn: 0, status: false, data: [{ banker: false, player: true, tie: false }] },
        { index: 6, x: 1, y: 5, parentColumn: 0, status: false, data: [{ banker: false, player: true, tie: false }] },
        { index: 7, x: 2, y: 5, parentColumn: 0, status: false, data: [{ banker: false, player: true, tie: false }] },
        { index: 8, x: 3, y: 5, parentColumn: 0, status: false, data: [{ banker: false, player: true, tie: false }] },
        { index: 9, x: 4, y: 5, parentColumn: 0, status: false, data: [{ banker: false, player: true, tie: false }] },
        { index: 10, x: 5, y: 5, parentColumn: 0, status: false, data: [{ banker: false, player: true, tie: false }] },
        { index: 11, x: 6, y: 5, parentColumn: 0, status: false, data: [{ banker: false, player: true, tie: false }] },
        { index: -1, x: 7, y: 5, parentColumn: -1, status: undefined, data: [] },
        { index: -1, x: 8, y: 5, parentColumn: -1, status: undefined, data: [] },
      ],
    ];
    bigRoadScoreboard.initialize(getSettlementResult(data));

    // act
    const actual = bigRoadScoreboard.rows();

    // assert
    expect(actual).toStrictEqual(expected);
  });

  it("should return expected data with Tail position strategies", () => {
    //arrange
    const data = [2, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 1, 3, 3, 3, 3, 3, 3, 3];
    bigRoadScoreboard.initialize(getSettlementResult(data));
    const newResult = { banker: true, player: false, tie: false };
    const expected = [
      [
        { index: 0, x: 0, y: 0, parentColumn: 0, status: false, data: [{ banker: false, player: true, tie: false }] },
        { index: 7, x: 1, y: 0, parentColumn: 1, status: true, data: [{ banker: true, player: false, tie: false }] },
        { index: 14, x: 2, y: 0, parentColumn: 2, status: false, data: [{ banker: false, player: true, tie: false }] },
        { index: 15, x: 3, y: 0, parentColumn: 3, status: true, data: [{ banker: true, player: false, tie: false }] },
        { index: -1, x: 4, y: 0, parentColumn: -1, status: undefined, data: [] },
        { index: -1, x: 5, y: 0, parentColumn: -1, status: undefined, data: [] },
      ],
      [
        { index: 1, x: 0, y: 1, parentColumn: 0, status: false, data: [{ banker: false, player: true, tie: false }] },
        { index: 8, x: 1, y: 1, parentColumn: 1, status: true, data: [{ banker: true, player: false, tie: false }] },
        { index: -1, x: 2, y: 1, parentColumn: -1, status: undefined, data: [] },
        { index: 16, x: 3, y: 1, parentColumn: 3, status: true, data: [{ banker: true, player: false, tie: false }] },
        { index: -1, x: 4, y: 1, parentColumn: -1, status: undefined, data: [] },
        { index: -1, x: 5, y: 1, parentColumn: -1, status: undefined, data: [] },
      ],
      [
        { index: 2, x: 0, y: 2, parentColumn: 0, status: false, data: [{ banker: false, player: true, tie: false }] },
        { index: 9, x: 1, y: 2, parentColumn: 1, status: true, data: [{ banker: true, player: false, tie: false }] },
        { index: -1, x: 2, y: 2, parentColumn: -1, status: undefined, data: [] },
        { index: 17, x: 3, y: 2, parentColumn: 3, status: true, data: [{ banker: true, player: false, tie: false }] },
        { index: -1, x: 4, y: 2, parentColumn: -1, status: undefined, data: [] },
        { index: -1, x: 5, y: 2, parentColumn: -1, status: undefined, data: [] },
      ],
      [
        { index: 3, x: 0, y: 3, parentColumn: 0, status: false, data: [{ banker: false, player: true, tie: false }] },
        { index: 10, x: 1, y: 3, parentColumn: 1, status: true, data: [{ banker: true, player: false, tie: false }] },
        { index: -1, x: 2, y: 3, parentColumn: -1, status: undefined, data: [] },
        { index: 18, x: 3, y: 3, parentColumn: 3, status: true, data: [{ banker: true, player: false, tie: false }] },
        { index: -1, x: 4, y: 3, parentColumn: -1, status: undefined, data: [] },
        { index: -1, x: 5, y: 3, parentColumn: -1, status: undefined, data: [] },
      ],
      [
        { index: 4, x: 0, y: 4, parentColumn: 0, status: false, data: [{ banker: false, player: true, tie: false }] },
        { index: 11, x: 1, y: 4, parentColumn: 1, status: true, data: [{ banker: true, player: false, tie: false }] },
        { index: 12, x: 2, y: 4, parentColumn: 1, status: true, data: [{ banker: true, player: false, tie: false }] },
        { index: 19, x: 3, y: 4, parentColumn: 3, status: true, data: [{ banker: true, player: false, tie: false }] },
        { index: 20, x: 4, y: 4, parentColumn: 3, status: true, data: [{ banker: true, player: false, tie: false }] },
        { index: -1, x: 5, y: 4, parentColumn: -1, status: undefined, data: [] },
      ],
      [
        { index: 5, x: 0, y: 5, parentColumn: 0, status: false, data: [{ banker: false, player: true, tie: false }] },
        { index: 6, x: 1, y: 5, parentColumn: 0, status: false, data: [{ banker: false, player: true, tie: false }] },
        { index: 13, x: 2, y: 5, parentColumn: 1, status: true, data: [{ banker: true, player: false, tie: false }] },
        { index: -1, x: 3, y: 5, parentColumn: -1, status: undefined, data: [] },
        { index: 21, x: 4, y: 5, parentColumn: 3, status: true, data: [{ banker: true, player: false, tie: false }] },
        { index: 22, x: 5, y: 5, parentColumn: 3, status: true, data: [{ banker: true, player: false, tie: false }] },
      ],
    ];

    //act
    bigRoadScoreboard.fifo(newResult);
    const actual = bigRoadScoreboard.rows();

    // assert
    expect(actual).toStrictEqual(expected);
  });
});
