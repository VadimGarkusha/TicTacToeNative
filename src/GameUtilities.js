export function isAnyPlayerWon(playedSquares) {
  let crossedSquares;

  // checking vertical lines
  [...Array(3).keys()].some((i) => {
    const isFilledLineX =
      playedSquares.filter((s) => s[1] === i && s[2] === 'X').length === 3;
    const isFilledLineO =
      playedSquares.filter((s) => s[1] === i && s[2] === 'O').length === 3;

    if (isFilledLineX || isFilledLineO) {
      crossedSquares = [...Array(3).keys()].map((k) => [k, i]);
    }
    return crossedSquares;
  });

  if (crossedSquares) {
    return crossedSquares;
  }

  //checking horizontal lines
  [...Array(3).keys()].some((i) => {
    const isFilledLineX =
      playedSquares.filter((s) => s[0] === i && s[2] === 'X').length === 3;
    const isFilledLineO =
      playedSquares.filter((s) => s[0] === i && s[2] === 'O').length === 3;

    if (isFilledLineX || isFilledLineO) {
      crossedSquares = [...Array(3).keys()].map((k) => [i, k]);
    }
    return crossedSquares;
  });

  if (crossedSquares) {
    return crossedSquares;
  }

  //checking diagonal lines
  const isDiagonalFilled =
    playedSquares.filter((s) => s[0] === s[1] && s[2] === 'X').length === 3 ||
    playedSquares.filter((s) => s[0] === s[1] && s[2] === 'O').length === 3;
  if (isDiagonalFilled) {
    crossedSquares = [...Array(3).keys()].map((k) => [k, k]);
  }

  const isAntiDiagonalFilled =
    playedSquares.filter((s) => s[0] + s[1] === 2 && s[2] === 'X').length ===
      3 ||
    playedSquares.filter((s) => s[0] + s[1] === 2 && s[2] === 'O').length === 3;
  if (isAntiDiagonalFilled) {
    crossedSquares = [...Array(3).keys()].map((k) => [k, 2 - k]);
  }

  if (crossedSquares) {
    return crossedSquares;
  }

  return false;
}
