export function isGameOverCheck(playedSquares) {
  let isVerticalFilled = false,
    isHorizontalFilled = false,
    isDiagonalFilled = false;

  // checking vertical lines
  [...Array(3).keys()].some((i) => {
    const isFilledLineX =
      playedSquares.filter((s) => s[1] === i && s[2] === 'X').length === 3;
    const isFilledLineO =
      playedSquares.filter((s) => s[1] === i && s[2] === 'O').length === 3;
    if (isFilledLineX || isFilledLineO) isVerticalFilled = true;
    return isFilledLineX || isFilledLineO;
  });

  //checking horizontal lines
  [...Array(3).keys()].some((i) => {
    const isFilledLineX =
      playedSquares.filter((s) => s[0] === i && s[2] === 'X').length === 3;
    const isFilledLineO =
      playedSquares.filter((s) => s[0] === i && s[2] === 'O').length === 3;
    if (isFilledLineX || isFilledLineO) isHorizontalFilled = true;
    return isFilledLineX || isFilledLineO;
  });

  //checking diagonal lines
  isDiagonalFilled =
    playedSquares.filter((s) => s[0] === s[1] && s[2] === 'X').length === 3 ||
    playedSquares.filter((s) => s[0] === s[1] && s[2] === 'O').length === 3 ||
    playedSquares.filter((s) => s[0] + s[1] === 2 && s[2] === 'X').length ===
      3 ||
    playedSquares.filter((s) => s[0] + s[1] === 2 && s[2] === 'O').length === 3;

  return isVerticalFilled || isHorizontalFilled || isDiagonalFilled;
}
