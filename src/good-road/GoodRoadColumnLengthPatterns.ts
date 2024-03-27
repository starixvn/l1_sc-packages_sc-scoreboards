export const LONG_ROAD = {
  name: "LONG_ROAD",
  columns: [{ exact: false, length: 4 }],
  repeat: 0,
};

export const ADJACENT_TWO_COLUMNS = {
  name: "ADJACENT_TWO_COLUMNS",
  columns: [
    { exact: false, length: 2 },
    { exact: false, length: 2 },
  ],
  repeat: 0,
};

export const CHASE = {
  name: "CHASE",
  columns: [
    { exact: true, length: 1 },
    { exact: true, length: 1 },
    { exact: true, length: 1 },
    { exact: true, length: 1 },
  ],
  repeat: 50,
};

export const ONE_HOME_TWO_ROOMS = {
  name: "ONE_HOME_TWO_ROOMS",
  columns: [
    { exact: true, length: 2 },
    { exact: true, length: 1 },
    { exact: true, length: 2 },
    { exact: true, length: 1 },
  ],
  repeat: 0,
};

export const SEPARATED = {
  name: "SEPARATED",
  columns: [
    { exact: false, length: 2 },
    { exact: false, length: 1 },
    { exact: true, length: 1 },
    { exact: false, length: 1 },
    { exact: false, length: 2 },
    { exact: false, length: 1 },
    { exact: true, length: 1 },
  ],
  repeat: 0,
};

export const PBHOP = {
  name: "PBHOP",
  columns: [
    { exact: false, length: 1 },
    { exact: true, length: 1 },
    { exact: false, length: 1 },
    { exact: true, length: 1 },
    { exact: false, length: 1 },
    { exact: true, length: 1 },
  ],
  repeat: 0,
};

export const SYMMETRICAL_PATTERNS = [SEPARATED, LONG_ROAD, ADJACENT_TWO_COLUMNS, CHASE, ONE_HOME_TWO_ROOMS, PBHOP];
