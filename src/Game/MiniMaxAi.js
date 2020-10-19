class MinMaxAi {
  constructor(fieldSize) {
    this.turn = 'X';
    this.fieldSize = fieldSize;
  }

  // Winner patterns, match selected patterns on every turn for every player
  winnerPatterns() {
    var wins = Array();

    // 3 x 3 winning patterns;
    if (this.fieldSize == 3)
      wins = [
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
      wins = [
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

    // 5 x 5 winning patterns;
    if (this.fieldSize == 5)
      wins = [
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

    return wins;
  }

  // Robot patterns, for auto players of every game board
  defaultRobotPatterns() {
    var robot_turns = Array();

    // 3 x 3 winning patterns;
    if (this.fieldSize == 3) robot_turns = [22, 11, 33, 13, 21, 23, 12, 32, 31];

    // 4 x 4 winning patterns;
    if (this.fieldSize == 4)
      robot_turns = [
        11,
        22,
        33,
        44,
        14,
        13,
        12,
        21,
        31,
        41,
        42,
        43,
        24,
        34,
        32,
        23,
      ];

    // 5 x 5 winning patterns;
    if (this.fieldSize == 5)
      robot_turns = [
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

    return robot_turns;
  }

  // Getting most nearest winning and lossing pattern
  getAutoTurnPattern(moves) {
    var pattern = [];
    pattern = this.getMostNearestPattern('O', moves);
    if (pattern.length <= 0) {
      pattern = this.getMostNearestPattern('X', moves);
      if (pattern.length <= 0) {
        pattern = this.defaultRobotPatterns();
      }
    }

    return pattern;
  }

  // Auto player robot turn for Y
  getNextAiTurn(moves, again = false) {
    // Get which winning pattern match most
    // Run according to the selected pattern
    var robot_pattern = this.getAutoTurnPattern(moves);

    for (var x = 0; x < robot_pattern.length; x++) {
      var matchedMove = moves
        .map((move) => (move[0] + 1 + '' + (move[1] + 1)) * 1)
        .find((move) => move === robot_pattern[x]);

      if (!matchedMove) {
        return robot_pattern[x]
          .toString()
          .split('')
          .map((turn) => Number(turn) - 1);
      }
    }
  }

  // Getting most applicable pattern for any player
  getMostNearestPattern(turn, moves) {
    // selection 2 arrays of arrays with played indexes like 11, 13, 22
    var selected = moves
      .filter((move) => move[2] === turn)
      .map((move) => (move[0] + 1 + '' + (move[1] + 1)) * 1)
      .sort();
    var win_patterns = this.winnerPatterns();

    for (var x = 0; x < win_patterns.length; x++) {
      var intersected = this.intersectionArray(selected, win_patterns[x]);

      if (intersected.length == win_patterns[x].length - 1) {
        // if any position is found empty then return that pattern; otherwise will check another one from list
        for (var y = 0; y < win_patterns[x].length; y++) {
          const obj = moves
            .map((move) => (move[0] + 1 + '' + (move[1] + 1)) * 1)
            .find((move) => move === win_patterns[x][y]);

          if (!obj) {
            // Return pattern if got an empty; otherwise will match others
            return win_patterns[x];
          }
        }
      }
    }
    return [];
  }

  // Return intersaction result by comparing
  // Players' turns and Winning patterns
  intersectionArray(x, y) {
    var response = [];
    for (var i = 0; i < x.length; i++) {
      for (var z = 0; z < y.length; z++) {
        if (x[i] == y[z]) {
          response.push(x[i]);
          break;
        }
      }
    }
    return response;
  }
}

export default MinMaxAi;
