import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import Square from './Square';
import GameHeader from './GameHeader';
import {isAnyPlayerWon, findNextTurn} from './GameUtilities';

const defaultState = {
  isXTurn: true,
  playedSquares: [],
  isGameOver: false,
  wonSquares: [],
};

const Game = function ({route}) {
  const {playerOneName, playerTwoName, fieldSize, isAgainstAi} = route.params;

  const [state, setState] = React.useState(defaultState);

  const toggleTurnChar = (squareId) => {
    let newPlayedSquares = [
      ...state.playedSquares,
      [...squareId, state.isXTurn ? 'X' : 'O'],
    ];

    let isPlayerWon = isAnyPlayerWon(newPlayedSquares, fieldSize);
    let isGameOver =
      isPlayerWon || newPlayedSquares.length === fieldSize * fieldSize;

    if (!isAgainstAi)
      setState({
        ...state,
        isXTurn: !state.isXTurn,
        playedSquares: newPlayedSquares,
        isGameOver,
        wonSquares: isPlayerWon || [],
      });
    else {
      if (!isGameOver) {
        const nextTurn = findNextTurn(newPlayedSquares, fieldSize);
        newPlayedSquares = [...newPlayedSquares, [...nextTurn, 'O']];

        isPlayerWon = isAnyPlayerWon(newPlayedSquares, fieldSize);
        isGameOver =
          isPlayerWon || newPlayedSquares.length === fieldSize * fieldSize;
      }

      setState({
        ...state,
        playedSquares: newPlayedSquares,
        isGameOver,
        wonSquares: isPlayerWon || [],
      });
    }
  };

  const restartGame = () => {
    setState(defaultState);
  };

  const getDisplayedChar = (i, j) =>
    state.playedSquares.find((s) => s[0] === i && s[1] === j)
      ? state.playedSquares.find((s) => s[0] === i && s[1] === j)[2]
      : '';
  const isWonSquare = (i, j) =>
    state.wonSquares.some((e) => e[0] === i && e[1] === j);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <GameHeader
        playerOne={playerOneName}
        playerTwo={playerTwoName}
        isXTurn={state.isXTurn}
        restartGame={restartGame}
        isGameOver={state.isGameOver}
      />
      <View style={styles.gameArea}>
        {[...Array(fieldSize)].map((e, i) => (
          <View style={styles.gameRow} key={i}>
            {[...Array(fieldSize)].map((e, j) => (
              <Square
                isXTurn
                toggleTurnChar={toggleTurnChar}
                displayedChar={getDisplayedChar(i, j)}
                squareId={[i, j]}
                isGameOver={state.isGameOver}
                isWonSquare={isWonSquare(i, j)}
                key={j}
              />
            ))}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#D1DF2C',
  },
  gameArea: {
    marginHorizontal: 10,
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  gameRow: {
    flexDirection: 'row',
  },
});

export default Game;
