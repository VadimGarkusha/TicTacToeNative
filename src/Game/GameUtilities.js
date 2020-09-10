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
const getRandomNumber = (minimum, maximum) =>
  (Math.random() * (maximum - minimum + 1)) << 0;

export function findNextTurn(playedSquares, fieldSize) {
  let newI = getRandomNumber(0, fieldSize - 1),
    newJ = getRandomNumber(0, fieldSize - 1);
  while (playedSquares.some((e) => e[0] === newI && e[1] === newJ)) {
    (newI = getRandomNumber(0, fieldSize - 1)),
      (newJ = getRandomNumber(0, fieldSize - 1));
  }

  return [newI, newJ];
}
