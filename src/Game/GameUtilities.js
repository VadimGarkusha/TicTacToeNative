export function isAnyPlayerWon(playedSquares, fieldSize) {
  let crossedSquares;

  // checking vertical lines
  [...Array(fieldSize).keys()].some((i) => {
    const isFilledLineX =
      playedSquares.filter((s) => s[1] === i && s[2] === 'X').length ===
      fieldSize;
    const isFilledLineO =
      playedSquares.filter((s) => s[1] === i && s[2] === 'O').length ===
      fieldSize;

    if (isFilledLineX || isFilledLineO) {
      crossedSquares = [...Array(fieldSize).keys()].map((k) => [k, i]);
    }
    return crossedSquares;
  });

  if (crossedSquares) {
    return crossedSquares;
  }

  //checking horizontal lines
  [...Array(fieldSize).keys()].some((i) => {
    const isFilledLineX =
      playedSquares.filter((s) => s[0] === i && s[2] === 'X').length ===
      fieldSize;
    const isFilledLineO =
      playedSquares.filter((s) => s[0] === i && s[2] === 'O').length ===
      fieldSize;

    if (isFilledLineX || isFilledLineO) {
      crossedSquares = [...Array(fieldSize).keys()].map((k) => [i, k]);
    }
    return crossedSquares;
  });

  if (crossedSquares) {
    return crossedSquares;
  }

  //checking diagonal lines
  const isDiagonalFilled =
    playedSquares.filter((s) => s[0] === s[1] && s[2] === 'X').length ===
      fieldSize ||
    playedSquares.filter((s) => s[0] === s[1] && s[2] === 'O').length ===
      fieldSize;
  if (isDiagonalFilled) {
    crossedSquares = [...Array(fieldSize).keys()].map((k) => [k, k]);
  }

  const isAntiDiagonalFilled =
    playedSquares.filter((s) => s[0] + s[1] === fieldSize - 1 && s[2] === 'X')
      .length === fieldSize ||
    playedSquares.filter((s) => s[0] + s[1] === fieldSize - 1 && s[2] === 'O')
      .length === fieldSize;
  if (isAntiDiagonalFilled) {
    crossedSquares = [...Array(fieldSize).keys()].map((k) => [
      k,
      fieldSize - 1 - k,
    ]);
  }

  if (crossedSquares) {
    return crossedSquares;
  }

  return false;
}

// Winner patterns, match selected patterns on every turn for every player
export function winnerPatterns(fieldSize) {
  // 3 x 3 winning patterns;
  if (fieldSize == 3)
    return [
      [11, 12, 13],
      [21, 22, 23],
      [31, 32, 33],
      [11, 21, 31],
      [12, 22, 32],
      [13, 23, 33],
      [11, 22, 33],
      [13, 22, 31],
    ];

  // 4 x 4 winning patterns;
  if (this.fieldSize == 4)
    return [
      [11, 12, 13, 14],
      [21, 22, 23, 24],
      [31, 32, 33, 34],
      [41, 42, 43, 44],
      [11, 21, 31, 41],
      [12, 22, 32, 42],
      [13, 23, 33, 43],
      [14, 24, 34, 44],
      [14, 23, 32, 41],
      [11, 22, 33, 44],
    ];

  return [
    [11, 12, 13, 14, 15],
    [21, 22, 23, 24, 25],
    [31, 32, 33, 34, 35],
    [41, 42, 43, 44, 45],
    [51, 52, 53, 54, 55],
    [11, 21, 31, 41, 51],
    [12, 22, 32, 42, 52],
    [13, 23, 33, 43, 53],
    [14, 24, 34, 44, 54],
    [15, 25, 35, 45, 55],
    [11, 22, 33, 44, 55],
    [15, 24, 33, 42, 51],
  ];
}

// Robot patterns, for auto players of every game board
export function defaultRobotPatterns(fieldSize) {
  // 3 x 3 winning patterns;
  if (fieldSize == 3) return [22, 11, 33, 13, 21, 23, 12, 32, 31];

  // 4 x 4 winning patterns;
  if (fieldSize == 4)
    return [11, 22, 33, 44, 14, 13, 12, 21, 31, 41, 42, 43, 24, 34, 32, 23];

  return [
    11,
    22,
    33,
    44,
    55,
    15,
    14,
    13,
    12,
    51,
    41,
    31,
    21,
    35,
    45,
    25,
    53,
    52,
    54,
    42,
    43,
    32,
    34,
    23,
    24,
  ];
}
