import {_difficultyLevel} from '../Constants';
import {defaultRobotPatterns, winnerPatterns} from './GameUtilities';

class MinMaxAi {
  constructor(fieldSize) {
    this.fieldSize = fieldSize;
  }

  // Getting most nearest winning and lossing pattern
  getAutoTurnPattern(moves) {
    var pattern = [];
    pattern = this.getMostNearestPattern('O', moves);
    if (pattern.length <= 0) {
      pattern = this.getMostNearestPattern('X', moves);
      if (pattern.length <= 0) {
        pattern = defaultRobotPatterns(this.fieldSize);
      }
    }

    return pattern;
  }

  getRandomNumber = (minimum, maximum) =>
    (Math.random() * (maximum - minimum + 1)) << 0;

  getEasyTurn(moves) {
    let newI = this.getRandomNumber(0, this.fieldSize - 1),
      newJ = this.getRandomNumber(0, this.fieldSize - 1);
    while (moves.some((e) => e[0] === newI && e[1] === newJ)) {
      (newI = this.getRandomNumber(0, this.fieldSize - 1)),
        (newJ = this.getRandomNumber(0, this.fieldSize - 1));
    }

    return [newI, newJ];
  }

  getHardTurn(moves) {
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

  getMediumTurn = (moves) =>
    Math.random() >= 0.5 ? this.getEasyTurn(moves) : this.getHardTurn(moves);

  // Auto player robot turn for Y
  getNextAiTurn(moves, difficulty) {
    if (difficulty == _difficultyLevel.easy) return this.getEasyTurn(moves);

    if (difficulty == _difficultyLevel.medium) return this.getMediumTurn(moves);

    if (difficulty == _difficultyLevel.hard) return this.getHardTurn(moves);
  }

  // Getting most applicable pattern for any player
  getMostNearestPattern(turn, moves) {
    // selection 2 arrays of arrays with played indexes like 11, 13, 22
    var selected = moves
      .filter((move) => move[2] === turn)
      .map((move) => (move[0] + 1 + '' + (move[1] + 1)) * 1)
      .sort();
    var win_patterns = winnerPatterns(this.fieldSize);

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
